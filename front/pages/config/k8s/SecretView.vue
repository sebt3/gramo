<script setup lang="ts">
// noGramoGenerator
import k8sSecretQuery from '@/queries/k8s/Secret.details.graphql'
import SecretDelete from '@/queries/k8s/Secret.delete.graphql'
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
import { StatefulSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sStatefulSetList from '@/components/k8s/StatefulSetList.vue';
import { DaemonSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sDaemonSetList from '@/components/k8s/DaemonSetList.vue';
import { PodTemplateListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodTemplateList from '@/components/k8s/PodTemplateList.vue';
import { InstallListExcludes } from '../../../libs/vynil/custom.js'
import vynilInstallMeta from '@/components/vynil/InstallMeta.vue';
import { ref, sanitizeData, useQuery, useMutation, useSecret, SecretReadExcludes } from '../../../libs/k8s/Secret.js'
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
  "parentBasicAuth": {"filters": [], "excludes": BasicAuthListExcludes},
  "parentSSHKeyPair": {"filters": [], "excludes": SSHKeyPairListExcludes},
  "parentStringSecret": {"filters": [], "excludes": StringSecretListExcludes},
  "parentCluster": {"filters": [], "excludes": ClusterListExcludes},
  "parentMongoDBCommunity": {"filters": [], "excludes": MongoDBCommunityListExcludes},
  "usersPod": {"filters": [], "excludes": PodListExcludes},
  "usersReplicaSet": {"filters": [], "excludes": ReplicaSetListExcludes},
  "usersJob": {"filters": [], "excludes": JobListExcludes},
  "usersCronJob": {"filters": [], "excludes": CronJobListExcludes},
  "usersDeployment": {"filters": [], "excludes": DeploymentListExcludes},
  "usersStatefulSet": {"filters": [], "excludes": StatefulSetListExcludes},
  "usersDaemonSet": {"filters": [], "excludes": DaemonSetListExcludes},
  "usersPodTemplate": {"filters": [], "excludes": PodTemplateListExcludes},
  "parentInstall": {"filters": [], "excludes": InstallListExcludes},
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
  "parentBasicAuth": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentBasicAuth']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentSSHKeyPair": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentSSHKeyPair']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentStringSecret": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentStringSecret']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentCluster": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentCluster']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentMongoDBCommunity": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentMongoDBCommunity']!=null).reduce((acc,cur)=>acc||cur,false),
  "usersPod": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersPod']).flat().filter(o=>o!=null).length>0,
  "usersReplicaSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersReplicaSet']).flat().filter(o=>o!=null).length>0,
  "usersJob": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersJob']).flat().filter(o=>o!=null).length>0,
  "usersCronJob": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersCronJob']).flat().filter(o=>o!=null).length>0,
  "usersDeployment": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersDeployment']).flat().filter(o=>o!=null).length>0,
  "usersStatefulSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersStatefulSet']).flat().filter(o=>o!=null).length>0,
  "usersDaemonSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersDaemonSet']).flat().filter(o=>o!=null).length>0,
  "usersPodTemplate": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['usersPodTemplate']).flat().filter(o=>o!=null).length>0,
  "parentInstall": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['k8sSecret']).flat().map(obj=>obj['parentInstall']!=null).reduce((acc,cur)=>acc||cur,false),
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
    sectionCounts.value.parent += conditions.value["parentBasicAuth"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentSSHKeyPair"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentStringSecret"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentCluster"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentMongoDBCommunity"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersPod"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersReplicaSet"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersJob"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersCronJob"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersDeployment"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersStatefulSet"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersDaemonSet"](res.data)?1:0;
    sectionCounts.value.users += conditions.value["usersPodTemplate"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentInstall"](res.data)?1:0;
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
    <div class="col-md-4" v-if="!loading && conditions['parentBasicAuth'](result)">
      <secretgeneratorBasicAuthMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentBasicAuth"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentSSHKeyPair'](result)">
      <secretgeneratorSSHKeyPairMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentSSHKeyPair"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentStringSecret'](result)">
      <secretgeneratorStringSecretMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentStringSecret"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentCluster'](result)">
      <cnpgClusterMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentCluster"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentMongoDBCommunity'](result)">
      <mongodbMongoDBCommunityMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentMongoDBCommunity"
       />
    </div>
    <div class="col-md-4" v-if="!loading && conditions['parentInstall'](result)">
      <vynilInstallMeta :showStatus="false"
        :model="result.k8sNamespace[0].k8sSecret[0].parentInstall"
       />
    </div>
    <div :class="`col-md-${5-(sectionCounts.parent>0?4:0)}`" v-if="!loading && sectionCounts.consumeRight>0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeRight>0">
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-3" v-if="!loading && sectionCounts.users>0">
      <k8sPodList :useRefresh="false"
        v-if="!loading && conditions['usersPod'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersPod"
       />
      <k8sReplicaSetList :useRefresh="false"
        v-if="!loading && conditions['usersReplicaSet'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersReplicaSet"
       />
      <k8sJobList :useRefresh="false"
        v-if="!loading && conditions['usersJob'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersJob"
       />
      <k8sCronJobList :useRefresh="false"
        v-if="!loading && conditions['usersCronJob'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersCronJob"
       />
      <k8sDeploymentList :useRefresh="false"
        v-if="!loading && conditions['usersDeployment'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersDeployment"
       />
      <k8sStatefulSetList :useRefresh="false"
        v-if="!loading && conditions['usersStatefulSet'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersStatefulSet"
       />
      <k8sDaemonSetList :useRefresh="false"
        v-if="!loading && conditions['usersDaemonSet'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersDaemonSet"
       />
      <k8sPodTemplateList :useRefresh="false"
        v-if="!loading && conditions['usersPodTemplate'](result)"
        :model="result.k8sNamespace[0].k8sSecret[0].usersPodTemplate"
       />
    </div>
    <div :class="`col-md-${6+(sectionCounts.uses<1?3:0)+(sectionCounts.users<1?3:0)}`">
      <k8sSecretView :useActions="true"
        v-if="!loading && secret['metadata']!=null"
        :model="sanitizeData(secret)"
        @on-delete="(meta)=>{actionDelete(deletor, meta)}"
        />
    </div>
    <div class="col-md-3" v-if="!loading && sectionCounts.uses>0">
    </div>
  </div>
</template>
