<script setup lang="ts">
import { elude } from "."
const props = defineProps<{status: object}>();
console.log(props.status)
function getConditionColor(cond) {
  if (cond.type == "Ready") return cond.status=='True'?'positive':'negative'
  return 'info' // 'warning'
}
</script>
<template>
  <div class="q-gutter-md">
    <div v-if="Object.keys(status).includes('conditions') && Array.isArray(status['conditions'])">
      <q-field label="Conditions" stack-label borderless>
        <template v-slot:prepend><q-icon name="grading" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
          <span v-for="cond in status['conditions'].filter(c=>c.type!='ArtifactInStorage')" v-bind:key="cond.message">
            <q-badge align="middle" :label="elude(cond.message, 50)"  :color="getConditionColor(cond)" class="q-mb-sm q-mr-sm" />
          </span>
        </div></template>
      </q-field>
    </div>
    <div v-if="Object.keys(status).includes('artifact') && typeof status['artifact'] === 'object' && Object.keys(status['artifact']).includes('revision')">
      <q-field label="Revision" stack-label borderless>
        <template v-slot:prepend><q-icon name="change_circle" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0"> {{ status['artifact']['revision'] }}
        </div></template>
      </q-field>
    </div>
    <div v-for="k in Object.keys(status).filter(key => typeof status[key] === 'string' && ['phase','latestImage','lastPushCommit', 'lastPushTime','lastAppliedRevision'].includes(key))" v-bind:key="k">
      <q-field label="{{ k.charAt(0).toUpperCase() + k.slice(1) }}" stack-label borderless>
        <template v-slot:prepend><q-icon name="far fa-chart-bar" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0"> {{ status[k] }}
        </div></template>
      </q-field>
    </div>
  </div>
</template>
