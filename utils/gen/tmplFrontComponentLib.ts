import HB from 'handlebars';
export const templateComponentLib = HB.compile(
`import { QTableColumn } from 'quasar'
import { tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';

export const {{ miniName }}Columns:Array<QTableColumn> = [
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
];
{{#if namespaced}}
export const {{ miniName }}AllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat({{ miniName }}Columns);
{{/if}}

export function use{{ name }}() {
{{#if namespaced}}
  const { router, $q, pagination, setNamespaceFromRoute, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, setNamespacedItemFromRoute } = useCore();
{{else}}
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
{{/if}}
  return {
    navigation: useNavigationStoreRef(),
{{#if namespaced}}
    router, pagination, setNamespaceFromRoute, setItemFromRoute, setNamespacedItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
{{else}}
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
{{/if}}
    onNot{{ name }}Found: (res) => {
      if ( !res.loading && res.data.{{ mini }}{{ name }} == null) {
        const matched = router.currentRoute.value.matched
        notifyError('{{ name }} not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
{{#if namespaced}}
    toView: (namespace, name) => router.push({ name: '{{ mini }}{{ name }}View', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: '{{ mini }}{{ name }}View', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: '{{ mini }}{{ name }}Edit', params: {name, namespace}}),
{{else}}
    toView: (name) => router.push({ name: '{{ mini }}{{ name }}View', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: '{{ mini }}{{ name }}View', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: '{{ mini }}{{ name }}Edit', params: {name}}),
{{/if}}
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
{{#if namespaced}}
    actionNew: (namespace)    => router.push({ name: '{{ mini }}{{ name }}Create', params: {namespace}}),
{{else}}
    actionNew: ()    => router.push({ name: '{{ mini }}{{ name }}Create'}),
{{/if}}
    actionDelete: (deletor, row) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: \`<em>You are</em> about to <span class="text-red">delete</span> {{ name }} <strong>\${row.metadata.name}</strong>\`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
{{#if namespaced}}
        deletor({"name": row.metadata.name, "namespace":row.metadata.namespace});
{{else}}
        deletor({"name": row.metadata.name});
{{/if}}
      })
    },
  }
}
`, {noEscape: true, preventIndent: true});