import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { BucketListExcludes, BucketReadExcludes, BucketSimpleExcludes } from './custom.js'
import { extraBucketColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const BucketColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraBucketColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const BucketAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(BucketColumns);

export const BucketDefinition = {"description":"Bucket is the Schema for the buckets API.","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"BucketSpec specifies the required configuration to produce an Artifact for an object storage bucket.","type":"object","required":["bucketName","endpoint","interval"],"properties":{"accessFrom":{"description":"AccessFrom specifies an Access Control List for allowing cross-namespace references to this object. NOTE: Not implemented, provisional as of https://github.com/fluxcd/flux2/pull/2092","type":"object","required":["namespaceSelectors"],"properties":{"namespaceSelectors":{"description":"NamespaceSelectors is the list of namespace selectors to which this ACL applies. Items in this list are evaluated using a logical OR operation.","type":"array","items":{"description":"NamespaceSelector selects the namespaces to which this ACL applies. An empty map of MatchLabels matches all namespaces in a cluster.","type":"object","properties":{"matchLabels":{"description":"MatchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is \"key\", the operator is \"In\", and the values array contains only \"value\". The requirements are ANDed.","type":"object","additionalProperties":{"type":"string"}}}}}}},"bucketName":{"description":"BucketName is the name of the object storage bucket.","type":"string"},"endpoint":{"description":"Endpoint is the object storage address the BucketName is located at.","type":"string"},"ignore":{"description":"Ignore overrides the set of excluded patterns in the .sourceignore format (which is the same as .gitignore). If not provided, a default will be used, consult the documentation for your version to find out what those are.","type":"string"},"insecure":{"description":"Insecure allows connecting to a non-TLS HTTP Endpoint.","type":"boolean"},"interval":{"description":"Interval at which to check the Endpoint for updates.","type":"string","pattern":"^([0-9]+(\\.[0-9]+)?(ms|s|m|h))+$"},"provider":{"description":"Provider of the object storage bucket. Defaults to 'generic', which expects an S3 (API) compatible object storage.","type":"string","enum":["generic","aws","gcp","azure"]},"region":{"description":"Region of the Endpoint where the BucketName is located in.","type":"string"},"secretRef":{"description":"SecretRef specifies the Secret containing authentication credentials for the Bucket.","type":"object","required":["name"],"properties":{"name":{"description":"Name of the referent.","type":"string"}}},"suspend":{"description":"Suspend tells the controller to suspend the reconciliation of this Bucket.","type":"boolean"},"timeout":{"description":"Timeout for fetch operations, defaults to 60s.","type":"string","pattern":"^([0-9]+(\\.[0-9]+)?(ms|s|m))+$"}}},"status":{"description":"BucketStatus records the observed state of a Bucket.","type":"object","properties":{"artifact":{"description":"Artifact represents the last successful Bucket reconciliation.","type":"object","required":["lastUpdateTime","path","revision","url"],"properties":{"digest":{"description":"Digest is the digest of the file in the form of '<algorithm>:<checksum>'.","type":"string","pattern":"^[a-z0-9]+(?:[.+_-][a-z0-9]+)*:[a-zA-Z0-9=_-]+$"},"lastUpdateTime":{"description":"LastUpdateTime is the timestamp corresponding to the last update of the Artifact.","type":"string","format":"date-time"},"metadata":{"description":"Metadata holds upstream information such as OCI annotations.","type":"object","additionalProperties":{"type":"string"}},"path":{"description":"Path is the relative file path of the Artifact. It can be used to locate the file in the root of the Artifact storage on the local file system of the controller managing the Source.","type":"string"},"revision":{"description":"Revision is a human-readable identifier traceable in the origin source system. It can be a Git commit SHA, Git tag, a Helm chart version, etc.","type":"string"},"size":{"description":"Size is the number of bytes in the file.","type":"integer","format":"int64"},"url":{"description":"URL is the HTTP address of the Artifact as exposed by the controller managing the Source. It can be used to retrieve the Artifact for consumption, e.g. by another controller applying the Artifact contents.","type":"string"}}},"conditions":{"description":"Conditions holds the conditions for the Bucket.","type":"array","items":{"description":"Condition contains details for one aspect of the current state of this API Resource. --- This struct is intended for direct use as an array at the field path .status.conditions.  For example, \n type FooStatus struct{ // Represents the observations of a foo's current state. // Known .status.conditions.type are: \"Available\", \"Progressing\", and \"Degraded\" // +patchMergeKey=type // +patchStrategy=merge // +listType=map // +listMapKey=type Conditions []metav1.Condition `json:\"conditions,omitempty\" patchStrategy:\"merge\" patchMergeKey:\"type\" protobuf:\"bytes,1,rep,name=conditions\"` \n // other fields }","type":"object","required":["lastTransitionTime","message","reason","status","type"],"properties":{"lastTransitionTime":{"description":"lastTransitionTime is the last time the condition transitioned from one status to another. This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.","type":"string","format":"date-time"},"message":{"description":"message is a human readable message indicating details about the transition. This may be an empty string.","type":"string","maxLength":32768},"observedGeneration":{"description":"observedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.","type":"integer","format":"int64","minimum":0},"reason":{"description":"reason contains a programmatic identifier indicating the reason for the condition's last transition. Producers of specific condition types may define expected values and meanings for this field, and whether the values are considered a guaranteed API. The value should be a CamelCase string. This field may not be empty.","type":"string","maxLength":1024,"minLength":1,"pattern":"^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$"},"status":{"description":"status of the condition, one of True, False, Unknown.","type":"string","enum":["True","False","Unknown"]},"type":{"description":"type of condition in CamelCase or in foo.example.com/CamelCase. --- Many .condition.type values are consistent across resources like Available, but because arbitrary conditions can be useful (see .node.status.conditions), the ability to deconflict is important. The regex it matches is (dns1123SubdomainFmt/)?(qualifiedNameFmt)","type":"string","maxLength":316,"pattern":"^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$"}}}},"lastHandledReconcileAt":{"description":"LastHandledReconcileAt holds the value of the most recent reconcile request value, so a change of the annotation value can be detected.","type":"string"},"observedGeneration":{"description":"ObservedGeneration is the last observed generation of the Bucket object.","type":"integer","format":"int64"},"observedIgnore":{"description":"ObservedIgnore is the observed exclusion patterns used for constructing the source artifact.","type":"string"},"url":{"description":"URL is the dynamic fetch link for the latest Artifact. It is provided on a \"best effort\" basis, and using the precise BucketStatus.Artifact data is recommended.","type":"string"}}}},"x-kubernetes-group-version-kind":[{"group":"source.toolkit.fluxcd.io","kind":"Bucket","version":"v1beta2"}]};

export function useBucket() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute } = useCore();
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
    isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute,
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotBucketFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].fluxcdBucket == null) {
        const matched = router.currentRoute.value.matched
        notifyError('Bucket not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'fluxcdBucketView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'fluxcdBucketView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'fluxcdBucketEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'fluxcdBucketCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> Bucket <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}