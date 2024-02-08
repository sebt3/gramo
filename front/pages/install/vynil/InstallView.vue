<script setup lang="ts">
// noGramoGenerator
import vynilInstallQuery from '@/queries/vynil/Install.details.graphql'
import InstallDelete from '@/queries/vynil/Install.delete.graphql'
import ObjectHierarchy from '@/components/charts/ObjectHierarchy.vue';
import vynilInstallMeta from '@/components/vynil/InstallMeta.vue';
import vynilInstallView from '@/components/vynil/InstallView.vue';
import vynilInstallStatus from '@/components/vynil/InstallStatus.vue';
import vynilPackageList from '@/components/vynil/PackageList.vue';
import { useQuery, useMutation, useInstall, InstallReadExcludes } from '../../../libs/vynil/Install.js'
const { onErrorHandler, notifySuccess, notifyError, onNotInstallFound, navigation, setNamespacedItemFromRoute } = useInstall();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilInstallQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": InstallReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotInstallFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(InstallDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-4">
      <vynilInstallMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && Array.isArray(result.k8sNamespace)  && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null"
        :model="result.k8sNamespace[0].vynilInstall[0]"
       />
    </div>
    <div class="col-md-4" v-if="!loading && result!=undefined && Array.isArray(result.k8sNamespace)  && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null && result.k8sNamespace[0].vynilInstall[0].usePackage!=null && result.k8sNamespace[0].vynilInstall[0].usePackage.length>0">
      <vynilPackageList
        :model="result.k8sNamespace[0].vynilInstall[0].usePackage"
       />
    </div>
    <div class="col-md-4">
      <vynilInstallStatus
        v-if="!loading && result!=undefined && Array.isArray(result.k8sNamespace)  && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null"
        :model="result.k8sNamespace[0].vynilInstall[0]"
       />
    </div>
    <div class="col-lg-12">
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Test</div>
        </q-card-section>
        <q-card-section v-if="result !== undefined && Array.isArray(result['k8sNamespace'])">
          <ObjectHierarchy
           :data="{short: 'Inst', catColor: 'purple', properties:{}, items: result.k8sNamespace[0].vynilInstall}"
           />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-12">
      <vynilInstallView class="q-ma-sm"
        v-if="!loading && result!=undefined && Array.isArray(result.k8sNamespace) && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null"
        :model="result.k8sNamespace[0].vynilInstall[0]"
        />
    </div>
  </div>
</template>
