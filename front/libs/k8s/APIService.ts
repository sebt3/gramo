import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { APIServiceListExcludes, APIServiceReadExcludes, APIServiceSimpleExcludes } from './custom.js'
import { extraAPIServiceColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const APIServiceColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraAPIServiceColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const APIServiceDefinition = {"description":"APIService represents a server for a particular GroupVersion. Name must be \"version.group\".","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"APIServiceSpec contains information for locating and communicating with a server. Only https is supported, though you are able to disable certificate verification.","type":"object","required":["groupPriorityMinimum","versionPriority"],"properties":{"caBundle":{"description":"CABundle is a PEM encoded CA bundle which will be used to validate an API server's serving certificate. If unspecified, system trust roots on the apiserver are used.","type":"string","format":"byte","x-kubernetes-list-type":"atomic"},"group":{"description":"Group is the API group name this server hosts","type":"string"},"groupPriorityMinimum":{"description":"GroupPriorityMininum is the priority this group should have at least. Higher priority means that the group is preferred by clients over lower priority ones. Note that other versions of this group might specify even higher GroupPriorityMininum values such that the whole group gets a higher priority. The primary sort is based on GroupPriorityMinimum, ordered highest number to lowest (20 before 10). The secondary sort is based on the alphabetical comparison of the name of the object.  (v1.bar before v1.foo) We'd recommend something like: *.k8s.io (except extensions) at 18000 and PaaSes (OpenShift, Deis) are recommended to be in the 2000s","type":"integer","format":"int32"},"insecureSkipTLSVerify":{"description":"InsecureSkipTLSVerify disables TLS certificate verification when communicating with this server. This is strongly discouraged.  You should use the CABundle instead.","type":"boolean"},"service":{"description":"ServiceReference holds a reference to Service.legacy.k8s.io","type":"object","properties":{"name":{"description":"Name is the name of the service","type":"string"},"namespace":{"description":"Namespace is the namespace of the service","type":"string"},"port":{"description":"If specified, the port on the service that hosting webhook. Default to 443 for backward compatibility. `port` should be a valid port number (1-65535, inclusive).","type":"integer","format":"int32"}}},"version":{"description":"Version is the API version this server hosts.  For example, \"v1\"","type":"string"},"versionPriority":{"description":"VersionPriority controls the ordering of this API version inside of its group.  Must be greater than zero. The primary sort is based on VersionPriority, ordered highest to lowest (20 before 10). Since it's inside of a group, the number can be small, probably in the 10s. In case of equal version priorities, the version string will be used to compute the order inside a group. If the version string is \"kube-like\", it will sort above non \"kube-like\" version strings, which are ordered lexicographically. \"Kube-like\" versions start with a \"v\", then are followed by a number (the major version), then optionally the string \"alpha\" or \"beta\" and another number (the minor version). These are sorted first by GA > beta > alpha (where GA is a version with no suffix such as beta or alpha), and then by comparing major version, then minor version. An example sorted list of versions: v10, v2, v1, v11beta2, v10beta3, v3beta1, v12alpha1, v11alpha2, foo1, foo10.","type":"integer","format":"int32"}}},"status":{"description":"APIServiceStatus contains derived information about an API server","type":"object","properties":{"conditions":{"description":"Current service state of apiService.","type":"array","items":{"description":"APIServiceCondition describes the state of an APIService at a particular point","type":"object","required":["type","status"],"properties":{"lastTransitionTime":{"description":"Last time the condition transitioned from one status to another.","$ref":"#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.Time"},"message":{"description":"Human-readable message indicating details about last transition.","type":"string"},"reason":{"description":"Unique, one-word, CamelCase reason for the condition's last transition.","type":"string"},"status":{"description":"Status is the status of the condition. Can be True, False, Unknown.","type":"string"},"type":{"description":"Type is the type of the condition.","type":"string"}}},"x-kubernetes-list-map-keys":["type"],"x-kubernetes-list-type":"map","x-kubernetes-patch-merge-key":"type","x-kubernetes-patch-strategy":"merge"}}}},"x-kubernetes-group-version-kind":[{"group":"apiregistration.k8s.io","kind":"APIService","version":"v1"}]};

export function useAPIService() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "spec": '',
      }
  });
  const onlyReadProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["spec","status"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    };
  const onlyWriteProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["spec"].includes(k))
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
      viewer.value.props["spec"]=gqlDataToYaml({"spec": obj["spec"]})
    },
    navigation: useNavigationStoreRef(),
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotAPIServiceFound: (res) => {
    if ( !res.loading && res.data.k8sAPIService == null) {
        const matched = router.currentRoute.value.matched
        notifyError('APIService not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'k8sAPIServiceView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'k8sAPIServiceView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'k8sAPIServiceEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'k8sAPIServiceCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> APIService <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}