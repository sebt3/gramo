import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { ServersTransportListExcludes, ServersTransportReadExcludes, ServersTransportSimpleExcludes } from './custom.js'
import { extraServersTransportColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const ServersTransportColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraServersTransportColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const ServersTransportAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(ServersTransportColumns);

export const ServersTransportDefinition = {"description":"ServersTransport is the CRD implementation of a ServersTransport. If no serversTransport is specified, the default@internal will be used. The default@internal serversTransport is created from the static configuration. More info: https://doc.traefik.io/traefik/v2.10/routing/services/#serverstransport_1","type":"object","required":["metadata","spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"ServersTransportSpec defines the desired state of a ServersTransport.","type":"object","properties":{"certificatesSecrets":{"description":"CertificatesSecrets defines a list of secret storing client certificates for mTLS.","type":"array","items":{"type":"string"}},"disableHTTP2":{"description":"DisableHTTP2 disables HTTP/2 for connections with backend servers.","type":"boolean"},"forwardingTimeouts":{"description":"ForwardingTimeouts defines the timeouts for requests forwarded to the backend servers.","type":"object","properties":{"dialTimeout":{"description":"DialTimeout is the amount of time to wait until a connection to a backend server can be established.","x-kubernetes-int-or-string":true},"idleConnTimeout":{"description":"IdleConnTimeout is the maximum period for which an idle HTTP keep-alive connection will remain open before closing itself.","x-kubernetes-int-or-string":true},"pingTimeout":{"description":"PingTimeout is the timeout after which the HTTP/2 connection will be closed if a response to ping is not received.","x-kubernetes-int-or-string":true},"readIdleTimeout":{"description":"ReadIdleTimeout is the timeout after which a health check using ping frame will be carried out if no frame is received on the HTTP/2 connection.","x-kubernetes-int-or-string":true},"responseHeaderTimeout":{"description":"ResponseHeaderTimeout is the amount of time to wait for a server's response headers after fully writing the request (including its body, if any).","x-kubernetes-int-or-string":true}}},"insecureSkipVerify":{"description":"InsecureSkipVerify disables SSL certificate verification.","type":"boolean"},"maxIdleConnsPerHost":{"description":"MaxIdleConnsPerHost controls the maximum idle (keep-alive) to keep per-host.","type":"integer"},"peerCertURI":{"description":"PeerCertURI defines the peer cert URI used to match against SAN URI during the peer certificate verification.","type":"string"},"rootCAsSecrets":{"description":"RootCAsSecrets defines a list of CA secret used to validate self-signed certificate.","type":"array","items":{"type":"string"}},"serverName":{"description":"ServerName defines the server name used to contact the server.","type":"string"}}}},"x-kubernetes-group-version-kind":[{"group":"traefik.io","kind":"ServersTransport","version":"v1alpha1"}]};

export function useServersTransport() {
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
    onNotServersTransportFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].traefikServersTransport == null) {
        const matched = router.currentRoute.value.matched
        notifyError('ServersTransport not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'traefikServersTransportView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'traefikServersTransportView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'traefikServersTransportEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'traefikServersTransportCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> ServersTransport <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}