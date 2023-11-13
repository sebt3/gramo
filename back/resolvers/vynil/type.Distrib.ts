type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface VynilDistribStatus {
  components: object
  errors: Array<string> | undefined
  last_updated: string
}
export interface VynilDistribSpecLoginGit_credentials {
  key: string
  name: string
}
export interface VynilDistribSpecLoginSsh_key {
  key: string
  name: string
}
export interface VynilDistribSpecLogin {
  git_credentials: VynilDistribSpecLoginGit_credentials | undefined
  ssh_key: VynilDistribSpecLoginSsh_key | undefined
}
export interface VynilDistribSpec {
  branch: string | undefined
  insecure: boolean | undefined
  login: VynilDistribSpecLogin | undefined
  schedule: string
  url: string
}
export interface VynilDistrib extends KubernetesObject {
  spec: VynilDistribSpec
  status: VynilDistribStatus
}
export type VynilDistribList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<VynilDistrib>
