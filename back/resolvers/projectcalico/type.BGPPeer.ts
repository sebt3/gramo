type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoBGPPeerSpecPasswordSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface ProjectcalicoBGPPeerSpecPassword {
  "secretKeyRef": ProjectcalicoBGPPeerSpecPasswordSecretKeyRef | undefined
}
export interface ProjectcalicoBGPPeerSpec {
  "asNumber": number | undefined
  "keepOriginalNextHop": boolean | undefined
  "maxRestartTime": string | undefined
  "node": string | undefined
  "nodeSelector": string | undefined
  "numAllowedLocalASNumbers": number | undefined
  "password": ProjectcalicoBGPPeerSpecPassword | undefined
  "peerIP": string | undefined
  "peerSelector": string | undefined
  "reachableBy": string | undefined
  "sourceAddress": string | undefined
  "ttlSecurity": number | undefined
}
export interface ProjectcalicoBGPPeer extends KubernetesObject {
  spec: ProjectcalicoBGPPeerSpec
}
export type ProjectcalicoBGPPeerList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoBGPPeer>
