import {kc, k8s, getMetadata} from '../core/libs.js';
import { MongodbcommunityMongoDBCommunity } from './type.MongoDBCommunity.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMongodbcommunityMongoDBCommunity: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['additionalMongodConfig'] !== undefined) spec['additionalMongodConfig'] = args['spec']['additionalMongodConfig'];
        if (args['spec']['arbiters'] !== undefined && typeof args['spec']['arbiters'] == 'number') spec['arbiters'] = args['spec']['arbiters'];
        if (args['spec']['automationConfig'] !== undefined && typeof args['spec']['automationConfig'] == 'object') spec['automationConfig'] = args['spec']['automationConfig'];
        if (args['spec']['featureCompatibilityVersion'] !== undefined && typeof args['spec']['featureCompatibilityVersion'] == 'string') spec['featureCompatibilityVersion'] = args['spec']['featureCompatibilityVersion'];
        if (args['spec']['members'] !== undefined && typeof args['spec']['members'] == 'number') spec['members'] = args['spec']['members'];
        if (args['spec']['prometheus'] !== undefined && typeof args['spec']['prometheus'] == 'object') spec['prometheus'] = args['spec']['prometheus'];
        if (args['spec']['replicaSetHorizons'] !== undefined && Array.isArray(args['spec']['replicaSetHorizons'])) spec['replicaSetHorizons'] = args['spec']['replicaSetHorizons'];
        spec['security'] = args['spec']['security'];
        if (args['spec']['statefulSet'] !== undefined && typeof args['spec']['statefulSet'] == 'object') spec['statefulSet'] = args['spec']['statefulSet'];
        spec['type'] = args['spec']['type'];
        spec['users'] = args['spec']['users'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        const payload = {
            apiVersion: 'mongodbcommunity.mongodb.com/v1',
            kind: 'MongoDBCommunity',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mongodbcommunity.mongodb.com','v1',args['namespace'],'mongodbcommunity', payload)
            const ext = res.body as MongodbcommunityMongoDBCommunity
            return {
                metadata: getMetadata(ext.metadata),
                additionalMongodConfig: ext.spec.additionalMongodConfig,
                arbiters: ext.spec.arbiters,
                automationConfig: ext.spec.automationConfig,
                featureCompatibilityVersion: ext.spec.featureCompatibilityVersion,
                members: ext.spec.members,
                prometheus: ext.spec.prometheus,
                replicaSetHorizons: ext.spec.replicaSetHorizons,
                security: ext.spec.security,
                statefulSet: ext.spec.statefulSet,
                type: ext.spec.type,
                users: ext.spec.users,
                version: ext.spec.version,
                status: ext.status==undefined?null:{
                    currentMongoDBArbiters: ext.status.currentMongoDBArbiters,
                    currentMongoDBMembers: ext.status.currentMongoDBMembers,
                    currentStatefulSetArbitersReplicas: ext.status.currentStatefulSetArbitersReplicas,
                    currentStatefulSetReplicas: ext.status.currentStatefulSetReplicas,
                    message: ext.status.message,
                    mongoUri: ext.status.mongoUri,
                    phase: ext.status.phase,
                    version: ext.status.version,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchMongodbcommunityMongoDBCommunity: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['additionalMongodConfig'] !== undefined) spec['additionalMongodConfig'] = args['spec']['additionalMongodConfig'];
        if (args['spec']['arbiters'] !== undefined && typeof args['spec']['arbiters'] == 'number') spec['arbiters'] = args['spec']['arbiters'];
        if (args['spec']['automationConfig'] !== undefined && typeof args['spec']['automationConfig'] == 'object') spec['automationConfig'] = args['spec']['automationConfig'];
        if (args['spec']['featureCompatibilityVersion'] !== undefined && typeof args['spec']['featureCompatibilityVersion'] == 'string') spec['featureCompatibilityVersion'] = args['spec']['featureCompatibilityVersion'];
        if (args['spec']['members'] !== undefined && typeof args['spec']['members'] == 'number') spec['members'] = args['spec']['members'];
        if (args['spec']['prometheus'] !== undefined && typeof args['spec']['prometheus'] == 'object') spec['prometheus'] = args['spec']['prometheus'];
        if (args['spec']['replicaSetHorizons'] !== undefined && Array.isArray(args['spec']['replicaSetHorizons'])) spec['replicaSetHorizons'] = args['spec']['replicaSetHorizons'];
        spec['security'] = args['spec']['security'];
        if (args['spec']['statefulSet'] !== undefined && typeof args['spec']['statefulSet'] == 'object') spec['statefulSet'] = args['spec']['statefulSet'];
        spec['type'] = args['spec']['type'];
        spec['users'] = args['spec']['users'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        const request = {
            apiVersion: 'mongodbcommunity.mongodb.com/v1',
            kind: 'MongoDBCommunity',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mongodbcommunity.mongodb.com','v1',args['namespace'],'mongodbcommunity', args['name'])
            const extGet = resGet.body as MongodbcommunityMongoDBCommunity
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mongodbcommunity.mongodb.com','v1',args['namespace'],'mongodbcommunity', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MongodbcommunityMongoDBCommunity
            return {
                metadata: getMetadata(ext.metadata),
                additionalMongodConfig: ext.spec.additionalMongodConfig,
                arbiters: ext.spec.arbiters,
                automationConfig: ext.spec.automationConfig,
                featureCompatibilityVersion: ext.spec.featureCompatibilityVersion,
                members: ext.spec.members,
                prometheus: ext.spec.prometheus,
                replicaSetHorizons: ext.spec.replicaSetHorizons,
                security: ext.spec.security,
                statefulSet: ext.spec.statefulSet,
                type: ext.spec.type,
                users: ext.spec.users,
                version: ext.spec.version,
                status: ext.status==undefined?null:{
                    currentMongoDBArbiters: ext.status.currentMongoDBArbiters,
                    currentMongoDBMembers: ext.status.currentMongoDBMembers,
                    currentStatefulSetArbitersReplicas: ext.status.currentStatefulSetArbitersReplicas,
                    currentStatefulSetReplicas: ext.status.currentStatefulSetReplicas,
                    message: ext.status.message,
                    mongoUri: ext.status.mongoUri,
                    phase: ext.status.phase,
                    version: ext.status.version,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteMongodbcommunityMongoDBCommunity: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mongodbcommunity.mongodb.com','v1',args['namespace'],'mongodbcommunity', args['name'])
        const ext = res.body as MongodbcommunityMongoDBCommunity
        return {
            metadata: getMetadata(ext.metadata),
            additionalMongodConfig: ext.spec.additionalMongodConfig,
            arbiters: ext.spec.arbiters,
            automationConfig: ext.spec.automationConfig,
            featureCompatibilityVersion: ext.spec.featureCompatibilityVersion,
            members: ext.spec.members,
            prometheus: ext.spec.prometheus,
            replicaSetHorizons: ext.spec.replicaSetHorizons,
            security: ext.spec.security,
            statefulSet: ext.spec.statefulSet,
            type: ext.spec.type,
            users: ext.spec.users,
            version: ext.spec.version,
            status: ext.status==undefined?null:{
                currentMongoDBArbiters: ext.status.currentMongoDBArbiters,
                currentMongoDBMembers: ext.status.currentMongoDBMembers,
                currentStatefulSetArbitersReplicas: ext.status.currentStatefulSetArbitersReplicas,
                currentStatefulSetReplicas: ext.status.currentStatefulSetReplicas,
                message: ext.status.message,
                mongoUri: ext.status.mongoUri,
                phase: ext.status.phase,
                version: ext.status.version,
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
