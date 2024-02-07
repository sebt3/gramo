import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { PriorityClassListExcludes, PriorityClassReadExcludes, PriorityClassSimpleExcludes } from './custom.js'
import { extraPriorityClassColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const PriorityClassColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraPriorityClassColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const PriorityClassDefinition = {"description":"PriorityClass defines mapping from a priority class name to the priority integer value. The value can be any valid integer.","type":"object","required":["value"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"description":{"description":"description is an arbitrary string that usually provides guidelines on when this priority class should be used.","type":"string"},"globalDefault":{"description":"globalDefault specifies whether this PriorityClass should be considered as the default priority for pods that do not have any priority class. Only one PriorityClass can be marked as `globalDefault`. However, if more than one PriorityClasses exists with their `globalDefault` field set to true, the smallest value of such global default PriorityClasses will be used as the default priority.","type":"boolean"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"preemptionPolicy":{"description":"preemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset.\n\nPossible enum values:\n - `\"Never\"` means that pod never preempts other pods with lower priority.\n - `\"PreemptLowerPriority\"` means that pod can preempt other pods with lower priority.","type":"string","enum":["Never","PreemptLowerPriority"]},"value":{"description":"value represents the integer value of this priority class. This is the actual priority that pods receive when they have the name of this class in their pod spec.","type":"integer","format":"int32"}},"x-kubernetes-group-version-kind":[{"group":"scheduling.k8s.io","kind":"PriorityClass","version":"v1"}]};

export function usePriorityClass() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "description": '',
        "globalDefault": '',
        "preemptionPolicy": '',
        "value": '',
      }
  });
  const onlyReadProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["description","globalDefault","preemptionPolicy","value"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    };
  const onlyWriteProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["description","globalDefault","preemptionPolicy","value"].includes(k))
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
      viewer.value.props["description"]=gqlDataToYaml({"description": obj["description"]})
      viewer.value.props["globalDefault"]=gqlDataToYaml({"globalDefault": obj["globalDefault"]})
      viewer.value.props["preemptionPolicy"]=gqlDataToYaml({"preemptionPolicy": obj["preemptionPolicy"]})
      viewer.value.props["value"]=gqlDataToYaml({"value": obj["value"]})
    },
    navigation: useNavigationStoreRef(),
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotPriorityClassFound: (res) => {
    if ( !res.loading && res.data.k8sPriorityClass == null) {
        const matched = router.currentRoute.value.matched
        notifyError('PriorityClass not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'k8sPriorityClassView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'k8sPriorityClassView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'k8sPriorityClassEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'k8sPriorityClassCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> PriorityClass <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}