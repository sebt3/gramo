import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { StorageClassListExcludes, StorageClassReadExcludes, StorageClassSimpleExcludes } from './custom.js'
import { extraStorageClassColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const StorageClassColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraStorageClassColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const StorageClassDefinition = {"description":"StorageClass describes the parameters for a class of storage for which PersistentVolumes can be dynamically provisioned.\n\nStorageClasses are non-namespaced; the name of the storage class according to etcd is in ObjectMeta.Name.","type":"object","required":["provisioner"],"properties":{"allowVolumeExpansion":{"description":"allowVolumeExpansion shows whether the storage class allow volume expand.","type":"boolean"},"allowedTopologies":{"description":"allowedTopologies restrict the node topologies where volumes can be dynamically provisioned. Each volume plugin defines its own supported topology specifications. An empty TopologySelectorTerm list means there is no topology restriction. This field is only honored by servers that enable the VolumeScheduling feature.","type":"array","items":{"description":"A topology selector term represents the result of label queries. A null or empty topology selector term matches no objects. The requirements of them are ANDed. It provides a subset of functionality as NodeSelectorTerm. This is an alpha feature and may change in the future.","type":"object","properties":{"matchLabelExpressions":{"description":"A list of topology selector requirements by labels.","type":"array","items":{"description":"A topology selector requirement is a selector that matches given label. This is an alpha feature and may change in the future.","type":"object","required":["key","values"],"properties":{"key":{"description":"The label key that the selector applies to.","type":"string"},"values":{"description":"An array of string values. One value must match the label to be selected. Each entry in Values is ORed.","type":"array","items":{"type":"string"}}}}}},"x-kubernetes-map-type":"atomic"},"x-kubernetes-list-type":"atomic"},"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"mountOptions":{"description":"mountOptions controls the mountOptions for dynamically provisioned PersistentVolumes of this storage class. e.g. [\"ro\", \"soft\"]. Not validated - mount of the PVs will simply fail if one is invalid.","type":"array","items":{"type":"string"}},"parameters":{"description":"parameters holds the parameters for the provisioner that should create volumes of this storage class.","type":"object","additionalProperties":{"type":"string"}},"provisioner":{"description":"provisioner indicates the type of the provisioner.","type":"string"},"reclaimPolicy":{"description":"reclaimPolicy controls the reclaimPolicy for dynamically provisioned PersistentVolumes of this storage class. Defaults to Delete.\n\nPossible enum values:\n - `\"Delete\"` means the volume will be deleted from Kubernetes on release from its claim. The volume plugin must support Deletion.\n - `\"Recycle\"` means the volume will be recycled back into the pool of unbound persistent volumes on release from its claim. The volume plugin must support Recycling.\n - `\"Retain\"` means the volume will be left in its current phase (Released) for manual reclamation by the administrator. The default policy is Retain.","type":"string","enum":["Delete","Recycle","Retain"]},"volumeBindingMode":{"description":"volumeBindingMode indicates how PersistentVolumeClaims should be provisioned and bound.  When unset, VolumeBindingImmediate is used. This field is only honored by servers that enable the VolumeScheduling feature.\n\nPossible enum values:\n - `\"Immediate\"` indicates that PersistentVolumeClaims should be immediately provisioned and bound. This is the default mode.\n - `\"WaitForFirstConsumer\"` indicates that PersistentVolumeClaims should not be provisioned and bound until the first Pod is created that references the PeristentVolumeClaim. The volume provisioning and binding will occur during Pod scheduing.","type":"string","enum":["Immediate","WaitForFirstConsumer"]}},"x-kubernetes-group-version-kind":[{"group":"storage.k8s.io","kind":"StorageClass","version":"v1"}]};

export function useStorageClass() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "allowVolumeExpansion": '',
        "allowedTopologies": '',
        "mountOptions": '',
        "parameters": '',
        "provisioner": '',
        "reclaimPolicy": '',
        "volumeBindingMode": '',
      }
  });
  const onlyReadProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["allowVolumeExpansion","allowedTopologies","mountOptions","parameters","provisioner","reclaimPolicy","volumeBindingMode"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    };
  const onlyWriteProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["allowVolumeExpansion","allowedTopologies","mountOptions","parameters","provisioner","reclaimPolicy","volumeBindingMode"].includes(k))
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
      viewer.value.props["allowVolumeExpansion"]=gqlDataToYaml({"allowVolumeExpansion": obj["allowVolumeExpansion"]})
      viewer.value.props["allowedTopologies"]=gqlDataToYaml({"allowedTopologies": obj["allowedTopologies"]})
      viewer.value.props["mountOptions"]=gqlDataToYaml({"mountOptions": obj["mountOptions"]})
      viewer.value.props["parameters"]=gqlDataToYaml({"parameters": obj["parameters"]})
      viewer.value.props["provisioner"]=gqlDataToYaml({"provisioner": obj["provisioner"]})
      viewer.value.props["reclaimPolicy"]=gqlDataToYaml({"reclaimPolicy": obj["reclaimPolicy"]})
      viewer.value.props["volumeBindingMode"]=gqlDataToYaml({"volumeBindingMode": obj["volumeBindingMode"]})
    },
    navigation: useNavigationStoreRef(),
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotStorageClassFound: (res) => {
    if ( !res.loading && res.data.k8sStorageClass == null) {
        const matched = router.currentRoute.value.matched
        notifyError('StorageClass not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'k8sStorageClassView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'k8sStorageClassView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'k8sStorageClassEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'k8sStorageClassCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> StorageClass <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}