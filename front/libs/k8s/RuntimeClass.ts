import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { RuntimeClassListExcludes, RuntimeClassReadExcludes, RuntimeClassSimpleExcludes } from './custom.js'
import { extraRuntimeClassColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const RuntimeClassColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraRuntimeClassColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const RuntimeClassDefinition = {"description":"RuntimeClass defines a class of container runtime supported in the cluster. The RuntimeClass is used to determine which container runtime is used to run all containers in a pod. RuntimeClasses are manually defined by a user or cluster provisioner, and referenced in the PodSpec. The Kubelet is responsible for resolving the RuntimeClassName reference before running the pod.  For more details, see https://kubernetes.io/docs/concepts/containers/runtime-class/","type":"object","required":["handler"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"handler":{"description":"handler specifies the underlying runtime and configuration that the CRI implementation will use to handle pods of this class. The possible values are specific to the node & CRI configuration.  It is assumed that all handlers are available on every node, and handlers of the same name are equivalent on every node. For example, a handler called \"runc\" might specify that the runc OCI runtime (using native Linux containers) will be used to run the containers in a pod. The Handler must be lowercase, conform to the DNS Label (RFC 1123) requirements, and is immutable.","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"overhead":{"description":"Overhead structure represents the resource overhead associated with running a pod.","type":"object","properties":{"podFixed":{"description":"podFixed represents the fixed resource overhead associated with running a pod.","type":"object","additionalProperties":{"$ref":"#/definitions/io.k8s.apimachinery.pkg.api.resource.Quantity"}}}},"scheduling":{"description":"Scheduling specifies the scheduling constraints for nodes supporting a RuntimeClass.","type":"object","properties":{"nodeSelector":{"description":"nodeSelector lists labels that must be present on nodes that support this RuntimeClass. Pods using this RuntimeClass can only be scheduled to a node matched by this selector. The RuntimeClass nodeSelector is merged with a pod's existing nodeSelector. Any conflicts will cause the pod to be rejected in admission.","type":"object","additionalProperties":{"type":"string"},"x-kubernetes-map-type":"atomic"},"tolerations":{"description":"tolerations are appended (excluding duplicates) to pods running with this RuntimeClass during admission, effectively unioning the set of nodes tolerated by the pod and the RuntimeClass.","type":"array","items":{"description":"The pod this Toleration is attached to tolerates any taint that matches the triple <key,value,effect> using the matching operator <operator>.","type":"object","properties":{"effect":{"description":"Effect indicates the taint effect to match. Empty means match all taint effects. When specified, allowed values are NoSchedule, PreferNoSchedule and NoExecute.\n\nPossible enum values:\n - `\"NoExecute\"` Evict any already-running pods that do not tolerate the taint. Currently enforced by NodeController.\n - `\"NoSchedule\"` Do not allow new pods to schedule onto the node unless they tolerate the taint, but allow all pods submitted to Kubelet without going through the scheduler to start, and allow all already-running pods to continue running. Enforced by the scheduler.\n - `\"PreferNoSchedule\"` Like TaintEffectNoSchedule, but the scheduler tries not to schedule new pods onto the node, rather than prohibiting new pods from scheduling onto the node entirely. Enforced by the scheduler.","type":"string","enum":["NoExecute","NoSchedule","PreferNoSchedule"]},"key":{"description":"Key is the taint key that the toleration applies to. Empty means match all taint keys. If the key is empty, operator must be Exists; this combination means to match all values and all keys.","type":"string"},"operator":{"description":"Operator represents a key's relationship to the value. Valid operators are Exists and Equal. Defaults to Equal. Exists is equivalent to wildcard for value, so that a pod can tolerate all taints of a particular category.\n\nPossible enum values:\n - `\"Equal\"`\n - `\"Exists\"`","type":"string","enum":["Equal","Exists"]},"tolerationSeconds":{"description":"TolerationSeconds represents the period of time the toleration (which must be of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default, it is not set, which means tolerate the taint forever (do not evict). Zero and negative values will be treated as 0 (evict immediately) by the system.","type":"integer","format":"int64"},"value":{"description":"Value is the taint value the toleration matches to. If the operator is Exists, the value should be empty, otherwise just a regular string.","type":"string"}}},"x-kubernetes-list-type":"atomic"}}}},"x-kubernetes-group-version-kind":[{"group":"node.k8s.io","kind":"RuntimeClass","version":"v1"}]};

export function useRuntimeClass() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "handler": '',
        "overhead": '',
        "scheduling": '',
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
      viewer.value.props["handler"]=gqlDataToYaml({"handler": obj["handler"]})
      viewer.value.props["overhead"]=gqlDataToYaml({"overhead": obj["overhead"]})
      viewer.value.props["scheduling"]=gqlDataToYaml({"scheduling": obj["scheduling"]})
    },
    navigation: useNavigationStoreRef(),
    onlyReadProperties: (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["handler","overhead","scheduling"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    },
    onlyWriteProperties: (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["handler","overhead","scheduling"].includes(k))
          res[k] = obj[k];
      })
      return res
    },
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotRuntimeClassFound: (res) => {
    if ( !res.loading && res.data.k8sRuntimeClass == null) {
        const matched = router.currentRoute.value.matched
        notifyError('RuntimeClass not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'k8sRuntimeClassView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'k8sRuntimeClassView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'k8sRuntimeClassEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'k8sRuntimeClassCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> RuntimeClass <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}