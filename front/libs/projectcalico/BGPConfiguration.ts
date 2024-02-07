import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { BGPConfigurationListExcludes, BGPConfigurationReadExcludes, BGPConfigurationSimpleExcludes } from './custom.js'
import { extraBGPConfigurationColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const BGPConfigurationColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraBGPConfigurationColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const BGPConfigurationDefinition = {"description":"BGPConfiguration contains the configuration for any BGP routing.","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"BGPConfigurationSpec contains the values of the BGP configuration.","type":"object","properties":{"asNumber":{"description":"ASNumber is the default AS number used by a node. [Default: 64512]","type":"integer","format":"int32"},"bindMode":{"description":"BindMode indicates whether to listen for BGP connections on all addresses (None) or only on the node's canonical IP address Node.Spec.BGP.IPvXAddress (NodeIP). Default behaviour is to listen for BGP connections on all addresses.","type":"string"},"communities":{"description":"Communities is a list of BGP community values and their arbitrary names for tagging routes.","type":"array","items":{"description":"Community contains standard or large community value and its name.","type":"object","properties":{"name":{"description":"Name given to community value.","type":"string"},"value":{"description":"Value must be of format `aa:nn` or `aa:nn:mm`. For standard community use `aa:nn` format, where `aa` and `nn` are 16 bit number. For large community use `aa:nn:mm` format, where `aa`, `nn` and `mm` are 32 bit number. Where, `aa` is an AS Number, `nn` and `mm` are per-AS identifier.","type":"string","pattern":"^(\\d+):(\\d+)$|^(\\d+):(\\d+):(\\d+)$"}}}},"ignoredInterfaces":{"description":"IgnoredInterfaces indicates the network interfaces that needs to be excluded when reading device routes.","type":"array","items":{"type":"string"}},"listenPort":{"description":"ListenPort is the port where BGP protocol should listen. Defaults to 179","type":"integer","maximum":65535,"minimum":1},"logSeverityScreen":{"description":"LogSeverityScreen is the log severity above which logs are sent to the stdout. [Default: INFO]","type":"string"},"nodeMeshMaxRestartTime":{"description":"Time to allow for software restart for node-to-mesh peerings.  When specified, this is configured as the graceful restart timeout.  When not specified, the BIRD default of 120s is used. This field can only be set on the default BGPConfiguration instance and requires that NodeMesh is enabled","type":"string"},"nodeMeshPassword":{"description":"Optional BGP password for full node-to-mesh peerings. This field can only be set on the default BGPConfiguration instance and requires that NodeMesh is enabled","type":"object","properties":{"secretKeyRef":{"description":"Selects a key of a secret in the node pod's namespace.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}}}}},"nodeToNodeMeshEnabled":{"description":"NodeToNodeMeshEnabled sets whether full node to node BGP mesh is enabled. [Default: true]","type":"boolean"},"prefixAdvertisements":{"description":"PrefixAdvertisements contains per-prefix advertisement configuration.","type":"array","items":{"description":"PrefixAdvertisement configures advertisement properties for the specified CIDR.","type":"object","properties":{"cidr":{"description":"CIDR for which properties should be advertised.","type":"string"},"communities":{"description":"Communities can be list of either community names already defined in `Specs.Communities` or community value of format `aa:nn` or `aa:nn:mm`. For standard community use `aa:nn` format, where `aa` and `nn` are 16 bit number. For large community use `aa:nn:mm` format, where `aa`, `nn` and `mm` are 32 bit number. Where,`aa` is an AS Number, `nn` and `mm` are per-AS identifier.","type":"array","items":{"type":"string"}}}}},"serviceClusterIPs":{"description":"ServiceClusterIPs are the CIDR blocks from which service cluster IPs are allocated. If specified, Calico will advertise these blocks, as well as any cluster IPs within them.","type":"array","items":{"description":"ServiceClusterIPBlock represents a single allowed ClusterIP CIDR block.","type":"object","properties":{"cidr":{"type":"string"}}}},"serviceExternalIPs":{"description":"ServiceExternalIPs are the CIDR blocks for Kubernetes Service External IPs. Kubernetes Service ExternalIPs will only be advertised if they are within one of these blocks.","type":"array","items":{"description":"ServiceExternalIPBlock represents a single allowed External IP CIDR block.","type":"object","properties":{"cidr":{"type":"string"}}}},"serviceLoadBalancerIPs":{"description":"ServiceLoadBalancerIPs are the CIDR blocks for Kubernetes Service LoadBalancer IPs. Kubernetes Service status.LoadBalancer.Ingress IPs will only be advertised if they are within one of these blocks.","type":"array","items":{"description":"ServiceLoadBalancerIPBlock represents a single allowed LoadBalancer IP CIDR block.","type":"object","properties":{"cidr":{"type":"string"}}}}}}},"x-kubernetes-group-version-kind":[{"group":"crd.projectcalico.org","kind":"BGPConfiguration","version":"v1"}]};

export function useBGPConfiguration() {
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
    onNotBGPConfigurationFound: (res) => {
    if ( !res.loading && res.data.projectcalicoBGPConfiguration == null) {
        const matched = router.currentRoute.value.matched
        notifyError('BGPConfiguration not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'projectcalicoBGPConfigurationView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'projectcalicoBGPConfigurationView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'projectcalicoBGPConfigurationEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'projectcalicoBGPConfigurationCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> BGPConfiguration <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}