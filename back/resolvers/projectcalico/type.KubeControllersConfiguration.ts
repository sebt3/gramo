type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoKubeControllersConfigurationStatusEnvironmentVars {
}
export interface ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersNamespace {
  "reconcilerPeriod": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersNodeHostEndpoint {
  "autoCreate": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersNode {
  "hostEndpoint": ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersNodeHostEndpoint | undefined
  "leakGracePeriod": string | undefined
  "reconcilerPeriod": string | undefined
  "syncLabels": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersPolicy {
  "reconcilerPeriod": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersServiceAccount {
  "reconcilerPeriod": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersWorkloadEndpoint {
  "reconcilerPeriod": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllers {
  "namespace": ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersNamespace | undefined
  "node": ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersNode | undefined
  "policy": ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersPolicy | undefined
  "serviceAccount": ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersServiceAccount | undefined
  "workloadEndpoint": ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllersWorkloadEndpoint | undefined
}
export interface ProjectcalicoKubeControllersConfigurationStatusRunningConfig {
  "controllers": ProjectcalicoKubeControllersConfigurationStatusRunningConfigControllers
  "debugProfilePort": number | undefined
  "etcdV3CompactionPeriod": string | undefined
  "healthChecks": string | undefined
  "logSeverityScreen": string | undefined
  "prometheusMetricsPort": number | undefined
}
export interface ProjectcalicoKubeControllersConfigurationStatus {
  "environmentVars": ProjectcalicoKubeControllersConfigurationStatusEnvironmentVars | undefined
  "runningConfig": ProjectcalicoKubeControllersConfigurationStatusRunningConfig | undefined
}
export interface ProjectcalicoKubeControllersConfigurationSpecControllersNamespace {
  "reconcilerPeriod": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationSpecControllersNodeHostEndpoint {
  "autoCreate": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationSpecControllersNode {
  "hostEndpoint": ProjectcalicoKubeControllersConfigurationSpecControllersNodeHostEndpoint | undefined
  "leakGracePeriod": string | undefined
  "reconcilerPeriod": string | undefined
  "syncLabels": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationSpecControllersPolicy {
  "reconcilerPeriod": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationSpecControllersServiceAccount {
  "reconcilerPeriod": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationSpecControllersWorkloadEndpoint {
  "reconcilerPeriod": string | undefined
}
export interface ProjectcalicoKubeControllersConfigurationSpecControllers {
  "namespace": ProjectcalicoKubeControllersConfigurationSpecControllersNamespace | undefined
  "node": ProjectcalicoKubeControllersConfigurationSpecControllersNode | undefined
  "policy": ProjectcalicoKubeControllersConfigurationSpecControllersPolicy | undefined
  "serviceAccount": ProjectcalicoKubeControllersConfigurationSpecControllersServiceAccount | undefined
  "workloadEndpoint": ProjectcalicoKubeControllersConfigurationSpecControllersWorkloadEndpoint | undefined
}
export interface ProjectcalicoKubeControllersConfigurationSpec {
  "controllers": ProjectcalicoKubeControllersConfigurationSpecControllers
  "debugProfilePort": number | undefined
  "etcdV3CompactionPeriod": string | undefined
  "healthChecks": string | undefined
  "logSeverityScreen": string | undefined
  "prometheusMetricsPort": number | undefined
}
export interface ProjectcalicoKubeControllersConfiguration extends KubernetesObject {
  spec: ProjectcalicoKubeControllersConfigurationSpec
  status: ProjectcalicoKubeControllersConfigurationStatus | undefined
}
export type ProjectcalicoKubeControllersConfigurationList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoKubeControllersConfiguration>
