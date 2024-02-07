import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { ClusterRoleListExcludes, ClusterRoleReadExcludes, ClusterRoleSimpleExcludes } from './custom.js'
import { extraClusterRoleColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const ClusterRoleColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraClusterRoleColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const ClusterRoleDefinition = {"description":"ClusterRole is a cluster level, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding or ClusterRoleBinding.","type":"object","properties":{"aggregationRule":{"description":"AggregationRule describes how to locate ClusterRoles to aggregate into the ClusterRole","type":"object","properties":{"clusterRoleSelectors":{"description":"ClusterRoleSelectors holds a list of selectors which will be used to find ClusterRoles and create the rules. If any of the selectors match, then the ClusterRole's permissions will be added","type":"array","items":{"description":"A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.","type":"object","properties":{"matchExpressions":{"description":"matchExpressions is a list of label selector requirements. The requirements are ANDed.","type":"array","items":{"description":"A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.","type":"object","required":["key","operator"],"properties":{"key":{"description":"key is the label key that the selector applies to.","type":"string","x-kubernetes-patch-merge-key":"key","x-kubernetes-patch-strategy":"merge"},"operator":{"description":"operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.","type":"string"},"values":{"description":"values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.","type":"array","items":{"type":"string"}}}}},"matchLabels":{"description":"matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is \"key\", the operator is \"In\", and the values array contains only \"value\". The requirements are ANDed.","type":"object","additionalProperties":{"type":"string"}}},"x-kubernetes-map-type":"atomic"}}}},"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"rules":{"description":"Rules holds all the PolicyRules for this ClusterRole","type":"array","items":{"description":"PolicyRule holds information that describes a policy rule, but does not contain information about who the rule applies to or which namespace the rule applies to.","type":"object","required":["verbs"],"properties":{"apiGroups":{"description":"APIGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed. \"\" represents the core API group and \"*\" represents all API groups.","type":"array","items":{"type":"string"}},"nonResourceURLs":{"description":"NonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path Since non-resource URLs are not namespaced, this field is only applicable for ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to API resources (such as \"pods\" or \"secrets\") or non-resource URL paths (such as \"/api\"),  but not both.","type":"array","items":{"type":"string"}},"resourceNames":{"description":"ResourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.","type":"array","items":{"type":"string"}},"resources":{"description":"Resources is a list of resources this rule applies to. '*' represents all resources.","type":"array","items":{"type":"string"}},"verbs":{"description":"Verbs is a list of Verbs that apply to ALL the ResourceKinds contained in this rule. '*' represents all verbs.","type":"array","items":{"type":"string"}}}}}},"x-kubernetes-group-version-kind":[{"group":"rbac.authorization.k8s.io","kind":"ClusterRole","version":"v1"}]};

export function useClusterRole() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "aggregationRule": '',
        "rules": '',
      }
  });
  const onlyReadProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["aggregationRule","rules"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    };
  const onlyWriteProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["aggregationRule","rules"].includes(k))
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
      viewer.value.props["aggregationRule"]=gqlDataToYaml({"aggregationRule": obj["aggregationRule"]})
      viewer.value.props["rules"]=gqlDataToYaml({"rules": obj["rules"]})
    },
    navigation: useNavigationStoreRef(),
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotClusterRoleFound: (res) => {
    if ( !res.loading && res.data.k8sClusterRole == null) {
        const matched = router.currentRoute.value.matched
        notifyError('ClusterRole not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'k8sClusterRoleView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'k8sClusterRoleView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'k8sClusterRoleEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'k8sClusterRoleCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> ClusterRole <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}