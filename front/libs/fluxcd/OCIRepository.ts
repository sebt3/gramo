import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { OCIRepositoryListExcludes, OCIRepositoryReadExcludes, OCIRepositorySimpleExcludes } from './custom.js'
import { extraOCIRepositoryColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const OCIRepositoryColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraOCIRepositoryColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const OCIRepositoryAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(OCIRepositoryColumns);

export const OCIRepositoryDefinition = {"description":"OCIRepository is the Schema for the ocirepositories API","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"OCIRepositorySpec defines the desired state of OCIRepository","type":"object","required":["interval","url"],"properties":{"certSecretRef":{"description":"CertSecretRef can be given the name of a secret containing either or both of \n - a PEM-encoded client certificate (`certFile`) and private key (`keyFile`); - a PEM-encoded CA certificate (`caFile`) \n and whichever are supplied, will be used for connecting to the registry. The client cert and key are useful if you are authenticating with a certificate; the CA cert is useful if you are using a self-signed server certificate.","type":"object","required":["name"],"properties":{"name":{"description":"Name of the referent.","type":"string"}}},"ignore":{"description":"Ignore overrides the set of excluded patterns in the .sourceignore format (which is the same as .gitignore). If not provided, a default will be used, consult the documentation for your version to find out what those are.","type":"string"},"insecure":{"description":"Insecure allows connecting to a non-TLS HTTP container registry.","type":"boolean"},"interval":{"description":"The interval at which to check for image updates.","type":"string","pattern":"^([0-9]+(\\.[0-9]+)?(ms|s|m|h))+$"},"layerSelector":{"description":"LayerSelector specifies which layer should be extracted from the OCI artifact. When not specified, the first layer found in the artifact is selected.","type":"object","properties":{"mediaType":{"description":"MediaType specifies the OCI media type of the layer which should be extracted from the OCI Artifact. The first layer matching this type is selected.","type":"string"},"operation":{"description":"Operation specifies how the selected layer should be processed. By default, the layer compressed content is extracted to storage. When the operation is set to 'copy', the layer compressed content is persisted to storage as it is.","type":"string","enum":["extract","copy"]}}},"provider":{"description":"The provider used for authentication, can be 'aws', 'azure', 'gcp' or 'generic'. When not specified, defaults to 'generic'.","type":"string","enum":["generic","aws","azure","gcp"]},"ref":{"description":"The OCI reference to pull and monitor for changes, defaults to the latest tag.","type":"object","properties":{"digest":{"description":"Digest is the image digest to pull, takes precedence over SemVer. The value should be in the format 'sha256:<HASH>'.","type":"string"},"semver":{"description":"SemVer is the range of tags to pull selecting the latest within the range, takes precedence over Tag.","type":"string"},"tag":{"description":"Tag is the image tag to pull, defaults to latest.","type":"string"}}},"secretRef":{"description":"SecretRef contains the secret name containing the registry login credentials to resolve image metadata. The secret must be of type kubernetes.io/dockerconfigjson.","type":"object","required":["name"],"properties":{"name":{"description":"Name of the referent.","type":"string"}}},"serviceAccountName":{"description":"ServiceAccountName is the name of the Kubernetes ServiceAccount used to authenticate the image pull if the service account has attached pull secrets. For more information: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#add-imagepullsecrets-to-a-service-account","type":"string"},"suspend":{"description":"This flag tells the controller to suspend the reconciliation of this source.","type":"boolean"},"timeout":{"description":"The timeout for remote OCI Repository operations like pulling, defaults to 60s.","type":"string","pattern":"^([0-9]+(\\.[0-9]+)?(ms|s|m))+$"},"url":{"description":"URL is a reference to an OCI artifact repository hosted on a remote container registry.","type":"string","pattern":"^oci://.*$"},"verify":{"description":"Verify contains the secret name containing the trusted public keys used to verify the signature and specifies which provider to use to check whether OCI image is authentic.","type":"object","required":["provider"],"properties":{"provider":{"description":"Provider specifies the technology used to sign the OCI Artifact.","type":"string","enum":["cosign"]},"secretRef":{"description":"SecretRef specifies the Kubernetes Secret containing the trusted public keys.","type":"object","required":["name"],"properties":{"name":{"description":"Name of the referent.","type":"string"}}}}}}},"status":{"description":"OCIRepositoryStatus defines the observed state of OCIRepository","type":"object","properties":{"artifact":{"description":"Artifact represents the output of the last successful OCI Repository sync.","type":"object","required":["lastUpdateTime","path","revision","url"],"properties":{"digest":{"description":"Digest is the digest of the file in the form of '<algorithm>:<checksum>'.","type":"string","pattern":"^[a-z0-9]+(?:[.+_-][a-z0-9]+)*:[a-zA-Z0-9=_-]+$"},"lastUpdateTime":{"description":"LastUpdateTime is the timestamp corresponding to the last update of the Artifact.","type":"string","format":"date-time"},"metadata":{"description":"Metadata holds upstream information such as OCI annotations.","type":"object","additionalProperties":{"type":"string"}},"path":{"description":"Path is the relative file path of the Artifact. It can be used to locate the file in the root of the Artifact storage on the local file system of the controller managing the Source.","type":"string"},"revision":{"description":"Revision is a human-readable identifier traceable in the origin source system. It can be a Git commit SHA, Git tag, a Helm chart version, etc.","type":"string"},"size":{"description":"Size is the number of bytes in the file.","type":"integer","format":"int64"},"url":{"description":"URL is the HTTP address of the Artifact as exposed by the controller managing the Source. It can be used to retrieve the Artifact for consumption, e.g. by another controller applying the Artifact contents.","type":"string"}}},"conditions":{"description":"Conditions holds the conditions for the OCIRepository.","type":"array","items":{"description":"Condition contains details for one aspect of the current state of this API Resource. --- This struct is intended for direct use as an array at the field path .status.conditions.  For example, \n type FooStatus struct{ // Represents the observations of a foo's current state. // Known .status.conditions.type are: \"Available\", \"Progressing\", and \"Degraded\" // +patchMergeKey=type // +patchStrategy=merge // +listType=map // +listMapKey=type Conditions []metav1.Condition `json:\"conditions,omitempty\" patchStrategy:\"merge\" patchMergeKey:\"type\" protobuf:\"bytes,1,rep,name=conditions\"` \n // other fields }","type":"object","required":["lastTransitionTime","message","reason","status","type"],"properties":{"lastTransitionTime":{"description":"lastTransitionTime is the last time the condition transitioned from one status to another. This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.","type":"string","format":"date-time"},"message":{"description":"message is a human readable message indicating details about the transition. This may be an empty string.","type":"string","maxLength":32768},"observedGeneration":{"description":"observedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.","type":"integer","format":"int64","minimum":0},"reason":{"description":"reason contains a programmatic identifier indicating the reason for the condition's last transition. Producers of specific condition types may define expected values and meanings for this field, and whether the values are considered a guaranteed API. The value should be a CamelCase string. This field may not be empty.","type":"string","maxLength":1024,"minLength":1,"pattern":"^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$"},"status":{"description":"status of the condition, one of True, False, Unknown.","type":"string","enum":["True","False","Unknown"]},"type":{"description":"type of condition in CamelCase or in foo.example.com/CamelCase. --- Many .condition.type values are consistent across resources like Available, but because arbitrary conditions can be useful (see .node.status.conditions), the ability to deconflict is important. The regex it matches is (dns1123SubdomainFmt/)?(qualifiedNameFmt)","type":"string","maxLength":316,"pattern":"^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$"}}}},"contentConfigChecksum":{"description":"ContentConfigChecksum is a checksum of all the configurations related to the content of the source artifact: - .spec.ignore - .spec.layerSelector observed in .status.observedGeneration version of the object. This can be used to determine if the content configuration has changed and the artifact needs to be rebuilt. It has the format of `<algo>:<checksum>`, for example: `sha256:<checksum>`. \n Deprecated: Replaced with explicit fields for observed artifact content config in the status.","type":"string"},"lastHandledReconcileAt":{"description":"LastHandledReconcileAt holds the value of the most recent reconcile request value, so a change of the annotation value can be detected.","type":"string"},"observedGeneration":{"description":"ObservedGeneration is the last observed generation.","type":"integer","format":"int64"},"observedIgnore":{"description":"ObservedIgnore is the observed exclusion patterns used for constructing the source artifact.","type":"string"},"observedLayerSelector":{"description":"ObservedLayerSelector is the observed layer selector used for constructing the source artifact.","type":"object","properties":{"mediaType":{"description":"MediaType specifies the OCI media type of the layer which should be extracted from the OCI Artifact. The first layer matching this type is selected.","type":"string"},"operation":{"description":"Operation specifies how the selected layer should be processed. By default, the layer compressed content is extracted to storage. When the operation is set to 'copy', the layer compressed content is persisted to storage as it is.","type":"string","enum":["extract","copy"]}}},"url":{"description":"URL is the download link for the artifact output of the last OCI Repository sync.","type":"string"}}}},"x-kubernetes-group-version-kind":[{"group":"source.toolkit.fluxcd.io","kind":"OCIRepository","version":"v1beta2"}]};

export function useOCIRepository() {
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
    onNotOCIRepositoryFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].fluxcdOCIRepository == null) {
        const matched = router.currentRoute.value.matched
        notifyError('OCIRepository not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'fluxcdOCIRepositoryView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'fluxcdOCIRepositoryView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'fluxcdOCIRepositoryEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'fluxcdOCIRepositoryCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> OCIRepository <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}