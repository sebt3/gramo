import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { IngressRouteTCPListExcludes, IngressRouteTCPReadExcludes, IngressRouteTCPSimpleExcludes } from './custom.js'
import { extraIngressRouteTCPColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const IngressRouteTCPColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraIngressRouteTCPColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const IngressRouteTCPAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(IngressRouteTCPColumns);

export const IngressRouteTCPDefinition = {"description":"IngressRouteTCP is the CRD implementation of a Traefik TCP Router.","type":"object","required":["metadata","spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"IngressRouteTCPSpec defines the desired state of IngressRouteTCP.","type":"object","required":["routes"],"properties":{"entryPoints":{"description":"EntryPoints defines the list of entry point names to bind to. Entry points have to be configured in the static configuration. More info: https://doc.traefik.io/traefik/v2.10/routing/entrypoints/ Default: all.","type":"array","items":{"type":"string"}},"routes":{"description":"Routes defines the list of routes.","type":"array","items":{"description":"RouteTCP holds the TCP route configuration.","type":"object","required":["match"],"properties":{"match":{"description":"Match defines the router's rule. More info: https://doc.traefik.io/traefik/v2.10/routing/routers/#rule_1","type":"string"},"middlewares":{"description":"Middlewares defines the list of references to MiddlewareTCP resources.","type":"array","items":{"description":"ObjectReference is a generic reference to a Traefik resource.","type":"object","required":["name"],"properties":{"name":{"description":"Name defines the name of the referenced Traefik resource.","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced Traefik resource.","type":"string"}}}},"priority":{"description":"Priority defines the router's priority. More info: https://doc.traefik.io/traefik/v2.10/routing/routers/#priority_1","type":"integer"},"services":{"description":"Services defines the list of TCP services.","type":"array","items":{"description":"ServiceTCP defines an upstream TCP service to proxy traffic to.","type":"object","required":["name","port"],"properties":{"name":{"description":"Name defines the name of the referenced Kubernetes Service.","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced Kubernetes Service.","type":"string"},"nativeLB":{"description":"NativeLB controls, when creating the load-balancer, whether the LB's children are directly the pods IPs or if the only child is the Kubernetes Service clusterIP. The Kubernetes Service itself does load-balance to the pods. By default, NativeLB is false.","type":"boolean"},"port":{"description":"Port defines the port of a Kubernetes Service. This can be a reference to a named port.","x-kubernetes-int-or-string":true},"proxyProtocol":{"description":"ProxyProtocol defines the PROXY protocol configuration. More info: https://doc.traefik.io/traefik/v2.10/routing/services/#proxy-protocol","type":"object","properties":{"version":{"description":"Version defines the PROXY Protocol version to use.","type":"integer"}}},"terminationDelay":{"description":"TerminationDelay defines the deadline that the proxy sets, after one of its connected peers indicates it has closed the writing capability of its connection, to close the reading capability as well, hence fully terminating the connection. It is a duration in milliseconds, defaulting to 100. A negative value means an infinite deadline (i.e. the reading capability is never closed).","type":"integer"},"weight":{"description":"Weight defines the weight used when balancing requests between multiple Kubernetes Service.","type":"integer"}}}}}}},"tls":{"description":"TLS defines the TLS configuration on a layer 4 / TCP Route. More info: https://doc.traefik.io/traefik/v2.10/routing/routers/#tls_1","type":"object","properties":{"certResolver":{"description":"CertResolver defines the name of the certificate resolver to use. Cert resolvers have to be configured in the static configuration. More info: https://doc.traefik.io/traefik/v2.10/https/acme/#certificate-resolvers","type":"string"},"domains":{"description":"Domains defines the list of domains that will be used to issue certificates. More info: https://doc.traefik.io/traefik/v2.10/routing/routers/#domains","type":"array","items":{"description":"Domain holds a domain name with SANs.","type":"object","properties":{"main":{"description":"Main defines the main domain name.","type":"string"},"sans":{"description":"SANs defines the subject alternative domain names.","type":"array","items":{"type":"string"}}}}},"options":{"description":"Options defines the reference to a TLSOption, that specifies the parameters of the TLS connection. If not defined, the `default` TLSOption is used. More info: https://doc.traefik.io/traefik/v2.10/https/tls/#tls-options","type":"object","required":["name"],"properties":{"name":{"description":"Name defines the name of the referenced Traefik resource.","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced Traefik resource.","type":"string"}}},"passthrough":{"description":"Passthrough defines whether a TLS router will terminate the TLS connection.","type":"boolean"},"secretName":{"description":"SecretName is the name of the referenced Kubernetes Secret to specify the certificate details.","type":"string"},"store":{"description":"Store defines the reference to the TLSStore, that will be used to store certificates. Please note that only `default` TLSStore can be used.","type":"object","required":["name"],"properties":{"name":{"description":"Name defines the name of the referenced Traefik resource.","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced Traefik resource.","type":"string"}}}}}}}},"x-kubernetes-group-version-kind":[{"group":"traefik.io","kind":"IngressRouteTCP","version":"v1alpha1"}]};

export function useIngressRouteTCP() {
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
        if (["spec"].includes(k)||k=='metadata')
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
    onNotIngressRouteTCPFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].traefikIngressRouteTCP == null) {
        const matched = router.currentRoute.value.matched
        notifyError('IngressRouteTCP not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'traefikIngressRouteTCPView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'traefikIngressRouteTCPView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'traefikIngressRouteTCPEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'traefikIngressRouteTCPCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> IngressRouteTCP <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}