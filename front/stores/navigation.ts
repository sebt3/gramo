import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useNavigationStore = defineStore('navigation', () => {
  const namespaces = ref([])
  const defaultNamespace = ref('default')
  const currentNamespace = ref(defaultNamespace.value)
  const currentItem = ref('')
  const namespace = computed(() => currentNamespace.value )
  const item = computed(() => currentItem.value )
  function setCurrentNamespace(ns:string) {
    currentNamespace.value = ns
  }
  function setCurrentItem(name:string) {
    currentItem.value = name
  }
  return { namespaces, defaultNamespace, currentNamespace, currentItem, namespace, item, setCurrentNamespace, setCurrentItem }
})
export default useNavigationStore