<script setup lang="ts">
import crdObjectQuery       from '@/queries/core/crdObject.read.graphql'
import clusteredObjectEdit  from '@/queries/core/clusteredObject.patch.graphql'
import namespacedObjectEdit from '@/queries/core/namespacedObject.patch.graphql'
import { useCustomResourceDefinition, CustomResourceDefinitionReadExcludes } from '../../libs/k8s/CustomResourceDefinition.js'
import { getTargetVersion, defineAsyncComponent, i18n, ref, useQuery, useMutation, usecrdObject, coreCrdObjectListExcludes } from '../../libs/core/crdObject.js'
const { route, onErrorHandler, patchDone, patchError, notifyWorking, navigation, setItemFromRoute, isNamespaced, setNamespaceFromRoute } = usecrdObject();if (isNamespaced()) setNamespaceFromRoute();setItemFromRoute();
const {  onNotCustomResourceDefinitionFound } = useCustomResourceDefinition();
const { loading, onResult, onError } = useQuery(crdObjectQuery, {
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
});
const { mutate: patchCrdObject, onDone: onPatchCrdObject, onError: onPatchError } = useMutation(isNamespaced()?namespacedObjectEdit:clusteredObjectEdit);
const model = ref({});
const parent = ref({});
const targetVersion = ref('')
onResult(res => {
  if ( !res.loading ) {
    onNotCustomResourceDefinitionFound(res);
    if (res.data!=undefined && res.data.k8sCustomResourceDefinition[0]!=undefined && res.data.k8sCustomResourceDefinition[0]!=null) {
      parent.value = res.data.k8sCustomResourceDefinition[0]
      model.value = Object.assign({}, res.data.k8sCustomResourceDefinition[0].childcoreCrdObject[0])
      targetVersion.value = getTargetVersion(parent.value.spec.versions)
    }
  }
});
function onSubmit(obj:object) {
  notifyWorking(i18n.global.t('edit.notifyWorking'));
  patchCrdObject({
    ...obj,
    "metadata": Object.fromEntries(Object.entries(model.value.metadata).filter(([name])=>name!='__typename')),
    "group": parent.value.spec.group,
    "version": targetVersion.value,
    "plural": parent.value.spec.names.plural,
    "kind": parent.value.spec.names.kind
  });
}
onError(onErrorHandler);onPatchCrdObject(patchDone);onPatchError(patchError);
const k8sCustomResourceDefinitionMeta = defineAsyncComponent(() => import( '@/components/k8s/CustomResourceDefinitionMeta.vue'));
const coreCrdObjectMeta               = defineAsyncComponent(() => import( '@/components/core/CrdObjectMeta.vue'));
const coreCrdObjectEdit               = defineAsyncComponent(() => import( '@/components/core/CrdObjectEdit.vue'));
const TableSkeleton                   = defineAsyncComponent(() => import( '@/components/core/TableSkeleton.vue'));
</script>
<template><div>
  <TableSkeleton :showNamespace="false" v-if="loading" />
  <div class="row q-ml-sm">
    <div class="col-md-6" v-if="!loading">
      <k8sCustomResourceDefinitionMeta :useActions="false" :showStatus="false"
        v-if="!loading && parent['metadata'] != undefined"
        :model="parent"
       />
    </div>
    <div class="col-md-6" v-if="!loading && model['metadata'] != undefined">
      <coreCrdObjectMeta :useActions="false" :showStatus="false"
      :model="model"
      :parent="parent"
       />
    </div>
  </div>
  <div class="row q-ml-sx"  v-if="!loading && model['metadata'] != undefined">
    <div class="col-md-12">
      <coreCrdObjectEdit
        :model="model"
        :parent="parent"
        @on-submit="onSubmit"
       />
    </div>
  </div>
</div></template>

