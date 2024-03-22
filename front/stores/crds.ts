import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

interface customResourceDefinitionName {
  categories: Array<string>
  listKind: string
  kind: string
  plural: string
  singular: string
  shortNames: Array<string>
}
interface customResourceDefinitionColumn {
  name: string
  type: string
  jsonPath: string
  description: string
  format: string
  priority: number
}
interface customResourceDefinitionSchema {
  openAPIV3Schema: object
}
interface customResourceDefinitionVersion {
  name: string
  served: boolean
  storage: boolean
  additionalPrinterColumns: [customResourceDefinitionColumn]
  deprecated: Boolean
  deprecationWarning: String
  schema: customResourceDefinitionSchema
}
interface customResourceDefinition {
  group: string
  scope: string
  names: customResourceDefinitionName
  versions: Array<customResourceDefinitionVersion>
  acceptedNames: customResourceDefinitionName
}
export interface customResourceDefinitions {
  [key: string]: customResourceDefinition
}

export const useCRDStore = defineStore('crd', () => {
  const local_crds:customResourceDefinitions = {}
  const list = ref(local_crds)
  const crds = computed(() => list.value)
  function setCRDs(p:customResourceDefinitions) {
    list.value = p
  }
  return { list, crds, setCRDs }
})
export function useCRDStoreRef() { return storeToRefs(useCRDStore()) }
export default useCRDStore