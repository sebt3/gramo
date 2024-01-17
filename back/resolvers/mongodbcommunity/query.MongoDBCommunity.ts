import {kc, k8s, getMetadata} from '../core/libs.js';
import { MongodbcommunityMongoDBCommunityList, MongodbcommunityMongoDBCommunity } from './type.MongoDBCommunity.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mongodbcommunityMongoDBCommunitys: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mongodbcommunity.mongodb.com','v1',args['namespace'],'mongodbcommunity')
            const resList = res.body as MongodbcommunityMongoDBCommunityList
            return resList.items.map((ext)=>{return{
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    mongodbcommunityMongoDBCommunity: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mongodbcommunity.mongodb.com','v1',args['namespace'],'mongodbcommunity', args['name'])
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
