import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { EndpointSliceListExcludes, EndpointSliceReadExcludes, EndpointSliceSimpleExcludes } from './custom.js'
import { extraEndpointSliceColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const EndpointSliceColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraEndpointSliceColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const EndpointSliceAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(EndpointSliceColumns);

export const EndpointSliceDefinition = {"description":"EndpointSlice represents a subset of the endpoints that implement a service. For a given service there may be multiple EndpointSlice objects, selected by labels, which must be joined to produce the full set of endpoints.","type":"object","required":["addressType","endpoints"],"properties":{"addressType":{"description":"addressType specifies the type of address carried by this EndpointSlice. All addresses in this slice must be the same type. This field is immutable after creation. The following address types are currently supported: * IPv4: Represents an IPv4 Address. * IPv6: Represents an IPv6 Address. * FQDN: Represents a Fully Qualified Domain Name.\n\nPossible enum values:\n - `\"FQDN\"` represents a FQDN.\n - `\"IPv4\"` represents an IPv4 Address.\n - `\"IPv6\"` represents an IPv6 Address.","type":"string","enum":["FQDN","IPv4","IPv6"]},"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"endpoints":{"description":"endpoints is a list of unique endpoints in this slice. Each slice may include a maximum of 1000 endpoints.","type":"array","items":{"description":"Endpoint represents a single logical \"backend\" implementing a service.","type":"object","required":["addresses"],"properties":{"addresses":{"description":"addresses of this endpoint. The contents of this field are interpreted according to the corresponding EndpointSlice addressType field. Consumers must handle different types of addresses in the context of their own capabilities. This must contain at least one address but no more than 100. These are all assumed to be fungible and clients may choose to only use the first element. Refer to: https://issue.k8s.io/106267","type":"array","items":{"type":"string"},"x-kubernetes-list-type":"set"},"conditions":{"description":"EndpointConditions represents the current condition of an endpoint.","type":"object","properties":{"ready":{"description":"ready indicates that this endpoint is prepared to receive traffic, according to whatever system is managing the endpoint. A nil value indicates an unknown state. In most cases consumers should interpret this unknown state as ready. For compatibility reasons, ready should never be \"true\" for terminating endpoints, except when the normal readiness behavior is being explicitly overridden, for example when the associated Service has set the publishNotReadyAddresses flag.","type":"boolean"},"serving":{"description":"serving is identical to ready except that it is set regardless of the terminating state of endpoints. This condition should be set to true for a ready endpoint that is terminating. If nil, consumers should defer to the ready condition.","type":"boolean"},"terminating":{"description":"terminating indicates that this endpoint is terminating. A nil value indicates an unknown state. Consumers should interpret this unknown state to mean that the endpoint is not terminating.","type":"boolean"}}},"deprecatedTopology":{"description":"deprecatedTopology contains topology information part of the v1beta1 API. This field is deprecated, and will be removed when the v1beta1 API is removed (no sooner than kubernetes v1.24).  While this field can hold values, it is not writable through the v1 API, and any attempts to write to it will be silently ignored. Topology information can be found in the zone and nodeName fields instead.","type":"object","additionalProperties":{"type":"string"}},"hints":{"description":"EndpointHints provides hints describing how an endpoint should be consumed.","type":"object","properties":{"forZones":{"description":"forZones indicates the zone(s) this endpoint should be consumed by to enable topology aware routing.","type":"array","items":{"description":"ForZone provides information about which zones should consume this endpoint.","type":"object","required":["name"],"properties":{"name":{"description":"name represents the name of the zone.","type":"string"}}},"x-kubernetes-list-type":"atomic"}}},"hostname":{"description":"hostname of this endpoint. This field may be used by consumers of endpoints to distinguish endpoints from each other (e.g. in DNS names). Multiple endpoints which use the same hostname should be considered fungible (e.g. multiple A values in DNS). Must be lowercase and pass DNS Label (RFC 1123) validation.","type":"string"},"nodeName":{"description":"nodeName represents the name of the Node hosting this endpoint. This can be used to determine endpoints local to a Node.","type":"string"},"targetRef":{"description":"ObjectReference contains enough information to let you inspect or modify the referred object.","type":"object","properties":{"apiVersion":{"description":"API version of the referent.","type":"string"},"fieldPath":{"description":"If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: \"spec.containers{name}\" (where \"name\" refers to the name of the container that triggered the event) or if no container name is specified \"spec.containers[2]\" (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object.","type":"string"},"kind":{"description":"Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names","type":"string"},"namespace":{"description":"Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/","type":"string"},"resourceVersion":{"description":"Specific resourceVersion to which this reference is made, if any. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency","type":"string"},"uid":{"description":"UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids","type":"string"}},"x-kubernetes-map-type":"atomic"},"zone":{"description":"zone is the name of the Zone this endpoint exists in.","type":"string"}}},"x-kubernetes-list-type":"atomic"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"ports":{"description":"ports specifies the list of network ports exposed by each endpoint in this slice. Each port must have a unique name. When ports is empty, it indicates that there are no defined ports. When a port is defined with a nil port value, it indicates \"all ports\". Each slice may include a maximum of 100 ports.","type":"array","items":{"description":"EndpointPort represents a Port used by an EndpointSlice","type":"object","properties":{"appProtocol":{"description":"The application protocol for this port. This is used as a hint for implementations to offer richer behavior for protocols that they understand. This field follows standard Kubernetes label syntax. Valid values are either:\n\n* Un-prefixed protocol names - reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names).\n\n* Kubernetes-defined prefixed names:\n  * 'kubernetes.io/h2c' - HTTP/2 over cleartext as described in https://www.rfc-editor.org/rfc/rfc7540\n\n* Other protocols should use implementation-defined prefixed names such as mycompany.com/my-custom-protocol.","type":"string"},"name":{"description":"name represents the name of this port. All ports in an EndpointSlice must have a unique name. If the EndpointSlice is dervied from a Kubernetes service, this corresponds to the Service.ports[].name. Name must either be an empty string or pass DNS_LABEL validation: * must be no more than 63 characters long. * must consist of lower case alphanumeric characters or '-'. * must start and end with an alphanumeric character. Default is empty string.","type":"string"},"port":{"description":"port represents the port number of the endpoint. If this is not specified, ports are not restricted and must be interpreted in the context of the specific consumer.","type":"integer","format":"int32"},"protocol":{"description":"protocol represents the IP protocol for this port. Must be UDP, TCP, or SCTP. Default is TCP.\n\nPossible enum values:\n - `\"SCTP\"` is the SCTP protocol.\n - `\"TCP\"` is the TCP protocol.\n - `\"UDP\"` is the UDP protocol.","type":"string","enum":["SCTP","TCP","UDP"]}},"x-kubernetes-map-type":"atomic"},"x-kubernetes-list-type":"atomic"}},"x-kubernetes-group-version-kind":[{"group":"discovery.k8s.io","kind":"EndpointSlice","version":"v1"}]};

export function useEndpointSlice() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "addressType": '',
        "endpoints": '',
        "ports": '',
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
      viewer.value.props["addressType"]=gqlDataToYaml({"addressType": obj["addressType"]})
      viewer.value.props["endpoints"]=gqlDataToYaml({"endpoints": obj["endpoints"]})
      viewer.value.props["ports"]=gqlDataToYaml({"ports": obj["ports"]})
    },
    navigation: useNavigationStoreRef(),
    onlyReadProperties: (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["addressType","endpoints","ports"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    },
    onlyWriteProperties: (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["addressType","endpoints","ports"].includes(k))
          res[k] = obj[k];
      })
      return res
    },
    isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute,
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotEndpointSliceFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].k8sEndpointSlice == null) {
        const matched = router.currentRoute.value.matched
        notifyError('EndpointSlice not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'k8sEndpointSliceView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'k8sEndpointSliceView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'k8sEndpointSliceEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'k8sEndpointSliceCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> EndpointSlice <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}