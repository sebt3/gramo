import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { IngressListExcludes, IngressReadExcludes, IngressSimpleExcludes } from './custom.js'
import { extraIngressColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const IngressColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraIngressColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const IngressAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(IngressColumns);

export const IngressDefinition = {"description":"Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"IngressSpec describes the Ingress the user wishes to exist.","type":"object","properties":{"defaultBackend":{"description":"IngressBackend describes all endpoints for a given service and port.","type":"object","properties":{"resource":{"description":"TypedLocalObjectReference contains enough information to let you locate the typed referenced object inside the same namespace.","type":"object","required":["kind","name"],"properties":{"apiGroup":{"description":"APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.","type":"string"},"kind":{"description":"Kind is the type of resource being referenced","type":"string"},"name":{"description":"Name is the name of resource being referenced","type":"string"}},"x-kubernetes-map-type":"atomic"},"service":{"description":"IngressServiceBackend references a Kubernetes Service as a Backend.","type":"object","required":["name"],"properties":{"name":{"description":"name is the referenced service. The service must exist in the same namespace as the Ingress object.","type":"string"},"port":{"description":"ServiceBackendPort is the service port being referenced.","type":"object","properties":{"name":{"description":"name is the name of the port on the Service. This is a mutually exclusive setting with \"Number\".","type":"string"},"number":{"description":"number is the numerical port number (e.g. 80) on the Service. This is a mutually exclusive setting with \"Name\".","type":"integer","format":"int32"}}}}}}},"ingressClassName":{"description":"ingressClassName is the name of an IngressClass cluster resource. Ingress controller implementations use this field to know whether they should be serving this Ingress resource, by a transitive connection (controller -> IngressClass -> Ingress resource). Although the `kubernetes.io/ingress.class` annotation (simple constant name) was never formally defined, it was widely supported by Ingress controllers to create a direct binding between Ingress controller and Ingress resources. Newly created Ingress resources should prefer using the field. However, even though the annotation is officially deprecated, for backwards compatibility reasons, ingress controllers should still honor that annotation if present.","type":"string"},"rules":{"description":"rules is a list of host rules used to configure the Ingress. If unspecified, or no rule matches, all traffic is sent to the default backend.","type":"array","items":{"description":"IngressRule represents the rules mapping the paths under a specified host to the related backend services. Incoming requests are first evaluated for a host match, then routed to the backend associated with the matching IngressRuleValue.","type":"object","properties":{"host":{"description":"host is the fully qualified domain name of a network host, as defined by RFC 3986. Note the following deviations from the \"host\" part of the URI as defined in RFC 3986: 1. IPs are not allowed. Currently an IngressRuleValue can only apply to\n   the IP in the Spec of the parent Ingress.\n2. The `:` delimiter is not respected because ports are not allowed.\n\t  Currently the port of an Ingress is implicitly :80 for http and\n\t  :443 for https.\nBoth these may change in the future. Incoming requests are matched against the host before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic based on the specified IngressRuleValue.\n\nhost can be \"precise\" which is a domain name without the terminating dot of a network host (e.g. \"foo.bar.com\") or \"wildcard\", which is a domain name prefixed with a single wildcard label (e.g. \"*.foo.com\"). The wildcard character '*' must appear by itself as the first DNS label and matches only a single label. You cannot have a wildcard label by itself (e.g. Host == \"*\"). Requests will be matched against the Host field in the following way: 1. If host is precise, the request matches this rule if the http host header is equal to Host. 2. If host is a wildcard, then the request matches this rule if the http host header is to equal to the suffix (removing the first label) of the wildcard rule.","type":"string"},"http":{"description":"HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.","type":"object","required":["paths"],"properties":{"paths":{"description":"paths is a collection of paths that map requests to backends.","type":"array","items":{"description":"HTTPIngressPath associates a path with a backend. Incoming urls matching the path are forwarded to the backend.","type":"object","required":["pathType","backend"],"properties":{"backend":{"description":"IngressBackend describes all endpoints for a given service and port.","type":"object","properties":{"resource":{"description":"TypedLocalObjectReference contains enough information to let you locate the typed referenced object inside the same namespace.","type":"object","required":["kind","name"],"properties":{"apiGroup":{"description":"APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.","type":"string"},"kind":{"description":"Kind is the type of resource being referenced","type":"string"},"name":{"description":"Name is the name of resource being referenced","type":"string"}},"x-kubernetes-map-type":"atomic"},"service":{"description":"IngressServiceBackend references a Kubernetes Service as a Backend.","type":"object","required":["name"],"properties":{"name":{"description":"name is the referenced service. The service must exist in the same namespace as the Ingress object.","type":"string"},"port":{"description":"ServiceBackendPort is the service port being referenced.","type":"object","properties":{"name":{"description":"name is the name of the port on the Service. This is a mutually exclusive setting with \"Number\".","type":"string"},"number":{"description":"number is the numerical port number (e.g. 80) on the Service. This is a mutually exclusive setting with \"Name\".","type":"integer","format":"int32"}}}}}}},"path":{"description":"path is matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional \"path\" part of a URL as defined by RFC 3986. Paths must begin with a '/' and must be present when using PathType with value \"Exact\" or \"Prefix\".","type":"string"},"pathType":{"description":"pathType determines the interpretation of the path matching. PathType can be one of the following values: * Exact: Matches the URL path exactly. * Prefix: Matches based on a URL path prefix split by '/'. Matching is\n  done on a path element by element basis. A path element refers is the\n  list of labels in the path split by the '/' separator. A request is a\n  match for path p if every p is an element-wise prefix of p of the\n  request path. Note that if the last element of the path is a substring\n  of the last element in request path, it is not a match (e.g. /foo/bar\n  matches /foo/bar/baz, but does not match /foo/barbaz).\n* ImplementationSpecific: Interpretation of the Path matching is up to\n  the IngressClass. Implementations can treat this as a separate PathType\n  or treat it identically to Prefix or Exact path types.\nImplementations are required to support all path types.\n\nPossible enum values:\n - `\"Exact\"` matches the URL path exactly and with case sensitivity.\n - `\"ImplementationSpecific\"` matching is up to the IngressClass. Implementations can treat this as a separate PathType or treat it identically to Prefix or Exact path types.\n - `\"Prefix\"` matches based on a URL path prefix split by '/'. Matching is case sensitive and done on a path element by element basis. A path element refers to the list of labels in the path split by the '/' separator. A request is a match for path p if every p is an element-wise prefix of p of the request path. Note that if the last element of the path is a substring of the last element in request path, it is not a match (e.g. /foo/bar matches /foo/bar/baz, but does not match /foo/barbaz). If multiple matching paths exist in an Ingress spec, the longest matching path is given priority. Examples: - /foo/bar does not match requests to /foo/barbaz - /foo/bar matches request to /foo/bar and /foo/bar/baz - /foo and /foo/ both match requests to /foo and /foo/. If both paths are present in an Ingress spec, the longest matching path (/foo/) is given priority.","type":"string","enum":["Exact","ImplementationSpecific","Prefix"]}}},"x-kubernetes-list-type":"atomic"}}}}},"x-kubernetes-list-type":"atomic"},"tls":{"description":"tls represents the TLS configuration. Currently the Ingress only supports a single TLS port, 443. If multiple members of this list specify different hosts, they will be multiplexed on the same port according to the hostname specified through the SNI TLS extension, if the ingress controller fulfilling the ingress supports SNI.","type":"array","items":{"description":"IngressTLS describes the transport layer security associated with an ingress.","type":"object","properties":{"hosts":{"description":"hosts is a list of hosts included in the TLS certificate. The values in this list must match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified.","type":"array","items":{"type":"string"},"x-kubernetes-list-type":"atomic"},"secretName":{"description":"secretName is the name of the secret used to terminate TLS traffic on port 443. Field is left optional to allow TLS routing based on SNI hostname alone. If the SNI host in a listener conflicts with the \"Host\" header field used by an IngressRule, the SNI host is used for termination and value of the \"Host\" header is used for routing.","type":"string"}}},"x-kubernetes-list-type":"atomic"}}},"status":{"description":"IngressStatus describe the current state of the Ingress.","type":"object","properties":{"loadBalancer":{"description":"IngressLoadBalancerStatus represents the status of a load-balancer.","type":"object","properties":{"ingress":{"description":"ingress is a list containing ingress points for the load-balancer.","type":"array","items":{"description":"IngressLoadBalancerIngress represents the status of a load-balancer ingress point.","type":"object","properties":{"hostname":{"description":"hostname is set for load-balancer ingress points that are DNS based.","type":"string"},"ip":{"description":"ip is set for load-balancer ingress points that are IP based.","type":"string"},"ports":{"description":"ports provides information about the ports exposed by this LoadBalancer.","type":"array","items":{"description":"IngressPortStatus represents the error condition of a service port","type":"object","required":["port","protocol"],"properties":{"error":{"description":"error is to record the problem with the service port The format of the error shall comply with the following rules: - built-in error values shall be specified in this file and those shall use\n  CamelCase names\n- cloud provider specific error values must have names that comply with the\n  format foo.example.com/CamelCase.","type":"string"},"port":{"description":"port is the port number of the ingress port.","type":"integer","format":"int32"},"protocol":{"description":"protocol is the protocol of the ingress port. The supported values are: \"TCP\", \"UDP\", \"SCTP\"\n\nPossible enum values:\n - `\"SCTP\"` is the SCTP protocol.\n - `\"TCP\"` is the TCP protocol.\n - `\"UDP\"` is the UDP protocol.","type":"string","enum":["SCTP","TCP","UDP"]}}},"x-kubernetes-list-type":"atomic"}}}}}}}}},"x-kubernetes-group-version-kind":[{"group":"networking.k8s.io","kind":"Ingress","version":"v1"}]};

export function useIngress() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "spec": '',
      }
  });
  const onlyReadProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["spec","status"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    };
  const onlyWriteProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["spec"].includes(k))
          res[k] = obj[k];
      })
      return res
    };
  const editor = ref({
      tab: 'simple',
      yaml: '',
      obj: {},
      setKey: (key, o) => {editor.value.obj[key] = o;editor.value.yaml = stringify(editor.value.obj)},
      ready: false,
      setYaml: (y) => {editor.value.yaml = y;editor.value.obj = parse(y);},
      updateFromQuery: (res: object, obj: object) => {editor.value.ready=false;if(!res['loading']){editor.value.obj = onlyWriteProperties(obj);editor.value.yaml = stringify(editor.value.obj);editor.value.ready=true;}},
  });
  return {
    onlyReadProperties, onlyWriteProperties, editor, viewer, viewerUpdate: (obj) => {
      viewer.value.full=gqlDataToYaml(obj)
      viewer.value.props["spec"]=gqlDataToYaml({"spec": obj["spec"]})
    },
    navigation: useNavigationStoreRef(),
    isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute,
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotIngressFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].k8sIngress == null) {
        const matched = router.currentRoute.value.matched
        notifyError('Ingress not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'k8sIngressView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'k8sIngressView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'k8sIngressEdit', params: {name, namespace}}),
    deleteDone: () => notifySuccess('Deletion proceded'),
    deleteError: (err) => {
      notifyError('Deletion failed');
      console.log('deletion error',err);
    },
    patchDone: () => {
      notifySuccess('Modification applied');
      router.go(-1);
    },
    patchError: (err) => {
      notifyError('Modification failed');
      console.log('mutation error', err)
    },
    actionNew: (namespace)    => router.push({ name: 'k8sIngressCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> Ingress <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}