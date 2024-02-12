<script setup lang="ts">
// noGramoGenerator
import k8sSecretQuery from '@/queries/k8s/Secret.read.graphql'
import SecretEdit from '@/queries/k8s/Secret.patch.graphql'
import k8sSecretMeta from '@/components/k8s/SecretMeta.vue';
import k8sSecretEdit from '@/components/k8s/SecretEdit.vue';
import { ref, useQuery, sanitizeData, useMutation, useSecret, SecretSimpleExcludes } from '../../../libs/k8s/Secret.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotSecretFound, navigation, setNamespacedItemFromRoute } = useSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sSecretQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SecretSimpleExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
});
const { mutate: patchSecret, onDone: onPatchSecret, onError: onPatchError } = useMutation(SecretEdit);
function onSubmit(obj:object) {
  notifyWorking('Update in progress');
  patchSecret({
    "name": result.value.k8sNamespace[0].k8sSecret[0].metadata.name,
    "namespace": result.value.k8sNamespace[0].k8sSecret[0].metadata.namespace,
    ...obj
  });
}
onError(onErrorHandler);
const secret = ref({stringData:{}})
onResult(res => {
  onNotSecretFound(res);
  if ( !res.loading ) {
    if (Array.isArray(res.data.k8sNamespace) && res.data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().length>0) {
      secret.value = {...secret.value, ...res.data.k8sNamespace.map(ns=>ns['k8sSecret']).flat()[0], data: JSON.parse(JSON.stringify(res.data.k8sNamespace.map(ns=>ns['k8sSecret']).flat()[0]['data']))};
      console.log(secret.value, secret.value['data'])
      secret.value['stringData'] = secret.value['stringData']==undefined?{}:secret.value['stringData'];
      if (typeof secret.value['data'] === 'object') Object.keys(secret.value['data']).forEach(key=>{
        try {
          secret.value['stringData'][key] = atob(secret.value['data'][key])
          secret.value['data'][key] = undefined
        } catch (err) {
          console.error(err);
        }
      })
    }
  }
});
onPatchSecret(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-12">
      <k8sSecretMeta :useActions="false" :showStatus="false"
        v-if="!loading && result!=undefined && Array.isArray(result.k8sNamespace)  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null"
        :model="result.k8sNamespace[0].k8sSecret[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sSecretEdit
        v-if="!loading && secret['metadata']!=null"
        :model="sanitizeData(secret)"
        @on-submit="onSubmit"
       />
    </div>
  </div>
</template>

