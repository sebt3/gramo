import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listCluster } from '../cnpg/Cluster.js';
import { lists as listStatefulSet } from '../k8s/StatefulSet.js';
import { lists as listStorageClass } from '../k8s/StorageClass.js';
import { lists as listPersistentVolume } from '../k8s/PersistentVolume.js';
import { lists as listPod } from '../k8s/Pod.js';
import { lists as listReplicaSet } from '../k8s/ReplicaSet.js';
import { lists as listJob } from '../k8s/Job.js';
import { lists as listCronJob } from '../k8s/CronJob.js';
import { lists as listDeployment } from '../k8s/Deployment.js';
import { lists as listDaemonSet } from '../k8s/DaemonSet.js';
import { lists as listPodTemplate } from '../k8s/PodTemplate.js';

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const mutations = {
    k8sPersistentVolumeClaimCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.PersistentVolumeClaim',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedPersistentVolumeClaim(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sPersistentVolumeClaimDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedPersistentVolumeClaim(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sPersistentVolumeClaimPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.PersistentVolumeClaim',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readNamespacedPersistentVolumeClaim(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedPersistentVolumeClaim(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sPersistentVolumeClaim: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`PersistentVolumeClaim.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedPersistentVolumeClaim(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`PersistentVolumeClaim.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sPersistentVolumeClaim: {
        parentCluster: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster').length<1) return null;
            const lst = await listCluster.cnpgCluster(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster'&&r.name==o['metadata']['name']).length>0)
        },
        parentStatefulSet: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='StatefulSet').length<1) return null;
            const lst = await listStatefulSet.k8sStatefulSet(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='StatefulSet'&&r.name==o['metadata']['name']).length>0)
        },
        providedToStorageClass: async (used, args: object) => {
            const lst = await listStorageClass.k8sStorageClass(used,args)
            return lst.filter(r=>r['metadata']['name']==used['spec']['storageClassName'])
        },
        usePersistentVolume: async (parent, args: object) => {
            const lst = await listPersistentVolume.k8sPersistentVolume(parent,args)
            return lst.filter(o=>parent['spec']['volumeName']==o['metadata']['name'])
        },
        usedByPod: async (parent, args: object) => {
            const lst = await listPod.k8sPod(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>
                    Array.isArray(getByPath(w, 'spec')['volumes']) &&
                    getByPath(w, 'spec')['volumes'].filter(v=>
                        v['persistentVolumeClaim']!=undefined &&
                        v['persistentVolumeClaim']['claimName']==parent['metadata']['name']
                    ).length>0
            )
        },
        usedByReplicaSet: async (parent, args: object) => {
            const lst = await listReplicaSet.k8sReplicaSet(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>
                    Array.isArray(getByPath(w, 'spec/template/spec')['volumes']) &&
                    getByPath(w, 'spec/template/spec')['volumes'].filter(v=>
                        v['persistentVolumeClaim']!=undefined &&
                        v['persistentVolumeClaim']['claimName']==parent['metadata']['name']
                    ).length>0
            )
        },
        usedByJob: async (parent, args: object) => {
            const lst = await listJob.k8sJob(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>
                    Array.isArray(getByPath(w, 'spec/template/spec')['volumes']) &&
                    getByPath(w, 'spec/template/spec')['volumes'].filter(v=>
                        v['persistentVolumeClaim']!=undefined &&
                        v['persistentVolumeClaim']['claimName']==parent['metadata']['name']
                    ).length>0
            )
        },
        usedByCronJob: async (parent, args: object) => {
            const lst = await listCronJob.k8sCronJob(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>
                    Array.isArray(getByPath(w, 'spec/jobTemplate/spec/template/spec')['volumes']) &&
                    getByPath(w, 'spec/jobTemplate/spec/template/spec')['volumes'].filter(v=>
                        v['persistentVolumeClaim']!=undefined &&
                        v['persistentVolumeClaim']['claimName']==parent['metadata']['name']
                    ).length>0
            )
        },
        usedByDeployment: async (parent, args: object) => {
            const lst = await listDeployment.k8sDeployment(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>
                    Array.isArray(getByPath(w, 'spec/template/spec')['volumes']) &&
                    getByPath(w, 'spec/template/spec')['volumes'].filter(v=>
                        v['persistentVolumeClaim']!=undefined &&
                        v['persistentVolumeClaim']['claimName']==parent['metadata']['name']
                    ).length>0
            )
        },
        usedByDaemonSet: async (parent, args: object) => {
            const lst = await listDaemonSet.k8sDaemonSet(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>
                    Array.isArray(getByPath(w, 'spec/template/spec')['volumes']) &&
                    getByPath(w, 'spec/template/spec')['volumes'].filter(v=>
                        v['persistentVolumeClaim']!=undefined &&
                        v['persistentVolumeClaim']['claimName']==parent['metadata']['name']
                    ).length>0
            )
        },
        usedByPodTemplate: async (parent, args: object) => {
            const lst = await listPodTemplate.k8sPodTemplate(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>
                    Array.isArray(getByPath(w, 'template/spec')['volumes']) &&
                    getByPath(w, 'template/spec')['volumes'].filter(v=>
                        v['persistentVolumeClaim']!=undefined &&
                        v['persistentVolumeClaim']['claimName']==parent['metadata']['name']
                    ).length>0
            )
        },
    }
};
export const nsResolver = {
    k8sPersistentVolumeClaim: async (parent, args: object) => {
        return lists.k8sPersistentVolumeClaim(parent,{namespace: parent.metadata.name, ...args})
    }
};

