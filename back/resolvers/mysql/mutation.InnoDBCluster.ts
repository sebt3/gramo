import {kc, k8s, getMetadata} from '../core/libs.js';
import { MysqlInnoDBCluster } from './type.InnoDBCluster.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMysqlInnoDBCluster: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['backupProfiles'] !== undefined && Array.isArray(args['spec']['backupProfiles'])) spec['backupProfiles'] = args['spec']['backupProfiles'];
        if (args['spec']['backupSchedules'] !== undefined && Array.isArray(args['spec']['backupSchedules'])) spec['backupSchedules'] = args['spec']['backupSchedules'];
        if (args['spec']['baseServerId'] !== undefined && typeof args['spec']['baseServerId'] == 'number') spec['baseServerId'] = args['spec']['baseServerId'];
        if (args['spec']['datadirVolumeClaimTemplate'] !== undefined) spec['datadirVolumeClaimTemplate'] = args['spec']['datadirVolumeClaimTemplate'];
        if (args['spec']['edition'] !== undefined && typeof args['spec']['edition'] == 'string') spec['edition'] = args['spec']['edition'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['imageRepository'] !== undefined && typeof args['spec']['imageRepository'] == 'string') spec['imageRepository'] = args['spec']['imageRepository'];
        if (args['spec']['initDB'] !== undefined) spec['initDB'] = args['spec']['initDB'];
        if (args['spec']['instances'] !== undefined && typeof args['spec']['instances'] == 'number') spec['instances'] = args['spec']['instances'];
        if (args['spec']['keyring'] !== undefined && typeof args['spec']['keyring'] == 'object') spec['keyring'] = args['spec']['keyring'];
        if (args['spec']['logs'] !== undefined && typeof args['spec']['logs'] == 'object') spec['logs'] = args['spec']['logs'];
        if (args['spec']['metrics'] !== undefined && typeof args['spec']['metrics'] == 'object') spec['metrics'] = args['spec']['metrics'];
        if (args['spec']['mycnf'] !== undefined && typeof args['spec']['mycnf'] == 'string') spec['mycnf'] = args['spec']['mycnf'];
        if (args['spec']['podAnnotations'] !== undefined) spec['podAnnotations'] = args['spec']['podAnnotations'];
        if (args['spec']['podLabels'] !== undefined) spec['podLabels'] = args['spec']['podLabels'];
        if (args['spec']['podSpec'] !== undefined) spec['podSpec'] = args['spec']['podSpec'];
        if (args['spec']['readReplicas'] !== undefined && Array.isArray(args['spec']['readReplicas'])) spec['readReplicas'] = args['spec']['readReplicas'];
        if (args['spec']['router'] !== undefined && typeof args['spec']['router'] == 'object') spec['router'] = args['spec']['router'];
        spec['secretName'] = args['spec']['secretName'];
        if (args['spec']['service'] !== undefined && typeof args['spec']['service'] == 'object') spec['service'] = args['spec']['service'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['tlsCASecretName'] !== undefined && typeof args['spec']['tlsCASecretName'] == 'string') spec['tlsCASecretName'] = args['spec']['tlsCASecretName'];
        if (args['spec']['tlsSecretName'] !== undefined && typeof args['spec']['tlsSecretName'] == 'string') spec['tlsSecretName'] = args['spec']['tlsSecretName'];
        if (args['spec']['tlsUseSelfSigned'] !== undefined && typeof args['spec']['tlsUseSelfSigned'] == 'boolean') spec['tlsUseSelfSigned'] = args['spec']['tlsUseSelfSigned'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        const payload = {
            apiVersion: 'mysql.oracle.com/v2',
            kind: 'InnoDBCluster',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'innodbclusters', payload)
            const ext = res.body as MysqlInnoDBCluster
            return {
                metadata: getMetadata(ext.metadata),
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
    patchMysqlInnoDBCluster: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['backupProfiles'] !== undefined && Array.isArray(args['spec']['backupProfiles'])) spec['backupProfiles'] = args['spec']['backupProfiles'];
        if (args['spec']['backupSchedules'] !== undefined && Array.isArray(args['spec']['backupSchedules'])) spec['backupSchedules'] = args['spec']['backupSchedules'];
        if (args['spec']['baseServerId'] !== undefined && typeof args['spec']['baseServerId'] == 'number') spec['baseServerId'] = args['spec']['baseServerId'];
        if (args['spec']['datadirVolumeClaimTemplate'] !== undefined) spec['datadirVolumeClaimTemplate'] = args['spec']['datadirVolumeClaimTemplate'];
        if (args['spec']['edition'] !== undefined && typeof args['spec']['edition'] == 'string') spec['edition'] = args['spec']['edition'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['imageRepository'] !== undefined && typeof args['spec']['imageRepository'] == 'string') spec['imageRepository'] = args['spec']['imageRepository'];
        if (args['spec']['initDB'] !== undefined) spec['initDB'] = args['spec']['initDB'];
        if (args['spec']['instances'] !== undefined && typeof args['spec']['instances'] == 'number') spec['instances'] = args['spec']['instances'];
        if (args['spec']['keyring'] !== undefined && typeof args['spec']['keyring'] == 'object') spec['keyring'] = args['spec']['keyring'];
        if (args['spec']['logs'] !== undefined && typeof args['spec']['logs'] == 'object') spec['logs'] = args['spec']['logs'];
        if (args['spec']['metrics'] !== undefined && typeof args['spec']['metrics'] == 'object') spec['metrics'] = args['spec']['metrics'];
        if (args['spec']['mycnf'] !== undefined && typeof args['spec']['mycnf'] == 'string') spec['mycnf'] = args['spec']['mycnf'];
        if (args['spec']['podAnnotations'] !== undefined) spec['podAnnotations'] = args['spec']['podAnnotations'];
        if (args['spec']['podLabels'] !== undefined) spec['podLabels'] = args['spec']['podLabels'];
        if (args['spec']['podSpec'] !== undefined) spec['podSpec'] = args['spec']['podSpec'];
        if (args['spec']['readReplicas'] !== undefined && Array.isArray(args['spec']['readReplicas'])) spec['readReplicas'] = args['spec']['readReplicas'];
        if (args['spec']['router'] !== undefined && typeof args['spec']['router'] == 'object') spec['router'] = args['spec']['router'];
        spec['secretName'] = args['spec']['secretName'];
        if (args['spec']['service'] !== undefined && typeof args['spec']['service'] == 'object') spec['service'] = args['spec']['service'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['tlsCASecretName'] !== undefined && typeof args['spec']['tlsCASecretName'] == 'string') spec['tlsCASecretName'] = args['spec']['tlsCASecretName'];
        if (args['spec']['tlsSecretName'] !== undefined && typeof args['spec']['tlsSecretName'] == 'string') spec['tlsSecretName'] = args['spec']['tlsSecretName'];
        if (args['spec']['tlsUseSelfSigned'] !== undefined && typeof args['spec']['tlsUseSelfSigned'] == 'boolean') spec['tlsUseSelfSigned'] = args['spec']['tlsUseSelfSigned'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        const request = {
            apiVersion: 'mysql.oracle.com/v2',
            kind: 'InnoDBCluster',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'innodbclusters', args['name'])
            const extGet = resGet.body as MysqlInnoDBCluster
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'innodbclusters', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MysqlInnoDBCluster
            return {
                metadata: getMetadata(ext.metadata),
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
    deleteMysqlInnoDBCluster: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'innodbclusters', args['name'])
        const ext = res.body as MysqlInnoDBCluster
        return {
            metadata: getMetadata(ext.metadata),
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
