import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { RestoreListExcludes, RestoreReadExcludes, RestoreSimpleExcludes } from './custom.js'
import { extraRestoreColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const RestoreColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraRestoreColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const RestoreAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(RestoreColumns);

export const RestoreDefinition = {"description":"Restore is the Schema for the restores API","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"RestoreSpec can either contain an S3 restore point or a local one. For the local one you need to define an existing PVC.","type":"object","properties":{"activeDeadlineSeconds":{"description":"ActiveDeadlineSeconds specifies the duration in seconds relative to the startTime that the job may be continuously active before the system tries to terminate it. Value must be positive integer if given.","type":"integer","format":"int64"},"backend":{"description":"Backend contains the restic repo where the job should backup to.","type":"object","properties":{"azure":{"type":"object","properties":{"accountKeySecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"},"accountNameSecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"},"container":{"type":"string"}}},"b2":{"type":"object","properties":{"accountIDSecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"},"accountKeySecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"},"bucket":{"type":"string"},"path":{"type":"string"}}},"envFrom":{"description":"EnvFrom adds all environment variables from a an external source to the Restic job.","type":"array","items":{"description":"EnvFromSource represents the source of a set of ConfigMaps","type":"object","properties":{"configMapRef":{"description":"The ConfigMap to select from","type":"object","properties":{"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the ConfigMap must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"},"prefix":{"description":"An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.","type":"string"},"secretRef":{"description":"The Secret to select from","type":"object","properties":{"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"}}}},"gcs":{"type":"object","properties":{"accessTokenSecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"},"bucket":{"type":"string"},"projectIDSecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"}}},"local":{"type":"object","properties":{"mountPath":{"type":"string"}}},"repoPasswordSecretRef":{"description":"RepoPasswordSecretRef references a secret key to look up the restic repository password","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"},"rest":{"type":"object","properties":{"passwordSecretReg":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"},"url":{"type":"string"},"userSecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"}}},"s3":{"type":"object","properties":{"accessKeyIDSecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"},"bucket":{"type":"string"},"endpoint":{"type":"string"},"secretAccessKeySecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"}}},"swift":{"type":"object","properties":{"container":{"type":"string"},"path":{"type":"string"}}}}},"failedJobsHistoryLimit":{"description":"FailedJobsHistoryLimit amount of failed jobs to keep for later analysis. KeepJobs is used property is not specified.","type":"integer"},"keepJobs":{"description":"KeepJobs amount of jobs to keep for later analysis. \n Deprecated: Use FailedJobsHistoryLimit and SuccessfulJobsHistoryLimit respectively.","type":"integer"},"podSecurityContext":{"description":"PodSecurityContext describes the security context with which this action shall be executed.","type":"object","properties":{"fsGroup":{"description":"A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod: \n 1. The owning GID will be the FSGroup 2. The setgid bit is set (new files created in the volume will be owned by FSGroup) 3. The permission bits are OR'd with rw-rw---- \n If unset, the Kubelet will not modify the ownership and permissions of any volume. Note that this field cannot be set when spec.os.name is windows.","type":"integer","format":"int64"},"fsGroupChangePolicy":{"description":"fsGroupChangePolicy defines behavior of changing ownership and permission of the volume before being exposed inside Pod. This field will only apply to volume types which support fsGroup based ownership(and permissions). It will have no effect on ephemeral volume types such as: secret, configmaps and emptydir. Valid values are \"OnRootMismatch\" and \"Always\". If not specified, \"Always\" is used. Note that this field cannot be set when spec.os.name is windows.","type":"string"},"runAsGroup":{"description":"The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.","type":"integer","format":"int64"},"runAsNonRoot":{"description":"Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.","type":"boolean"},"runAsUser":{"description":"The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.","type":"integer","format":"int64"},"seLinuxOptions":{"description":"The SELinux context to be applied to all containers. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.","type":"object","properties":{"level":{"description":"Level is SELinux level label that applies to the container.","type":"string"},"role":{"description":"Role is a SELinux role label that applies to the container.","type":"string"},"type":{"description":"Type is a SELinux type label that applies to the container.","type":"string"},"user":{"description":"User is a SELinux user label that applies to the container.","type":"string"}}},"seccompProfile":{"description":"The seccomp options to use by the containers in this pod. Note that this field cannot be set when spec.os.name is windows.","type":"object","required":["type"],"properties":{"localhostProfile":{"description":"localhostProfile indicates a profile defined in a file on the node should be used. The profile must be preconfigured on the node to work. Must be a descending path, relative to the kubelet's configured seccomp profile location. Must only be set if type is \"Localhost\".","type":"string"},"type":{"description":"type indicates which kind of seccomp profile will be applied. Valid options are: \n Localhost - a profile defined in a file on the node should be used. RuntimeDefault - the container runtime default profile should be used. Unconfined - no profile should be applied.","type":"string"}}},"supplementalGroups":{"description":"A list of groups applied to the first process run in each container, in addition to the container's primary GID.  If unspecified, no groups will be added to any container. Note that this field cannot be set when spec.os.name is windows.","type":"array","items":{"type":"integer","format":"int64"}},"sysctls":{"description":"Sysctls hold a list of namespaced sysctls used for the pod. Pods with unsupported sysctls (by the container runtime) might fail to launch. Note that this field cannot be set when spec.os.name is windows.","type":"array","items":{"description":"Sysctl defines a kernel parameter to be set","type":"object","required":["name","value"],"properties":{"name":{"description":"Name of a property to set","type":"string"},"value":{"description":"Value of a property to set","type":"string"}}}},"windowsOptions":{"description":"The Windows specific settings applied to all containers. If unspecified, the options within a container's SecurityContext will be used. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is linux.","type":"object","properties":{"gmsaCredentialSpec":{"description":"GMSACredentialSpec is where the GMSA admission webhook (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the GMSA credential spec named by the GMSACredentialSpecName field.","type":"string"},"gmsaCredentialSpecName":{"description":"GMSACredentialSpecName is the name of the GMSA credential spec to use.","type":"string"},"hostProcess":{"description":"HostProcess determines if a container should be run as a 'Host Process' container. This field is alpha-level and will only be honored by components that enable the WindowsHostProcessContainers feature flag. Setting this field without the feature flag will result in errors when validating the Pod. All of a Pod's containers must have the same effective HostProcess value (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).  In addition, if HostProcess is true then HostNetwork must also be set to true.","type":"boolean"},"runAsUserName":{"description":"The UserName in Windows to run the entrypoint of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.","type":"string"}}}}},"resources":{"description":"Resources describes the compute resource requirements (cpu, memory, etc.)","type":"object","properties":{"limits":{"description":"Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/","type":"object","additionalProperties":{"pattern":"^(\\+|-)?(([0-9]+(\\.[0-9]*)?)|(\\.[0-9]+))(([KMGTPE]i)|[numkMGTPE]|([eE](\\+|-)?(([0-9]+(\\.[0-9]*)?)|(\\.[0-9]+))))?$","x-kubernetes-int-or-string":true}},"requests":{"description":"Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/","type":"object","additionalProperties":{"pattern":"^(\\+|-)?(([0-9]+(\\.[0-9]*)?)|(\\.[0-9]+))(([KMGTPE]i)|[numkMGTPE]|([eE](\\+|-)?(([0-9]+(\\.[0-9]*)?)|(\\.[0-9]+))))?$","x-kubernetes-int-or-string":true}}}},"restoreFilter":{"type":"string"},"restoreMethod":{"description":"RestoreMethod contains how and where the restore should happen all the settings are mutual exclusive.","type":"object","properties":{"folder":{"type":"object","required":["claimName"],"properties":{"claimName":{"description":"claimName is the name of a PersistentVolumeClaim in the same namespace as the pod using this volume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims","type":"string"},"readOnly":{"description":"readOnly Will force the ReadOnly setting in VolumeMounts. Default false.","type":"boolean"}}},"s3":{"type":"object","properties":{"accessKeyIDSecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"},"bucket":{"type":"string"},"endpoint":{"type":"string"},"secretAccessKeySecretRef":{"description":"SecretKeySelector selects a key of a Secret.","type":"object","required":["key"],"properties":{"key":{"description":"The key of the secret to select from.  Must be a valid secret key.","type":"string"},"name":{"description":"Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?","type":"string"},"optional":{"description":"Specify whether the Secret or its key must be defined","type":"boolean"}},"x-kubernetes-map-type":"atomic"}}}}},"snapshot":{"type":"string"},"successfulJobsHistoryLimit":{"description":"SuccessfulJobsHistoryLimit amount of successful jobs to keep for later analysis. KeepJobs is used property is not specified.","type":"integer"},"tags":{"description":"Tags is a list of arbitrary tags that get added to the backup via Restic's tagging system","type":"array","items":{"type":"string"}}}},"status":{"description":"Status defines the observed state of a generic K8up job. It is used for the operator to determine what to do.","type":"object","properties":{"conditions":{"description":"Conditions provide a standard mechanism for higher-level status reporting from a controller. They are an extension mechanism which allows tools and other controllers to collect summary information about resources without needing to understand resource-specific status details.","type":"array","items":{"description":"Condition contains details for one aspect of the current state of this API Resource. --- This struct is intended for direct use as an array at the field path .status.conditions.  For example, \n type FooStatus struct{ // Represents the observations of a foo's current state. // Known .status.conditions.type are: \"Available\", \"Progressing\", and \"Degraded\" // +patchMergeKey=type // +patchStrategy=merge // +listType=map // +listMapKey=type Conditions []metav1.Condition `json:\"conditions,omitempty\" patchStrategy:\"merge\" patchMergeKey:\"type\" protobuf:\"bytes,1,rep,name=conditions\"` \n // other fields }","type":"object","required":["lastTransitionTime","message","reason","status","type"],"properties":{"lastTransitionTime":{"description":"lastTransitionTime is the last time the condition transitioned from one status to another. This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.","type":"string","format":"date-time"},"message":{"description":"message is a human readable message indicating details about the transition. This may be an empty string.","type":"string","maxLength":32768},"observedGeneration":{"description":"observedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.","type":"integer","format":"int64","minimum":0},"reason":{"description":"reason contains a programmatic identifier indicating the reason for the condition's last transition. Producers of specific condition types may define expected values and meanings for this field, and whether the values are considered a guaranteed API. The value should be a CamelCase string. This field may not be empty.","type":"string","maxLength":1024,"minLength":1,"pattern":"^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$"},"status":{"description":"status of the condition, one of True, False, Unknown.","type":"string","enum":["True","False","Unknown"]},"type":{"description":"type of condition in CamelCase or in foo.example.com/CamelCase. --- Many .condition.type values are consistent across resources like Available, but because arbitrary conditions can be useful (see .node.status.conditions), the ability to deconflict is important. The regex it matches is (dns1123SubdomainFmt/)?(qualifiedNameFmt)","type":"string","maxLength":316,"pattern":"^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$"}}}},"exclusive":{"type":"boolean"},"finished":{"type":"boolean"},"started":{"type":"boolean"}}}},"x-kubernetes-group-version-kind":[{"group":"k8up.io","kind":"Restore","version":"v1"}]};

export function useRestore() {
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
    onNotRestoreFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].k8upRestore == null) {
        const matched = router.currentRoute.value.matched
        notifyError('Restore not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'k8upRestoreView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'k8upRestoreView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'k8upRestoreEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'k8upRestoreCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> Restore <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}