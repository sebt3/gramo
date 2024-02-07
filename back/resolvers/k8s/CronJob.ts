import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listJob } from '../k8s/Job.js';
import { lists as listPersistentVolumeClaim } from '../k8s/PersistentVolumeClaim.js';
import { lists as listSecret } from '../k8s/Secret.js';
import { lists as listConfigMap } from '../k8s/ConfigMap.js';

const k8sApi = kc.makeApiClient(k8s.BatchV1Api);

export const mutations = {
    k8sCronJobCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'batch/v1',
            kind: 'io.k8s.api.batch.v1.CronJob',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCronJob(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sCronJobDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCronJob(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sCronJobPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'batch/v1',
            kind: 'io.k8s.api.batch.v1.CronJob',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readNamespacedCronJob(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCronJob(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sCronJob: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`CronJob.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCronJob(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`CronJob.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sCronJob: {
        childJob: async (parent, args: object) => {
            const lst = await listJob.k8sJob(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='CronJob' && r.name == parent['metadata']['name']).length>0
            )
        },
        usePersistentVolumeClaim: async (parent, args: object) => {
            const spec = getByPath(parent, 'spec/jobTemplate/spec/template/spec')
            if (!Array.isArray(spec['volumes']) || spec['volumes'].filter(v=>v['persistentVolumeClaim']!=undefined).length<1) return null;
            const claims = spec['volumes'].filter(v=>v['persistentVolumeClaim']!=undefined).map(v=>v['persistentVolumeClaim']['claimName'])
            const lst = await listPersistentVolumeClaim.k8sPersistentVolumeClaim(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(o=>claims.includes(o['metadata']['name']))
        },
        useSecret: async (parent, args: object) => {
            const spec = getByPath(parent, 'spec/jobTemplate/spec/template/spec');
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
            const spec = getByPath(parent, 'spec/jobTemplate/spec/template/spec');
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
    }
};
export const nsResolver = {
    k8sCronJob: async (parent, args: object) => {
        return lists.k8sCronJob(parent,{namespace: parent.metadata.name, ...args})
    }
};

