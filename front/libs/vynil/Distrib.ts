import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { DistribListExcludes, DistribReadExcludes, DistribSimpleExcludes } from './custom.js'
import { extraDistribColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const DistribColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraDistribColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const DistribDefinition = {"description":"Auto-generated derived type for DistribSpec via `CustomResource`","type":"object","title":"Distrib","required":["spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"Distrib:\n\nDescribe a source of components distribution git repository","type":"object","required":["schedule","url"],"properties":{"branch":{"description":"Git branch","type":"string"},"insecure":{"description":"Git clone URL","type":"boolean"},"login":{"description":"Git authentication","type":"object","properties":{"git_credentials":{"description":"a git-credentials store file (format: https://<username>:<password|token>@<url>/<repo>)","type":"object","required":["key","name"],"properties":{"key":{"description":"Key of the secret containing the file","type":"string"},"name":{"description":"Name of the secret","type":"string"}}},"ssh_key":{"description":"SSH private key","type":"object","required":["key","name"],"properties":{"key":{"description":"Key of the secret containing the file","type":"string"},"name":{"description":"Name of the secret","type":"string"}}}}},"schedule":{"description":"Actual cron-type expression that defines the interval of the updates.","type":"string"},"url":{"description":"Git clone URL","type":"string"}}},"status":{"description":"The status object of `Distrib`","type":"object","required":["components","last_updated"],"properties":{"components":{"description":"List of known category->components","x-kubernetes-preserve-unknown-fields":true},"errors":{"description":"Set with the messages if any error occured","type":"array","items":{"type":"string"}},"last_updated":{"description":"Last update date","type":"string","format":"date-time"}}}},"x-kubernetes-group-version-kind":[{"group":"vynil.solidite.fr","kind":"Distrib","version":"v1"}]};

export function useDistrib() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
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
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotDistribFound: (res) => {
    if ( !res.loading && res.data.vynilDistrib == null) {
        const matched = router.currentRoute.value.matched
        notifyError('Distrib not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'vynilDistribView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'vynilDistribView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'vynilDistribEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'vynilDistribCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> Distrib <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}