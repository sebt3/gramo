import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listDeployment } from '../k8s/Deployment.js';
import { lists as listPod } from '../k8s/Pod.js';
import { lists as listPersistentVolumeClaim } from '../k8s/PersistentVolumeClaim.js';
import { lists as listSecret } from '../k8s/Secret.js';
import { lists as listConfigMap } from '../k8s/ConfigMap.js';
import { lists as listService } from '../k8s/Service.js';

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

export const mutations = {
    k8sReplicaSetCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'apps/v1',
            kind: 'io.k8s.api.apps.v1.ReplicaSet',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedReplicaSet(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sReplicaSetDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedReplicaSet(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sReplicaSetPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'apps/v1',
            kind: 'io.k8s.api.apps.v1.ReplicaSet',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readNamespacedReplicaSet(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedReplicaSet(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sReplicaSet: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`ReplicaSet.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedReplicaSet(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`ReplicaSet.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sReplicaSet: {
        parentDeployment: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Deployment').length<1) return null;
            const lst = await listDeployment.k8sDeployment(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Deployment'&&r.name==o['metadata']['name']).length>0)
        },
        childPod: async (parent, args: object) => {
            const lst = await listPod.k8sPod(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='ReplicaSet' && r.name == parent['metadata']['name']).length>0
            )
        },
        usePersistentVolumeClaim: async (parent, args: object) => {
            const spec = getByPath(parent, 'spec/template/spec')
            if (!Array.isArray(spec['volumes']) || spec['volumes'].filter(v=>v['persistentVolumeClaim']!=undefined).length<1) return null;
            const claims = spec['volumes'].filter(v=>v['persistentVolumeClaim']!=undefined).map(v=>v['persistentVolumeClaim']['claimName'])
            const lst = await listPersistentVolumeClaim.k8sPersistentVolumeClaim(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(o=>claims.includes(o['metadata']['name']))
        },
        useSecret: async (parent, args: object) => {
            const spec = getByPath(parent, 'spec/template/spec');
            const secrets = spec['containers']
                            .filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['secretKeyRef']!=undefined).length>0)
                            .map(c=>c['env']
                                .filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['secretKeyRef']!=undefined)
                                .map(e=>e['valueFrom']['secretKeyRef']['name'])
                            ).flat()
                        .concat(spec['containers']
                            .filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['secretRef']!=undefined).length>0)
                            .map(c=>c['envFrom']
                                .filter(e=>e['secretRef']!=undefined)
                                .map(e=>e['secretRef']['name'])
                            ).flat())
                        .concat(Array.isArray(spec['volumes'])?spec['volumes'].filter(v=>v['secret']!=undefined).map(v=>v['secret']['secretName']):[])
            if (secrets.length<1) return null;
            const lst = await listSecret.k8sSecret(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(s=>secrets.includes(s['metadata']['name']))
        },
        useConfigMap: async (parent, args: object) => {
            const spec = getByPath(parent, 'spec/template/spec');
            const cms = spec['containers']
                        .filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['configMapKeyRef']!=undefined).length>0)
                        .map(c=>c['env']
                            .filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['configMapKeyRef']!=undefined)
                            .map(e=>e['valueFrom']['configMapKeyRef']['name'])
                        ).flat()
                    .concat(spec['containers']
                        .filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['configMapRef']!=undefined).length>0)
                        .map(c=>c['envFrom'].filter(e=>e['configMapRef']!=undefined).map(e=>e['configMapRef']['name'])).flat())
                    .concat(Array.isArray(spec['volumes'])?spec['volumes']
                        .filter(v=>v['configMap']!=undefined)
                        .map(v=>v['configMap']['name']):[])
            if (cms.length<1) return null;
            const lst = await listConfigMap.k8sConfigMap(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(s=>cms.includes(s['metadata']['name']))
        },
        usedByService: async (parent, args: object) => {
            const meta = getByPath(parent, 'spec/template/metadata');
            if (meta['labels'] == undefined || Object.keys(meta['labels']).length<1) return null;
            const lst = await listService.k8sService(parent, {namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(svc=>{
                if (svc['spec']['selector'] == undefined || Object.keys(svc['spec']['selector']).length<1) return false;
                const targetCnt = Object.keys(svc['spec']['selector']).length;
                return targetCnt == Object.entries(svc['spec']['selector'])
                    .reduce((acc,[name, value]) =>acc+Object.entries(meta['labels']).reduce(
                        (inAcc,[inName,inValue]) => inAcc+((name==inName&&value==inValue)?1:0)
                    ,0),0)
            })
        },
    }
};
export const nsResolver = {
    k8sReplicaSet: async (parent, args: object) => {
        return lists.k8sReplicaSet(parent,{namespace: parent.metadata.name, ...args})
    }
};

