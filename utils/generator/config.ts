import { k8sObject } from "./types.js";
import { uniq } from "./utils.js";

export const excludedWriteNames = ['metadata','kind','status', 'apiVersion']
export const excludedReadNames = ['metadata','kind', 'apiVersion']
export const defaultResolvers = [];
export const excludes = [
    {group: 'vynil', short: 'Install', for: ['list', 'simple'], values: [{path:'status/tfstate'}, {path:'status/plan'}]},
];
const uses = [
    {algo: 'traefik',  group: 'k8s', short: 'Ingress', usedGroup: 'traefik', usedShort: 'Middleware', path: null},
    {algo: 'vynil',    group: 'vynil', short: 'Install', usedGroup: 'k8s', usedShort: 'Job', path: null},
    {algo: 'vynil',    group: 'vynil', short: 'Distrib', usedGroup: 'k8s', usedShort: 'Job', path: null},
    {algo: 'vynil',    group: 'vynil', short: 'Distrib', usedGroup: 'k8s', usedShort: 'CronJob', path: null},
    {algo: 'ingress',  group: 'k8s', short: 'Ingress', usedGroup: 'k8s', usedShort: 'Service', path: null},
    {algo: 'ingress',  group: 'k8s', short: 'Ingress', usedGroup: 'k8s', usedShort: 'Secret', path: null},
    {algo: 'ingress',  group: 'core', short: 'Url',    usedGroup: 'k8s', usedShort: 'Ingress', path: null},
    {algo: 'selector',  group: 'k8s', short: 'Service', usedGroup: 'k8s', usedShort: 'Pod', path: 'metadata'},
    {algo: 'selector',  group: 'k8s', short: 'Service', usedGroup: 'k8s', usedShort: 'ReplicaSet', path: 'spec/template/metadata'},
    {algo: 'selector',  group: 'k8s', short: 'Service', usedGroup: 'k8s', usedShort: 'Deployment', path: 'spec/template/metadata'},
    {algo: 'selector',  group: 'k8s', short: 'Service', usedGroup: 'k8s', usedShort: 'DaemonSet', path: 'spec/template/metadata'},
    {algo: 'selector',  group: 'k8s', short: 'Service', usedGroup: 'k8s', usedShort: 'StatefulSet', path: 'spec/template/metadata'},
    {algo: 'selector',  group: 'k8s', short: 'Service', usedGroup: 'k8s', usedShort: 'PodTemplate', path: 'template/metadata'},
    {algo: 'pvc',  group: 'k8s', short: 'Pod', path: 'spec', usedGroup: 'k8s', usedShort: 'PersistentVolumeClaim'},
    {algo: 'pvc',  group: 'k8s', short: 'ReplicaSet', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'PersistentVolumeClaim'},
    {algo: 'pvc',  group: 'k8s', short: 'Job', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'PersistentVolumeClaim'},
    {algo: 'pvc',  group: 'k8s', short: 'CronJob', path: 'spec/jobTemplate/spec/template/spec', usedGroup: 'k8s', usedShort: 'PersistentVolumeClaim'},
    {algo: 'pvc',  group: 'k8s', short: 'Deployment', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'PersistentVolumeClaim'},
    {algo: 'pvc',  group: 'k8s', short: 'DaemonSet', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'PersistentVolumeClaim'},
    {algo: 'pvc',  group: 'k8s', short: 'PodTemplate', path: 'template/spec', usedGroup: 'k8s', usedShort: 'PersistentVolumeClaim'},
    {algo: 'secret',  group: 'k8s', short: 'Pod', path: 'spec', usedGroup: 'k8s', usedShort: 'Secret'},
    {algo: 'secret',  group: 'k8s', short: 'ReplicaSet', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'Secret'},
    {algo: 'secret',  group: 'k8s', short: 'Job', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'Secret'},
    {algo: 'secret',  group: 'k8s', short: 'CronJob', path: 'spec/jobTemplate/spec/template/spec', usedGroup: 'k8s', usedShort: 'Secret'},
    {algo: 'secret',  group: 'k8s', short: 'Deployment', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'Secret'},
    {algo: 'secret',  group: 'k8s', short: 'StatefulSet', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'Secret'},
    {algo: 'secret',  group: 'k8s', short: 'DaemonSet', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'Secret'},
    {algo: 'secret',  group: 'k8s', short: 'PodTemplate', path: 'template/spec', usedGroup: 'k8s', usedShort: 'Secret'},
    {algo: 'configMap',  group: 'k8s', short: 'Pod', path: 'spec', usedGroup: 'k8s', usedShort: 'ConfigMap'},
    {algo: 'configMap',  group: 'k8s', short: 'ReplicaSet', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'ConfigMap'},
    {algo: 'configMap',  group: 'k8s', short: 'Job', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'ConfigMap'},
    {algo: 'configMap',  group: 'k8s', short: 'CronJob', path: 'spec/jobTemplate/spec/template/spec', usedGroup: 'k8s', usedShort: 'ConfigMap'},
    {algo: 'configMap',  group: 'k8s', short: 'Deployment', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'ConfigMap'},
    {algo: 'configMap',  group: 'k8s', short: 'StatefulSet', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'ConfigMap'},
    {algo: 'configMap',  group: 'k8s', short: 'DaemonSet', path: 'spec/template/spec', usedGroup: 'k8s', usedShort: 'ConfigMap'},
    {algo: 'configMap',  group: 'k8s', short: 'PodTemplate', path: 'template/spec', usedGroup: 'k8s', usedShort: 'ConfigMap'},
    {algo: 'role',         group: 'k8s', short: 'RoleBinding', usedGroup: 'k8s', usedShort: 'Role'},
    {algo: 'roleBinding',  group: 'k8s', short: 'ServiceAccount', usedGroup: 'k8s', usedShort: 'RoleBinding'},
    {algo: 'role',         group: 'k8s', short: 'ClusterRoleBinding', usedGroup: 'k8s', usedShort: 'ClusterRole'},
    {algo: 'roleBinding',  group: 'k8s', short: 'ServiceAccount', usedGroup: 'k8s', usedShort: 'ClusterRoleBinding'},
];
const provides = [
    {algo: 'certmanager', group: 'certmanager', short: 'Issuer', providedGroup: 'certmanager', providedShort: 'Certificate'},
    {algo: 'certmanager', group: 'certmanager', short: 'ClusterIssuer', providedGroup: 'certmanager', providedShort: 'Certificate'},
    {algo: 'certmanager', group: 'certmanager', short: 'Issuer', providedGroup: 'certmanager', providedShort: 'CertificateRequest'},
    {algo: 'certmanager', group: 'certmanager', short: 'ClusterIssuer', providedGroup: 'certmanager', providedShort: 'CertificateRequest'},
    {algo: 'fluxcd', group: 'fluxcd', short: 'ImageRepository', providedGroup: 'fluxcd', providedShort: 'ImagePolicy'},
    {algo: 'fluxcd', group: 'fluxcd', short: 'GitRepository', providedGroup: 'fluxcd', providedShort: 'ImageUpdateAutomation'},
    {algo: 'fluxcd', group: 'fluxcd', short: 'GitRepository', providedGroup: 'fluxcd', providedShort: 'Kustomization'},
//    {algo: 'vynil', group: 'vynil', short: 'Category', providedGroup: 'vynil', providedShort: 'Package'},
    {algo: 'vynil', group: 'vynil', short: 'Distrib', providedGroup: 'vynil', providedShort: 'Package'},
    {algo: 'vynil', group: 'vynil', short: 'Distrib', providedGroup: 'vynil', providedShort: 'Category'},
    {algo: 'vynil', group: 'vynil', short: 'Distrib', providedGroup: 'vynil', providedShort: 'Install'},
    {algo: 'vynil', group: 'vynil', short: 'Package', providedGroup: 'vynil', providedShort: 'Install'},
    {algo: 'vynil', group: 'vynil', short: 'Category', providedGroup: 'vynil', providedShort: 'Install'},
    {algo: 'nodeName',  group: 'k8s', short: 'Node', providedGroup: 'k8s', providedShort: 'Pod'},
    {algo: 'serviceAccount',  group: 'k8s', short: 'ServiceAccount', providedGroup: 'k8s', providedShort: 'Pod', path: 'spec'},
    {algo: 'serviceAccount',  group: 'k8s', short: 'ServiceAccount', providedGroup: 'k8s', providedShort: 'ReplicaSet', path: 'spec/template/spec'},
    {algo: 'serviceAccount',  group: 'k8s', short: 'ServiceAccount', providedGroup: 'k8s', providedShort: 'Deployment', path: 'spec/template/spec'},
    {algo: 'serviceAccount',  group: 'k8s', short: 'ServiceAccount', providedGroup: 'k8s', providedShort: 'DaemonSet', path: 'spec/template/spec'},
    {algo: 'serviceAccount',  group: 'k8s', short: 'ServiceAccount', providedGroup: 'k8s', providedShort: 'StatefulSet', path: 'spec/template/spec'},
    {algo: 'serviceAccount',  group: 'k8s', short: 'ServiceAccount', providedGroup: 'k8s', providedShort: 'PodTemplate', path: 'spec/template/spec'},
    {algo: 'storageClass', group: 'k8s', short: 'StorageClass', providedGroup: 'k8s', providedShort: 'PersistentVolume'},
    {algo: 'storageClass', group: 'k8s', short: 'StorageClass', providedGroup: 'k8s', providedShort: 'PersistentVolumeClaim'},
    {algo: 'apiService',   group: 'k8s', short: 'APIService', providedGroup: 'k8s', providedShort: 'CustomResourceDefinition'},
];
const equity = [
    {algo: 'certmanager', group: 'k8s', short: 'Secret', parentGroup: 'certmanager', parentShort: 'Certificate'},
    {algo: 'k8s', group: 'k8s', short: 'Secret', parentGroup: 'secretgenerator', parentShort: 'BasicAuth'},
    {algo: 'k8s', group: 'k8s', short: 'Secret', parentGroup: 'secretgenerator', parentShort: 'SSHKeyPair'},
    {algo: 'k8s', group: 'k8s', short: 'Secret', parentGroup: 'secretgenerator', parentShort: 'StringSecret'},
    {algo: 'pvc', group: 'k8s', short: 'PersistentVolume', parentGroup: 'k8s', parentShort: 'PersistentVolumeClaim'},
];
const children = [
    {algo: 'certmanager', group: 'certmanager', short: 'CertificateRequest', parentGroup: 'certmanager', parentShort: 'Certificate'},
    {algo: 'k8s', group: 'k8s', short: 'ReplicaSet', parentGroup: 'k8s', parentShort: 'Deployment'},
    {algo: 'k8s', group: 'k8s', short: 'Pod', parentGroup: 'k8s', parentShort: 'ReplicaSet'},
    {algo: 'k8s', group: 'k8s', short: 'Pod', parentGroup: 'k8s', parentShort: 'StatefulSet'},
    {algo: 'k8s', group: 'k8s', short: 'Pod', parentGroup: 'k8s', parentShort: 'DaemonSet'},
    {algo: 'k8s', group: 'k8s', short: 'Pod', parentGroup: 'k8s', parentShort: 'Job'},
    {algo: 'k8s', group: 'k8s', short: 'Pod', parentGroup: 'cnpg', parentShort: 'Cluster'},
//    {algo: 'k8s', group: 'k8s', short: 'ControllerRevision', parentGroup: 'k8s', parentShort: 'DaemonSet'},
//    {algo: 'k8s', group: 'k8s', short: 'ControllerRevision', parentGroup: 'k8s', parentShort: 'StatefulSet'},
    {algo: 'k8s', group: 'k8s', short: 'Job', parentGroup: 'k8s', parentShort: 'CronJob'},
    {algo: 'k8s', group: 'k8s', short: 'Secret', parentGroup: 'cnpg', parentShort: 'Cluster'},
    {algo: 'k8s', group: 'k8s', short: 'Secret', parentGroup: 'mongodb', parentShort: 'MongoDBCommunity'},
    {algo: 'k8s', group: 'k8s', short: 'Service', parentGroup: 'mongodb', parentShort: 'MongoDBCommunity'},
    {algo: 'k8s', group: 'k8s', short: 'Service', parentGroup: 'redis', parentShort: 'Redis'},
    {algo: 'k8s', group: 'k8s', short: 'Service', parentGroup: 'cnpg', parentShort: 'Pooler'},
    {algo: 'k8s', group: 'k8s', short: 'Service', parentGroup: 'cnpg', parentShort: 'Cluster'},
    {algo: 'k8s', group: 'k8s', short: 'Service', parentGroup: 'monitoring', parentShort: 'Prometheus'},
    {algo: 'k8s', group: 'k8s', short: 'Service', parentGroup: 'monitoring', parentShort: 'Alertmanager'},
    {algo: 'k8s', group: 'k8s', short: 'EndpointSlice', parentGroup: 'k8s', parentShort: 'Service'},
    {algo: 'k8s', group: 'k8s', short: 'StatefulSet', parentGroup: 'mongodb', parentShort: 'MongoDBCommunity'},
    {algo: 'k8s', group: 'k8s', short: 'StatefulSet', parentGroup: 'redis', parentShort: 'Redis'},
    {algo: 'k8s', group: 'k8s', short: 'StatefulSet', parentGroup: 'monitoring', parentShort: 'Prometheus'},
    {algo: 'k8s', group: 'k8s', short: 'StatefulSet', parentGroup: 'monitoring', parentShort: 'Alertmanager'},
    {algo: 'k8s', group: 'k8s', short: 'ServiceAccount', parentGroup: 'cnpg', parentShort: 'Pooler'},
    {algo: 'k8s', group: 'k8s', short: 'ServiceAccount', parentGroup: 'cnpg', parentShort: 'Cluster'},
    {algo: 'k8s', group: 'k8s', short: 'PodDisruptionBudget', parentGroup: 'cnpg', parentShort: 'Cluster'},
    {algo: 'k8s', group: 'k8s', short: 'ConfigMap', parentGroup: 'monitoring', parentShort: 'Prometheus'},
    {algo: 'k8s', group: 'k8s', short: 'Deployment', parentGroup: 'cnpg', parentShort: 'Pooler'},
    {algo: 'k8s', group: 'k8s', short: 'Role', parentGroup: 'cnpg', parentShort: 'Cluster'},
    {algo: 'k8s', group: 'k8s', short: 'Role', parentGroup: 'cnpg', parentShort: 'Pooler'},
    {algo: 'k8s', group: 'k8s', short: 'RoleBinding', parentGroup: 'cnpg', parentShort: 'Cluster'},
    {algo: 'k8s', group: 'k8s', short: 'RoleBinding', parentGroup: 'cnpg', parentShort: 'Pooler'},
    {algo: 'k8s', group: 'k8s', short: 'PersistentVolumeClaim', parentGroup: 'cnpg', parentShort: 'Cluster'},
    {algo: 'k8s', group: 'k8s', short: 'PersistentVolumeClaim', parentGroup: 'k8s', parentShort: 'StatefulSet'},
];
type autoResolver = {algo: string,type: string,group: string,short: string,targetGroup: string,targetShort: string, path?: string|null}
type autoTargetResolver = {algo: string,type: string,group: string,short: string, path?: string|null}
type autoAllResolver = {algo: string,type: string,targetGroup: string,targetShort: string, path?: string|null}
export const autoResolvers = ([] as autoResolver[]).concat(
    children.map(c=>{return {type: 'parent',  group: c.group, short: c.short, targetGroup: c.parentGroup, targetShort: c.parentShort, algo: c.algo, path: null}}),
    children.map(c=>{return {type: 'child', group: c.parentGroup, short: c.parentShort, targetGroup: c.group, targetShort: c.short, algo: c.algo, path: null}}),
    equity.map(c=>{return {type: 'parent',  group: c.group, short: c.short, targetGroup: c.parentGroup, targetShort: c.parentShort, algo: c.algo, path: null}}),
    equity.map(c=>{return {type: 'equity', group: c.parentGroup, short: c.parentShort, targetGroup: c.group, targetShort: c.short, algo: c.algo, path: null}}),
    provides.map(c=>{return {type: 'provide', group: c.group, short: c.short, targetGroup: c.providedGroup, targetShort: c.providedShort, algo: c.algo, path: c.path}}),
    provides.map(c=>{return {type: 'consume', group: c.providedGroup, short: c.providedShort, targetGroup: c.group, targetShort: c.short, algo: c.algo, path: c.path}}),
    uses.map(c=>{return {type: 'use', group: c.group, short: c.short, targetGroup: c.usedGroup, targetShort: c.usedShort, algo: c.algo, path: c.path}}),
    uses.map(c=>{return {type: 'users', group: c.usedGroup, short: c.usedShort, targetGroup: c.group, targetShort: c.short, algo: c.algo, path: c.path}}),
);
export const autoTargetResolvers = ([
    {algo: 'vynil',type: 'child',group: 'vynil',short: 'Install', path: null},
    {algo: 'fluxcd',type: 'child',group: 'fluxcd', short: 'Kustomization', path: null},
] as autoTargetResolver[]);
export const autoAllResolvers = ([
    {algo: 'vynil', type: 'parent', targetGroup: 'vynil', targetShort: 'Install'},
    {algo: 'fluxcd', type: 'parent', targetGroup: 'fluxcd', targetShort: 'Kustomization'},
] as autoAllResolver[]);
export const extraResolvers = autoResolvers.map(a=>{return {
    group: a.group, short: a.short, type: a.type, name: `${a.type}${a.targetGroup}${a.targetShort}`, args: "(params: queryParameters)", resultGroup: a.targetGroup, resultShort: a.targetShort, result: ['parent','consume','equity'].includes(a.type)?`${a.targetGroup}${a.targetShort}`:`[${a.targetGroup}${a.targetShort}]`
}}).concat()
export const extraAllResolvers = autoAllResolvers.map(a=>{return {
    type: a.type, name: `${a.type}${a.targetGroup}${a.targetShort}`, args: "(params: queryParameters)", resultGroup: a.targetGroup, resultShort: a.targetShort, result: ['parent','consume','equity'].includes(a.type)?`${a.targetGroup}${a.targetShort}`:`[${a.targetGroup}${a.targetShort}]`
}}).concat ()
export function toExtraResolvers(r:autoTargetResolver, all:k8sObject[]) {
    return all.map(o=>{return{
        args: "(params: queryParameters)", result: `[${o.group}${o.short}]`, properties: o.readProperties,
        group: r.group, short: r.short, type: r.type, name: `${r.type}${o.group}${o.short}`, resultGroup: o.group, resultShort: o.short,
    }})
}

const categoryOrder = [
    'install',
    'automation',
    'workload',
    'database',
    'storage',
    'config',
    'network',
    'security',
    'system'
];

export const categoryMappingGroup = {
    cnpg: 'database',
    zalando: 'database',
    mariadb: 'database',
    mongodb: 'database',
    oracle: 'database',
    rabbitmq: 'database',
    redis: 'database',
    fluxcd: 'automation',
    traefik: 'network',
    certmanager: 'network',
    cilium: 'network',
    projectcalico: 'network',
    monitoring: 'system',
    opentelemetry: 'system',
    jaegertracing: 'system',
    k8up: 'system',
    k8s: 'system',
    secretgenerator: 'config',
    vynil: 'install',
    cattle: 'install',
}
export const categoryMappingShort = {
    StatefulSet: 'workload',
    CronJob: 'workload',
    DaemonSet: 'workload',
    Deployment: 'workload',
    Job: 'workload',
    PodTemplate: 'workload',
    Pod: 'workload',
    ReplicaSet: 'workload',
    HorizontalPodAutoscaler: 'workload',
    ConfigMap: 'config',
    Secret: 'config',
    ClusterRoleBinding: 'security',
    ClusterRole: 'security',
    RoleBinding: 'security',
    Role: 'security',
    ServiceAccount: 'security',
    NetworkPolicy: 'security',
    Endpoints: 'network',
    Ingress: 'network',
    Service: 'network',
    EndpointSlice: 'network',
    CSIDriver: 'storage',
    CSINode: 'storage',
    CSIStorageCapacity: 'storage',
    PersistentVolumeClaim: 'storage',
    PersistentVolume: 'storage',
    StorageClass: 'storage',
    VolumeAttachment: 'storage',
    CertificateSigningRequest: 'security',
    ControllerRevision: 'workload',
    PodDisruptionBudget: 'workload',
    PriorityClass: 'workload',
    ResourceQuota: 'workload',
    RuntimeClass: 'workload',
    LimitRange: 'workload',
    ReplicationController: 'workload',
}
export const allCategories = Object.entries(categoryMappingShort).map(([_,v])=>v)
        .concat(Object.entries(categoryMappingGroup).map(([_,v])=>v))
        .filter(uniq).sort((a,b)=>categoryOrder.indexOf(a)<categoryOrder.indexOf(b)?-1:1)