import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  const namespaces = ref([])
  const defaultNamespace = ref('default')
  const currentNamespace = ref(defaultNamespace.value)
  const namespace = computed(() => currentNamespace.value )
  function setCurrentNamespace(ns:string) {
    currentNamespace.value = ns
  }

  return { namespaces, defaultNamespace, currentNamespace, namespace, setCurrentNamespace }
})
export default useNavigationStore