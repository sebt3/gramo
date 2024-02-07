import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { InstallListExcludes, InstallReadExcludes, InstallSimpleExcludes } from './custom.js'
import { extraInstallColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const InstallColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraInstallColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const InstallAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(InstallColumns);

export const InstallDefinition = {"description":"Auto-generated derived type for InstallSpec via `CustomResource`","type":"object","title":"Install","required":["spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"Generate the Kubernetes wrapper struct `Install` from our Spec and Status struct\n\nThis provides a hook for generating the CRD yaml (in crdgen.rs) Maybe","type":"object","required":["category","component","distrib"],"properties":{"auto_upgrade":{"description":"Should we automatically upgrade the package","type":"boolean"},"category":{"description":"The category name","type":"string"},"component":{"description":"The package name","type":"string"},"distrib":{"description":"The distribution source name","type":"string"},"options":{"description":"Parameters","x-kubernetes-preserve-unknown-fields":true}}},"status":{"description":"The status object of `Install`","type":"object","required":["commit_id","digest","last_updated","status"],"properties":{"commit_id":{"description":"component version applied","type":"string"},"digest":{"description":"Options digests","type":"string"},"errors":{"description":"Set with the messages if any error occured","x-kubernetes-preserve-unknown-fields":true},"last_updated":{"description":"Last update date","type":"string","format":"date-time"},"plan":{"description":"Currently planned changed, only set if planned is true","x-kubernetes-preserve-unknown-fields":true},"status":{"description":"Current high-level status of the installation","type":"string"},"tfstate":{"description":"Current terraform status","x-kubernetes-preserve-unknown-fields":true}}}},"x-kubernetes-group-version-kind":[{"group":"vynil.solidite.fr","kind":"Install","version":"v1"}]};

export function useInstall() {
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
    onNotInstallFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].vynilInstall == null) {
        const matched = router.currentRoute.value.matched
        notifyError('Install not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'vynilInstallView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'vynilInstallView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'vynilInstallEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'vynilInstallCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> Install <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}