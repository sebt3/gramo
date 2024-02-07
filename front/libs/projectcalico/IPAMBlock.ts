import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { IPAMBlockListExcludes, IPAMBlockReadExcludes, IPAMBlockSimpleExcludes } from './custom.js'
import { extraIPAMBlockColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const IPAMBlockColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraIPAMBlockColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const IPAMBlockDefinition = {"type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"IPAMBlockSpec contains the specification for an IPAMBlock resource.","type":"object","required":["allocations","attributes","cidr","strictAffinity","unallocated"],"properties":{"affinity":{"description":"Affinity of the block, if this block has one. If set, it will be of the form \"host:<hostname>\". If not set, this block is not affine to a host.","type":"string"},"allocations":{"description":"Array of allocations in-use within this block. nil entries mean the allocation is free. For non-nil entries at index i, the index is the ordinal of the allocation within this block and the value is the index of the associated attributes in the Attributes array.","type":"array","items":{}},"attributes":{"description":"Attributes is an array of arbitrary metadata associated with allocations in the block. To find attributes for a given allocation, use the value of the allocation's entry in the Allocations array as the index of the element in this array.","type":"array","items":{"type":"object","properties":{"handle_id":{"type":"string"},"secondary":{"type":"object","additionalProperties":{"type":"string"}}}}},"cidr":{"description":"The block's CIDR.","type":"string"},"deleted":{"description":"Deleted is an internal boolean used to workaround a limitation in the Kubernetes API whereby deletion will not return a conflict error if the block has been updated. It should not be set manually.","type":"boolean"},"sequenceNumber":{"description":"We store a sequence number that is updated each time the block is written. Each allocation will also store the sequence number of the block at the time of its creation. When releasing an IP, passing the sequence number associated with the allocation allows us to protect against a race condition and ensure the IP hasn't been released and re-allocated since the release request.","type":"integer","format":"int64"},"sequenceNumberForAllocation":{"description":"Map of allocated ordinal within the block to sequence number of the block at the time of allocation. Kubernetes does not allow numerical keys for maps, so the key is cast to a string.","type":"object","additionalProperties":{"type":"integer","format":"int64"}},"strictAffinity":{"description":"StrictAffinity on the IPAMBlock is deprecated and no longer used by the code. Use IPAMConfig StrictAffinity instead.","type":"boolean"},"unallocated":{"description":"Unallocated is an ordered list of allocations which are free in the block.","type":"array","items":{"type":"integer"}}}}},"x-kubernetes-group-version-kind":[{"group":"crd.projectcalico.org","kind":"IPAMBlock","version":"v1"}]};

export function useIPAMBlock() {
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
        if (["spec"].includes(k)||k=='metadata')
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
    onNotIPAMBlockFound: (res) => {
    if ( !res.loading && res.data.projectcalicoIPAMBlock == null) {
        const matched = router.currentRoute.value.matched
        notifyError('IPAMBlock not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'projectcalicoIPAMBlockView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'projectcalicoIPAMBlockView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'projectcalicoIPAMBlockEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'projectcalicoIPAMBlockCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> IPAMBlock <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}