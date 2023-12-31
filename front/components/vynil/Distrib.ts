import { QTableColumn } from 'quasar'
import { useNavigationStoreRef, tableColumnAlign, useCore } from '../core'
export { ref, useQuery, useMutation, useCore, sanitizeData, getProperties, onlyUnique } from '../core';

export const distribColumns:Array<QTableColumn> = [
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Url', label: 'Url', field: row => row.url, sortable: true, align: tableColumnAlign.left},
  {name: 'Schedule', label: 'Schedule', field: row => row.schedule, sortable: false, align: tableColumnAlign.left},
  {name: 'Packages', label: 'Package', field: row => row.packages.length, sortable: true, align: tableColumnAlign.left},
  {name: 'Errors', label: 'Errors', field: row => row.status.errors.length, sortable: false, align: tableColumnAlign.left},
  {name: 'Updated', label: 'Updated', field: row => row.status.last_updated, sortable: false, align: tableColumnAlign.left},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
];
export const packageColumns:Array<QTableColumn> = [
  {name: 'Category', label: 'Category', field: row => row.category.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Name', label: 'Name', field: row => row.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Description', label: 'Description', field: row => row.description, sortable: true, align: tableColumnAlign.left},
];

export function useDistrib() {
  const { router, $q, pagination, setNamespaceFromRoute, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
  return {
    navigation: useNavigationStoreRef(),
    router, pagination, setNamespaceFromRoute, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking,
    onNotDistribFound: (res) => {
      if ( !res.loading && res.data.vynilDistrib == null) {
        const matched = router.currentRoute.value.matched
        notifyError('Distribution not found');
        router.push({path: matched[matched.length>1?matched.length-2:matched.length-1].path,replace: true})
      }
    },
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
    toView: (name) => router.push({ name: 'vynilDistribView', params: {name}}),
    toEdit: (name) => router.push({ name: 'vynilDistribEdit', params: {name}}),
    actionNew: ()  => router.push({ name: 'vynilDistribCreate'}),
    actionDelete: (deletor, row) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> Distrib <strong>${row.metadata.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": row.metadata.name});
      })
    },
  }
}
