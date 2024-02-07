import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { IngressRouteListExcludes, IngressRouteReadExcludes, IngressRouteSimpleExcludes } from './custom.js'
import { extraIngressRouteColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const IngressRouteColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraIngressRouteColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const IngressRouteAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(IngressRouteColumns);

export const IngressRouteDefinition = {"description":"IngressRoute is the CRD implementation of a Traefik HTTP Router.","type":"object","required":["metadata","spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"IngressRouteSpec defines the desired state of IngressRoute.","type":"object","required":["routes"],"properties":{"entryPoints":{"description":"EntryPoints defines the list of entry point names to bind to. Entry points have to be configured in the static configuration. More info: https://doc.traefik.io/traefik/v2.10/routing/entrypoints/ Default: all.","type":"array","items":{"type":"string"}},"routes":{"description":"Routes defines the list of routes.","type":"array","items":{"description":"Route holds the HTTP route configuration.","type":"object","required":["kind","match"],"properties":{"kind":{"description":"Kind defines the kind of the route. Rule is the only supported kind.","type":"string","enum":["Rule"]},"match":{"description":"Match defines the router's rule. More info: https://doc.traefik.io/traefik/v2.10/routing/routers/#rule","type":"string"},"middlewares":{"description":"Middlewares defines the list of references to Middleware resources. More info: https://doc.traefik.io/traefik/v2.10/routing/providers/kubernetes-crd/#kind-middleware","type":"array","items":{"description":"MiddlewareRef is a reference to a Middleware resource.","type":"object","required":["name"],"properties":{"name":{"description":"Name defines the name of the referenced Middleware resource.","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced Middleware resource.","type":"string"}}}},"priority":{"description":"Priority defines the router's priority. More info: https://doc.traefik.io/traefik/v2.10/routing/routers/#priority","type":"integer"},"services":{"description":"Services defines the list of Service. It can contain any combination of TraefikService and/or reference to a Kubernetes Service.","type":"array","items":{"description":"Service defines an upstream HTTP service to proxy traffic to.","type":"object","required":["name"],"properties":{"kind":{"description":"Kind defines the kind of the Service.","type":"string","enum":["Service","TraefikService"]},"name":{"description":"Name defines the name of the referenced Kubernetes Service or TraefikService. The differentiation between the two is specified in the Kind field.","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced Kubernetes Service or TraefikService.","type":"string"},"nativeLB":{"description":"NativeLB controls, when creating the load-balancer, whether the LB's children are directly the pods IPs or if the only child is the Kubernetes Service clusterIP. The Kubernetes Service itself does load-balance to the pods. By default, NativeLB is false.","type":"boolean"},"passHostHeader":{"description":"PassHostHeader defines whether the client Host header is forwarded to the upstream Kubernetes Service. By default, passHostHeader is true.","type":"boolean"},"port":{"description":"Port defines the port of a Kubernetes Service. This can be a reference to a named port.","x-kubernetes-int-or-string":true},"responseForwarding":{"description":"ResponseForwarding defines how Traefik forwards the response from the upstream Kubernetes Service to the client.","type":"object","properties":{"flushInterval":{"description":"FlushInterval defines the interval, in milliseconds, in between flushes to the client while copying the response body. A negative value means to flush immediately after each write to the client. This configuration is ignored when ReverseProxy recognizes a response as a streaming response; for such responses, writes are flushed to the client immediately. Default: 100ms","type":"string"}}},"scheme":{"description":"Scheme defines the scheme to use for the request to the upstream Kubernetes Service. It defaults to https when Kubernetes Service port is 443, http otherwise.","type":"string"},"serversTransport":{"description":"ServersTransport defines the name of ServersTransport resource to use. It allows to configure the transport between Traefik and your servers. Can only be used on a Kubernetes Service.","type":"string"},"sticky":{"description":"Sticky defines the sticky sessions configuration. More info: https://doc.traefik.io/traefik/v2.10/routing/services/#sticky-sessions","type":"object","properties":{"cookie":{"description":"Cookie defines the sticky cookie configuration.","type":"object","properties":{"httpOnly":{"description":"HTTPOnly defines whether the cookie can be accessed by client-side APIs, such as JavaScript.","type":"boolean"},"name":{"description":"Name defines the Cookie name.","type":"string"},"sameSite":{"description":"SameSite defines the same site policy. More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite","type":"string"},"secure":{"description":"Secure defines whether the cookie can only be transmitted over an encrypted connection (i.e. HTTPS).","type":"boolean"}}}}},"strategy":{"description":"Strategy defines the load balancing strategy between the servers. RoundRobin is the only supported value at the moment.","type":"string"},"weight":{"description":"Weight defines the weight and should only be specified when Name references a TraefikService object (and to be precise, one that embeds a Weighted Round Robin).","type":"integer"}}}}}}},"tls":{"description":"TLS defines the TLS configuration. More info: https://doc.traefik.io/traefik/v2.10/routing/routers/#tls","type":"object","properties":{"certResolver":{"description":"CertResolver defines the name of the certificate resolver to use. Cert resolvers have to be configured in the static configuration. More info: https://doc.traefik.io/traefik/v2.10/https/acme/#certificate-resolvers","type":"string"},"domains":{"description":"Domains defines the list of domains that will be used to issue certificates. More info: https://doc.traefik.io/traefik/v2.10/routing/routers/#domains","type":"array","items":{"description":"Domain holds a domain name with SANs.","type":"object","properties":{"main":{"description":"Main defines the main domain name.","type":"string"},"sans":{"description":"SANs defines the subject alternative domain names.","type":"array","items":{"type":"string"}}}}},"options":{"description":"Options defines the reference to a TLSOption, that specifies the parameters of the TLS connection. If not defined, the `default` TLSOption is used. More info: https://doc.traefik.io/traefik/v2.10/https/tls/#tls-options","type":"object","required":["name"],"properties":{"name":{"description":"Name defines the name of the referenced TLSOption. More info: https://doc.traefik.io/traefik/v2.10/routing/providers/kubernetes-crd/#kind-tlsoption","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced TLSOption. More info: https://doc.traefik.io/traefik/v2.10/routing/providers/kubernetes-crd/#kind-tlsoption","type":"string"}}},"secretName":{"description":"SecretName is the name of the referenced Kubernetes Secret to specify the certificate details.","type":"string"},"store":{"description":"Store defines the reference to the TLSStore, that will be used to store certificates. Please note that only `default` TLSStore can be used.","type":"object","required":["name"],"properties":{"name":{"description":"Name defines the name of the referenced TLSStore. More info: https://doc.traefik.io/traefik/v2.10/routing/providers/kubernetes-crd/#kind-tlsstore","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced TLSStore. More info: https://doc.traefik.io/traefik/v2.10/routing/providers/kubernetes-crd/#kind-tlsstore","type":"string"}}}}}}}},"x-kubernetes-group-version-kind":[{"group":"traefik.io","kind":"IngressRoute","version":"v1alpha1"}]};

export function useIngressRoute() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "spec": '',
      }
  });
  const editor = ref({
      tab: 'simple',
      yaml: '',
      obj: {},
      setKey: (key, o) => {editor.value.obj[key] = o;editor.value.yaml = stringify(editor.value.obj)},
      ready: false,
      setYaml: (y) => {editor.value.yaml = y;editor.value.obj = parse(y);},
//      updateFromQuery: (res: object, obj: object) => {editor.value.ready=false;if(!res['loading']){editor.value.setSpec(obj);editor.value.ready=true;}},
  });
  return {
    editor, viewer, viewerUpdate: (obj) => {
      viewer.value.full=gqlDataToYaml(obj)
      viewer.value.props["spec"]=gqlDataToYaml({"spec": obj["spec"]})
    },
    navigation: useNavigationStoreRef(),
    onlyReadProperties: (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["spec"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    },
    onlyWriteProperties: (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["spec"].includes(k))
          res[k] = obj[k];
      })
      return res
    },
    isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute,
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotIngressRouteFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].traefikIngressRoute == null) {
        const matched = router.currentRoute.value.matched
        notifyError('IngressRoute not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'traefikIngressRouteView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'traefikIngressRouteView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'traefikIngressRouteEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'traefikIngressRouteCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> IngressRoute <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}