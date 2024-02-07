<script setup lang="ts">
import k8sNodeQuery from '@/queries/k8s/Node.read.graphql'
import NodeEdit from '@/queries/k8s/Node.patch.graphql'
import k8sNodeMeta from '@/components/k8s/NodeMeta.vue';
import k8sNodeEdit from '@/components/k8s/NodeEdit.vue';
import k8sNodeStatus from '@/components/k8s/NodeStatus.vue';
import { useQuery, useMutation, useNode, NodeSimpleExcludes } from '../../../libs/k8s/Node.js'
const { onErrorHandler, notifySuccess, notifyError, onNotNodeFound, navigation, setItemFromRoute } = useNode();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sNodeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NodeSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotNodeFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NodeDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sNodeQuery from '@/queries/k8s/Node.read.graphql'
import NodeEdit from '@/queries/k8s/Node.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useNode, sanitizeData, getProperties } from '../../../libs/k8s/Node.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotNodeFound, setItemFromRoute, navigation, onErrorHandler } = useNode();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sNodeQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchNode, onDone: onPatchNode, onError: onPatchError } = useMutation(NodeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchNode({ "name": result.value.k8sNode.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotNodeFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sNode.metadata.obj.spec})});onPatchNode(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sNodeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNode[0]!=undefined && result.k8sNode[0]!=null"
        :model="result.k8sNode[0]"
       />
      <k8sNodeStatus
        v-if="!loading && result!=undefined && result.k8sNode[0]!=undefined && result.k8sNode[0]!=null"
        :model="result.k8sNode[0]"
       />
    </div><div class="col-md-6">
      <k8sNodeView
        v-if="!loading && result!=undefined && result.k8sNode[0]!=undefined && result.k8sNode[0]!=null"
        :model="result.k8sNode[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNode!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Node</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNode.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNode!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNode!=null && result.k8sNode.status != null">
          <DefaultStatusView :status="result.k8sNode.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNode!=null" class="q-ma-sm">
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