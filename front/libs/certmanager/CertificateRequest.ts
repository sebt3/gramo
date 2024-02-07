import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { CertificateRequestListExcludes, CertificateRequestReadExcludes, CertificateRequestSimpleExcludes } from './custom.js'
import { extraCertificateRequestColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const CertificateRequestColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraCertificateRequestColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const CertificateRequestAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(CertificateRequestColumns);

export const CertificateRequestDefinition = {"description":"A CertificateRequest is used to request a signed certificate from one of the configured issuers. \n All fields within the CertificateRequest's `spec` are immutable after creation. A CertificateRequest will either succeed or fail, as denoted by its `status.state` field. \n A CertificateRequest is a one-shot resource, meaning it represents a single point in time request for a certificate and cannot be re-used.","type":"object","required":["spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"Desired state of the CertificateRequest resource.","type":"object","required":["issuerRef","request"],"properties":{"duration":{"description":"The requested 'duration' (i.e. lifetime) of the Certificate. This option may be ignored/overridden by some issuer types.","type":"string"},"extra":{"description":"Extra contains extra attributes of the user that created the CertificateRequest. Populated by the cert-manager webhook on creation and immutable.","type":"object","additionalProperties":{"type":"array","items":{"type":"string"}}},"groups":{"description":"Groups contains group membership of the user that created the CertificateRequest. Populated by the cert-manager webhook on creation and immutable.","type":"array","items":{"type":"string"},"x-kubernetes-list-type":"atomic"},"isCA":{"description":"IsCA will request to mark the certificate as valid for certificate signing when submitting to the issuer. This will automatically add the `cert sign` usage to the list of `usages`.","type":"boolean"},"issuerRef":{"description":"IssuerRef is a reference to the issuer for this CertificateRequest.  If the `kind` field is not set, or set to `Issuer`, an Issuer resource with the given name in the same namespace as the CertificateRequest will be used.  If the `kind` field is set to `ClusterIssuer`, a ClusterIssuer with the provided name will be used. The `name` field in this stanza is required at all times. The group field refers to the API group of the issuer which defaults to `cert-manager.io` if empty.","type":"object","required":["name"],"properties":{"group":{"description":"Group of the resource being referred to.","type":"string"},"kind":{"description":"Kind of the resource being referred to.","type":"string"},"name":{"description":"Name of the resource being referred to.","type":"string"}}},"request":{"description":"The PEM-encoded x509 certificate signing request to be submitted to the CA for signing.","type":"string","format":"byte"},"uid":{"description":"UID contains the uid of the user that created the CertificateRequest. Populated by the cert-manager webhook on creation and immutable.","type":"string"},"usages":{"description":"Usages is the set of x509 usages that are requested for the certificate. If usages are set they SHOULD be encoded inside the CSR spec Defaults to `digital signature` and `key encipherment` if not specified.","type":"array","items":{"description":"KeyUsage specifies valid usage contexts for keys. See: https://tools.ietf.org/html/rfc5280#section-4.2.1.3 https://tools.ietf.org/html/rfc5280#section-4.2.1.12 \n Valid KeyUsage values are as follows: \"signing\", \"digital signature\", \"content commitment\", \"key encipherment\", \"key agreement\", \"data encipherment\", \"cert sign\", \"crl sign\", \"encipher only\", \"decipher only\", \"any\", \"server auth\", \"client auth\", \"code signing\", \"email protection\", \"s/mime\", \"ipsec end system\", \"ipsec tunnel\", \"ipsec user\", \"timestamping\", \"ocsp signing\", \"microsoft sgc\", \"netscape sgc\"","type":"string","enum":["signing","digital signature","content commitment","key encipherment","key agreement","data encipherment","cert sign","crl sign","encipher only","decipher only","any","server auth","client auth","code signing","email protection","s/mime","ipsec end system","ipsec tunnel","ipsec user","timestamping","ocsp signing","microsoft sgc","netscape sgc"]}},"username":{"description":"Username contains the name of the user that created the CertificateRequest. Populated by the cert-manager webhook on creation and immutable.","type":"string"}}},"status":{"description":"Status of the CertificateRequest. This is set and managed automatically.","type":"object","properties":{"ca":{"description":"The PEM encoded x509 certificate of the signer, also known as the CA (Certificate Authority). This is set on a best-effort basis by different issuers. If not set, the CA is assumed to be unknown/not available.","type":"string","format":"byte"},"certificate":{"description":"The PEM encoded x509 certificate resulting from the certificate signing request. If not set, the CertificateRequest has either not been completed or has failed. More information on failure can be found by checking the `conditions` field.","type":"string","format":"byte"},"conditions":{"description":"List of status conditions to indicate the status of a CertificateRequest. Known condition types are `Ready` and `InvalidRequest`.","type":"array","items":{"description":"CertificateRequestCondition contains condition information for a CertificateRequest.","type":"object","required":["status","type"],"properties":{"lastTransitionTime":{"description":"LastTransitionTime is the timestamp corresponding to the last status change of this condition.","type":"string","format":"date-time"},"message":{"description":"Message is a human readable description of the details of the last transition, complementing reason.","type":"string"},"reason":{"description":"Reason is a brief machine readable explanation for the condition's last transition.","type":"string"},"status":{"description":"Status of the condition, one of (`True`, `False`, `Unknown`).","type":"string","enum":["True","False","Unknown"]},"type":{"description":"Type of the condition, known values are (`Ready`, `InvalidRequest`, `Approved`, `Denied`).","type":"string"}}},"x-kubernetes-list-map-keys":["type"],"x-kubernetes-list-type":"map"},"failureTime":{"description":"FailureTime stores the time that this CertificateRequest failed. This is used to influence garbage collection and back-off.","type":"string","format":"date-time"}}}},"x-kubernetes-group-version-kind":[{"group":"cert-manager.io","kind":"CertificateRequest","version":"v1"}]};

export function useCertificateRequest() {
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
    onNotCertificateRequestFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].certmanagerCertificateRequest == null) {
        const matched = router.currentRoute.value.matched
        notifyError('CertificateRequest not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'certmanagerCertificateRequestView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'certmanagerCertificateRequestView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'certmanagerCertificateRequestEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'certmanagerCertificateRequestCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> CertificateRequest <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}