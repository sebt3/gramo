import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { ImageUpdateAutomationListExcludes, ImageUpdateAutomationReadExcludes, ImageUpdateAutomationSimpleExcludes } from './custom.js'
import { extraImageUpdateAutomationColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const ImageUpdateAutomationColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraImageUpdateAutomationColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const ImageUpdateAutomationAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(ImageUpdateAutomationColumns);

export const ImageUpdateAutomationDefinition = {"description":"ImageUpdateAutomation is the Schema for the imageupdateautomations API","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"ImageUpdateAutomationSpec defines the desired state of ImageUpdateAutomation","type":"object","required":["interval","sourceRef"],"properties":{"git":{"description":"GitSpec contains all the git-specific definitions. This is technically optional, but in practice mandatory until there are other kinds of source allowed.","type":"object","required":["commit"],"properties":{"checkout":{"description":"Checkout gives the parameters for cloning the git repository, ready to make changes. If not present, the `spec.ref` field from the referenced `GitRepository` or its default will be used.","type":"object","required":["ref"],"properties":{"ref":{"description":"Reference gives a branch, tag or commit to clone from the Git repository.","type":"object","properties":{"branch":{"description":"Branch to check out, defaults to 'master' if no other field is defined.","type":"string"},"commit":{"description":"Commit SHA to check out, takes precedence over all reference fields. \n This can be combined with Branch to shallow clone the branch, in which the commit is expected to exist.","type":"string"},"name":{"description":"Name of the reference to check out; takes precedence over Branch, Tag and SemVer. \n It must be a valid Git reference: https://git-scm.com/docs/git-check-ref-format#_description Examples: \"refs/heads/main\", \"refs/tags/v0.1.0\", \"refs/pull/420/head\", \"refs/merge-requests/1/head\"","type":"string"},"semver":{"description":"SemVer tag expression to check out, takes precedence over Tag.","type":"string"},"tag":{"description":"Tag to check out, takes precedence over Branch.","type":"string"}}}}},"commit":{"description":"Commit specifies how to commit to the git repository.","type":"object","required":["author"],"properties":{"author":{"description":"Author gives the email and optionally the name to use as the author of commits.","type":"object","required":["email"],"properties":{"email":{"description":"Email gives the email to provide when making a commit.","type":"string"},"name":{"description":"Name gives the name to provide when making a commit.","type":"string"}}},"messageTemplate":{"description":"MessageTemplate provides a template for the commit message, into which will be interpolated the details of the change made.","type":"string"},"signingKey":{"description":"SigningKey provides the option to sign commits with a GPG key","type":"object","properties":{"secretRef":{"description":"SecretRef holds the name to a secret that contains a 'git.asc' key corresponding to the ASCII Armored file containing the GPG signing keypair as the value. It must be in the same namespace as the ImageUpdateAutomation.","type":"object","required":["name"],"properties":{"name":{"description":"Name of the referent.","type":"string"}}}}}}},"push":{"description":"Push specifies how and where to push commits made by the automation. If missing, commits are pushed (back) to `.spec.checkout.branch` or its default.","type":"object","required":["branch"],"properties":{"branch":{"description":"Branch specifies that commits should be pushed to the branch named. The branch is created using `.spec.checkout.branch` as the starting point, if it doesn't already exist.","type":"string"}}}}},"interval":{"description":"Interval gives an lower bound for how often the automation run should be attempted.","type":"string","pattern":"^([0-9]+(\\.[0-9]+)?(ms|s|m|h))+$"},"sourceRef":{"description":"SourceRef refers to the resource giving access details to a git repository.","type":"object","required":["kind","name"],"properties":{"apiVersion":{"description":"API version of the referent.","type":"string"},"kind":{"description":"Kind of the referent.","type":"string","enum":["GitRepository"]},"name":{"description":"Name of the referent.","type":"string"},"namespace":{"description":"Namespace of the referent, defaults to the namespace of the Kubernetes resource object that contains the reference.","type":"string"}}},"suspend":{"description":"Suspend tells the controller to not run this automation, until it is unset (or set to false). Defaults to false.","type":"boolean"},"update":{"description":"Update gives the specification for how to update the files in the repository. This can be left empty, to use the default value.","type":"object","required":["strategy"],"properties":{"path":{"description":"Path to the directory containing the manifests to be updated. Defaults to 'None', which translates to the root path of the GitRepositoryRef.","type":"string"},"strategy":{"description":"Strategy names the strategy to be used.","type":"string","enum":["Setters"]}}}}},"status":{"description":"ImageUpdateAutomationStatus defines the observed state of ImageUpdateAutomation","type":"object","properties":{"conditions":{"type":"array","items":{"description":"Condition contains details for one aspect of the current state of this API Resource. --- This struct is intended for direct use as an array at the field path .status.conditions.  For example, \n type FooStatus struct{ // Represents the observations of a foo's current state. // Known .status.conditions.type are: \"Available\", \"Progressing\", and \"Degraded\" // +patchMergeKey=type // +patchStrategy=merge // +listType=map // +listMapKey=type Conditions []metav1.Condition `json:\"conditions,omitempty\" patchStrategy:\"merge\" patchMergeKey:\"type\" protobuf:\"bytes,1,rep,name=conditions\"` \n // other fields }","type":"object","required":["lastTransitionTime","message","reason","status","type"],"properties":{"lastTransitionTime":{"description":"lastTransitionTime is the last time the condition transitioned from one status to another. This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.","type":"string","format":"date-time"},"message":{"description":"message is a human readable message indicating details about the transition. This may be an empty string.","type":"string","maxLength":32768},"observedGeneration":{"description":"observedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.","type":"integer","format":"int64","minimum":0},"reason":{"description":"reason contains a programmatic identifier indicating the reason for the condition's last transition. Producers of specific condition types may define expected values and meanings for this field, and whether the values are considered a guaranteed API. The value should be a CamelCase string. This field may not be empty.","type":"string","maxLength":1024,"minLength":1,"pattern":"^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$"},"status":{"description":"status of the condition, one of True, False, Unknown.","type":"string","enum":["True","False","Unknown"]},"type":{"description":"type of condition in CamelCase or in foo.example.com/CamelCase. --- Many .condition.type values are consistent across resources like Available, but because arbitrary conditions can be useful (see .node.status.conditions), the ability to deconflict is important. The regex it matches is (dns1123SubdomainFmt/)?(qualifiedNameFmt)","type":"string","maxLength":316,"pattern":"^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$"}}}},"lastAutomationRunTime":{"description":"LastAutomationRunTime records the last time the controller ran this automation through to completion (even if no updates were made).","type":"string","format":"date-time"},"lastHandledReconcileAt":{"description":"LastHandledReconcileAt holds the value of the most recent reconcile request value, so a change of the annotation value can be detected.","type":"string"},"lastPushCommit":{"description":"LastPushCommit records the SHA1 of the last commit made by the controller, for this automation object","type":"string"},"lastPushTime":{"description":"LastPushTime records the time of the last pushed change.","type":"string","format":"date-time"},"observedGeneration":{"type":"integer","format":"int64"}}}},"x-kubernetes-group-version-kind":[{"group":"image.toolkit.fluxcd.io","kind":"ImageUpdateAutomation","version":"v1beta1"}]};

export function useImageUpdateAutomation() {
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
    onNotImageUpdateAutomationFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].fluxcdImageUpdateAutomation == null) {
        const matched = router.currentRoute.value.matched
        notifyError('ImageUpdateAutomation not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'fluxcdImageUpdateAutomationView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'fluxcdImageUpdateAutomationView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'fluxcdImageUpdateAutomationEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'fluxcdImageUpdateAutomationCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> ImageUpdateAutomation <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}