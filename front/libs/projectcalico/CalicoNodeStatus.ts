import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { CalicoNodeStatusListExcludes, CalicoNodeStatusReadExcludes, CalicoNodeStatusSimpleExcludes } from './custom.js'
import { extraCalicoNodeStatusColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const CalicoNodeStatusColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraCalicoNodeStatusColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const CalicoNodeStatusDefinition = {"type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"CalicoNodeStatusSpec contains the specification for a CalicoNodeStatus resource.","type":"object","properties":{"classes":{"description":"Classes declares the types of information to monitor for this calico/node, and allows for selective status reporting about certain subsets of information.","type":"array","items":{"type":"string"}},"node":{"description":"The node name identifies the Calico node instance for node status.","type":"string"},"updatePeriodSeconds":{"description":"UpdatePeriodSeconds is the period at which CalicoNodeStatus should be updated. Set to 0 to disable CalicoNodeStatus refresh. Maximum update period is one day.","type":"integer","format":"int32"}}},"status":{"description":"CalicoNodeStatusStatus defines the observed state of CalicoNodeStatus. No validation needed for status since it is updated by Calico.","type":"object","properties":{"agent":{"description":"Agent holds agent status on the node.","type":"object","properties":{"birdV4":{"description":"BIRDV4 represents the latest observed status of bird4.","type":"object","properties":{"lastBootTime":{"description":"LastBootTime holds the value of lastBootTime from bird.ctl output.","type":"string"},"lastReconfigurationTime":{"description":"LastReconfigurationTime holds the value of lastReconfigTime from bird.ctl output.","type":"string"},"routerID":{"description":"Router ID used by bird.","type":"string"},"state":{"description":"The state of the BGP Daemon.","type":"string"},"version":{"description":"Version of the BGP daemon","type":"string"}}},"birdV6":{"description":"BIRDV6 represents the latest observed status of bird6.","type":"object","properties":{"lastBootTime":{"description":"LastBootTime holds the value of lastBootTime from bird.ctl output.","type":"string"},"lastReconfigurationTime":{"description":"LastReconfigurationTime holds the value of lastReconfigTime from bird.ctl output.","type":"string"},"routerID":{"description":"Router ID used by bird.","type":"string"},"state":{"description":"The state of the BGP Daemon.","type":"string"},"version":{"description":"Version of the BGP daemon","type":"string"}}}}},"bgp":{"description":"BGP holds node BGP status.","type":"object","required":["numberEstablishedV4","numberEstablishedV6","numberNotEstablishedV4","numberNotEstablishedV6"],"properties":{"numberEstablishedV4":{"description":"The total number of IPv4 established bgp sessions.","type":"integer"},"numberEstablishedV6":{"description":"The total number of IPv6 established bgp sessions.","type":"integer"},"numberNotEstablishedV4":{"description":"The total number of IPv4 non-established bgp sessions.","type":"integer"},"numberNotEstablishedV6":{"description":"The total number of IPv6 non-established bgp sessions.","type":"integer"},"peersV4":{"description":"PeersV4 represents IPv4 BGP peers status on the node.","type":"array","items":{"description":"CalicoNodePeer contains the status of BGP peers on the node.","type":"object","properties":{"peerIP":{"description":"IP address of the peer whose condition we are reporting.","type":"string"},"since":{"description":"Since the state or reason last changed.","type":"string"},"state":{"description":"State is the BGP session state.","type":"string"},"type":{"description":"Type indicates whether this peer is configured via the node-to-node mesh, or via en explicit global or per-node BGPPeer object.","type":"string"}}}},"peersV6":{"description":"PeersV6 represents IPv6 BGP peers status on the node.","type":"array","items":{"description":"CalicoNodePeer contains the status of BGP peers on the node.","type":"object","properties":{"peerIP":{"description":"IP address of the peer whose condition we are reporting.","type":"string"},"since":{"description":"Since the state or reason last changed.","type":"string"},"state":{"description":"State is the BGP session state.","type":"string"},"type":{"description":"Type indicates whether this peer is configured via the node-to-node mesh, or via en explicit global or per-node BGPPeer object.","type":"string"}}}}}},"lastUpdated":{"description":"LastUpdated is a timestamp representing the server time when CalicoNodeStatus object last updated. It is represented in RFC3339 form and is in UTC.","format":"date-time"},"routes":{"description":"Routes reports routes known to the Calico BGP daemon on the node.","type":"object","properties":{"routesV4":{"description":"RoutesV4 represents IPv4 routes on the node.","type":"array","items":{"description":"CalicoNodeRoute contains the status of BGP routes on the node.","type":"object","properties":{"destination":{"description":"Destination of the route.","type":"string"},"gateway":{"description":"Gateway for the destination.","type":"string"},"interface":{"description":"Interface for the destination","type":"string"},"learnedFrom":{"description":"LearnedFrom contains information regarding where this route originated.","type":"object","properties":{"peerIP":{"description":"If sourceType is NodeMesh or BGPPeer, IP address of the router that sent us this route.","type":"string"},"sourceType":{"description":"Type of the source where a route is learned from.","type":"string"}}},"type":{"description":"Type indicates if the route is being used for forwarding or not.","type":"string"}}}},"routesV6":{"description":"RoutesV6 represents IPv6 routes on the node.","type":"array","items":{"description":"CalicoNodeRoute contains the status of BGP routes on the node.","type":"object","properties":{"destination":{"description":"Destination of the route.","type":"string"},"gateway":{"description":"Gateway for the destination.","type":"string"},"interface":{"description":"Interface for the destination","type":"string"},"learnedFrom":{"description":"LearnedFrom contains information regarding where this route originated.","type":"object","properties":{"peerIP":{"description":"If sourceType is NodeMesh or BGPPeer, IP address of the router that sent us this route.","type":"string"},"sourceType":{"description":"Type of the source where a route is learned from.","type":"string"}}},"type":{"description":"Type indicates if the route is being used for forwarding or not.","type":"string"}}}}}}}}},"x-kubernetes-group-version-kind":[{"group":"crd.projectcalico.org","kind":"CalicoNodeStatus","version":"v1"}]};

export function useCalicoNodeStatus() {
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
    onNotCalicoNodeStatusFound: (res) => {
    if ( !res.loading && res.data.projectcalicoCalicoNodeStatus == null) {
        const matched = router.currentRoute.value.matched
        notifyError('CalicoNodeStatus not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'projectcalicoCalicoNodeStatusView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'projectcalicoCalicoNodeStatusView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'projectcalicoCalicoNodeStatusEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'projectcalicoCalicoNodeStatusCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> CalicoNodeStatus <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}