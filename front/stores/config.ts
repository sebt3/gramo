import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { defaultConfig, gramoConfigType } from '../../back/config.js'
export const useConfigStore = defineStore('config', () => {
  const cfg:gramoConfigType = defaultConfig
  const config = ref(cfg)
  const gramoConfig = computed(() => config.value )
  const defaultNamespace = computed(() => config.value.defaultNamespace )
  const defaultRoute = computed(() => config.value.defaultRoute )
  function setConfig(cfg:object) {
    Object.entries(cfg).forEach(e => {
      config.value[e[0]] = e[1]
    })
  }
  return { config, gramoConfig, defaultRoute, defaultNamespace, setConfig }
})
export default useConfigStore