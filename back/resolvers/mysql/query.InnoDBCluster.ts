import {kc, k8s, getMetadata} from '../core/libs.js';
import { MysqlInnoDBClusterList, MysqlInnoDBCluster } from './type.InnoDBCluster.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mysqlInnoDBClusters: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'innodbclusters')
            const resList = res.body as MysqlInnoDBClusterList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "backupProfiles": ext.spec['backupProfiles'],
                "backupSchedules": ext.spec['backupSchedules'],
                "baseServerId": ext.spec['baseServerId'],
                "datadirVolumeClaimTemplate": ext.spec['datadirVolumeClaimTemplate'],
                "edition": ext.spec['edition'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "imageRepository": ext.spec['imageRepository'],
                "initDB": ext.spec['initDB'],
                "instances": ext.spec['instances'],
                "keyring": ext.spec['keyring'],
                "logs": ext.spec['logs'],
                "metrics": ext.spec['metrics'],
                "mycnf": ext.spec['mycnf'],
                "podAnnotations": ext.spec['podAnnotations'],
                "podLabels": ext.spec['podLabels'],
                "podSpec": ext.spec['podSpec'],
                "readReplicas": ext.spec['readReplicas'],
                "router": ext.spec['router'],
                "secretName": ext.spec['secretName'],
                "service": ext.spec['service'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "tlsCASecretName": ext.spec['tlsCASecretName'],
                "tlsSecretName": ext.spec['tlsSecretName'],
                "tlsUseSelfSigned": ext.spec['tlsUseSelfSigned'],
                "version": ext.spec['version'],
                status: ext.status==undefined?null:{
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    mysqlInnoDBCluster: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'innodbclusters', args['name'])
            const ext = res.body as MysqlInnoDBCluster
            return {
                metadata: getMetadata(ext.metadata, ext),
                "backupProfiles": ext.spec['backupProfiles'],
                "backupSchedules": ext.spec['backupSchedules'],
                "baseServerId": ext.spec['baseServerId'],
                "datadirVolumeClaimTemplate": ext.spec['datadirVolumeClaimTemplate'],
                "edition": ext.spec['edition'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "imageRepository": ext.spec['imageRepository'],
                "initDB": ext.spec['initDB'],
                "instances": ext.spec['instances'],
                "keyring": ext.spec['keyring'],
                "logs": ext.spec['logs'],
                "metrics": ext.spec['metrics'],
                "mycnf": ext.spec['mycnf'],
                "podAnnotations": ext.spec['podAnnotations'],
                "podLabels": ext.spec['podLabels'],
                "podSpec": ext.spec['podSpec'],
                "readReplicas": ext.spec['readReplicas'],
                "router": ext.spec['router'],
                "secretName": ext.spec['secretName'],
                "service": ext.spec['service'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "tlsCASecretName": ext.spec['tlsCASecretName'],
                "tlsSecretName": ext.spec['tlsSecretName'],
                "tlsUseSelfSigned": ext.spec['tlsUseSelfSigned'],
                "version": ext.spec['version'],
                status: ext.status==undefined?null:{
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
