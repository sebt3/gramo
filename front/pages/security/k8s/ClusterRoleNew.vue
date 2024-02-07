<script setup lang="ts">
import ClusterRoleNew from '@/queries/k8s/ClusterRole.create.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MetadataNew from '@/components/core/MetadataNew.vue';
import { ref, useQuery, useMutation, useClusterRole, ClusterRoleDefinition, sanitizeData, getProperties } from '@/libs/k8s/ClusterRole.js'
const name = ref('');
const aggregationRule  = ref({});
const rules  = ref({});
const { router, navigation, setItemFromRoute, notifySuccess, notifyError, notifyWorking } = useClusterRole();setItemFromRoute();
const { mutate, onDone, onError } = useMutation(ClusterRoleNew);
onDone(() => {
  notifySuccess('Creation proceded');
  router.go(-1);
})
onError((err) => {
  notifyError('Creation failed');
  console.log('mutation error',err);
})
function onSubmit() {
  notifyWorking('Create in progress');
  mutate({
    "name": name.value,
    "aggregationRule": sanitizeData(aggregationRule.value),
    "rules": sanitizeData(rules.value),
  });
}
</script>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Metadata</div>
      </q-card-section>
      <q-card-section>
        <MetadataNew v-model:name="name" :namespaced="false" />
      </q-card-section>
    </q-card>
    <q-card bordered class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="aggregationRule"
          :properties="getProperties(ClusterRoleDefinition.properties.aggregationRule)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="rules"
          :properties="getProperties(ClusterRoleDefinition.properties.rules)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>