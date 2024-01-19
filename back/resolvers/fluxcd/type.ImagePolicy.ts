type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdImagePolicyStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface FluxcdImagePolicyStatus {
  "conditions": Array<FluxcdImagePolicyStatusConditionsItem> | undefined
  "latestImage": string | undefined
  "observedGeneration": number | undefined
  "observedPreviousImage": string | undefined
}
export interface FluxcdImagePolicySpecFilterTags {
  "extract": string | undefined
  "pattern": string | undefined
}
export interface FluxcdImagePolicySpecImageRepositoryRef {
  "name": string
  "namespace": string | undefined
}
export interface FluxcdImagePolicySpecPolicyAlphabetical {
  "order": string | undefined
}
export interface FluxcdImagePolicySpecPolicyNumerical {
  "order": string | undefined
}
export interface FluxcdImagePolicySpecPolicySemver {
  "range": string
}
export interface FluxcdImagePolicySpecPolicy {
  "alphabetical": FluxcdImagePolicySpecPolicyAlphabetical | undefined
  "numerical": FluxcdImagePolicySpecPolicyNumerical | undefined
  "semver": FluxcdImagePolicySpecPolicySemver | undefined
}
export interface FluxcdImagePolicySpec {
  "filterTags": FluxcdImagePolicySpecFilterTags | undefined
  "imageRepositoryRef": FluxcdImagePolicySpecImageRepositoryRef
  "policy": FluxcdImagePolicySpecPolicy
}
export interface FluxcdImagePolicy extends KubernetesObject {
  spec: FluxcdImagePolicySpec
  status: FluxcdImagePolicyStatus | undefined
}
export type FluxcdImagePolicyList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdImagePolicy>
