<script setup lang="ts">
import installPrepare from '@/queries/vynil/InstallPrepare.graphql'
import installNew from '@/queries/vynil/InstallNew.graphql'
import OpenApiEdit from '../core/OpenApiEdit.vue';
import MetadataNew from '../core/MetadataNew.vue';
import { ref, useInstall, useMutation, useQuery, sanitizeData } from './Install.js'
const name = ref('');
const stepper = ref(null);
const step = ref(1);
const category = ref("");
const component = ref("");
const distrib = ref("");
const data = ref({});
const { router, navigation, setNamespaceFromRoute, notifyWorking, notifyError, notifySuccess } = useInstall();setNamespaceFromRoute();
const { result, loading } = useQuery(installPrepare);
const { mutate, onDone, onError } = useMutation(installNew);
onDone(() => {
  notifySuccess('Creation proceded');
  router.go(-1);
});
onError((err) => {
  notifyError('Creation failed');
  console.log('mutation error',err);
});
function startStep2() {
  if (result.value.vynilPackages.filter(p => p.name == component.value && p.distribution.metadata.name == distrib.value && p.category.name == category.value).length>0) {
    stepper.value.next();
    console.log('startStep2', result.value.vynilPackages.filter(p => p.name == component.value && p.distribution.metadata.name == distrib.value && p.category.name == category.value)[0])
  } else {
    notifyError(`Package ${component.value} in ${category.value} from ${distrib.value} doesnt exist`);
  }

}
function onSubmit (evt) {
  notifyWorking('Create in progress');
  const spec = {
    category: category.value,
    distrib: distrib.value,
    component: component.value,
    options: sanitizeData(data.value)
  };
  mutate({"name": name.value, "namespace": navigation.currentNamespace.value, "spec": spec});
  console.log('onSubmit', {"name": name.value, "namespace":navigation.currentNamespace.value, "spec": spec}, evt)
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

    <q-stepper v-model="step"  class="q-ma-sm" bordered ref="stepper" color="primary" animated v-if="!loading" >
      <q-step :name="1" title="Specifications" icon="settings" :done="step > 1">
        <div  class="q-gutter-md">
          <q-select filled v-model="distrib" :options="result.vynilDistribs.map(d=>d.metadata.name)" label="Distribution" stack-label />
          <q-select filled v-model="category" :options="result.vynilCategories.map(c=>c.name)" label="Category" stack-label />
          <q-select filled v-if="distrib!=''&&category!=''" :key="`${distrib}-${category}`" v-model="component" :options="result.vynilPackages.filter(p=>p.distribution.metadata.name==distrib&&p.category.name==category).map(p=>p.name)" label="Package" stack-label />
        </div>
      </q-step>

      <q-step :name="2" title="Configure" caption="Selected package" icon="settings_suggest" :done="step > 2">
        <OpenApiEdit
            v-if="result.vynilPackages.filter(p => p.name == component && p.distribution.metadata.name == distrib && p.category.name == category).length>0"
            :key="`${distrib}-${category}-${component}`"
            v-model:out="data"
            :properties="new Map(Object.entries(result.vynilPackages.filter(p => p.name == component && p.distribution.metadata.name == distrib && p.category.name == category)[0].options))"
          />
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="step < 2" @click="startStep2()" color="primary" label="Next" :disable="component==''" />
          <q-btn v-if="step > 1" flat color="primary" @click="stepper.previous()" label="Back" class="q-ml-sm" />
          <q-btn v-if="step > 1" label="Submit" class="q-ml-sm" type="submit" color="primary"/>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-form>
</template>
