type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface K8upPreBackupPodSpecPodMetadata {
}
export interface K8upPreBackupPodSpecPodSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  "matchFields": Array<K8upPreBackupPodSpecPodSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "preference": K8upPreBackupPodSpecPodSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  "weight": number
}
export interface K8upPreBackupPodSpecPodSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  "matchFields": Array<K8upPreBackupPodSpecPodSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  "nodeSelectorTerms": Array<K8upPreBackupPodSpecPodSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface K8upPreBackupPodSpecPodSpecAffinityNodeAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<K8upPreBackupPodSpecPodSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": K8upPreBackupPodSpecPodSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<K8upPreBackupPodSpecPodSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<K8upPreBackupPodSpecPodSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface K8upPreBackupPodSpecPodSpecAffinity {
  "nodeAffinity": K8upPreBackupPodSpecPodSpecAffinityNodeAffinity | undefined
  "podAffinity": K8upPreBackupPodSpecPodSpecAffinityPodAffinity | undefined
  "podAntiAffinity": K8upPreBackupPodSpecPodSpecAffinityPodAntiAffinity | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface K8upPreBackupPodSpecPodSpecContainersItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface K8upPreBackupPodSpecPodSpecContainersItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemEnvItemValueFrom {
  "configMapKeyRef": K8upPreBackupPodSpecPodSpecContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": K8upPreBackupPodSpecPodSpecContainersItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": K8upPreBackupPodSpecPodSpecContainersItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": K8upPreBackupPodSpecPodSpecContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": K8upPreBackupPodSpecPodSpecContainersItemEnvItemValueFrom | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemEnvFromItem {
  "configMapRef": K8upPreBackupPodSpecPodSpecContainersItemEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": K8upPreBackupPodSpecPodSpecContainersItemEnvFromItemSecretRef | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecyclePostStartExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecyclePostStartHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecyclePostStartTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecyclePostStart {
  "exec": K8upPreBackupPodSpecPodSpecContainersItemLifecyclePostStartExec | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecContainersItemLifecyclePostStartHttpGet | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecyclePreStopExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecyclePreStopHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecyclePreStopTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecyclePreStop {
  "exec": K8upPreBackupPodSpecPodSpecContainersItemLifecyclePreStopExec | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecContainersItemLifecyclePreStopHttpGet | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLifecycle {
  "postStart": K8upPreBackupPodSpecPodSpecContainersItemLifecyclePostStart | undefined
  "preStop": K8upPreBackupPodSpecPodSpecContainersItemLifecyclePreStop | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecContainersItemLivenessProbe {
  "exec": K8upPreBackupPodSpecPodSpecContainersItemLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": K8upPreBackupPodSpecPodSpecContainersItemLivenessProbeGrpc | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecContainersItemLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecContainersItemLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemPortsItem {
  "containerPort": number
  "hostIP": string | undefined
  "hostPort": number | undefined
  "name": string | undefined
  "protocol": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecContainersItemReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecContainersItemReadinessProbe {
  "exec": K8upPreBackupPodSpecPodSpecContainersItemReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": K8upPreBackupPodSpecPodSpecContainersItemReadinessProbeGrpc | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecContainersItemReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecContainersItemReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemResourcesLimits {
}
export interface K8upPreBackupPodSpecPodSpecContainersItemResourcesRequests {
}
export interface K8upPreBackupPodSpecPodSpecContainersItemResources {
  "limits": K8upPreBackupPodSpecPodSpecContainersItemResourcesLimits | undefined
  "requests": K8upPreBackupPodSpecPodSpecContainersItemResourcesRequests | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface K8upPreBackupPodSpecPodSpecContainersItemSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": K8upPreBackupPodSpecPodSpecContainersItemSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": K8upPreBackupPodSpecPodSpecContainersItemSecurityContextSeLinuxOptions | undefined
  "seccompProfile": K8upPreBackupPodSpecPodSpecContainersItemSecurityContextSeccompProfile | undefined
  "windowsOptions": K8upPreBackupPodSpecPodSpecContainersItemSecurityContextWindowsOptions | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemStartupProbeExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemStartupProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemStartupProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecContainersItemStartupProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemStartupProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecContainersItemStartupProbe {
  "exec": K8upPreBackupPodSpecPodSpecContainersItemStartupProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": K8upPreBackupPodSpecPodSpecContainersItemStartupProbeGrpc | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecContainersItemStartupProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecContainersItemStartupProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItemVolumeDevicesItem {
  "devicePath": string
  "name": string
}
export interface K8upPreBackupPodSpecPodSpecContainersItemVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecContainersItem {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<K8upPreBackupPodSpecPodSpecContainersItemEnvItem> | undefined
  "envFrom": Array<K8upPreBackupPodSpecPodSpecContainersItemEnvFromItem> | undefined
  "image": string | undefined
  "imagePullPolicy": string | undefined
  "lifecycle": K8upPreBackupPodSpecPodSpecContainersItemLifecycle | undefined
  "livenessProbe": K8upPreBackupPodSpecPodSpecContainersItemLivenessProbe | undefined
  "name": string
  "ports": Array<K8upPreBackupPodSpecPodSpecContainersItemPortsItem> | undefined
  "readinessProbe": K8upPreBackupPodSpecPodSpecContainersItemReadinessProbe | undefined
  "resources": K8upPreBackupPodSpecPodSpecContainersItemResources | undefined
  "securityContext": K8upPreBackupPodSpecPodSpecContainersItemSecurityContext | undefined
  "startupProbe": K8upPreBackupPodSpecPodSpecContainersItemStartupProbe | undefined
  "stdin": boolean | undefined
  "stdinOnce": boolean | undefined
  "terminationMessagePath": string | undefined
  "terminationMessagePolicy": string | undefined
  "tty": boolean | undefined
  "volumeDevices": Array<K8upPreBackupPodSpecPodSpecContainersItemVolumeDevicesItem> | undefined
  "volumeMounts": Array<K8upPreBackupPodSpecPodSpecContainersItemVolumeMountsItem> | undefined
  "workingDir": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecDnsConfigOptionsItem {
  "name": string | undefined
  "value": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecDnsConfig {
  "nameservers": Array<string> | undefined
  "options": Array<K8upPreBackupPodSpecPodSpecDnsConfigOptionsItem> | undefined
  "searches": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItemValueFrom {
  "configMapKeyRef": K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItemValueFrom | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvFromItem {
  "configMapRef": K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvFromItemSecretRef | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePostStartExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePostStartHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePostStartTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePostStart {
  "exec": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePostStartExec | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePostStartHttpGet | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePreStopExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePreStopHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePreStopTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePreStop {
  "exec": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePreStopExec | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePreStopHttpGet | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecycle {
  "postStart": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePostStart | undefined
  "preStop": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecyclePreStop | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbe {
  "exec": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbeGrpc | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemPortsItem {
  "containerPort": number
  "hostIP": string | undefined
  "hostPort": number | undefined
  "name": string | undefined
  "protocol": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbe {
  "exec": K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbeGrpc | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemResourcesLimits {
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemResourcesRequests {
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemResources {
  "limits": K8upPreBackupPodSpecPodSpecEphemeralContainersItemResourcesLimits | undefined
  "requests": K8upPreBackupPodSpecPodSpecEphemeralContainersItemResourcesRequests | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": K8upPreBackupPodSpecPodSpecEphemeralContainersItemSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": K8upPreBackupPodSpecPodSpecEphemeralContainersItemSecurityContextSeLinuxOptions | undefined
  "seccompProfile": K8upPreBackupPodSpecPodSpecEphemeralContainersItemSecurityContextSeccompProfile | undefined
  "windowsOptions": K8upPreBackupPodSpecPodSpecEphemeralContainersItemSecurityContextWindowsOptions | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbeExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbe {
  "exec": K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbeGrpc | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemVolumeDevicesItem {
  "devicePath": string
  "name": string
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItemVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecEphemeralContainersItem {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvItem> | undefined
  "envFrom": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItemEnvFromItem> | undefined
  "image": string | undefined
  "imagePullPolicy": string | undefined
  "lifecycle": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLifecycle | undefined
  "livenessProbe": K8upPreBackupPodSpecPodSpecEphemeralContainersItemLivenessProbe | undefined
  "name": string
  "ports": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItemPortsItem> | undefined
  "readinessProbe": K8upPreBackupPodSpecPodSpecEphemeralContainersItemReadinessProbe | undefined
  "resources": K8upPreBackupPodSpecPodSpecEphemeralContainersItemResources | undefined
  "securityContext": K8upPreBackupPodSpecPodSpecEphemeralContainersItemSecurityContext | undefined
  "startupProbe": K8upPreBackupPodSpecPodSpecEphemeralContainersItemStartupProbe | undefined
  "stdin": boolean | undefined
  "stdinOnce": boolean | undefined
  "targetContainerName": string | undefined
  "terminationMessagePath": string | undefined
  "terminationMessagePolicy": string | undefined
  "tty": boolean | undefined
  "volumeDevices": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItemVolumeDevicesItem> | undefined
  "volumeMounts": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItemVolumeMountsItem> | undefined
  "workingDir": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecHostAliasesItem {
  "hostnames": Array<string> | undefined
  "ip": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecImagePullSecretsItem {
  "name": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemEnvItemValueFrom {
  "configMapKeyRef": K8upPreBackupPodSpecPodSpecInitContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": K8upPreBackupPodSpecPodSpecInitContainersItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": K8upPreBackupPodSpecPodSpecInitContainersItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": K8upPreBackupPodSpecPodSpecInitContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": K8upPreBackupPodSpecPodSpecInitContainersItemEnvItemValueFrom | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemEnvFromItem {
  "configMapRef": K8upPreBackupPodSpecPodSpecInitContainersItemEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": K8upPreBackupPodSpecPodSpecInitContainersItemEnvFromItemSecretRef | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePostStartExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePostStartHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePostStartTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePostStart {
  "exec": K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePostStartExec | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePostStartHttpGet | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePreStopExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePreStopHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePreStopTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePreStop {
  "exec": K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePreStopExec | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePreStopHttpGet | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLifecycle {
  "postStart": K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePostStart | undefined
  "preStop": K8upPreBackupPodSpecPodSpecInitContainersItemLifecyclePreStop | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbe {
  "exec": K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbeGrpc | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemPortsItem {
  "containerPort": number
  "hostIP": string | undefined
  "hostPort": number | undefined
  "name": string | undefined
  "protocol": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbe {
  "exec": K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbeGrpc | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemResourcesLimits {
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemResourcesRequests {
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemResources {
  "limits": K8upPreBackupPodSpecPodSpecInitContainersItemResourcesLimits | undefined
  "requests": K8upPreBackupPodSpecPodSpecInitContainersItemResourcesRequests | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": K8upPreBackupPodSpecPodSpecInitContainersItemSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": K8upPreBackupPodSpecPodSpecInitContainersItemSecurityContextSeLinuxOptions | undefined
  "seccompProfile": K8upPreBackupPodSpecPodSpecInitContainersItemSecurityContextSeccompProfile | undefined
  "windowsOptions": K8upPreBackupPodSpecPodSpecInitContainersItemSecurityContextWindowsOptions | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbeExec {
  "command": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbe {
  "exec": K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbeGrpc | undefined
  "httpGet": K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemVolumeDevicesItem {
  "devicePath": string
  "name": string
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItemVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecInitContainersItem {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<K8upPreBackupPodSpecPodSpecInitContainersItemEnvItem> | undefined
  "envFrom": Array<K8upPreBackupPodSpecPodSpecInitContainersItemEnvFromItem> | undefined
  "image": string | undefined
  "imagePullPolicy": string | undefined
  "lifecycle": K8upPreBackupPodSpecPodSpecInitContainersItemLifecycle | undefined
  "livenessProbe": K8upPreBackupPodSpecPodSpecInitContainersItemLivenessProbe | undefined
  "name": string
  "ports": Array<K8upPreBackupPodSpecPodSpecInitContainersItemPortsItem> | undefined
  "readinessProbe": K8upPreBackupPodSpecPodSpecInitContainersItemReadinessProbe | undefined
  "resources": K8upPreBackupPodSpecPodSpecInitContainersItemResources | undefined
  "securityContext": K8upPreBackupPodSpecPodSpecInitContainersItemSecurityContext | undefined
  "startupProbe": K8upPreBackupPodSpecPodSpecInitContainersItemStartupProbe | undefined
  "stdin": boolean | undefined
  "stdinOnce": boolean | undefined
  "terminationMessagePath": string | undefined
  "terminationMessagePolicy": string | undefined
  "tty": boolean | undefined
  "volumeDevices": Array<K8upPreBackupPodSpecPodSpecInitContainersItemVolumeDevicesItem> | undefined
  "volumeMounts": Array<K8upPreBackupPodSpecPodSpecInitContainersItemVolumeMountsItem> | undefined
  "workingDir": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecNodeSelector {
}
export interface K8upPreBackupPodSpecPodSpecOs {
  "name": string
}
export interface K8upPreBackupPodSpecPodSpecOverhead {
}
export interface K8upPreBackupPodSpecPodSpecReadinessGatesItem {
  "conditionType": string
}
export interface K8upPreBackupPodSpecPodSpecSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface K8upPreBackupPodSpecPodSpecSecurityContextSysctlsItem {
  "name": string
  "value": string
}
export interface K8upPreBackupPodSpecPodSpecSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecSecurityContext {
  "fsGroup": number | undefined
  "fsGroupChangePolicy": string | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": K8upPreBackupPodSpecPodSpecSecurityContextSeLinuxOptions | undefined
  "seccompProfile": K8upPreBackupPodSpecPodSpecSecurityContextSeccompProfile | undefined
  "supplementalGroups": Array<number> | undefined
  "sysctls": Array<K8upPreBackupPodSpecPodSpecSecurityContextSysctlsItem> | undefined
  "windowsOptions": K8upPreBackupPodSpecPodSpecSecurityContextWindowsOptions | undefined
}
export interface K8upPreBackupPodSpecPodSpecTolerationsItem {
  "effect": string | undefined
  "key": string | undefined
  "operator": string | undefined
  "tolerationSeconds": number | undefined
  "value": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels {
}
export interface K8upPreBackupPodSpecPodSpecTopologySpreadConstraintsItemLabelSelector {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": K8upPreBackupPodSpecPodSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels | undefined
}
export interface K8upPreBackupPodSpecPodSpecTopologySpreadConstraintsItem {
  "labelSelector": K8upPreBackupPodSpecPodSpecTopologySpreadConstraintsItemLabelSelector | undefined
  "matchLabelKeys": Array<string> | undefined
  "maxSkew": number
  "minDomains": number | undefined
  "nodeAffinityPolicy": string | undefined
  "nodeTaintsPolicy": string | undefined
  "topologyKey": string
  "whenUnsatisfiable": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemAwsElasticBlockStore {
  "fsType": string | undefined
  "partition": number | undefined
  "readOnly": boolean | undefined
  "volumeID": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemAzureDisk {
  "cachingMode": string | undefined
  "diskName": string
  "diskURI": string
  "fsType": string | undefined
  "kind": string | undefined
  "readOnly": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemAzureFile {
  "readOnly": boolean | undefined
  "secretName": string
  "shareName": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemCephfsSecretRef {
  "name": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemCephfs {
  "monitors": Array<string>
  "path": string | undefined
  "readOnly": boolean | undefined
  "secretFile": string | undefined
  "secretRef": K8upPreBackupPodSpecPodSpecVolumesItemCephfsSecretRef | undefined
  "user": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemCinderSecretRef {
  "name": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemCinder {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "secretRef": K8upPreBackupPodSpecPodSpecVolumesItemCinderSecretRef | undefined
  "volumeID": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemConfigMap {
  "defaultMode": number | undefined
  "items": Array<K8upPreBackupPodSpecPodSpecVolumesItemConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemCsiNodePublishSecretRef {
  "name": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemCsiVolumeAttributes {
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemCsi {
  "driver": string
  "fsType": string | undefined
  "nodePublishSecretRef": K8upPreBackupPodSpecPodSpecVolumesItemCsiNodePublishSecretRef | undefined
  "readOnly": boolean | undefined
  "volumeAttributes": K8upPreBackupPodSpecPodSpecVolumesItemCsiVolumeAttributes | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemDownwardAPIItemsItem {
  "fieldRef": K8upPreBackupPodSpecPodSpecVolumesItemDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": K8upPreBackupPodSpecPodSpecVolumesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemDownwardAPI {
  "defaultMode": number | undefined
  "items": Array<K8upPreBackupPodSpecPodSpecVolumesItemDownwardAPIItemsItem> | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEmptyDir {
  "medium": string | undefined
  "sizeLimit": object | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateMetadata {
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources {
  "limits": K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources | undefined
  "selector": K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplate {
  "metadata": K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateMetadata | undefined
  "spec": K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplateSpec
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemEphemeral {
  "volumeClaimTemplate": K8upPreBackupPodSpecPodSpecVolumesItemEphemeralVolumeClaimTemplate | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemFc {
  "fsType": string | undefined
  "lun": number | undefined
  "readOnly": boolean | undefined
  "targetWWNs": Array<string> | undefined
  "wwids": Array<string> | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemFlexVolumeOptions {
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemFlexVolumeSecretRef {
  "name": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemFlexVolume {
  "driver": string
  "fsType": string | undefined
  "options": K8upPreBackupPodSpecPodSpecVolumesItemFlexVolumeOptions | undefined
  "readOnly": boolean | undefined
  "secretRef": K8upPreBackupPodSpecPodSpecVolumesItemFlexVolumeSecretRef | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemFlocker {
  "datasetName": string | undefined
  "datasetUUID": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemGcePersistentDisk {
  "fsType": string | undefined
  "partition": number | undefined
  "pdName": string
  "readOnly": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemGitRepo {
  "directory": string | undefined
  "repository": string
  "revision": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemGlusterfs {
  "endpoints": string
  "path": string
  "readOnly": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemHostPath {
  "path": string
  "type": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemIscsiSecretRef {
  "name": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemIscsi {
  "chapAuthDiscovery": boolean | undefined
  "chapAuthSession": boolean | undefined
  "fsType": string | undefined
  "initiatorName": string | undefined
  "iqn": string
  "iscsiInterface": string | undefined
  "lun": number
  "portals": Array<string> | undefined
  "readOnly": boolean | undefined
  "secretRef": K8upPreBackupPodSpecPodSpecVolumesItemIscsiSecretRef | undefined
  "targetPortal": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemNfs {
  "path": string
  "readOnly": boolean | undefined
  "server": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemPersistentVolumeClaim {
  "claimName": string
  "readOnly": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemPhotonPersistentDisk {
  "fsType": string | undefined
  "pdID": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemPortworxVolume {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "volumeID": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemConfigMap {
  "items": Array<K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem {
  "fieldRef": K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemDownwardAPI {
  "items": Array<K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemSecret {
  "items": Array<K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemSecretItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemServiceAccountToken {
  "audience": string | undefined
  "expirationSeconds": number | undefined
  "path": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItem {
  "configMap": K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemConfigMap | undefined
  "downwardAPI": K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemDownwardAPI | undefined
  "secret": K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemSecret | undefined
  "serviceAccountToken": K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItemServiceAccountToken | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemProjected {
  "defaultMode": number | undefined
  "sources": Array<K8upPreBackupPodSpecPodSpecVolumesItemProjectedSourcesItem> | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemQuobyte {
  "group": string | undefined
  "readOnly": boolean | undefined
  "registry": string
  "tenant": string | undefined
  "user": string | undefined
  "volume": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemRbdSecretRef {
  "name": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemRbd {
  "fsType": string | undefined
  "image": string
  "keyring": string | undefined
  "monitors": Array<string>
  "pool": string | undefined
  "readOnly": boolean | undefined
  "secretRef": K8upPreBackupPodSpecPodSpecVolumesItemRbdSecretRef | undefined
  "user": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemScaleIOSecretRef {
  "name": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemScaleIO {
  "fsType": string | undefined
  "gateway": string
  "protectionDomain": string | undefined
  "readOnly": boolean | undefined
  "secretRef": K8upPreBackupPodSpecPodSpecVolumesItemScaleIOSecretRef
  "sslEnabled": boolean | undefined
  "storageMode": string | undefined
  "storagePool": string | undefined
  "system": string
  "volumeName": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemSecret {
  "defaultMode": number | undefined
  "items": Array<K8upPreBackupPodSpecPodSpecVolumesItemSecretItemsItem> | undefined
  "optional": boolean | undefined
  "secretName": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemStorageosSecretRef {
  "name": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemStorageos {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "secretRef": K8upPreBackupPodSpecPodSpecVolumesItemStorageosSecretRef | undefined
  "volumeName": string | undefined
  "volumeNamespace": string | undefined
}
export interface K8upPreBackupPodSpecPodSpecVolumesItemVsphereVolume {
  "fsType": string | undefined
  "storagePolicyID": string | undefined
  "storagePolicyName": string | undefined
  "volumePath": string
}
export interface K8upPreBackupPodSpecPodSpecVolumesItem {
  "awsElasticBlockStore": K8upPreBackupPodSpecPodSpecVolumesItemAwsElasticBlockStore | undefined
  "azureDisk": K8upPreBackupPodSpecPodSpecVolumesItemAzureDisk | undefined
  "azureFile": K8upPreBackupPodSpecPodSpecVolumesItemAzureFile | undefined
  "cephfs": K8upPreBackupPodSpecPodSpecVolumesItemCephfs | undefined
  "cinder": K8upPreBackupPodSpecPodSpecVolumesItemCinder | undefined
  "configMap": K8upPreBackupPodSpecPodSpecVolumesItemConfigMap | undefined
  "csi": K8upPreBackupPodSpecPodSpecVolumesItemCsi | undefined
  "downwardAPI": K8upPreBackupPodSpecPodSpecVolumesItemDownwardAPI | undefined
  "emptyDir": K8upPreBackupPodSpecPodSpecVolumesItemEmptyDir | undefined
  "ephemeral": K8upPreBackupPodSpecPodSpecVolumesItemEphemeral | undefined
  "fc": K8upPreBackupPodSpecPodSpecVolumesItemFc | undefined
  "flexVolume": K8upPreBackupPodSpecPodSpecVolumesItemFlexVolume | undefined
  "flocker": K8upPreBackupPodSpecPodSpecVolumesItemFlocker | undefined
  "gcePersistentDisk": K8upPreBackupPodSpecPodSpecVolumesItemGcePersistentDisk | undefined
  "gitRepo": K8upPreBackupPodSpecPodSpecVolumesItemGitRepo | undefined
  "glusterfs": K8upPreBackupPodSpecPodSpecVolumesItemGlusterfs | undefined
  "hostPath": K8upPreBackupPodSpecPodSpecVolumesItemHostPath | undefined
  "iscsi": K8upPreBackupPodSpecPodSpecVolumesItemIscsi | undefined
  "name": string
  "nfs": K8upPreBackupPodSpecPodSpecVolumesItemNfs | undefined
  "persistentVolumeClaim": K8upPreBackupPodSpecPodSpecVolumesItemPersistentVolumeClaim | undefined
  "photonPersistentDisk": K8upPreBackupPodSpecPodSpecVolumesItemPhotonPersistentDisk | undefined
  "portworxVolume": K8upPreBackupPodSpecPodSpecVolumesItemPortworxVolume | undefined
  "projected": K8upPreBackupPodSpecPodSpecVolumesItemProjected | undefined
  "quobyte": K8upPreBackupPodSpecPodSpecVolumesItemQuobyte | undefined
  "rbd": K8upPreBackupPodSpecPodSpecVolumesItemRbd | undefined
  "scaleIO": K8upPreBackupPodSpecPodSpecVolumesItemScaleIO | undefined
  "secret": K8upPreBackupPodSpecPodSpecVolumesItemSecret | undefined
  "storageos": K8upPreBackupPodSpecPodSpecVolumesItemStorageos | undefined
  "vsphereVolume": K8upPreBackupPodSpecPodSpecVolumesItemVsphereVolume | undefined
}
export interface K8upPreBackupPodSpecPodSpec {
  "activeDeadlineSeconds": number | undefined
  "affinity": K8upPreBackupPodSpecPodSpecAffinity | undefined
  "automountServiceAccountToken": boolean | undefined
  "containers": Array<K8upPreBackupPodSpecPodSpecContainersItem>
  "dnsConfig": K8upPreBackupPodSpecPodSpecDnsConfig | undefined
  "dnsPolicy": string | undefined
  "enableServiceLinks": boolean | undefined
  "ephemeralContainers": Array<K8upPreBackupPodSpecPodSpecEphemeralContainersItem> | undefined
  "hostAliases": Array<K8upPreBackupPodSpecPodSpecHostAliasesItem> | undefined
  "hostIPC": boolean | undefined
  "hostNetwork": boolean | undefined
  "hostPID": boolean | undefined
  "hostUsers": boolean | undefined
  "hostname": string | undefined
  "imagePullSecrets": Array<K8upPreBackupPodSpecPodSpecImagePullSecretsItem> | undefined
  "initContainers": Array<K8upPreBackupPodSpecPodSpecInitContainersItem> | undefined
  "nodeName": string | undefined
  "nodeSelector": K8upPreBackupPodSpecPodSpecNodeSelector | undefined
  "os": K8upPreBackupPodSpecPodSpecOs | undefined
  "overhead": K8upPreBackupPodSpecPodSpecOverhead | undefined
  "preemptionPolicy": string | undefined
  "priority": number | undefined
  "priorityClassName": string | undefined
  "readinessGates": Array<K8upPreBackupPodSpecPodSpecReadinessGatesItem> | undefined
  "restartPolicy": string | undefined
  "runtimeClassName": string | undefined
  "schedulerName": string | undefined
  "securityContext": K8upPreBackupPodSpecPodSpecSecurityContext | undefined
  "serviceAccount": string | undefined
  "serviceAccountName": string | undefined
  "setHostnameAsFQDN": boolean | undefined
  "shareProcessNamespace": boolean | undefined
  "subdomain": string | undefined
  "terminationGracePeriodSeconds": number | undefined
  "tolerations": Array<K8upPreBackupPodSpecPodSpecTolerationsItem> | undefined
  "topologySpreadConstraints": Array<K8upPreBackupPodSpecPodSpecTopologySpreadConstraintsItem> | undefined
  "volumes": Array<K8upPreBackupPodSpecPodSpecVolumesItem> | undefined
}
export interface K8upPreBackupPodSpecPod {
  "metadata": K8upPreBackupPodSpecPodMetadata | undefined
  "spec": K8upPreBackupPodSpecPodSpec | undefined
}
export interface K8upPreBackupPodSpec {
  "backupCommand": string | undefined
  "fileExtension": string | undefined
  "pod": K8upPreBackupPodSpecPod | undefined
}
export interface K8upPreBackupPod extends KubernetesObject {
  spec: K8upPreBackupPodSpec
}
export type K8upPreBackupPodList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<K8upPreBackupPod>
