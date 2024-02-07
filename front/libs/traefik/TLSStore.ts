import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { TLSStoreListExcludes, TLSStoreReadExcludes, TLSStoreSimpleExcludes } from './custom.js'
import { extraTLSStoreColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const TLSStoreColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraTLSStoreColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const TLSStoreAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(TLSStoreColumns);

export const TLSStoreDefinition = {"description":"TLSStore is the CRD implementation of a Traefik TLS Store. For the time being, only the TLSStore named default is supported. This means that you cannot have two stores that are named default in different Kubernetes namespaces. More info: https://doc.traefik.io/traefik/v2.10/https/tls/#certificates-stores","type":"object","required":["metadata","spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"TLSStoreSpec defines the desired state of a TLSStore.","type":"object","properties":{"certificates":{"description":"Certificates is a list of secret names, each secret holding a key/certificate pair to add to the store.","type":"array","items":{"description":"Certificate holds a secret name for the TLSStore resource.","type":"object","required":["secretName"],"properties":{"secretName":{"description":"SecretName is the name of the referenced Kubernetes Secret to specify the certificate details.","type":"string"}}}},"defaultCertificate":{"description":"DefaultCertificate defines the default certificate configuration.","type":"object","required":["secretName"],"properties":{"secretName":{"description":"SecretName is the name of the referenced Kubernetes Secret to specify the certificate details.","type":"string"}}},"defaultGeneratedCert":{"description":"DefaultGeneratedCert defines the default generated certificate configuration.","type":"object","properties":{"domain":{"description":"Domain is the domain definition for the DefaultCertificate.","type":"object","properties":{"main":{"description":"Main defines the main domain name.","type":"string"},"sans":{"description":"SANs defines the subject alternative domain names.","type":"array","items":{"type":"string"}}}},"resolver":{"description":"Resolver is the name of the resolver that will be used to issue the DefaultCertificate.","type":"string"}}}}}},"x-kubernetes-group-version-kind":[{"group":"traefik.io","kind":"TLSStore","version":"v1alpha1"}]};

export function useTLSStore() {
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
    onNotTLSStoreFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].traefikTLSStore == null) {
        const matched = router.currentRoute.value.matched
        notifyError('TLSStore not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'traefikTLSStoreView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'traefikTLSStoreView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'traefikTLSStoreEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'traefikTLSStoreCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> TLSStore <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}