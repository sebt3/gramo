import { computed, ref } from 'vue'
import { defaultConfig, gramoConfigType } from '../../back/config.js'
import { defineStore, storeToRefs } from 'pinia'
export const useConfigStore = defineStore('config', () => {
  const cfg:gramoConfigType = defaultConfig
  const config = ref(cfg)
  const gramoConfig = computed(() => config.value )
  const defaultNamespace = computed(() => config.value.defaultNamespace )
  const defaultRoute = computed(() => config.value.defaultRoute )
  const gramoVersion = computed(() => config.value.gramoVersion )
  const gramoAppName = computed(() => config.value.gramoAppName)
  function setConfig(cfg:object) {
    Object.entries(cfg).forEach(e => {
      config.value[e[0]] = e[1]
    })
  }
  return { config, gramoConfig, defaultRoute, defaultNamespace, gramoVersion, gramoAppName, setConfig }
})
export function useConfigStoreRef() { return storeToRefs(useConfigStore()) }
export default useConfigStore