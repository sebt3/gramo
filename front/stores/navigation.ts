import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useNavigationStore = defineStore('navigation', () => {
  const nss_local:Array<string> = []
  const namespaces = ref(nss_local)
  const currentNamespace = ref('')
  const currentItem = ref('')
  const namespace = computed(() => currentNamespace.value )
  const item = computed(() => currentItem.value )
  function setNamespaces(nss:Array<string>) {
    nss_local.length = 0
    nss_local.push(...nss);
  }
  function setCurrentNamespace(ns:string) {
    currentNamespace.value = ns
  }
  function setCurrentItem(name:string) {
    currentItem.value = name
  }
  return { namespaces, currentNamespace, currentItem, namespace, item, setNamespaces, setCurrentNamespace, setCurrentItem }
})
export default useNavigationStore
