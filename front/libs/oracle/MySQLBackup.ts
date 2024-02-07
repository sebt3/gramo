import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { MySQLBackupListExcludes, MySQLBackupReadExcludes, MySQLBackupSimpleExcludes } from './custom.js'
import { extraMySQLBackupColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const MySQLBackupColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraMySQLBackupColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const MySQLBackupAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(MySQLBackupColumns);

export const MySQLBackupDefinition = {"type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"type":"object","required":["clusterName"],"properties":{"addTimestampToBackupDirectory":{"type":"boolean"},"backupProfile":{"description":"backupProfile specification if backupProfileName is not specified","x-kubernetes-preserve-unknown-fields":true},"backupProfileName":{"type":"string"},"clusterName":{"type":"string"},"deleteBackupData":{"type":"boolean"}}},"status":{"type":"object","properties":{"bucket":{"type":"string"},"completionTime":{"type":"string"},"container":{"type":"string"},"elapsedTime":{"type":"string"},"message":{"type":"string"},"method":{"type":"string"},"ociTenancy":{"type":"string"},"output":{"type":"string"},"size":{"type":"string"},"source":{"type":"string"},"spaceAvailable":{"type":"string"},"startTime":{"type":"string"},"status":{"type":"string"}}}},"x-kubernetes-group-version-kind":[{"group":"mysql.oracle.com","kind":"MySQLBackup","version":"v2"}]};

export function useMySQLBackup() {
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
        if (["spec","status"].includes(k)||k=='metadata')
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
    onNotMySQLBackupFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].oracleMySQLBackup == null) {
        const matched = router.currentRoute.value.matched
        notifyError('MySQLBackup not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'oracleMySQLBackupView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'oracleMySQLBackupView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'oracleMySQLBackupEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'oracleMySQLBackupCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> MySQLBackup <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}