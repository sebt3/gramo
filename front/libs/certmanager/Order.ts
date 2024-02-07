import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { OrderListExcludes, OrderReadExcludes, OrderSimpleExcludes } from './custom.js'
import { extraOrderColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const OrderColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraOrderColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const OrderAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(OrderColumns);

export const OrderDefinition = {"description":"Order is a type to represent an Order with an ACME server","type":"object","required":["metadata","spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"type":"object","required":["issuerRef","request"],"properties":{"commonName":{"description":"CommonName is the common name as specified on the DER encoded CSR. If specified, this value must also be present in `dnsNames` or `ipAddresses`. This field must match the corresponding field on the DER encoded CSR.","type":"string"},"dnsNames":{"description":"DNSNames is a list of DNS names that should be included as part of the Order validation process. This field must match the corresponding field on the DER encoded CSR.","type":"array","items":{"type":"string"}},"duration":{"description":"Duration is the duration for the not after date for the requested certificate. this is set on order creation as pe the ACME spec.","type":"string"},"ipAddresses":{"description":"IPAddresses is a list of IP addresses that should be included as part of the Order validation process. This field must match the corresponding field on the DER encoded CSR.","type":"array","items":{"type":"string"}},"issuerRef":{"description":"IssuerRef references a properly configured ACME-type Issuer which should be used to create this Order. If the Issuer does not exist, processing will be retried. If the Issuer is not an 'ACME' Issuer, an error will be returned and the Order will be marked as failed.","type":"object","required":["name"],"properties":{"group":{"description":"Group of the resource being referred to.","type":"string"},"kind":{"description":"Kind of the resource being referred to.","type":"string"},"name":{"description":"Name of the resource being referred to.","type":"string"}}},"request":{"description":"Certificate signing request bytes in DER encoding. This will be used when finalizing the order. This field must be set on the order.","type":"string","format":"byte"}}},"status":{"type":"object","properties":{"authorizations":{"description":"Authorizations contains data returned from the ACME server on what authorizations must be completed in order to validate the DNS names specified on the Order.","type":"array","items":{"description":"ACMEAuthorization contains data returned from the ACME server on an authorization that must be completed in order validate a DNS name on an ACME Order resource.","type":"object","required":["url"],"properties":{"challenges":{"description":"Challenges specifies the challenge types offered by the ACME server. One of these challenge types will be selected when validating the DNS name and an appropriate Challenge resource will be created to perform the ACME challenge process.","type":"array","items":{"description":"Challenge specifies a challenge offered by the ACME server for an Order. An appropriate Challenge resource can be created to perform the ACME challenge process.","type":"object","required":["token","type","url"],"properties":{"token":{"description":"Token is the token that must be presented for this challenge. This is used to compute the 'key' that must also be presented.","type":"string"},"type":{"description":"Type is the type of challenge being offered, e.g. 'http-01', 'dns-01', 'tls-sni-01', etc. This is the raw value retrieved from the ACME server. Only 'http-01' and 'dns-01' are supported by cert-manager, other values will be ignored.","type":"string"},"url":{"description":"URL is the URL of this challenge. It can be used to retrieve additional metadata about the Challenge from the ACME server.","type":"string"}}}},"identifier":{"description":"Identifier is the DNS name to be validated as part of this authorization","type":"string"},"initialState":{"description":"InitialState is the initial state of the ACME authorization when first fetched from the ACME server. If an Authorization is already 'valid', the Order controller will not create a Challenge resource for the authorization. This will occur when working with an ACME server that enables 'authz reuse' (such as Let's Encrypt's production endpoint). If not set and 'identifier' is set, the state is assumed to be pending and a Challenge will be created.","type":"string","enum":["valid","ready","pending","processing","invalid","expired","errored"]},"url":{"description":"URL is the URL of the Authorization that must be completed","type":"string"},"wildcard":{"description":"Wildcard will be true if this authorization is for a wildcard DNS name. If this is true, the identifier will be the *non-wildcard* version of the DNS name. For example, if '*.example.com' is the DNS name being validated, this field will be 'true' and the 'identifier' field will be 'example.com'.","type":"boolean"}}}},"certificate":{"description":"Certificate is a copy of the PEM encoded certificate for this Order. This field will be populated after the order has been successfully finalized with the ACME server, and the order has transitioned to the 'valid' state.","type":"string","format":"byte"},"failureTime":{"description":"FailureTime stores the time that this order failed. This is used to influence garbage collection and back-off.","type":"string","format":"date-time"},"finalizeURL":{"description":"FinalizeURL of the Order. This is used to obtain certificates for this order once it has been completed.","type":"string"},"reason":{"description":"Reason optionally provides more information about a why the order is in the current state.","type":"string"},"state":{"description":"State contains the current state of this Order resource. States 'success' and 'expired' are 'final'","type":"string","enum":["valid","ready","pending","processing","invalid","expired","errored"]},"url":{"description":"URL of the Order. This will initially be empty when the resource is first created. The Order controller will populate this field when the Order is first processed. This field will be immutable after it is initially set.","type":"string"}}}},"x-kubernetes-group-version-kind":[{"group":"acme.cert-manager.io","kind":"Order","version":"v1"}]};

export function useOrder() {
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
    onNotOrderFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].certmanagerOrder == null) {
        const matched = router.currentRoute.value.matched
        notifyError('Order not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'certmanagerOrderView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'certmanagerOrderView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'certmanagerOrderEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'certmanagerOrderCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> Order <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}