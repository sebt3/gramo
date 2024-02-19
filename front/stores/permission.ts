import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { knowledge } from '../libs/knowledge'
import { onlyUnique } from '../libs/core'

interface permissionReviewNonResourceRules {
  nonResourceURLs: Array<string>
  verbs: Array<string>
}
interface permissionReviewResourceRules {
  apiGroups: Array<string>
  resourceNames: Array<string>
  resources: Array<string>
  verbs: Array<string>
}
export interface permissionReview {
  evaluationError: string
  incomplete: boolean
  nonResourceRules: Array<permissionReviewNonResourceRules>
  resourceRules: Array<permissionReviewResourceRules>
}
export interface permissionReviewNS {
  [key: string]: permissionReview
}
interface perms { namespace?: string, apiGroup: string, resource: string, verb: string }

export const usePermissionStore = defineStore('permission', () => {
  const inputs = ref({} as permissionReviewNS)
  const permissions = ref([] as perms[])
  const nsObject = knowledge.filter(o=>o.namespaced);
  function setPermissions(p:permissionReviewNS) {
    inputs.value = p
    const allPerms = Object.entries(p).map(([namespace,perms])=> perms.resourceRules.map(r=>r.apiGroups.map(apiGroup=>r.resources.map(resource=>r.verbs.map(verb=>{return {apiGroup,resource,verb,namespace} })).flat()).flat()).flat()
    .filter(p=>!['authorization.k8s.io','authentication.k8s.io'].includes(p.apiGroup) && p.resource != 'selfsubjectaccessreviews')
    .flat()).flat()
    permissions.value = (allPerms.filter(l=>l.apiGroup=='*'||l.resource=='*'||nsObject.filter(o=>o.apiGroup==l.apiGroup&&short2plural(o.short)==l.resource).length>0) as perms[]).concat(allPerms.filter(l=>nsObject.filter(o=>o.apiGroup==l.apiGroup&&short2plural(o.short)==l.resource).length==0).map(o=>`${o.apiGroup}_${o.resource}_${o.verb}`).filter(onlyUnique).map(i=>i.split('_')).map(([apiGroup,resource,verb])=>{return {apiGroup,resource,verb, namespace: undefined}}))
  }
  const namespaces = () => permissions.value.map(x=>x.namespace).filter(onlyUnique).filter(v=>v!=undefined) as string[]
  const short2plural = (short:string) => short.toLowerCase()+'s'
  const can = (verb:string, group:string, short:string, namespace?:string) => permissions.value
        .filter(p=>namespace==undefined||p.namespace==namespace)
        .reduce((res,perm) => res||((perm.verb=='*'||perm.verb==verb)&&(
          (perm.resource=='*' && perm.apiGroup=='*') ||
          (perm.resource=='*' && knowledge.filter(o=>o.group==group&&o.short==short&&perm.apiGroup==o.apiGroup).length>0) ||
          (knowledge.filter(o=>o.group==group&&o.short==short&&(perm.apiGroup=='*'||perm.apiGroup==o.apiGroup)).map(o=>short2plural(o.short)).includes(perm.resource))
        )), false)
  const have = (group:string, short:string) => knowledge.filter(o=>o.group==group&&o.short==short).map(o=>permissions.value
      .filter(perm=>(o.apiGroup==perm.apiGroup||perm.apiGroup=='*')&&(perm.resource=='*'||short2plural(o.short)==perm.resource))
      .reduce(()=>true,false))
    .reduce((res,cur)=>res||cur, false)
  return { inputs, permissions, namespaces, setPermissions, can, have }
})
export function usePermissionStoreRef() { return storeToRefs(usePermissionStore()) }
export default usePermissionStore