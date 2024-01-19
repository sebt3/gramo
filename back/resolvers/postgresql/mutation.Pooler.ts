import {kc, k8s, getMetadata} from '../core/libs.js';
import { PostgresqlPooler } from './type.Pooler.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createPostgresqlPooler: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['cluster'] = args['spec']['cluster'];
        if (args['spec']['deploymentStrategy'] !== undefined && typeof args['spec']['deploymentStrategy'] == 'object') spec['deploymentStrategy'] = args['spec']['deploymentStrategy'];
        spec['instances'] = args['spec']['instances'];
        if (args['spec']['monitoring'] !== undefined && typeof args['spec']['monitoring'] == 'object') spec['monitoring'] = args['spec']['monitoring'];
        spec['pgbouncer'] = args['spec']['pgbouncer'];
        if (args['spec']['template'] !== undefined && typeof args['spec']['template'] == 'object') spec['template'] = args['spec']['template'];
        spec['type'] = args['spec']['type'];
        const payload = {
            apiVersion: 'postgresql.cnpg.io/v1',
            kind: 'Pooler',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers', payload)
            const ext = res.body as PostgresqlPooler
            return {
                metadata: getMetadata(ext.metadata),
                "cluster": ext.spec['cluster'],
                "deploymentStrategy": ext.spec['deploymentStrategy'],
                "instances": ext.spec['instances'],
                "monitoring": ext.spec['monitoring'],
                "pgbouncer": ext.spec['pgbouncer'],
                "template": ext.spec['template'],
                "type": ext.spec['type'],
                status: ext.status==undefined?null:{
                    "instances": ext.status['instances'],
                    "secrets": ext.status['secrets'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchPostgresqlPooler: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['cluster'] = args['spec']['cluster'];
        if (args['spec']['deploymentStrategy'] !== undefined && typeof args['spec']['deploymentStrategy'] == 'object') spec['deploymentStrategy'] = args['spec']['deploymentStrategy'];
        spec['instances'] = args['spec']['instances'];
        if (args['spec']['monitoring'] !== undefined && typeof args['spec']['monitoring'] == 'object') spec['monitoring'] = args['spec']['monitoring'];
        spec['pgbouncer'] = args['spec']['pgbouncer'];
        if (args['spec']['template'] !== undefined && typeof args['spec']['template'] == 'object') spec['template'] = args['spec']['template'];
        spec['type'] = args['spec']['type'];
        const request = {
            apiVersion: 'postgresql.cnpg.io/v1',
            kind: 'Pooler',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers', args['name'])
            const extGet = resGet.body as PostgresqlPooler
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as PostgresqlPooler
            return {
                metadata: getMetadata(ext.metadata),
                "cluster": ext.spec['cluster'],
                "deploymentStrategy": ext.spec['deploymentStrategy'],
                "instances": ext.spec['instances'],
                "monitoring": ext.spec['monitoring'],
                "pgbouncer": ext.spec['pgbouncer'],
                "template": ext.spec['template'],
                "type": ext.spec['type'],
                status: ext.status==undefined?null:{
                    "instances": ext.status['instances'],
                    "secrets": ext.status['secrets'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deletePostgresqlPooler: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers', args['name'])
        const ext = res.body as PostgresqlPooler
        return {
            metadata: getMetadata(ext.metadata),
            "cluster": ext.spec['cluster'],
            "deploymentStrategy": ext.spec['deploymentStrategy'],
            "instances": ext.spec['instances'],
            "monitoring": ext.spec['monitoring'],
            "pgbouncer": ext.spec['pgbouncer'],
            "template": ext.spec['template'],
            "type": ext.spec['type'],
            status: ext.status==undefined?null:{
                "instances": ext.status['instances'],
                "secrets": ext.status['secrets'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
