<script setup lang="ts">
import RoleBindingNew from '@/queries/k8s/RoleBinding.create.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MetadataNew from '@/components/core/MetadataNew.vue';
import { ref, useQuery, useMutation, useRoleBinding, RoleBindingDefinition, sanitizeData, getProperties } from '@/libs/k8s/RoleBinding.js'
const name = ref('');
const roleRef  = ref({});
const subjects  = ref({});
const { router, navigation, setNamespacedItemFromRoute, notifySuccess, notifyError, notifyWorking } = useRoleBinding();setNamespacedItemFromRoute();
const { mutate, onDone, onError } = useMutation(RoleBindingNew);
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
    "roleRef": sanitizeData(roleRef.value),
    "subjects": sanitizeData(subjects.value),
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
          v-model:out="roleRef"
          :properties="getProperties(RoleBindingDefinition.properties.roleRef)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="subjects"
          :properties="getProperties(RoleBindingDefinition.properties.subjects)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>