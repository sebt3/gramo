type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface VynilInstallStatus {
  commit_id: string
  digest: string
  errors: object | undefined
  last_updated: string
  plan: object | undefined
  status: string
  tfstate: object | undefined
}
export interface VynilInstallSpec {
  auto_upgrade: boolean | undefined
  category: string
  component: string
  distrib: string
  options: object | undefined
}
export interface VynilInstall extends KubernetesObject {
  spec: VynilInstallSpec
  status: VynilInstallStatus | undefined
}
export type VynilInstallList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<VynilInstall>
