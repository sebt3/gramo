<script setup lang="ts">
import projectcalicoBlockAffinityQuery from '@/queries/projectcalico/BlockAffinity.read.graphql'
import BlockAffinityEdit from '@/queries/projectcalico/BlockAffinity.patch.graphql'
import projectcalicoBlockAffinityMeta from '@/components/projectcalico/BlockAffinityMeta.vue';
import projectcalicoBlockAffinityEdit from '@/components/projectcalico/BlockAffinityEdit.vue';
import { useQuery, useMutation, useBlockAffinity, BlockAffinitySimpleExcludes } from '../../../libs/projectcalico/BlockAffinity.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBlockAffinityFound, navigation, setItemFromRoute } = useBlockAffinity();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBlockAffinityQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BlockAffinitySimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotBlockAffinityFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BlockAffinityDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoBlockAffinityQuery from '@/queries/projectcalico/BlockAffinity.read.graphql'
import BlockAffinityEdit from '@/queries/projectcalico/BlockAffinity.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useBlockAffinity, sanitizeData, getProperties } from '../../../libs/projectcalico/BlockAffinity.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotBlockAffinityFound, setItemFromRoute, navigation, onErrorHandler } = useBlockAffinity();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBlockAffinityQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBlockAffinity, onDone: onPatchBlockAffinity, onError: onPatchError } = useMutation(BlockAffinityEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBlockAffinity({ "name": result.value.projectcalicoBlockAffinity.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotBlockAffinityFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoBlockAffinity.metadata.obj.spec})});onPatchBlockAffinity(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoBlockAffinityMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoBlockAffinity[0]!=undefined && result.projectcalicoBlockAffinity[0]!=null"
        :model="result.projectcalicoBlockAffinity[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoBlockAffinityView
        v-if="!loading && result!=undefined && result.projectcalicoBlockAffinity[0]!=undefined && result.projectcalicoBlockAffinity[0]!=null"
        :model="result.projectcalicoBlockAffinity[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoBlockAffinity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">BlockAffinity</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoBlockAffinity.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoBlockAffinity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoBlockAffinity!=null && result.projectcalicoBlockAffinity.status != null">
          <DefaultStatusView :status="result.projectcalicoBlockAffinity.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoBlockAffinity!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.spec).includes('spec')?editor.spec['spec']:{}"
          @update:out="v=>{ spec=v;editor.setspecSpec({ spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlspec" :key="editor.yamlspec"
          @update:text="v=>editor.setspecYaml(v)"
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