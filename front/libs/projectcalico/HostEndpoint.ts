import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { HostEndpointListExcludes, HostEndpointReadExcludes, HostEndpointSimpleExcludes } from './custom.js'
import { extraHostEndpointColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const HostEndpointColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraHostEndpointColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const HostEndpointDefinition = {"type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"HostEndpointSpec contains the specification for a HostEndpoint resource.","type":"object","properties":{"expectedIPs":{"description":"The expected IP addresses (IPv4 and IPv6) of the endpoint. If \"InterfaceName\" is not present, Calico will look for an interface matching any of the IPs in the list and apply policy to that. Note: \tWhen using the selector match criteria in an ingress or egress security Policy \tor Profile, Calico converts the selector into a set of IP addresses. For host \tendpoints, the ExpectedIPs field is used for that purpose. (If only the interface \tname is specified, Calico does not learn the IPs of the interface for use in match \tcriteria.)","type":"array","items":{"type":"string"}},"interfaceName":{"description":"Either \"*\", or the name of a specific Linux interface to apply policy to; or empty.  \"*\" indicates that this HostEndpoint governs all traffic to, from or through the default network namespace of the host named by the \"Node\" field; entering and leaving that namespace via any interface, including those from/to non-host-networked local workloads. \n If InterfaceName is not \"*\", this HostEndpoint only governs traffic that enters or leaves the host through the specific interface named by InterfaceName, or - when InterfaceName is empty - through the specific interface that has one of the IPs in ExpectedIPs. Therefore, when InterfaceName is empty, at least one expected IP must be specified.  Only external interfaces (such as \"eth0\") are supported here; it isn't possible for a HostEndpoint to protect traffic through a specific local workload interface. \n Note: Only some kinds of policy are implemented for \"*\" HostEndpoints; initially just pre-DNAT policy.  Please check Calico documentation for the latest position.","type":"string"},"node":{"description":"The node name identifying the Calico node instance.","type":"string"},"ports":{"description":"Ports contains the endpoint's named ports, which may be referenced in security policy rules.","type":"array","items":{"type":"object","required":["name","port","protocol"],"properties":{"name":{"type":"string"},"port":{"type":"integer"},"protocol":{"pattern":"^.*","x-kubernetes-int-or-string":true}}}},"profiles":{"description":"A list of identifiers of security Profile objects that apply to this endpoint. Each profile is applied in the order that they appear in this list.  Profile rules are applied after the selector-based security policy.","type":"array","items":{"type":"string"}}}}},"x-kubernetes-group-version-kind":[{"group":"crd.projectcalico.org","kind":"HostEndpoint","version":"v1"}]};

export function useHostEndpoint() {
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
    onNotHostEndpointFound: (res) => {
    if ( !res.loading && res.data.projectcalicoHostEndpoint == null) {
        const matched = router.currentRoute.value.matched
        notifyError('HostEndpoint not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'projectcalicoHostEndpointView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'projectcalicoHostEndpointView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'projectcalicoHostEndpointEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'projectcalicoHostEndpointCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> HostEndpoint <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}