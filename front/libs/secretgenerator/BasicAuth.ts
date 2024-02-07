import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { BasicAuthListExcludes, BasicAuthReadExcludes, BasicAuthSimpleExcludes } from './custom.js'
import { extraBasicAuthColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const BasicAuthColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraBasicAuthColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const BasicAuthAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(BasicAuthColumns);

export const BasicAuthDefinition = {"description":"BasicAuth is the Schema for the basicauths API","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"BasicAuthSpec defines the desired state of BasicAuth","type":"object","required":["username"],"properties":{"data":{"type":"object","additionalProperties":{"type":"string"}},"encoding":{"type":"string"},"forceRegenerate":{"type":"boolean"},"length":{"type":"string"},"username":{"type":"string"}}},"status":{"description":"BasicAuthStatus defines the observed state of BasicAuth","type":"object","properties":{"secret":{"description":"ObjectReference contains enough information to let you inspect or modify the referred object.","type":"object","properties":{"apiVersion":{"description":"API version of the referent.","type":"string"},"fieldPath":{"description":"If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: \"spec.containers{name}\" (where \"name\" refers to the name of the container that triggered the event) or if no container name is specified \"spec.containers[2]\" (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object. TODO: this design is not final and this field is subject to change in the future.","type":"string"},"kind":{"description":"Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names","type":"string"},"namespace":{"description":"Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/","type":"string"},"resourceVersion":{"description":"Specific resourceVersion to which this reference is made, if any. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency","type":"string"},"uid":{"description":"UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids","type":"string"}}}}}},"x-kubernetes-group-version-kind":[{"group":"secretgenerator.mittwald.de","kind":"BasicAuth","version":"v1alpha1"}]};

export function useBasicAuth() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute } = useCore();
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
    isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute,
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotBasicAuthFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].secretgeneratorBasicAuth == null) {
        const matched = router.currentRoute.value.matched
        notifyError('BasicAuth not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'secretgeneratorBasicAuthView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'secretgeneratorBasicAuthView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'secretgeneratorBasicAuthEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'secretgeneratorBasicAuthCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> BasicAuth <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}