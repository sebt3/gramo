<script setup lang="ts">
import k8sSecretQuery from '@/queries/k8s/Secret.details.graphql'
import SecretDelete from '@/queries/k8s/Secret.delete.graphql'
import k8sSecretMeta from '@/components/k8s/SecretMeta.vue';
import k8sSecretView from '@/components/k8s/SecretView.vue';
import { BasicAuthListExcludes } from '../../../libs/secretgenerator/custom.js'
import secretgeneratorBasicAuthMeta from '@/components/secretgenerator/BasicAuthMeta.vue';
import { SSHKeyPairListExcludes } from '../../../libs/secretgenerator/custom.js'
import secretgeneratorSSHKeyPairMeta from '@/components/secretgenerator/SSHKeyPairMeta.vue';
import { StringSecretListExcludes } from '../../../libs/secretgenerator/custom.js'
import secretgeneratorStringSecretMeta from '@/components/secretgenerator/StringSecretMeta.vue';
import { ClusterListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import { MongoDBCommunityListExcludes } from '../../../libs/mongodb/custom.js'
import mongodbMongoDBCommunityMeta from '@/components/mongodb/MongoDBCommunityMeta.vue';
import { PodListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodList from '@/components/k8s/PodList.vue';
import { ReplicaSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sReplicaSetList from '@/components/k8s/ReplicaSetList.vue';
import { JobListExcludes } from '../../../libs/k8s/custom.js'
import k8sJobList from '@/components/k8s/JobList.vue';
import { CronJobListExcludes } from '../../../libs/k8s/custom.js'
import k8sCronJobList from '@/components/k8s/CronJobList.vue';
import { DeploymentListExcludes } from '../../../libs/k8s/custom.js'
import k8sDeploymentList from '@/components/k8s/DeploymentList.vue';
import { DaemonSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sDaemonSetList from '@/components/k8s/DaemonSetList.vue';
import { PodTemplateListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodTemplateList from '@/components/k8s/PodTemplateList.vue';
import { useQuery, useMutation, useSecret, SecretReadExcludes } from '../../../libs/k8s/Secret.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSecretFound, navigation, setNamespacedItemFromRoute } = useSecret();setNamespacedItemFromRoute();
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
  "parentBasicAuth": {"filters": [], "excludes": BasicAuthListExcludes},
  "parentSSHKeyPair": {"filters": [], "excludes": SSHKeyPairListExcludes},
  "parentStringSecret": {"filters": [], "excludes": StringSecretListExcludes},
  "parentCluster": {"filters": [], "excludes": ClusterListExcludes},
  "parentMongoDBCommunity": {"filters": [], "excludes": MongoDBCommunityListExcludes},
  "usedByPod": {"filters": [], "excludes": PodListExcludes},
  "usedByReplicaSet": {"filters": [], "excludes": ReplicaSetListExcludes},
  "usedByJob": {"filters": [], "excludes": JobListExcludes},
  "usedByCronJob": {"filters": [], "excludes": CronJobListExcludes},
  "usedByDeployment": {"filters": [], "excludes": DeploymentListExcludes},
  "usedByDaemonSet": {"filters": [], "excludes": DaemonSetListExcludes},
  "usedByPodTemplate": {"filters": [], "excludes": PodTemplateListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotSecretFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SecretDelete);
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
    <div class="col-md-3">
      <k8sSecretMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null"
        :model="result.k8sNamespace[0].k8sSecret[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].parentBasicAuth!=null && result.k8sNamespace[0].k8sSecret[0].parentBasicAuth.length>0">
      <secretgeneratorBasicAuthMeta
        :model="result.k8sNamespace[0].k8sSecret[0].parentBasicAuth[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].parentSSHKeyPair!=null && result.k8sNamespace[0].k8sSecret[0].parentSSHKeyPair.length>0">
      <secretgeneratorSSHKeyPairMeta
        :model="result.k8sNamespace[0].k8sSecret[0].parentSSHKeyPair[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].parentStringSecret!=null && result.k8sNamespace[0].k8sSecret[0].parentStringSecret.length>0">
      <secretgeneratorStringSecretMeta
        :model="result.k8sNamespace[0].k8sSecret[0].parentStringSecret[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].parentCluster!=null && result.k8sNamespace[0].k8sSecret[0].parentCluster.length>0">
      <cnpgClusterMeta
        :model="result.k8sNamespace[0].k8sSecret[0].parentCluster[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].parentMongoDBCommunity!=null && result.k8sNamespace[0].k8sSecret[0].parentMongoDBCommunity.length>0">
      <mongodbMongoDBCommunityMeta
        :model="result.k8sNamespace[0].k8sSecret[0].parentMongoDBCommunity[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].usedByPod!=null && result.k8sNamespace[0].k8sSecret[0].usedByPod.length>0">
      <k8sPodList
        :model="result.k8sNamespace[0].k8sSecret[0].usedByPod"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].usedByReplicaSet!=null && result.k8sNamespace[0].k8sSecret[0].usedByReplicaSet.length>0">
      <k8sReplicaSetList
        :model="result.k8sNamespace[0].k8sSecret[0].usedByReplicaSet"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].usedByJob!=null && result.k8sNamespace[0].k8sSecret[0].usedByJob.length>0">
      <k8sJobList
        :model="result.k8sNamespace[0].k8sSecret[0].usedByJob"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].usedByCronJob!=null && result.k8sNamespace[0].k8sSecret[0].usedByCronJob.length>0">
      <k8sCronJobList
        :model="result.k8sNamespace[0].k8sSecret[0].usedByCronJob"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].usedByDeployment!=null && result.k8sNamespace[0].k8sSecret[0].usedByDeployment.length>0">
      <k8sDeploymentList
        :model="result.k8sNamespace[0].k8sSecret[0].usedByDeployment"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].usedByDaemonSet!=null && result.k8sNamespace[0].k8sSecret[0].usedByDaemonSet.length>0">
      <k8sDaemonSetList
        :model="result.k8sNamespace[0].k8sSecret[0].usedByDaemonSet"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].usedByPodTemplate!=null && result.k8sNamespace[0].k8sSecret[0].usedByPodTemplate.length>0">
      <k8sPodTemplateList
        :model="result.k8sNamespace[0].k8sSecret[0].usedByPodTemplate"
       />
    </div>
    <div class="col-md-12">
      <k8sSecretView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null"
        :model="result.k8sNamespace[0].k8sSecret[0]"
        />
    </div>
  </div>
</template>
