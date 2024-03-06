import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const loading = ref(false)
export function beforeEach(to, from) {
  loading.value = true;
}
export const useNavigationStore = defineStore('navigation', () => {
  const nss_local:Array<string> = []
  const refreshOption = ref({pollInterval: 2000} as {pollInterval: number|undefined})
  const namespaces = ref(nss_local)
  const currentNamespace = ref('')
  const currentItem = ref('')
  const namespace = computed(() => currentNamespace.value )
  const item = computed(() => currentItem.value )
  const isLoading = computed(() => loading.value )
  function setNamespaces(nss:Array<string>) {
    nss_local.length = 0
    nss_local.push(...nss);
  }
  function getTransition(to, usage) {
    loading.value = false;
    if (to.redirectedFrom && to.redirectedFrom.meta) {
      switch (`${to.redirectedFrom.meta.animation}-${usage}`) {
        case "parent-enter": return "animate__animated animate__fast animate__fadeInUp";
        case "parent-leave": return "animate__animated animate__fast animate__fadeOutUp fixed";
        case "child-enter": return "animate__animated animate__fast animate__fadeInDown";
        case "child-leave": return "animate__animated animate__fast animate__fadeOutDown fixed";
        case "use-enter": return "animate__animated animate__fast animate__fadeInLeft";
        case "use-leave": return "animate__animated animate__fast animate__fadeOutRight fixed";
        case "users-enter": return "animate__animated animate__fast animate__fadeInRight";
        case "users-leave": return "animate__animated animate__fast animate__fadeOutLeft fixed";
        case "equity-enter": return "animate__animated animate__fast animate__zoomIn";
        case "equity-leave": return "animate__animated animate__fast animate__fadeOut fixed";
        case "provide-enter": return "animate__animated animate__fast animate__backInDown";
        case "provide-leave": return "animate__animated animate__fast animate__backOutDown fixed";
        case "consume-enter": return "animate__animated animate__fast animate__backInUp";
        case "consume-leave": return "animate__animated animate__fast animate__backOutUp fixed";
      }
    }
    switch (usage) {
      case "enter": return "animate__animated animate__fast animate__fadeIn";
      case "leave": return "animate__animated animate__fast animate__fadeOut fixed";
    }
  }
  function setCurrentNamespace(ns:string) {
    currentNamespace.value = ns
  }
  function setCurrentItem(name:string) {
    currentItem.value = name
  }
  function setPoolInterval(interval:number|undefined) {
    refreshOption.value.pollInterval=interval
  }
  return { isLoading, getTransition, refreshOption, namespaces, currentNamespace, currentItem, namespace, item, setNamespaces, setCurrentNamespace, setCurrentItem, setPoolInterval}
})
export function useNavigationStoreRef() { return storeToRefs(useNavigationStore()) }
export default useNavigationStore
