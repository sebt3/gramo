import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbMariaDB } from './type.MariaDB.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMariadbMariaDB: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['args'] !== undefined && Array.isArray(args['spec']['args'])) spec['args'] = args['spec']['args'];
        if (args['spec']['bootstrapFrom'] !== undefined && typeof args['spec']['bootstrapFrom'] == 'object') spec['bootstrapFrom'] = args['spec']['bootstrapFrom'];
        if (args['spec']['command'] !== undefined && Array.isArray(args['spec']['command'])) spec['command'] = args['spec']['command'];
        if (args['spec']['connection'] !== undefined && typeof args['spec']['connection'] == 'object') spec['connection'] = args['spec']['connection'];
        if (args['spec']['database'] !== undefined && typeof args['spec']['database'] == 'string') spec['database'] = args['spec']['database'];
        if (args['spec']['env'] !== undefined && Array.isArray(args['spec']['env'])) spec['env'] = args['spec']['env'];
        if (args['spec']['envFrom'] !== undefined && Array.isArray(args['spec']['envFrom'])) spec['envFrom'] = args['spec']['envFrom'];
        if (args['spec']['galera'] !== undefined && typeof args['spec']['galera'] == 'object') spec['galera'] = args['spec']['galera'];
        spec['image'] = args['spec']['image'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['inheritMetadata'] !== undefined && typeof args['spec']['inheritMetadata'] == 'object') spec['inheritMetadata'] = args['spec']['inheritMetadata'];
        if (args['spec']['initContainers'] !== undefined && Array.isArray(args['spec']['initContainers'])) spec['initContainers'] = args['spec']['initContainers'];
        if (args['spec']['livenessProbe'] !== undefined && typeof args['spec']['livenessProbe'] == 'object') spec['livenessProbe'] = args['spec']['livenessProbe'];
        if (args['spec']['metrics'] !== undefined && typeof args['spec']['metrics'] == 'object') spec['metrics'] = args['spec']['metrics'];
        if (args['spec']['myCnf'] !== undefined && typeof args['spec']['myCnf'] == 'string') spec['myCnf'] = args['spec']['myCnf'];
        if (args['spec']['myCnfConfigMapKeyRef'] !== undefined && typeof args['spec']['myCnfConfigMapKeyRef'] == 'object') spec['myCnfConfigMapKeyRef'] = args['spec']['myCnfConfigMapKeyRef'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['passwordSecretKeyRef'] !== undefined && typeof args['spec']['passwordSecretKeyRef'] == 'object') spec['passwordSecretKeyRef'] = args['spec']['passwordSecretKeyRef'];
        if (args['spec']['podAnnotations'] !== undefined && typeof args['spec']['podAnnotations'] == 'object') spec['podAnnotations'] = args['spec']['podAnnotations'];
        if (args['spec']['podDisruptionBudget'] !== undefined && typeof args['spec']['podDisruptionBudget'] == 'object') spec['podDisruptionBudget'] = args['spec']['podDisruptionBudget'];
        if (args['spec']['podSecurityContext'] !== undefined && typeof args['spec']['podSecurityContext'] == 'object') spec['podSecurityContext'] = args['spec']['podSecurityContext'];
        if (args['spec']['port'] !== undefined && typeof args['spec']['port'] == 'number') spec['port'] = args['spec']['port'];
        if (args['spec']['primaryConnection'] !== undefined && typeof args['spec']['primaryConnection'] == 'object') spec['primaryConnection'] = args['spec']['primaryConnection'];
        if (args['spec']['primaryService'] !== undefined && typeof args['spec']['primaryService'] == 'object') spec['primaryService'] = args['spec']['primaryService'];
        if (args['spec']['readinessProbe'] !== undefined && typeof args['spec']['readinessProbe'] == 'object') spec['readinessProbe'] = args['spec']['readinessProbe'];
        if (args['spec']['replicas'] !== undefined && typeof args['spec']['replicas'] == 'number') spec['replicas'] = args['spec']['replicas'];
        if (args['spec']['replication'] !== undefined && typeof args['spec']['replication'] == 'object') spec['replication'] = args['spec']['replication'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        spec['rootPasswordSecretKeyRef'] = args['spec']['rootPasswordSecretKeyRef'];
        if (args['spec']['secondaryConnection'] !== undefined && typeof args['spec']['secondaryConnection'] == 'object') spec['secondaryConnection'] = args['spec']['secondaryConnection'];
        if (args['spec']['secondaryService'] !== undefined && typeof args['spec']['secondaryService'] == 'object') spec['secondaryService'] = args['spec']['secondaryService'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['service'] !== undefined && typeof args['spec']['service'] == 'object') spec['service'] = args['spec']['service'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        if (args['spec']['updateStrategy'] !== undefined && typeof args['spec']['updateStrategy'] == 'object') spec['updateStrategy'] = args['spec']['updateStrategy'];
        if (args['spec']['username'] !== undefined && typeof args['spec']['username'] == 'string') spec['username'] = args['spec']['username'];
        spec['volumeClaimTemplate'] = args['spec']['volumeClaimTemplate'];
        if (args['spec']['volumeMounts'] !== undefined && Array.isArray(args['spec']['volumeMounts'])) spec['volumeMounts'] = args['spec']['volumeMounts'];
        if (args['spec']['volumes'] !== undefined && Array.isArray(args['spec']['volumes'])) spec['volumes'] = args['spec']['volumes'];
        const payload = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'MariaDB',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'mariadbs', payload)
            const ext = res.body as MariadbMariaDB
            return {
                metadata: getMetadata(ext.metadata),
                "affinity": ext.spec['affinity'],
                "args": ext.spec['args'],
                "bootstrapFrom": ext.spec['bootstrapFrom'],
                "command": ext.spec['command'],
                "connection": ext.spec['connection'],
                "database": ext.spec['database'],
                "env": ext.spec['env'],
                "envFrom": ext.spec['envFrom'],
                "galera": ext.spec['galera'],
                "image": ext.spec['image'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "inheritMetadata": ext.spec['inheritMetadata'],
                "initContainers": ext.spec['initContainers'],
                "livenessProbe": ext.spec['livenessProbe'],
                "metrics": ext.spec['metrics'],
                "myCnf": ext.spec['myCnf'],
                "myCnfConfigMapKeyRef": ext.spec['myCnfConfigMapKeyRef'],
                "nodeSelector": ext.spec['nodeSelector'],
                "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
                "podAnnotations": ext.spec['podAnnotations'],
                "podDisruptionBudget": ext.spec['podDisruptionBudget'],
                "podSecurityContext": ext.spec['podSecurityContext'],
                "port": ext.spec['port'],
                "primaryConnection": ext.spec['primaryConnection'],
                "primaryService": ext.spec['primaryService'],
                "readinessProbe": ext.spec['readinessProbe'],
                "replicas": ext.spec['replicas'],
                "replication": ext.spec['replication'],
                "resources": ext.spec['resources'],
                "rootPasswordSecretKeyRef": ext.spec['rootPasswordSecretKeyRef'],
                "secondaryConnection": ext.spec['secondaryConnection'],
                "secondaryService": ext.spec['secondaryService'],
                "securityContext": ext.spec['securityContext'],
                "service": ext.spec['service'],
                "tolerations": ext.spec['tolerations'],
                "updateStrategy": ext.spec['updateStrategy'],
                "username": ext.spec['username'],
                "volumeClaimTemplate": ext.spec['volumeClaimTemplate'],
                "volumeMounts": ext.spec['volumeMounts'],
                "volumes": ext.spec['volumes'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "currentPrimary": ext.status['currentPrimary'],
                    "currentPrimaryPodIndex": ext.status['currentPrimaryPodIndex'],
                    "galeraRecovery": ext.status['galeraRecovery'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchMariadbMariaDB: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['args'] !== undefined && Array.isArray(args['spec']['args'])) spec['args'] = args['spec']['args'];
        if (args['spec']['bootstrapFrom'] !== undefined && typeof args['spec']['bootstrapFrom'] == 'object') spec['bootstrapFrom'] = args['spec']['bootstrapFrom'];
        if (args['spec']['command'] !== undefined && Array.isArray(args['spec']['command'])) spec['command'] = args['spec']['command'];
        if (args['spec']['connection'] !== undefined && typeof args['spec']['connection'] == 'object') spec['connection'] = args['spec']['connection'];
        if (args['spec']['database'] !== undefined && typeof args['spec']['database'] == 'string') spec['database'] = args['spec']['database'];
        if (args['spec']['env'] !== undefined && Array.isArray(args['spec']['env'])) spec['env'] = args['spec']['env'];
        if (args['spec']['envFrom'] !== undefined && Array.isArray(args['spec']['envFrom'])) spec['envFrom'] = args['spec']['envFrom'];
        if (args['spec']['galera'] !== undefined && typeof args['spec']['galera'] == 'object') spec['galera'] = args['spec']['galera'];
        spec['image'] = args['spec']['image'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['inheritMetadata'] !== undefined && typeof args['spec']['inheritMetadata'] == 'object') spec['inheritMetadata'] = args['spec']['inheritMetadata'];
        if (args['spec']['initContainers'] !== undefined && Array.isArray(args['spec']['initContainers'])) spec['initContainers'] = args['spec']['initContainers'];
        if (args['spec']['livenessProbe'] !== undefined && typeof args['spec']['livenessProbe'] == 'object') spec['livenessProbe'] = args['spec']['livenessProbe'];
        if (args['spec']['metrics'] !== undefined && typeof args['spec']['metrics'] == 'object') spec['metrics'] = args['spec']['metrics'];
        if (args['spec']['myCnf'] !== undefined && typeof args['spec']['myCnf'] == 'string') spec['myCnf'] = args['spec']['myCnf'];
        if (args['spec']['myCnfConfigMapKeyRef'] !== undefined && typeof args['spec']['myCnfConfigMapKeyRef'] == 'object') spec['myCnfConfigMapKeyRef'] = args['spec']['myCnfConfigMapKeyRef'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['passwordSecretKeyRef'] !== undefined && typeof args['spec']['passwordSecretKeyRef'] == 'object') spec['passwordSecretKeyRef'] = args['spec']['passwordSecretKeyRef'];
        if (args['spec']['podAnnotations'] !== undefined && typeof args['spec']['podAnnotations'] == 'object') spec['podAnnotations'] = args['spec']['podAnnotations'];
        if (args['spec']['podDisruptionBudget'] !== undefined && typeof args['spec']['podDisruptionBudget'] == 'object') spec['podDisruptionBudget'] = args['spec']['podDisruptionBudget'];
        if (args['spec']['podSecurityContext'] !== undefined && typeof args['spec']['podSecurityContext'] == 'object') spec['podSecurityContext'] = args['spec']['podSecurityContext'];
        if (args['spec']['port'] !== undefined && typeof args['spec']['port'] == 'number') spec['port'] = args['spec']['port'];
        if (args['spec']['primaryConnection'] !== undefined && typeof args['spec']['primaryConnection'] == 'object') spec['primaryConnection'] = args['spec']['primaryConnection'];
        if (args['spec']['primaryService'] !== undefined && typeof args['spec']['primaryService'] == 'object') spec['primaryService'] = args['spec']['primaryService'];
        if (args['spec']['readinessProbe'] !== undefined && typeof args['spec']['readinessProbe'] == 'object') spec['readinessProbe'] = args['spec']['readinessProbe'];
        if (args['spec']['replicas'] !== undefined && typeof args['spec']['replicas'] == 'number') spec['replicas'] = args['spec']['replicas'];
        if (args['spec']['replication'] !== undefined && typeof args['spec']['replication'] == 'object') spec['replication'] = args['spec']['replication'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        spec['rootPasswordSecretKeyRef'] = args['spec']['rootPasswordSecretKeyRef'];
        if (args['spec']['secondaryConnection'] !== undefined && typeof args['spec']['secondaryConnection'] == 'object') spec['secondaryConnection'] = args['spec']['secondaryConnection'];
        if (args['spec']['secondaryService'] !== undefined && typeof args['spec']['secondaryService'] == 'object') spec['secondaryService'] = args['spec']['secondaryService'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['service'] !== undefined && typeof args['spec']['service'] == 'object') spec['service'] = args['spec']['service'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        if (args['spec']['updateStrategy'] !== undefined && typeof args['spec']['updateStrategy'] == 'object') spec['updateStrategy'] = args['spec']['updateStrategy'];
        if (args['spec']['username'] !== undefined && typeof args['spec']['username'] == 'string') spec['username'] = args['spec']['username'];
        spec['volumeClaimTemplate'] = args['spec']['volumeClaimTemplate'];
        if (args['spec']['volumeMounts'] !== undefined && Array.isArray(args['spec']['volumeMounts'])) spec['volumeMounts'] = args['spec']['volumeMounts'];
        if (args['spec']['volumes'] !== undefined && Array.isArray(args['spec']['volumes'])) spec['volumes'] = args['spec']['volumes'];
        const request = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'MariaDB',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'mariadbs', args['name'])
            const extGet = resGet.body as MariadbMariaDB
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'mariadbs', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MariadbMariaDB
            return {
                metadata: getMetadata(ext.metadata),
                "affinity": ext.spec['affinity'],
                "args": ext.spec['args'],
                "bootstrapFrom": ext.spec['bootstrapFrom'],
                "command": ext.spec['command'],
                "connection": ext.spec['connection'],
                "database": ext.spec['database'],
                "env": ext.spec['env'],
                "envFrom": ext.spec['envFrom'],
                "galera": ext.spec['galera'],
                "image": ext.spec['image'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "inheritMetadata": ext.spec['inheritMetadata'],
                "initContainers": ext.spec['initContainers'],
                "livenessProbe": ext.spec['livenessProbe'],
                "metrics": ext.spec['metrics'],
                "myCnf": ext.spec['myCnf'],
                "myCnfConfigMapKeyRef": ext.spec['myCnfConfigMapKeyRef'],
                "nodeSelector": ext.spec['nodeSelector'],
                "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
                "podAnnotations": ext.spec['podAnnotations'],
                "podDisruptionBudget": ext.spec['podDisruptionBudget'],
                "podSecurityContext": ext.spec['podSecurityContext'],
                "port": ext.spec['port'],
                "primaryConnection": ext.spec['primaryConnection'],
                "primaryService": ext.spec['primaryService'],
                "readinessProbe": ext.spec['readinessProbe'],
                "replicas": ext.spec['replicas'],
                "replication": ext.spec['replication'],
                "resources": ext.spec['resources'],
                "rootPasswordSecretKeyRef": ext.spec['rootPasswordSecretKeyRef'],
                "secondaryConnection": ext.spec['secondaryConnection'],
                "secondaryService": ext.spec['secondaryService'],
                "securityContext": ext.spec['securityContext'],
                "service": ext.spec['service'],
                "tolerations": ext.spec['tolerations'],
                "updateStrategy": ext.spec['updateStrategy'],
                "username": ext.spec['username'],
                "volumeClaimTemplate": ext.spec['volumeClaimTemplate'],
                "volumeMounts": ext.spec['volumeMounts'],
                "volumes": ext.spec['volumes'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "currentPrimary": ext.status['currentPrimary'],
                    "currentPrimaryPodIndex": ext.status['currentPrimaryPodIndex'],
                    "galeraRecovery": ext.status['galeraRecovery'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteMariadbMariaDB: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'mariadbs', args['name'])
        const ext = res.body as MariadbMariaDB
        return {
            metadata: getMetadata(ext.metadata),
            "affinity": ext.spec['affinity'],
            "args": ext.spec['args'],
            "bootstrapFrom": ext.spec['bootstrapFrom'],
            "command": ext.spec['command'],
            "connection": ext.spec['connection'],
            "database": ext.spec['database'],
            "env": ext.spec['env'],
            "envFrom": ext.spec['envFrom'],
            "galera": ext.spec['galera'],
            "image": ext.spec['image'],
            "imagePullPolicy": ext.spec['imagePullPolicy'],
            "imagePullSecrets": ext.spec['imagePullSecrets'],
            "inheritMetadata": ext.spec['inheritMetadata'],
            "initContainers": ext.spec['initContainers'],
            "livenessProbe": ext.spec['livenessProbe'],
            "metrics": ext.spec['metrics'],
            "myCnf": ext.spec['myCnf'],
            "myCnfConfigMapKeyRef": ext.spec['myCnfConfigMapKeyRef'],
            "nodeSelector": ext.spec['nodeSelector'],
            "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
            "podAnnotations": ext.spec['podAnnotations'],
            "podDisruptionBudget": ext.spec['podDisruptionBudget'],
            "podSecurityContext": ext.spec['podSecurityContext'],
            "port": ext.spec['port'],
            "primaryConnection": ext.spec['primaryConnection'],
            "primaryService": ext.spec['primaryService'],
            "readinessProbe": ext.spec['readinessProbe'],
            "replicas": ext.spec['replicas'],
            "replication": ext.spec['replication'],
            "resources": ext.spec['resources'],
            "rootPasswordSecretKeyRef": ext.spec['rootPasswordSecretKeyRef'],
            "secondaryConnection": ext.spec['secondaryConnection'],
            "secondaryService": ext.spec['secondaryService'],
            "securityContext": ext.spec['securityContext'],
            "service": ext.spec['service'],
            "tolerations": ext.spec['tolerations'],
            "updateStrategy": ext.spec['updateStrategy'],
            "username": ext.spec['username'],
            "volumeClaimTemplate": ext.spec['volumeClaimTemplate'],
            "volumeMounts": ext.spec['volumeMounts'],
            "volumes": ext.spec['volumes'],
            status: ext.status==undefined?null:{
                "conditions": ext.status['conditions'],
                "currentPrimary": ext.status['currentPrimary'],
                "currentPrimaryPodIndex": ext.status['currentPrimaryPodIndex'],
                "galeraRecovery": ext.status['galeraRecovery'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
