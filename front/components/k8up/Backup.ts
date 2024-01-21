import { QTableColumn } from 'quasar'
import { tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';

export const backupColumns:Array<QTableColumn> = [
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
];
export const backupAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(backupColumns);

export function useBackup() {
  const { editor, viewer, viewerUpdate, router, $q, pagination, setNamespaceFromRoute, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, setNamespacedItemFromRoute } = useCore();
  return {
    navigation: useNavigationStoreRef(),
    editor, viewer, viewerUpdate, router, pagination, setNamespaceFromRoute, setItemFromRoute, setNamespacedItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotBackupFound: (res) => {
      if ( !res.loading && res.data.k8upBackup == null) {
        const matched = router.currentRoute.value.matched
        notifyError('Backup not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'k8upBackupView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'k8upBackupView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'k8upBackupEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'k8upBackupCreate', params: {namespace}}),
    actionDelete: (deletor, row) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> Backup <strong>${row.metadata.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": row.metadata.name, "namespace":row.metadata.namespace});
      })
    },
  }
}
