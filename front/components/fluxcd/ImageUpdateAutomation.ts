import { QTableColumn } from 'quasar'
import { tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';

export const imageUpdateAutomationColumns:Array<QTableColumn> = [
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Source',  label: 'Source', field: row => row.sourceRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Branch',  label: 'Branch', field: row => row.git.push.branch, sortable: true, align: tableColumnAlign.left},
  {name: 'Path',  label: 'Path', field: row => row.update.path, sortable: true, align: tableColumnAlign.left},
  {name: 'Condition',  label: 'Condition', field: row => row.status.conditions[0].message, sortable: true, align: tableColumnAlign.left},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
];
export const imageUpdateAutomationAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(imageUpdateAutomationColumns);

export function useImageUpdateAutomation() {
  const { router, $q, pagination, setNamespaceFromRoute, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, setNamespacedItemFromRoute } = useCore();
  return {
    navigation: useNavigationStoreRef(),
    router, pagination, setNamespaceFromRoute, setItemFromRoute, setNamespacedItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotImageUpdateAutomationFound: (res) => {
      if ( !res.loading && res.data.fluxcdImageUpdateAutomation == null) {
        const matched = router.currentRoute.value.matched
        notifyError('ImageUpdateAutomation not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'fluxcdImageUpdateAutomationView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'fluxcdImageUpdateAutomationView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'fluxcdImageUpdateAutomationEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'fluxcdImageUpdateAutomationCreate', params: {namespace}}),
    actionDelete: (deletor, row) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> ImageUpdateAutomation <strong>${row.metadata.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": row.metadata.name, "namespace":row.metadata.namespace});
      })
    },
  }
}
