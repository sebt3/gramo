import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { TLSOptionListExcludes, TLSOptionReadExcludes, TLSOptionSimpleExcludes } from './custom.js'
import { extraTLSOptionColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const TLSOptionColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraTLSOptionColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const TLSOptionAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(TLSOptionColumns);

export const TLSOptionDefinition = {"description":"TLSOption is the CRD implementation of a Traefik TLS Option, allowing to configure some parameters of the TLS connection. More info: https://doc.traefik.io/traefik/v2.10/https/tls/#tls-options","type":"object","required":["metadata","spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"TLSOptionSpec defines the desired state of a TLSOption.","type":"object","properties":{"alpnProtocols":{"description":"ALPNProtocols defines the list of supported application level protocols for the TLS handshake, in order of preference. More info: https://doc.traefik.io/traefik/v2.10/https/tls/#alpn-protocols","type":"array","items":{"type":"string"}},"cipherSuites":{"description":"CipherSuites defines the list of supported cipher suites for TLS versions up to TLS 1.2. More info: https://doc.traefik.io/traefik/v2.10/https/tls/#cipher-suites","type":"array","items":{"type":"string"}},"clientAuth":{"description":"ClientAuth defines the server's policy for TLS Client Authentication.","type":"object","properties":{"clientAuthType":{"description":"ClientAuthType defines the client authentication type to apply.","type":"string","enum":["NoClientCert","RequestClientCert","RequireAnyClientCert","VerifyClientCertIfGiven","RequireAndVerifyClientCert"]},"secretNames":{"description":"SecretNames defines the names of the referenced Kubernetes Secret storing certificate details.","type":"array","items":{"type":"string"}}}},"curvePreferences":{"description":"CurvePreferences defines the preferred elliptic curves in a specific order. More info: https://doc.traefik.io/traefik/v2.10/https/tls/#curve-preferences","type":"array","items":{"type":"string"}},"maxVersion":{"description":"MaxVersion defines the maximum TLS version that Traefik will accept. Possible values: VersionTLS10, VersionTLS11, VersionTLS12, VersionTLS13. Default: None.","type":"string"},"minVersion":{"description":"MinVersion defines the minimum TLS version that Traefik will accept. Possible values: VersionTLS10, VersionTLS11, VersionTLS12, VersionTLS13. Default: VersionTLS10.","type":"string"},"preferServerCipherSuites":{"description":"PreferServerCipherSuites defines whether the server chooses a cipher suite among his own instead of among the client's. It is enabled automatically when minVersion or maxVersion is set. Deprecated: https://github.com/golang/go/issues/45430","type":"boolean"},"sniStrict":{"description":"SniStrict defines whether Traefik allows connections from clients connections that do not specify a server_name extension.","type":"boolean"}}}},"x-kubernetes-group-version-kind":[{"group":"traefik.io","kind":"TLSOption","version":"v1alpha1"}]};

export function useTLSOption() {
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
    onNotTLSOptionFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].traefikTLSOption == null) {
        const matched = router.currentRoute.value.matched
        notifyError('TLSOption not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'traefikTLSOptionView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'traefikTLSOptionView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'traefikTLSOptionEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'traefikTLSOptionCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> TLSOption <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}