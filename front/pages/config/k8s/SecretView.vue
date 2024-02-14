<script setup lang="ts">
// noGramoGenerator
import k8sSecretQuery from '@/queries/k8s/Secret.details.graphql'
import SecretDelete from '@/queries/k8s/Secret.delete.graphql'
import k8sSecretView from '@/components/k8s/SecretView.vue';
import { BasicAuthListExcludes as secretgeneratorBasicAuthListExcludes } from '../../../libs/secretgenerator/custom.js'
import { SSHKeyPairListExcludes as secretgeneratorSSHKeyPairListExcludes } from '../../../libs/secretgenerator/custom.js'
import { StringSecretListExcludes as secretgeneratorStringSecretListExcludes } from '../../../libs/secretgenerator/custom.js'
import { ClusterListExcludes as cnpgClusterListExcludes } from '../../../libs/cnpg/custom.js'
import { MongoDBCommunityListExcludes as mongodbMongoDBCommunityListExcludes } from '../../../libs/mongodb/custom.js'
import { IngressListExcludes as k8sIngressListExcludes } from '../../../libs/k8s/custom.js'
import { PodListExcludes as k8sPodListExcludes } from '../../../libs/k8s/custom.js'
import { ReplicaSetListExcludes as k8sReplicaSetListExcludes } from '../../../libs/k8s/custom.js'
import { JobListExcludes as k8sJobListExcludes } from '../../../libs/k8s/custom.js'
import { CronJobListExcludes as k8sCronJobListExcludes } from '../../../libs/k8s/custom.js'
import { DeploymentListExcludes as k8sDeploymentListExcludes } from '../../../libs/k8s/custom.js'
import { StatefulSetListExcludes as k8sStatefulSetListExcludes } from '../../../libs/k8s/custom.js'
import { DaemonSetListExcludes as k8sDaemonSetListExcludes } from '../../../libs/k8s/custom.js'
import { PodTemplateListExcludes as k8sPodTemplateListExcludes } from '../../../libs/k8s/custom.js'
import { InstallListExcludes as vynilInstallListExcludes } from '../../../libs/vynil/custom.js'
import { KustomizationListExcludes as fluxcdKustomizationListExcludes } from '../../../libs/fluxcd/custom.js'
import secretgeneratorBasicAuthMeta from '@/components/secretgenerator/BasicAuthMeta.vue';
import secretgeneratorSSHKeyPairMeta from '@/components/secretgenerator/SSHKeyPairMeta.vue';
import secretgeneratorStringSecretMeta from '@/components/secretgenerator/StringSecretMeta.vue';
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import mongodbMongoDBCommunityMeta from '@/components/mongodb/MongoDBCommunityMeta.vue';
import k8sIngressList from '@/components/k8s/IngressList.vue';
import k8sPodList from '@/components/k8s/PodList.vue';
import k8sReplicaSetList from '@/components/k8s/ReplicaSetList.vue';
import k8sJobList from '@/components/k8s/JobList.vue';
import k8sCronJobList from '@/components/k8s/CronJobList.vue';
import k8sDeploymentList from '@/components/k8s/DeploymentList.vue';
import k8sStatefulSetList from '@/components/k8s/StatefulSetList.vue';
import k8sDaemonSetList from '@/components/k8s/DaemonSetList.vue';
import k8sPodTemplateList from '@/components/k8s/PodTemplateList.vue';
import vynilInstallMeta from '@/components/vynil/InstallMeta.vue';
import fluxcdKustomizationMeta from '@/components/fluxcd/KustomizationMeta.vue';
import { ref, useQuery, useMutation, useSecret, SecretReadExcludes } from '../../../libs/k8s/Secret.js'
const { actionDelete, onErrorHandler, notifySuccess, notifyError, onNotSecretFound, navigation, setNamespacedItemFromRoute } = useSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sSecretQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SecretReadExcludes
  },
  "parentsecretgeneratorBasicAuth": {"filters": [], "excludes": secretgeneratorBasicAuthListExcludes},
  "parentsecretgeneratorSSHKeyPair": {"filters": [], "excludes": secretgeneratorSSHKeyPairListExcludes},
  "parentsecretgeneratorStringSecret": {"filters": [], "excludes": secretgeneratorStringSecretListExcludes},
  "parentcnpgCluster": {"filters": [], "excludes": cnpgClusterListExcludes},
  "parentmongodbMongoDBCommunity": {"filters": [], "excludes": mongodbMongoDBCommunityListExcludes},
  "usersk8sIngress": {"filters": [], "excludes": k8sIngressListExcludes},
  "usersk8sPod": {"filters": [], "excludes": k8sPodListExcludes},
  "usersk8sReplicaSet": {"filters": [], "excludes": k8sReplicaSetListExcludes},
  "usersk8sJob": {"filters": [], "excludes": k8sJobListExcludes},
  "usersk8sCronJob": {"filters": [], "excludes": k8sCronJobListExcludes},
  "usersk8sDeployment": {"filters": [], "excludes": k8sDeploymentListExcludes},
  "usersk8sStatefulSet": {"filters": [], "excludes": k8sStatefulSetListExcludes},
  "usersk8sDaemonSet": {"filters": [], "excludes": k8sDaemonSetListExcludes},
  "usersk8sPodTemplate": {"filters": [], "excludes": k8sPodTemplateListExcludes},
  "parentvynilInstall": {"filters": [], "excludes": vynilInstallListExcludes},
  "parentfluxcdKustomization": {"filters": [], "excludes": fluxcdKustomizationListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SecretDelete);
const conditions = ref({
  "parentsecretgeneratorBasicAuth": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentsecretgeneratorBasicAuth']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentsecretgeneratorSSHKeyPair": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentsecretgeneratorSSHKeyPair']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentsecretgeneratorStringSecret": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentsecretgeneratorStringSecret']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentcnpgCluster": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentcnpgCluster']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentmongodbMongoDBCommunity": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentmongodbMongoDBCommunity']!=null).reduce((acc,cur)=>acc||cur,false),
  "usersk8sIngress": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersk8sIngress']).flat().filter(o=>o!=null).length>0,
  "usersk8sPod": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersk8sPod']).flat().filter(o=>o!=null).length>0,
  "usersk8sReplicaSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersk8sReplicaSet']).flat().filter(o=>o!=null).length>0,
  "usersk8sJob": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersk8sJob']).flat().filter(o=>o!=null).length>0,
  "usersk8sCronJob": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersk8sCronJob']).flat().filter(o=>o!=null).length>0,
  "usersk8sDeployment": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersk8sDeployment']).flat().filter(o=>o!=null).length>0,
  "usersk8sStatefulSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersk8sStatefulSet']).flat().filter(o=>o!=null).length>0,
  "usersk8sDaemonSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersk8sDaemonSet']).flat().filter(o=>o!=null).length>0,
  "usersk8sPodTemplate": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersk8sPodTemplate']).flat().filter(o=>o!=null).length>0,
  "parentvynilInstall": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentvynilInstall']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentfluxcdKustomization": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentfluxcdKustomization']!=null).reduce((acc,cur)=>acc||cur,false),
});
const sectionCounts = ref({
  consumeLeft: 0,
  parent: 0,
  consumeRight: 0,
  users: 0,
  uses: 0,
  bellow: 0
});
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
    sectionCounts.value.parent += conditions.value["parentsecretgeneratorBasicAuth"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentsecretgeneratorSSHKeyPair"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentsecretgeneratorStringSecret"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentcnpgCluster"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentmongodbMongoDBCommunity"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersk8sIngress"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersk8sPod"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersk8sReplicaSet"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersk8sJob"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersk8sCronJob"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersk8sDeployment"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersk8sStatefulSet"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersk8sDaemonSet"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersk8sPodTemplate"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentvynilInstall"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentfluxcdKustomization"](res.data)?1:0;
  }
});
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
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeLeft>0">
    </div>
    <div :class="`col-md-${4-(sectionCounts.consumeLeft>0?3:0)}`" v-if="!loading && sectionCounts.parent+sectionCounts.consumeRight>0"></div>
    <div class="col-md-4" v-if="!loading && conditions['parentsecretgeneratorBasicAuth'](result)">
      <secretgeneratorBasicAuthMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentsecretgeneratorBasicAuth"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentsecretgeneratorSSHKeyPair'](result)">
      <secretgeneratorSSHKeyPairMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentsecretgeneratorSSHKeyPair"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentsecretgeneratorStringSecret'](result)">
      <secretgeneratorStringSecretMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentsecretgeneratorStringSecret"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentcnpgCluster'](result)">
      <cnpgClusterMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentcnpgCluster"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentmongodbMongoDBCommunity'](result)">
      <mongodbMongoDBCommunityMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentmongodbMongoDBCommunity"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentvynilInstall'](result)">
      <vynilInstallMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentvynilInstall"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentfluxcdKustomization'](result)">
      <fluxcdKustomizationMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentfluxcdKustomization"
       />
    </div>
    <div :class="`col-md-${5-(sectionCounts.parent>0?4:0)}`" v-if="!loading && sectionCounts.consumeRight>0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeRight>0">
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-1" v-if="!loading && sectionCounts.users==0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.users>0">
      <k8sIngressList :useRefresh="false"
        v-if="!loading && conditions['usersk8sIngress'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersk8sIngress"
       />
      <k8sPodList :useRefresh="false"
        v-if="!loading && conditions['usersk8sPod'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersk8sPod"
       />
      <k8sReplicaSetList :useRefresh="false"
        v-if="!loading && conditions['usersk8sReplicaSet'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersk8sReplicaSet"
       />
      <k8sJobList :useRefresh="false"
        v-if="!loading && conditions['usersk8sJob'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersk8sJob"
       />
      <k8sCronJobList :useRefresh="false"
        v-if="!loading && conditions['usersk8sCronJob'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersk8sCronJob"
       />
      <k8sDeploymentList :useRefresh="false"
        v-if="!loading && conditions['usersk8sDeployment'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersk8sDeployment"
       />
      <k8sStatefulSetList :useRefresh="false"
        v-if="!loading && conditions['usersk8sStatefulSet'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersk8sStatefulSet"
       />
      <k8sDaemonSetList :useRefresh="false"
        v-if="!loading && conditions['usersk8sDaemonSet'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersk8sDaemonSet"
       />
      <k8sPodTemplateList :useRefresh="false"
        v-if="!loading && conditions['usersk8sPodTemplate'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersk8sPodTemplate"
       />
    </div>
    <div :class="`col-md-${6+(sectionCounts.uses<1?2:0)+(sectionCounts.users<1?2:0)}`">
      <k8sSecretView :useActions="true"
        v-if="!loading && result!=undefined && Array.isArray(result.k8sNamespace)  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null"
        :model="result.k8sNamespace[0].k8sSecret[0]"
        @on-delete="(meta)=>{actionDelete(deletor, meta)}"
        />
    </div>
    <div class="col-md-1" v-if="!loading && sectionCounts.uses==0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.uses>0">
    </div>
  </div>
</template>
