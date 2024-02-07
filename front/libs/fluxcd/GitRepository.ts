import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { GitRepositoryListExcludes, GitRepositoryReadExcludes, GitRepositorySimpleExcludes } from './custom.js'
import { extraGitRepositoryColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const GitRepositoryColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraGitRepositoryColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const GitRepositoryAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(GitRepositoryColumns);

export const GitRepositoryDefinition = {"description":"GitRepository is the Schema for the gitrepositories API.","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"GitRepositorySpec specifies the required configuration to produce an Artifact for a Git repository.","type":"object","required":["interval","url"],"properties":{"ignore":{"description":"Ignore overrides the set of excluded patterns in the .sourceignore format (which is the same as .gitignore). If not provided, a default will be used, consult the documentation for your version to find out what those are.","type":"string"},"include":{"description":"Include specifies a list of GitRepository resources which Artifacts should be included in the Artifact produced for this GitRepository.","type":"array","items":{"description":"GitRepositoryInclude specifies a local reference to a GitRepository which Artifact (sub-)contents must be included, and where they should be placed.","type":"object","required":["repository"],"properties":{"fromPath":{"description":"FromPath specifies the path to copy contents from, defaults to the root of the Artifact.","type":"string"},"repository":{"description":"GitRepositoryRef specifies the GitRepository which Artifact contents must be included.","type":"object","required":["name"],"properties":{"name":{"description":"Name of the referent.","type":"string"}}},"toPath":{"description":"ToPath specifies the path to copy contents to, defaults to the name of the GitRepositoryRef.","type":"string"}}}},"interval":{"description":"Interval at which to check the GitRepository for updates.","type":"string","pattern":"^([0-9]+(\\.[0-9]+)?(ms|s|m|h))+$"},"recurseSubmodules":{"description":"RecurseSubmodules enables the initialization of all submodules within the GitRepository as cloned from the URL, using their default settings.","type":"boolean"},"ref":{"description":"Reference specifies the Git reference to resolve and monitor for changes, defaults to the 'master' branch.","type":"object","properties":{"branch":{"description":"Branch to check out, defaults to 'master' if no other field is defined.","type":"string"},"commit":{"description":"Commit SHA to check out, takes precedence over all reference fields. \n This can be combined with Branch to shallow clone the branch, in which the commit is expected to exist.","type":"string"},"name":{"description":"Name of the reference to check out; takes precedence over Branch, Tag and SemVer. \n It must be a valid Git reference: https://git-scm.com/docs/git-check-ref-format#_description Examples: \"refs/heads/main\", \"refs/tags/v0.1.0\", \"refs/pull/420/head\", \"refs/merge-requests/1/head\"","type":"string"},"semver":{"description":"SemVer tag expression to check out, takes precedence over Tag.","type":"string"},"tag":{"description":"Tag to check out, takes precedence over Branch.","type":"string"}}},"secretRef":{"description":"SecretRef specifies the Secret containing authentication credentials for the GitRepository. For HTTPS repositories the Secret must contain 'username' and 'password' fields for basic auth or 'bearerToken' field for token auth. For SSH repositories the Secret must contain 'identity' and 'known_hosts' fields.","type":"object","required":["name"],"properties":{"name":{"description":"Name of the referent.","type":"string"}}},"suspend":{"description":"Suspend tells the controller to suspend the reconciliation of this GitRepository.","type":"boolean"},"timeout":{"description":"Timeout for Git operations like cloning, defaults to 60s.","type":"string","pattern":"^([0-9]+(\\.[0-9]+)?(ms|s|m))+$"},"url":{"description":"URL specifies the Git repository URL, it can be an HTTP/S or SSH address.","type":"string","pattern":"^(http|https|ssh)://.*$"},"verify":{"description":"Verification specifies the configuration to verify the Git commit signature(s).","type":"object","required":["mode","secretRef"],"properties":{"mode":{"description":"Mode specifies what Git object should be verified, currently ('head').","type":"string","enum":["head"]},"secretRef":{"description":"SecretRef specifies the Secret containing the public keys of trusted Git authors.","type":"object","required":["name"],"properties":{"name":{"description":"Name of the referent.","type":"string"}}}}}}},"status":{"description":"GitRepositoryStatus records the observed state of a Git repository.","type":"object","properties":{"artifact":{"description":"Artifact represents the last successful GitRepository reconciliation.","type":"object","required":["lastUpdateTime","path","revision","url"],"properties":{"digest":{"description":"Digest is the digest of the file in the form of '<algorithm>:<checksum>'.","type":"string","pattern":"^[a-z0-9]+(?:[.+_-][a-z0-9]+)*:[a-zA-Z0-9=_-]+$"},"lastUpdateTime":{"description":"LastUpdateTime is the timestamp corresponding to the last update of the Artifact.","type":"string","format":"date-time"},"metadata":{"description":"Metadata holds upstream information such as OCI annotations.","type":"object","additionalProperties":{"type":"string"}},"path":{"description":"Path is the relative file path of the Artifact. It can be used to locate the file in the root of the Artifact storage on the local file system of the controller managing the Source.","type":"string"},"revision":{"description":"Revision is a human-readable identifier traceable in the origin source system. It can be a Git commit SHA, Git tag, a Helm chart version, etc.","type":"string"},"size":{"description":"Size is the number of bytes in the file.","type":"integer","format":"int64"},"url":{"description":"URL is the HTTP address of the Artifact as exposed by the controller managing the Source. It can be used to retrieve the Artifact for consumption, e.g. by another controller applying the Artifact contents.","type":"string"}}},"conditions":{"description":"Conditions holds the conditions for the GitRepository.","type":"array","items":{"description":"Condition contains details for one aspect of the current state of this API Resource. --- This struct is intended for direct use as an array at the field path .status.conditions.  For example, \n type FooStatus struct{ // Represents the observations of a foo's current state. // Known .status.conditions.type are: \"Available\", \"Progressing\", and \"Degraded\" // +patchMergeKey=type // +patchStrategy=merge // +listType=map // +listMapKey=type Conditions []metav1.Condition `json:\"conditions,omitempty\" patchStrategy:\"merge\" patchMergeKey:\"type\" protobuf:\"bytes,1,rep,name=conditions\"` \n // other fields }","type":"object","required":["lastTransitionTime","message","reason","status","type"],"properties":{"lastTransitionTime":{"description":"lastTransitionTime is the last time the condition transitioned from one status to another. This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.","type":"string","format":"date-time"},"message":{"description":"message is a human readable message indicating details about the transition. This may be an empty string.","type":"string","maxLength":32768},"observedGeneration":{"description":"observedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.","type":"integer","format":"int64","minimum":0},"reason":{"description":"reason contains a programmatic identifier indicating the reason for the condition's last transition. Producers of specific condition types may define expected values and meanings for this field, and whether the values are considered a guaranteed API. The value should be a CamelCase string. This field may not be empty.","type":"string","maxLength":1024,"minLength":1,"pattern":"^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$"},"status":{"description":"status of the condition, one of True, False, Unknown.","type":"string","enum":["True","False","Unknown"]},"type":{"description":"type of condition in CamelCase or in foo.example.com/CamelCase. --- Many .condition.type values are consistent across resources like Available, but because arbitrary conditions can be useful (see .node.status.conditions), the ability to deconflict is important. The regex it matches is (dns1123SubdomainFmt/)?(qualifiedNameFmt)","type":"string","maxLength":316,"pattern":"^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$"}}}},"includedArtifacts":{"description":"IncludedArtifacts contains a list of the last successfully included Artifacts as instructed by GitRepositorySpec.Include.","type":"array","items":{"description":"Artifact represents the output of a Source reconciliation.","type":"object","required":["lastUpdateTime","path","revision","url"],"properties":{"digest":{"description":"Digest is the digest of the file in the form of '<algorithm>:<checksum>'.","type":"string","pattern":"^[a-z0-9]+(?:[.+_-][a-z0-9]+)*:[a-zA-Z0-9=_-]+$"},"lastUpdateTime":{"description":"LastUpdateTime is the timestamp corresponding to the last update of the Artifact.","type":"string","format":"date-time"},"metadata":{"description":"Metadata holds upstream information such as OCI annotations.","type":"object","additionalProperties":{"type":"string"}},"path":{"description":"Path is the relative file path of the Artifact. It can be used to locate the file in the root of the Artifact storage on the local file system of the controller managing the Source.","type":"string"},"revision":{"description":"Revision is a human-readable identifier traceable in the origin source system. It can be a Git commit SHA, Git tag, a Helm chart version, etc.","type":"string"},"size":{"description":"Size is the number of bytes in the file.","type":"integer","format":"int64"},"url":{"description":"URL is the HTTP address of the Artifact as exposed by the controller managing the Source. It can be used to retrieve the Artifact for consumption, e.g. by another controller applying the Artifact contents.","type":"string"}}}},"lastHandledReconcileAt":{"description":"LastHandledReconcileAt holds the value of the most recent reconcile request value, so a change of the annotation value can be detected.","type":"string"},"observedGeneration":{"description":"ObservedGeneration is the last observed generation of the GitRepository object.","type":"integer","format":"int64"},"observedIgnore":{"description":"ObservedIgnore is the observed exclusion patterns used for constructing the source artifact.","type":"string"},"observedInclude":{"description":"ObservedInclude is the observed list of GitRepository resources used to produce the current Artifact.","type":"array","items":{"description":"GitRepositoryInclude specifies a local reference to a GitRepository which Artifact (sub-)contents must be included, and where they should be placed.","type":"object","required":["repository"],"properties":{"fromPath":{"description":"FromPath specifies the path to copy contents from, defaults to the root of the Artifact.","type":"string"},"repository":{"description":"GitRepositoryRef specifies the GitRepository which Artifact contents must be included.","type":"object","required":["name"],"properties":{"name":{"description":"Name of the referent.","type":"string"}}},"toPath":{"description":"ToPath specifies the path to copy contents to, defaults to the name of the GitRepositoryRef.","type":"string"}}}},"observedRecurseSubmodules":{"description":"ObservedRecurseSubmodules is the observed resource submodules configuration used to produce the current Artifact.","type":"boolean"}}}},"x-kubernetes-group-version-kind":[{"group":"source.toolkit.fluxcd.io","kind":"GitRepository","version":"v1"}]};

export function useGitRepository() {
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
    onNotGitRepositoryFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].fluxcdGitRepository == null) {
        const matched = router.currentRoute.value.matched
        notifyError('GitRepository not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'fluxcdGitRepositoryView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'fluxcdGitRepositoryView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'fluxcdGitRepositoryEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'fluxcdGitRepositoryCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> GitRepository <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}