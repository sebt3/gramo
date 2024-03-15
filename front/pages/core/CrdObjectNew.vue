<script setup lang="ts">
import crdObjectQuery         from '@/queries/k8s/CustomResourceDefinition.read.graphql'
import clusteredObjectCreate  from '@/queries/core/clusteredObject.create.graphql'
import namespacedObjectCreate from '@/queries/core/namespacedObject.create.graphql'
import { getTargetVersion, defineAsyncComponent, i18n, ref, useQuery, useMutation, usecrdObject } from '../../libs/core/crdObject.js'
const { $q, router, onErrorHandler, notifySuccess, notifyError, notifyWorking, navigation, setItemFromRoute, isNamespaced, setNamespaceFromRoute } = usecrdObject();if (isNamespaced()) setNamespaceFromRoute();setItemFromRoute();
import { sanitizeData, useCustomResourceDefinition } from '../../libs/k8s/CustomResourceDefinition.js'
import { colorCustomResourceDefinition, CustomResourceDefinitionReadExcludes } from '../../libs/k8s/custom.js'
const {  onNotCustomResourceDefinitionFound } = useCustomResourceDefinition();setItemFromRoute();
const { mutate, onDone, onError: onCreateError } = useMutation(isNamespaced()?namespacedObjectCreate:clusteredObjectCreate);
const { loading, onResult, onError } = useQuery(crdObjectQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CustomResourceDefinitionReadExcludes
  },
});onError(onErrorHandler);
const namespaced = isNamespaced();
const parent = ref({});
const name = ref('');
const form = ref(null);
const targetVersion = ref('')
const obj  = ref({spec:{}});
onResult(res=>{if ( !res.loading && Array.isArray(res.data.k8sCustomResourceDefinition)) {
  onNotCustomResourceDefinitionFound(res);
  parent.value = res.data.k8sCustomResourceDefinition[0]
  targetVersion.value = getTargetVersion(parent.value['spec']['versions'])
}});
onDone(() => {
  notifySuccess(i18n.global.t('new.notifyDone'));
  router.go(-1);
})
onCreateError((err) => {
  notifyError(i18n.global.t('new.notifyError'));
  console.log('mutation error',err);
})
function onFinalSubmit() {
  notifyWorking(i18n.global.t('new.notifyWorking'));
  const payload = {
    "metadata": namespaced?{
      "name": name.value,
      "namespace": navigation.currentNamespace.value
    }:{
      "name": name.value
    },
    "spec": sanitizeData(obj.value.spec),
    "group": parent.value.spec.group,
    "version": targetVersion.value,
    "plural": parent.value.spec.names.plural,
    "kind": parent.value.spec.names.kind
  }
  console.log(obj.value,payload)
  mutate(payload);
}
async function onSubmit(o:object) {
  if (form.value!=null) {
    obj.value = o;
    form.value.submit()
  } else {
    notifyError(i18n.global.t('new.notifyNotReady'));
  }
}
const MetadataNew                     = defineAsyncComponent(() => import( '@/components/core/MetadataNew.vue'));
const coreCrdObjectEdit               = defineAsyncComponent(() => import( '@/components/core/CrdObjectEdit.vue'));
const k8sCustomResourceDefinitionMeta = defineAsyncComponent(() => import( '@/components/k8s/CustomResourceDefinitionMeta.vue'));
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6" v-if="!loading && parent['metadata'] != undefined">
      <k8sCustomResourceDefinitionMeta :useActions="false" :showStatus="true"
        :model="parent"
       />
    </div>
    <div class="col-md-6" v-if="!loading && parent['metadata'] != undefined">
      <q-form ref="form" @submit="onFinalSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
        <q-card bordered class="q-ma-sm">
          <q-card-section  :class="`bg-${ colorCustomResourceDefinition } text-grey-2`">
            <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none">{{ $t('meta.metadata') }}</div>
          </q-card-section>
          <q-card-section :class="`bg-${ colorCustomResourceDefinition }-${$q.dark.isActive?'10':'1'}`">
            <MetadataNew v-model:name="name" :namespaced="namespaced" />
          </q-card-section>
        </q-card>
      </q-form>
    </div>
    <div class="col-md-12" v-if="!loading && parent['metadata'] != undefined">
      <coreCrdObjectEdit
        :model="obj"
        :parent="parent"
        @on-submit="onSubmit"
       />
    </div>
  </div>
</template>