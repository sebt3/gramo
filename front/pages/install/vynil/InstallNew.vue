<script setup lang="ts">
// noGramoGenerator
import { defineAsyncComponent } from 'vue'
import InstallNew from '@/queries/vynil/Install.create.graphql'
const  MetadataNew   = defineAsyncComponent(() => import( '@/components/core/MetadataNew.vue'));
import { colorInstall, iconInstall } from '../../../libs/vynil/custom.js'
import { ref, useMutation, useInstall, InstallDefinition, sanitizeData, getProperties } from '@/libs/vynil/Install.js'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const name = ref('');
const form = ref(null);
const { editor, router, navigation, setNamespacedItemFromRoute, notifySuccess, notifyError, notifyWorking } = useInstall();setNamespacedItemFromRoute();
const { mutate, onDone, onError } = useMutation(InstallNew);
onDone(() => {
  notifySuccess('Creation proceded');
  router.go(-1);
})
onError((err) => {
  notifyError('Creation failed');
  console.log('mutation error',err);
})

import { useQuery } from '@/libs/vynil/Install.js'
import { addByPath, getByPath } from '../../../libs/core';
import installPrepare from '@/queries/vynil/InstallPrepare.graphql'
const  OpenApiEdit   = defineAsyncComponent(() => import( '@/components/core/OpenApiEdit.vue'));
const  MonacoEditor   = defineAsyncComponent(() => import( '@/components/core/MonacoEditor.vue'));
const { result, loading } = useQuery(installPrepare,{
  "namespace": {
    "filters": [{
      "op": "eq",
      "path": "metadata/name",
      "value": navigation.currentNamespace
    }]
  }
});
const options = ref({});
const stepper = ref(null);
const step = ref(1);
const category = ref("");
const component = ref("");
const distrib = ref("");
const setkey = (key:string, v) => editor.value.setKey(key, v)
const setYaml = (v) => editor.value.setYaml(v)
function onFinalSubmit() {
  notifyWorking('Create in progress');
  mutate({
    "metadata": {
    "namespace": navigation.currentNamespace.value,
    "name": name.value
    },
    "spec": sanitizeData(editor.value.obj.spec),
  });
}
function startStep2() {
  if (result.value.vynilPackage.filter(p => p.name == component.value && p.consumevynilDistrib.metadata.name == distrib.value && p.consumevynilCategory.name == category.value).length>0) {
    if (Array.isArray(result.value.k8sNamespace) && result.value.k8sNamespace.map(n=>n.metadata!=undefined&&n.metadata.annotations!=undefined?Object.keys(n.metadata.annotations).filter(k=>k.startsWith('default.vynil.solidite.fr/')):[]).flat().length>0) {
      // compute the initial values based on namespace annotations and package parameters
      options.value = {}
      const properties = result.value.vynilPackage.filter(p => p.name == component.value && p.consumevynilDistrib.metadata.name == distrib.value && p.consumevynilCategory.name == category.value)[0].options;
      result.value.k8sNamespace.filter(n=>n.metadata!=undefined&&n.metadata.annotations!=undefined)
        .map(n=>Object.entries(n.metadata.annotations).filter(([k])=>k.startsWith('default.vynil.solidite.fr/'))).flat()
        .map(([k,v])=>{return {path: k.split('/')[1].replaceAll('.','/'),value:v}})
        .forEach(p => {
          const prop = getByPath(properties,p.path.replaceAll('/','/properties/'))
          if (prop!=undefined&&prop!=null) addByPath(options.value,p.path,p.value);
        });
    }
    editor.value.updateFromQuery({spec:{category:category.value, distrib: distrib.value, component:component.value, options:options.value}})
    stepper.value.next();
  } else {
    notifyError(`Package ${component.value} in ${category.value} from ${distrib.value} doesnt exist`);
  }
}
</script>
<template>
  <q-form ref="form" @submit="onFinalSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered class="q-ma-sm">
      <q-card-section  :class="`bg-${ colorInstall } text-grey-2`">
        <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none">Metadata</div>
      </q-card-section>
      <q-card-section :class="`bg-${ colorInstall }-${$q.dark.isActive?'10':'1'}`">
        <MetadataNew v-model:name="name" :namespaced="true" />
      </q-card-section>
    </q-card>
    <q-stepper v-model="step"  class="q-ma-sm" bordered ref="stepper" color="primary" animated v-if="!loading"  :class="`bg-${ colorInstall }`" >
      <q-step :name="1" title="Specifications" icon="settings" :done="step > 1" :class="`bg-${ colorInstall }-${$q.dark.isActive?'10':'2'}`">
        <div  class="q-gutter-md">
          <q-select filled v-model="distrib" :options="result.vynilDistrib.map(d=>d.metadata.name)" label="Distribution" stack-label />
          <q-select filled v-model="category" :options="result.vynilCategory.map(c=>c.name)" label="Category" stack-label />
          <q-select filled v-if="distrib!=''&&category!=''" :key="`${distrib}-${category}`" v-model="component" :options="result.vynilPackage.filter(p=>p.consumevynilDistrib.metadata.name==distrib&&p.consumevynilCategory.name==category).map(p=>p.name)" label="Package" stack-label />
        </div>
      </q-step>

      <q-step :name="2" title="Configure" caption="Selected package" icon="settings_suggest" :done="step > 2" :class="`bg-${ colorInstall }-${$q.dark.isActive?'10':'2'}`">
        <OpenApiEdit v-if="editor.ready && result.vynilPackage.filter(p => p.name == component && p.consumevynilDistrib.metadata.name == distrib && p.consumevynilCategory.name == category).length>0"
          @update:out="(v)=>setkey('spec', {category, distrib, component, options:sanitizeData(v)})"
          :in="editor.obj['spec']['options']"
          :key="`${distrib}-${category}-${component}`"
          :properties="getProperties({properties: result.vynilPackage.filter(p => p.name == component && p.consumevynilDistrib.metadata.name == distrib && p.consumevynilCategory.name == category)[0].options})"
        />
      </q-step>
      <q-step :name="3" title="Full YAML" caption="optional" icon="settings_suggest" :done="step > 3" :class="`bg-${ colorInstall }-${$q.dark.isActive?'10':'2'}`">
        <MonacoEditor v-if="editor.ready && result.vynilPackage.filter(p => p.name == component && p.consumevynilDistrib.metadata.name == distrib && p.consumevynilCategory.name == category).length>0"
          :text="editor.yaml" :key="`${distrib}-${category}-${component}-${editor.yaml}`"
          @update:text="v=>setYaml(v)"
          :properties="getProperties({properties: result.vynilPackage.filter(p => p.name == component && p.consumevynilDistrib.metadata.name == distrib && p.consumevynilCategory.name == category)[0].options})"
          />
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation :class="`bg-${ colorInstall }-${$q.dark.isActive?'10':'2'}`">
          <q-btn v-if="step < 2" @click="startStep2()" color="primary" label="Next" :disable="component==''" />
          <q-btn v-if="step > 1" flat color="primary" @click="stepper.previous()" label="Back" class="q-ml-sm" />
          <q-btn v-if="step > 1" label="Submit" class="q-ml-sm" type="submit" color="primary"/>
          <q-btn v-if="step > 1 && step <3 " flat color="primary" @click="stepper.next()" label="View YAML" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-form>
</template>