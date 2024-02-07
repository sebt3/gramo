import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { CertificateSigningRequestListExcludes, CertificateSigningRequestReadExcludes, CertificateSigningRequestSimpleExcludes } from './custom.js'
import { extraCertificateSigningRequestColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const CertificateSigningRequestColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraCertificateSigningRequestColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const CertificateSigningRequestDefinition = {"description":"CertificateSigningRequest objects provide a mechanism to obtain x509 certificates by submitting a certificate signing request, and having it asynchronously approved and issued.\n\nKubelets use this API to obtain:\n 1. client certificates to authenticate to kube-apiserver (with the \"kubernetes.io/kube-apiserver-client-kubelet\" signerName).\n 2. serving certificates for TLS endpoints kube-apiserver can connect to securely (with the \"kubernetes.io/kubelet-serving\" signerName).\n\nThis API can be used to request client certificates to authenticate to kube-apiserver (with the \"kubernetes.io/kube-apiserver-client\" signerName), or to obtain certificates from custom non-Kubernetes signers.","type":"object","required":["spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"CertificateSigningRequestSpec contains the certificate request.","type":"object","required":["request","signerName"],"properties":{"expirationSeconds":{"description":"expirationSeconds is the requested duration of validity of the issued certificate. The certificate signer may issue a certificate with a different validity duration so a client must check the delta between the notBefore and and notAfter fields in the issued certificate to determine the actual duration.\n\nThe v1.22+ in-tree implementations of the well-known Kubernetes signers will honor this field as long as the requested duration is not greater than the maximum duration they will honor per the --cluster-signing-duration CLI flag to the Kubernetes controller manager.\n\nCertificate signers may not honor this field for various reasons:\n\n  1. Old signer that is unaware of the field (such as the in-tree\n     implementations prior to v1.22)\n  2. Signer whose configured maximum is shorter than the requested duration\n  3. Signer whose configured minimum is longer than the requested duration\n\nThe minimum valid value for expirationSeconds is 600, i.e. 10 minutes.","type":"integer","format":"int32"},"extra":{"description":"extra contains extra attributes of the user that created the CertificateSigningRequest. Populated by the API server on creation and immutable.","type":"object","additionalProperties":{"type":"array","items":{"type":"string"}}},"groups":{"description":"groups contains group membership of the user that created the CertificateSigningRequest. Populated by the API server on creation and immutable.","type":"array","items":{"type":"string"},"x-kubernetes-list-type":"atomic"},"request":{"description":"request contains an x509 certificate signing request encoded in a \"CERTIFICATE REQUEST\" PEM block. When serialized as JSON or YAML, the data is additionally base64-encoded.","type":"string","format":"byte","x-kubernetes-list-type":"atomic"},"signerName":{"description":"signerName indicates the requested signer, and is a qualified name.\n\nList/watch requests for CertificateSigningRequests can filter on this field using a \"spec.signerName=NAME\" fieldSelector.\n\nWell-known Kubernetes signers are:\n 1. \"kubernetes.io/kube-apiserver-client\": issues client certificates that can be used to authenticate to kube-apiserver.\n  Requests for this signer are never auto-approved by kube-controller-manager, can be issued by the \"csrsigning\" controller in kube-controller-manager.\n 2. \"kubernetes.io/kube-apiserver-client-kubelet\": issues client certificates that kubelets use to authenticate to kube-apiserver.\n  Requests for this signer can be auto-approved by the \"csrapproving\" controller in kube-controller-manager, and can be issued by the \"csrsigning\" controller in kube-controller-manager.\n 3. \"kubernetes.io/kubelet-serving\" issues serving certificates that kubelets use to serve TLS endpoints, which kube-apiserver can connect to securely.\n  Requests for this signer are never auto-approved by kube-controller-manager, and can be issued by the \"csrsigning\" controller in kube-controller-manager.\n\nMore details are available at https://k8s.io/docs/reference/access-authn-authz/certificate-signing-requests/#kubernetes-signers\n\nCustom signerNames can also be specified. The signer defines:\n 1. Trust distribution: how trust (CA bundles) are distributed.\n 2. Permitted subjects: and behavior when a disallowed subject is requested.\n 3. Required, permitted, or forbidden x509 extensions in the request (including whether subjectAltNames are allowed, which types, restrictions on allowed values) and behavior when a disallowed extension is requested.\n 4. Required, permitted, or forbidden key usages / extended key usages.\n 5. Expiration/certificate lifetime: whether it is fixed by the signer, configurable by the admin.\n 6. Whether or not requests for CA certificates are allowed.","type":"string"},"uid":{"description":"uid contains the uid of the user that created the CertificateSigningRequest. Populated by the API server on creation and immutable.","type":"string"},"usages":{"description":"usages specifies a set of key usages requested in the issued certificate.\n\nRequests for TLS client certificates typically request: \"digital signature\", \"key encipherment\", \"client auth\".\n\nRequests for TLS serving certificates typically request: \"key encipherment\", \"digital signature\", \"server auth\".\n\nValid values are:\n \"signing\", \"digital signature\", \"content commitment\",\n \"key encipherment\", \"key agreement\", \"data encipherment\",\n \"cert sign\", \"crl sign\", \"encipher only\", \"decipher only\", \"any\",\n \"server auth\", \"client auth\",\n \"code signing\", \"email protection\", \"s/mime\",\n \"ipsec end system\", \"ipsec tunnel\", \"ipsec user\",\n \"timestamping\", \"ocsp signing\", \"microsoft sgc\", \"netscape sgc\"","type":"array","items":{"type":"string"},"x-kubernetes-list-type":"atomic"},"username":{"description":"username contains the name of the user that created the CertificateSigningRequest. Populated by the API server on creation and immutable.","type":"string"}}},"status":{"description":"CertificateSigningRequestStatus contains conditions used to indicate approved/denied/failed status of the request, and the issued certificate.","type":"object","properties":{"certificate":{"description":"certificate is populated with an issued certificate by the signer after an Approved condition is present. This field is set via the /status subresource. Once populated, this field is immutable.\n\nIf the certificate signing request is denied, a condition of type \"Denied\" is added and this field remains empty. If the signer cannot issue the certificate, a condition of type \"Failed\" is added and this field remains empty.\n\nValidation requirements:\n 1. certificate must contain one or more PEM blocks.\n 2. All PEM blocks must have the \"CERTIFICATE\" label, contain no headers, and the encoded data\n  must be a BER-encoded ASN.1 Certificate structure as described in section 4 of RFC5280.\n 3. Non-PEM content may appear before or after the \"CERTIFICATE\" PEM blocks and is unvalidated,\n  to allow for explanatory text as described in section 5.2 of RFC7468.\n\nIf more than one PEM block is present, and the definition of the requested spec.signerName does not indicate otherwise, the first block is the issued certificate, and subsequent blocks should be treated as intermediate certificates and presented in TLS handshakes.\n\nThe certificate is encoded in PEM format.\n\nWhen serialized as JSON or YAML, the data is additionally base64-encoded, so it consists of:\n\n    base64(\n    -----BEGIN CERTIFICATE-----\n    ...\n    -----END CERTIFICATE-----\n    )","type":"string","format":"byte","x-kubernetes-list-type":"atomic"},"conditions":{"description":"conditions applied to the request. Known conditions are \"Approved\", \"Denied\", and \"Failed\".","type":"array","items":{"description":"CertificateSigningRequestCondition describes a condition of a CertificateSigningRequest object","type":"object","required":["type","status"],"properties":{"lastTransitionTime":{"description":"lastTransitionTime is the time the condition last transitioned from one status to another. If unset, when a new condition type is added or an existing condition's status is changed, the server defaults this to the current time.","$ref":"#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.Time"},"lastUpdateTime":{"description":"lastUpdateTime is the time of the last update to this condition","$ref":"#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.Time"},"message":{"description":"message contains a human readable message with details about the request state","type":"string"},"reason":{"description":"reason indicates a brief reason for the request state","type":"string"},"status":{"description":"status of the condition, one of True, False, Unknown. Approved, Denied, and Failed conditions may not be \"False\" or \"Unknown\".","type":"string"},"type":{"description":"type of the condition. Known conditions are \"Approved\", \"Denied\", and \"Failed\".\n\nAn \"Approved\" condition is added via the /approval subresource, indicating the request was approved and should be issued by the signer.\n\nA \"Denied\" condition is added via the /approval subresource, indicating the request was denied and should not be issued by the signer.\n\nA \"Failed\" condition is added via the /status subresource, indicating the signer failed to issue the certificate.\n\nApproved and Denied conditions are mutually exclusive. Approved, Denied, and Failed conditions cannot be removed once added.\n\nOnly one condition of a given type is allowed.","type":"string"}}},"x-kubernetes-list-map-keys":["type"],"x-kubernetes-list-type":"map"}}}},"x-kubernetes-group-version-kind":[{"group":"certificates.k8s.io","kind":"CertificateSigningRequest","version":"v1"}]};

export function useCertificateSigningRequest() {
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
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotCertificateSigningRequestFound: (res) => {
    if ( !res.loading && res.data.k8sCertificateSigningRequest == null) {
        const matched = router.currentRoute.value.matched
        notifyError('CertificateSigningRequest not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'k8sCertificateSigningRequestView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'k8sCertificateSigningRequestView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'k8sCertificateSigningRequestEdit', params: {name}}),
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
    actionNew: ()    => router.push({ name: 'k8sCertificateSigningRequestCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> CertificateSigningRequest <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}