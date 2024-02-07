import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { ClusterRoleBindingListExcludes, ClusterRoleBindingReadExcludes, ClusterRoleBindingSimpleExcludes } from './custom.js'
import { extraClusterRoleBindingColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const ClusterRoleBindingColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraClusterRoleBindingColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const ClusterRoleBindingDefinition = {"description":"ClusterRoleBinding references a ClusterRole, but not contain it.  It can reference a ClusterRole in the global namespace, and adds who information via Subject.","type":"object","required":["roleRef"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"roleRef":{"description":"RoleRef contains information that points to the role being used","type":"object","required":["apiGroup","kind","name"],"properties":{"apiGroup":{"description":"APIGroup is the group for the resource being referenced","type":"string"},"kind":{"description":"Kind is the type of resource being referenced","type":"string"},"name":{"description":"Name is the name of resource being referenced","type":"string"}},"x-kubernetes-map-type":"atomic"},"subjects":{"description":"Subjects holds references to the objects the role applies to.","type":"array","items":{"description":"Subject contains a reference to the object or user identities a role binding applies to.  This can either hold a direct API object reference, or a value for non-objects such as user and group names.","type":"object","required":["kind","name"],"properties":{"apiGroup":{"description":"APIGroup holds the API group of the referenced subject. Defaults to \"\" for ServiceAccount subjects. Defaults to \"rbac.authorization.k8s.io\" for User and Group subjects.","type":"string"},"kind":{"description":"Kind of object being referenced. Values defined by this API group are \"User\", \"Group\", and \"ServiceAccount\". If the Authorizer does not recognized the kind value, the Authorizer should report an error.","type":"string"},"name":{"description":"Name of the object being referenced.","type":"string"},"namespace":{"description":"Namespace of the referenced object.  If the object kind is non-namespace, such as \"User\" or \"Group\", and this value is not empty the Authorizer should report an error.","type":"string"}},"x-kubernetes-map-type":"atomic"}}},"x-kubernetes-group-version-kind":[{"group":"rbac.authorization.k8s.io","kind":"ClusterRoleBinding","version":"v1"}]};

export function useClusterRoleBinding() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "roleRef": '',
        "subjects": '',
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
      viewer.value.props["roleRef"]=gqlDataToYaml({"roleRef": obj["roleRef"]})
      viewer.value.props["subjects"]=gqlDataToYaml({"subjects": obj["subjects"]})
    },
    navigation: useNavigationStoreRef(),
    onlyReadProperties: (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["roleRef","subjects"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    },
    onlyWriteProperties: (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["roleRef","subjects"].includes(k))
          res[k] = obj[k];
      })
      return res
    },
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotClusterRoleBindingFound: (res) => {
    if ( !res.loading && res.data.k8sClusterRoleBinding == null) {
        const matched = router.currentRoute.value.matched
        notifyError('ClusterRoleBinding not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'k8sClusterRoleBindingView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'k8sClusterRoleBindingView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'k8sClusterRoleBindingEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'k8sClusterRoleBindingCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> ClusterRoleBinding <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}