<script setup lang="ts">
// noGramoGenerator
import crdObjectQuery         from '@/queries/core/crdObject.read.graphql'
import clusteredObjectDelete  from '@/queries/core/clusteredObject.delete.graphql'
import namespacedObjectDelete from '@/queries/core/namespacedObject.delete.graphql'
const { useCustomResourceDefinition, CustomResourceDefinitionReadExcludes } = await import('../../libs/k8s/CustomResourceDefinition.js')
const { defineAsyncComponent, i18n, ref, useQuery, useMutation, usecrdObject, coreCrdObjectListExcludes } = await import('../../libs/core/crdObject.js')
const { useRoute, useRouter } = await import('vue-router')
const router = useRouter();
const route = useRoute();
const { setItemFromRoute, isNamespaced, setNamespaceFromRoute } = await import('../../libs/core/navigation.js')
const {  onErrorHandler, notifySuccess, notifyError, navigation, actionDelete } = usecrdObject(router);if (isNamespaced()) setNamespaceFromRoute();setItemFromRoute();
const {  onNotCustomResourceDefinitionFound } = useCustomResourceDefinition(router);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(isNamespaced()?namespacedObjectDelete:clusteredObjectDelete);
const { result, loading, onResult, onError } = useQuery(crdObjectQuery, {
  "crd": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CustomResourceDefinitionReadExcludes
  },
  "obj": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/namespace",
        "value": navigation.currentNamespace
      },
      {
        "op": "eq",
        "path": "metadata/name",
        "value": route.params.object
      }
    ]:[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": route.params.object
      }
    ],
    "excludes": coreCrdObjectListExcludes
  },
}, navigation.refreshOption);onError(onErrorHandler);onResult(onNotCustomResourceDefinitionFound);
const conditions = ref({
  "childcoreCrdObject": (data) => data != undefined && Array.isArray(data['k8sCustomResourceDefinition']) && data['k8sCustomResourceDefinition'].map(obj=>obj['childcoreCrdObject']).flat().filter(o=>o!=null).length>0,
});
const sectionCounts = ref({
  consumeLeft: 0,
  parent: 1,
  consumeRight: 0,
  gets: 0,
  users: 0,
  uses: 0,
  bellow: 0
});
onDeleteDone(() => {
  notifySuccess(i18n.global.t('delete.notifyDone'));
})
onDeleteError((err) => {
  notifyError(i18n.global.t('delete.notifyError'));
  console.log('deletion error',err);
})
const coreCrdObjectView  = defineAsyncComponent(() => import( '@/components/core/CrdObjectView.vue'));
const GenericMeta        = defineAsyncComponent(() => import( '@/components/generic/GenericMeta.vue'));
const TableSkeleton      = defineAsyncComponent(() => import( '@/components/core/TableSkeleton.vue'));
</script>
<template><div>
  <TableSkeleton :showNamespace="false" v-if="loading" />
  <div class="row q-mb-sm q-ml-sm">
    <div :class="`col-md-${4-(sectionCounts.consumeLeft>0?3:0)}`" v-if="!loading && sectionCounts.parent+sectionCounts.consumeRight>0"></div>
    <div class="col-md-4" v-if="!loading && sectionCounts.parent>0">
      <GenericMeta group="k8s" short="CustomResourceDefinition" v-if="!loading" :showStatus="true"
        :model="result.k8sCustomResourceDefinition[0]" origin="childcoreCrdObject"
       />
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm">
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcoreCrdObject'](result)">
      <coreCrdObjectView :useRefresh="false" :useActions="true"
        :model="result.k8sCustomResourceDefinition[0].childcoreCrdObject[0]"
        :parent="result.k8sCustomResourceDefinition[0]"
        @on-delete="(meta)=>{actionDelete(deletor, meta, result.k8sCustomResourceDefinition[0])}"
       />
    </div>
  </div>
</div></template>
