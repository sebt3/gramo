<script setup lang="ts">
import fluxcdGitRepositoryQuery from '@/queries/fluxcd/GitRepositoryView.graphql'
import gitRepositoryEdit from '@/queries/fluxcd/GitRepositoryEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useGitRepository, sanitizeData, getProperties } from './GitRepository.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotGitRepositoryFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useGitRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdGitRepositoryQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchGitRepository, onDone: onPatchGitRepository, onError: onPatchError } = useMutation(gitRepositoryEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGitRepository({"namespace": result.value.fluxcdGitRepository.metadata.namespace, "name": result.value.fluxcdGitRepository.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotGitRepositoryFound);onPatchGitRepository(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdGitRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">GitRepository</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdGitRepository.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdGitRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.fluxcdGitRepository!=null && result.fluxcdGitRepository.status != null">
          <DefaultStatusView :status="result.fluxcdGitRepository.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.fluxcdGitRepository!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdGitRepository"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
