import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { IPPoolListExcludes, IPPoolReadExcludes, IPPoolSimpleExcludes } from './custom.js'
import { extraIPPoolColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const IPPoolColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraIPPoolColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const IPPoolDefinition = {"type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"IPPoolSpec contains the specification for an IPPool resource.","type":"object","required":["cidr"],"properties":{"allowedUses":{"description":"AllowedUse controls what the IP pool will be used for.  If not specified or empty, defaults to [\"Tunnel\", \"Workload\"] for back-compatibility","type":"array","items":{"type":"string"}},"blockSize":{"description":"The block size to use for IP address assignments from this pool. Defaults to 26 for IPv4 and 122 for IPv6.","type":"integer"},"cidr":{"description":"The pool CIDR.","type":"string"},"disableBGPExport":{"description":"Disable exporting routes from this IP Pool's CIDR over BGP. [Default: false]","type":"boolean"},"disabled":{"description":"When disabled is true, Calico IPAM will not assign addresses from this pool.","type":"boolean"},"ipip":{"description":"Deprecated: this field is only used for APIv1 backwards compatibility. Setting this field is not allowed, this field is for internal use only.","type":"object","properties":{"enabled":{"description":"When enabled is true, ipip tunneling will be used to deliver packets to destinations within this pool.","type":"boolean"},"mode":{"description":"The IPIP mode.  This can be one of \"always\" or \"cross-subnet\".  A mode of \"always\" will also use IPIP tunneling for routing to destination IP addresses within this pool.  A mode of \"cross-subnet\" will only use IPIP tunneling when the destination node is on a different subnet to the originating node.  The default value (if not specified) is \"always\".","type":"string"}}},"ipipMode":{"description":"Contains configuration for IPIP tunneling for this pool. If not specified, then this is defaulted to \"Never\" (i.e. IPIP tunneling is disabled).","type":"string"},"nat-outgoing":{"description":"Deprecated: this field is only used for APIv1 backwards compatibility. Setting this field is not allowed, this field is for internal use only.","type":"boolean"},"natOutgoing":{"description":"When natOutgoing is true, packets sent from Calico networked containers in this pool to destinations outside of this pool will be masqueraded.","type":"boolean"},"nodeSelector":{"description":"Allows IPPool to allocate for a specific node by label selector.","type":"string"},"vxlanMode":{"description":"Contains configuration for VXLAN tunneling for this pool. If not specified, then this is defaulted to \"Never\" (i.e. VXLAN tunneling is disabled).","type":"string"}}}},"x-kubernetes-group-version-kind":[{"group":"crd.projectcalico.org","kind":"IPPool","version":"v1"}]};

export function useIPPool() {
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
        if (["spec"].includes(k)||k=='metadata')
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
    onNotIPPoolFound: (res) => {
    if ( !res.loading && res.data.projectcalicoIPPool == null) {
        const matched = router.currentRoute.value.matched
        notifyError('IPPool not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'projectcalicoIPPoolView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'projectcalicoIPPoolView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'projectcalicoIPPoolEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'projectcalicoIPPoolCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> IPPool <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}