import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { TraefikServiceListExcludes, TraefikServiceReadExcludes, TraefikServiceSimpleExcludes } from './custom.js'
import { extraTraefikServiceColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const TraefikServiceColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraTraefikServiceColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const TraefikServiceAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(TraefikServiceColumns);

export const TraefikServiceDefinition = {"description":"TraefikService is the CRD implementation of a Traefik Service. TraefikService object allows to: - Apply weight to Services on load-balancing - Mirror traffic on services More info: https://doc.traefik.io/traefik/v2.10/routing/providers/kubernetes-crd/#kind-traefikservice","type":"object","required":["metadata","spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"TraefikServiceSpec defines the desired state of a TraefikService.","type":"object","properties":{"mirroring":{"description":"Mirroring defines the Mirroring service configuration.","type":"object","required":["name"],"properties":{"kind":{"description":"Kind defines the kind of the Service.","type":"string","enum":["Service","TraefikService"]},"maxBodySize":{"description":"MaxBodySize defines the maximum size allowed for the body of the request. If the body is larger, the request is not mirrored. Default value is -1, which means unlimited size.","type":"integer","format":"int64"},"mirrors":{"description":"Mirrors defines the list of mirrors where Traefik will duplicate the traffic.","type":"array","items":{"description":"MirrorService holds the mirror configuration.","type":"object","required":["name"],"properties":{"kind":{"description":"Kind defines the kind of the Service.","type":"string","enum":["Service","TraefikService"]},"name":{"description":"Name defines the name of the referenced Kubernetes Service or TraefikService. The differentiation between the two is specified in the Kind field.","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced Kubernetes Service or TraefikService.","type":"string"},"nativeLB":{"description":"NativeLB controls, when creating the load-balancer, whether the LB's children are directly the pods IPs or if the only child is the Kubernetes Service clusterIP. The Kubernetes Service itself does load-balance to the pods. By default, NativeLB is false.","type":"boolean"},"passHostHeader":{"description":"PassHostHeader defines whether the client Host header is forwarded to the upstream Kubernetes Service. By default, passHostHeader is true.","type":"boolean"},"percent":{"description":"Percent defines the part of the traffic to mirror. Supported values: 0 to 100.","type":"integer"},"port":{"description":"Port defines the port of a Kubernetes Service. This can be a reference to a named port.","x-kubernetes-int-or-string":true},"responseForwarding":{"description":"ResponseForwarding defines how Traefik forwards the response from the upstream Kubernetes Service to the client.","type":"object","properties":{"flushInterval":{"description":"FlushInterval defines the interval, in milliseconds, in between flushes to the client while copying the response body. A negative value means to flush immediately after each write to the client. This configuration is ignored when ReverseProxy recognizes a response as a streaming response; for such responses, writes are flushed to the client immediately. Default: 100ms","type":"string"}}},"scheme":{"description":"Scheme defines the scheme to use for the request to the upstream Kubernetes Service. It defaults to https when Kubernetes Service port is 443, http otherwise.","type":"string"},"serversTransport":{"description":"ServersTransport defines the name of ServersTransport resource to use. It allows to configure the transport between Traefik and your servers. Can only be used on a Kubernetes Service.","type":"string"},"sticky":{"description":"Sticky defines the sticky sessions configuration. More info: https://doc.traefik.io/traefik/v2.10/routing/services/#sticky-sessions","type":"object","properties":{"cookie":{"description":"Cookie defines the sticky cookie configuration.","type":"object","properties":{"httpOnly":{"description":"HTTPOnly defines whether the cookie can be accessed by client-side APIs, such as JavaScript.","type":"boolean"},"name":{"description":"Name defines the Cookie name.","type":"string"},"sameSite":{"description":"SameSite defines the same site policy. More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite","type":"string"},"secure":{"description":"Secure defines whether the cookie can only be transmitted over an encrypted connection (i.e. HTTPS).","type":"boolean"}}}}},"strategy":{"description":"Strategy defines the load balancing strategy between the servers. RoundRobin is the only supported value at the moment.","type":"string"},"weight":{"description":"Weight defines the weight and should only be specified when Name references a TraefikService object (and to be precise, one that embeds a Weighted Round Robin).","type":"integer"}}}},"name":{"description":"Name defines the name of the referenced Kubernetes Service or TraefikService. The differentiation between the two is specified in the Kind field.","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced Kubernetes Service or TraefikService.","type":"string"},"nativeLB":{"description":"NativeLB controls, when creating the load-balancer, whether the LB's children are directly the pods IPs or if the only child is the Kubernetes Service clusterIP. The Kubernetes Service itself does load-balance to the pods. By default, NativeLB is false.","type":"boolean"},"passHostHeader":{"description":"PassHostHeader defines whether the client Host header is forwarded to the upstream Kubernetes Service. By default, passHostHeader is true.","type":"boolean"},"port":{"description":"Port defines the port of a Kubernetes Service. This can be a reference to a named port.","x-kubernetes-int-or-string":true},"responseForwarding":{"description":"ResponseForwarding defines how Traefik forwards the response from the upstream Kubernetes Service to the client.","type":"object","properties":{"flushInterval":{"description":"FlushInterval defines the interval, in milliseconds, in between flushes to the client while copying the response body. A negative value means to flush immediately after each write to the client. This configuration is ignored when ReverseProxy recognizes a response as a streaming response; for such responses, writes are flushed to the client immediately. Default: 100ms","type":"string"}}},"scheme":{"description":"Scheme defines the scheme to use for the request to the upstream Kubernetes Service. It defaults to https when Kubernetes Service port is 443, http otherwise.","type":"string"},"serversTransport":{"description":"ServersTransport defines the name of ServersTransport resource to use. It allows to configure the transport between Traefik and your servers. Can only be used on a Kubernetes Service.","type":"string"},"sticky":{"description":"Sticky defines the sticky sessions configuration. More info: https://doc.traefik.io/traefik/v2.10/routing/services/#sticky-sessions","type":"object","properties":{"cookie":{"description":"Cookie defines the sticky cookie configuration.","type":"object","properties":{"httpOnly":{"description":"HTTPOnly defines whether the cookie can be accessed by client-side APIs, such as JavaScript.","type":"boolean"},"name":{"description":"Name defines the Cookie name.","type":"string"},"sameSite":{"description":"SameSite defines the same site policy. More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite","type":"string"},"secure":{"description":"Secure defines whether the cookie can only be transmitted over an encrypted connection (i.e. HTTPS).","type":"boolean"}}}}},"strategy":{"description":"Strategy defines the load balancing strategy between the servers. RoundRobin is the only supported value at the moment.","type":"string"},"weight":{"description":"Weight defines the weight and should only be specified when Name references a TraefikService object (and to be precise, one that embeds a Weighted Round Robin).","type":"integer"}}},"weighted":{"description":"Weighted defines the Weighted Round Robin configuration.","type":"object","properties":{"services":{"description":"Services defines the list of Kubernetes Service and/or TraefikService to load-balance, with weight.","type":"array","items":{"description":"Service defines an upstream HTTP service to proxy traffic to.","type":"object","required":["name"],"properties":{"kind":{"description":"Kind defines the kind of the Service.","type":"string","enum":["Service","TraefikService"]},"name":{"description":"Name defines the name of the referenced Kubernetes Service or TraefikService. The differentiation between the two is specified in the Kind field.","type":"string"},"namespace":{"description":"Namespace defines the namespace of the referenced Kubernetes Service or TraefikService.","type":"string"},"nativeLB":{"description":"NativeLB controls, when creating the load-balancer, whether the LB's children are directly the pods IPs or if the only child is the Kubernetes Service clusterIP. The Kubernetes Service itself does load-balance to the pods. By default, NativeLB is false.","type":"boolean"},"passHostHeader":{"description":"PassHostHeader defines whether the client Host header is forwarded to the upstream Kubernetes Service. By default, passHostHeader is true.","type":"boolean"},"port":{"description":"Port defines the port of a Kubernetes Service. This can be a reference to a named port.","x-kubernetes-int-or-string":true},"responseForwarding":{"description":"ResponseForwarding defines how Traefik forwards the response from the upstream Kubernetes Service to the client.","type":"object","properties":{"flushInterval":{"description":"FlushInterval defines the interval, in milliseconds, in between flushes to the client while copying the response body. A negative value means to flush immediately after each write to the client. This configuration is ignored when ReverseProxy recognizes a response as a streaming response; for such responses, writes are flushed to the client immediately. Default: 100ms","type":"string"}}},"scheme":{"description":"Scheme defines the scheme to use for the request to the upstream Kubernetes Service. It defaults to https when Kubernetes Service port is 443, http otherwise.","type":"string"},"serversTransport":{"description":"ServersTransport defines the name of ServersTransport resource to use. It allows to configure the transport between Traefik and your servers. Can only be used on a Kubernetes Service.","type":"string"},"sticky":{"description":"Sticky defines the sticky sessions configuration. More info: https://doc.traefik.io/traefik/v2.10/routing/services/#sticky-sessions","type":"object","properties":{"cookie":{"description":"Cookie defines the sticky cookie configuration.","type":"object","properties":{"httpOnly":{"description":"HTTPOnly defines whether the cookie can be accessed by client-side APIs, such as JavaScript.","type":"boolean"},"name":{"description":"Name defines the Cookie name.","type":"string"},"sameSite":{"description":"SameSite defines the same site policy. More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite","type":"string"},"secure":{"description":"Secure defines whether the cookie can only be transmitted over an encrypted connection (i.e. HTTPS).","type":"boolean"}}}}},"strategy":{"description":"Strategy defines the load balancing strategy between the servers. RoundRobin is the only supported value at the moment.","type":"string"},"weight":{"description":"Weight defines the weight and should only be specified when Name references a TraefikService object (and to be precise, one that embeds a Weighted Round Robin).","type":"integer"}}}},"sticky":{"description":"Sticky defines whether sticky sessions are enabled. More info: https://doc.traefik.io/traefik/v2.10/routing/providers/kubernetes-crd/#stickiness-and-load-balancing","type":"object","properties":{"cookie":{"description":"Cookie defines the sticky cookie configuration.","type":"object","properties":{"httpOnly":{"description":"HTTPOnly defines whether the cookie can be accessed by client-side APIs, such as JavaScript.","type":"boolean"},"name":{"description":"Name defines the Cookie name.","type":"string"},"sameSite":{"description":"SameSite defines the same site policy. More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite","type":"string"},"secure":{"description":"Secure defines whether the cookie can only be transmitted over an encrypted connection (i.e. HTTPS).","type":"boolean"}}}}}}}}}},"x-kubernetes-group-version-kind":[{"group":"traefik.io","kind":"TraefikService","version":"v1alpha1"}]};

export function useTraefikService() {
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
    onNotTraefikServiceFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].traefikTraefikService == null) {
        const matched = router.currentRoute.value.matched
        notifyError('TraefikService not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'traefikTraefikServiceView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'traefikTraefikServiceView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'traefikTraefikServiceEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'traefikTraefikServiceCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> TraefikService <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}