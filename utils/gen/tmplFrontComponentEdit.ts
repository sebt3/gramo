import HB from 'handlebars';
export const templateComponentEdit = HB.compile(
`<script setup lang="ts">
import {{ mini }}{{ name }}Query from '@/queries/{{ mini }}/{{ name }}View.graphql'
import {{ miniName }}Edit from '@/queries/{{ mini }}/{{ name }}Edit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, use{{ name }}, sanitizeData, getProperties } from './{{ name }}.js'
const data = ref({});
{{#if namespaced}}
const { editor, patchDone, patchError, notifyWorking, onNot{{ name }}Found, setNamespacedItemFromRoute, navigation, onErrorHandler } = use{{ name }}();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery({{ mini }}{{ name }}Query, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
{{else}}
const { editor, patchDone, patchError, notifyWorking, onNot{{ name }}Found, setItemFromRoute, navigation, onErrorHandler } = use{{ name }}();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery({{ mini }}{{ name }}Query, {"name": navigation.currentItem}, { pollInterval: 500 });
{{/if}}
const { mutate: patch{{ name }}, onDone: onPatch{{ name }}, onError: onPatchError } = useMutation({{ miniName }}Edit);
function onSubmit() {
  notifyWorking('Update in progress');
{{#if namespaced}}
  patch{{ name }}({"namespace": result.value.{{ mini }}{{ name }}.metadata.namespace, "name": result.value.{{ mini }}{{ name }}.metadata.name, "spec": sanitizeData(data.value)});
{{else}}
  patch{{ name }}({"name": result.value.{{ mini }}{{ name }}.metadata.name, "spec": sanitizeData(data.value)});
{{/if}}
}
onError(onErrorHandler);onResult(res => {onNot{{ name }}Found(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.{{ mini }}{{ name }}.metadata.obj.spec})});onPatch{{ name }}(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.{{ mini }}{{ name }}!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">{{ name }}</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.{{ mini }}{{ name }}.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.{{ mini }}{{ name }}!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.{{ mini }}{{ name }}!=null && result.{{ mini }}{{ name }}.status != null">
          <DefaultStatusView :status="result.{{ mini }}{{ name }}.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.{{ mini }}{{ name }}!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.spec).includes('spec')?editor.spec['spec']:{}"
          @update:out="v=>{data=v;editor.setSpec({spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yaml" :key="editor.yaml"
          @update:text="v=>editor.setYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
`, {noEscape: true, preventIndent: true});