import {kc, k8s, getMetadata} from '../core/libs.js';
import { PostgresqlPoolerList, PostgresqlPooler } from './type.Pooler.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    postgresqlPoolers: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers')
            const resList = res.body as PostgresqlPoolerList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    postgresqlPooler: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers', args['name'])
            const ext = res.body as PostgresqlPooler
            return {
                metadata: getMetadata(ext.metadata, ext),
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
