import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbMariaDBList, MariadbMariaDB } from './type.MariaDB.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mariadbMariaDBs: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'mariadbs')
            const resList = res.body as MariadbMariaDBList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    mariadbMariaDB: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'mariadbs', args['name'])
            const ext = res.body as MariadbMariaDB
            return {
                metadata: getMetadata(ext.metadata, ext),
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
