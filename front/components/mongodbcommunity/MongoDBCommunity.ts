import { QTableColumn } from 'quasar'
import { tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';

export const mongoDBCommunityColumns:Array<QTableColumn> = [
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Type',  label: 'Type', field: row => row.type, sortable: true, align: tableColumnAlign.left},
  {name: 'Version',  label: 'Version', field: row => row.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase',  label: 'Phase', field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
];
export const mongoDBCommunityAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(mongoDBCommunityColumns);

export function useMongoDBCommunity() {
  const { viewer, viewerUpdate, router, $q, pagination, setNamespaceFromRoute, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, setNamespacedItemFromRoute } = useCore();
  return {
    navigation: useNavigationStoreRef(),
    viewer, viewerUpdate, router, pagination, setNamespaceFromRoute, setItemFromRoute, setNamespacedItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotMongoDBCommunityFound: (res) => {
      if ( !res.loading && res.data.mongodbcommunityMongoDBCommunity == null) {
        const matched = router.currentRoute.value.matched
        notifyError('MongoDBCommunity not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'mongodbcommunityMongoDBCommunityView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'mongodbcommunityMongoDBCommunityView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'mongodbcommunityMongoDBCommunityEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'mongodbcommunityMongoDBCommunityCreate', params: {namespace}}),
    actionDelete: (deletor, row) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> MongoDBCommunity <strong>${row.metadata.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": row.metadata.name, "namespace":row.metadata.namespace});
      })
    },
  }
}
