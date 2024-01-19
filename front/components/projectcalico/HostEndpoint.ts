import { QTableColumn } from 'quasar'
import { tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';

export const hostEndpointColumns:Array<QTableColumn> = [
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
];

export function useHostEndpoint() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
  return {
    navigation: useNavigationStoreRef(),
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotHostEndpointFound: (res) => {
      if ( !res.loading && res.data.projectcalicoHostEndpoint == null) {
        const matched = router.currentRoute.value.matched
        notifyError('HostEndpoint not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'projectcalicoHostEndpointView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'projectcalicoHostEndpointView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'projectcalicoHostEndpointEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'projectcalicoHostEndpointCreate'}),
    actionDelete: (deletor, row) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> HostEndpoint <strong>${row.metadata.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": row.metadata.name});
      })
    },
  }
}