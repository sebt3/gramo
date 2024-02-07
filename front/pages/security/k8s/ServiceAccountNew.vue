<script setup lang="ts">
import ServiceAccountNew from '@/queries/k8s/ServiceAccount.create.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MetadataNew from '@/components/core/MetadataNew.vue';
import { ref, useQuery, useMutation, useServiceAccount, ServiceAccountDefinition, sanitizeData, getProperties } from '@/libs/k8s/ServiceAccount.js'
const name = ref('');
const automountServiceAccountToken  = ref({});
const imagePullSecrets  = ref({});
const secrets  = ref({});
const { router, navigation, setNamespacedItemFromRoute, notifySuccess, notifyError, notifyWorking } = useServiceAccount();setNamespacedItemFromRoute();
const { mutate, onDone, onError } = useMutation(ServiceAccountNew);
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
    "namespace": navigation.currentNamespace.value,
    "name": name.value,
    "automountServiceAccountToken": sanitizeData(automountServiceAccountToken.value),
    "imagePullSecrets": sanitizeData(imagePullSecrets.value),
    "secrets": sanitizeData(secrets.value),
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
        <MetadataNew v-model:name="name" :namespaced="true" />
      </q-card-section>
    </q-card>
    <q-card bordered class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="automountServiceAccountToken"
          :properties="getProperties(ServiceAccountDefinition.properties.automountServiceAccountToken)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="imagePullSecrets"
          :properties="getProperties(ServiceAccountDefinition.properties.imagePullSecrets)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="secrets"
          :properties="getProperties(ServiceAccountDefinition.properties.secrets)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>