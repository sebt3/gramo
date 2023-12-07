import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

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

export const usePermissionStore = defineStore('permission', () => {
  const local_perms:permissionReviewNS = {}
  const list = ref(local_perms)
  const permissions = computed(() => list.value)
  function setPermissions(p:permissionReviewNS) {
    list.value = p
  }
  return { list, permissions, setPermissions }
})
export function usePermissionStoreRef() { return storeToRefs(usePermissionStore()) }
export default usePermissionStore