import {HashMap,openapiDefinition} from './types.js'
import {k8sDefinitionProperties, k8sDefinitionPropertiesVersion, openapiDefinitionPropertiesDef, unspeciedObject, k8sObject} from './types.js'
import {objectsOrder, toExtraResolvers, autoTargetResolvers, extraAllResolvers, autoAllResolvers, excludedReadNames,excludedWriteNames,defaultResolvers,autoResolvers,extraResolvers,categoryMappingGroup,categoryMappingShort, excludes} from './config.js'
import * as fs from 'fs';
import flexver from 'flexver/dist/module.js';

export function getTargetVersion(versions: Array<k8sDefinitionPropertiesVersion>) {
    if (versions.length==1) return versions[0].name
    const targetVersion = versions.map(v=>v.name).sort(flexver.apply)[0];
    const maxVersion = versions.map(v=>v.name).sort((a,b)=>a<b?1:-1)[0];
    return (targetVersion.length<maxVersion.length)?targetVersion:maxVersion
}
export function getBaseName(key:string) {
    const isFlux = /toolkit\.fluxcd\.io$/
    return ['crd.projectcalico.org'].includes(key)?key.split('.')[1]:
    isFlux.test(key)?`${key.split('.')[2]}.${key.split('.')[0]}`:key.split('.')[0];
}
export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function getByPath(obj, path) {
    return path.split("/").reduce((res,cur) => res==null?null:res[cur.replaceAll('~1','/')],obj)
}
export function minimizeFirstLetter(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
export function uniq(value: string, index: number, array: string[]): value is string {
    return array.indexOf(value) === index;
}
export function mkdir(directory:string){
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory, { recursive: true });
    }
}
export function rmdir(directory:string){
    if (fs.existsSync(directory) && fs.readdirSync(directory).length<1){
        fs.rmdirSync(directory)
    }
}
export function saveTo(filename:string,content:object){
    fs.writeFileSync(filename, JSON.stringify(content, null, 2));
}
export function LoadFrom(filename:string){
    return JSON.parse(fs.readFileSync(filename).toLocaleString())
}

function getSub(n) {
    return n=='rbac'?'rbacAuthorization':n
}
export const getShort = (n:string) => {
    const lst = n.replaceAll('-','').split('.')
    if (/zalan/.test(n)) return {group: 'zalando', sub: getSub(lst[0])};
    if (/k8s\.io$/.test(n)) return {group: 'k8s', sub: getSub(lst[0])};
    switch(lst.length) {
        case 1: return {group: 'k8s',sub: getSub(n)};
        case 2: return {group: lst[0],sub: getSub(lst[0])};
        case 3:
            if (['solidite','mmontes', 'mittwald', 'containo', 'coreos'].includes(lst[1]))
                return {group: lst[0],sub: getSub(lst[0])};
            return {group: lst[1],sub: getSub(lst[1])};
        case 4:
            if (lst[2] == 'fluxcd') return {group: lst[2],sub: getSub(lst[0])};
            return {group: lst[0],sub: getSub(lst[0])};
        default:
            return {group: n,sub: getSub(n)}
    }
}
export const enhenceObject = (group:string, obj:unspeciedObject) => {
    let namespaced:boolean|null=null;
    if (obj.crd!=null) {
        namespaced=obj.crd.spec.scope=='Namespaced';
        const targetV = getTargetVersion(obj.crd.spec.versions)
        obj['additionalColumns'] = obj.crd.spec.versions.filter(v=>v.name==targetV)[0]['additionalPrinterColumns']
    }
    if (getShort(group).group=='k8s') {
        const short = obj.name.split('.').reverse()[0];
        if ([   'Pod', 'Secret', 'Service', 'ServiceAccount', 'PersistentVolumeClaim', 'Ingress', 'Job',
                'ReplicaSet', 'CronJob', 'StatefulSet', 'DaemonSet', 'Deployment', 'Role', 'RoleBinding',
                'ControllerRevision', 'HorizontalPodAutoscaler', 'NetworkPolicy', 'PodDisruptionBudget',
                'CSIStorageCapacity', 'Lease', 'EndpointSlice', 'ConfigMap', 'Endpoints',
                'LimitRange', 'PodTemplate', 'ReplicationController', 'ResourceQuota'
            ].includes(short))
            namespaced=true;
        if ([   'Namespace', 'Node', 'ClusterRole', 'ClusterRoleBinding', 'CustomResourceDefinition',
                'APIService', 'CertificateSigningRequest', 'CSIDriver', 'CSINode', 'StorageClass',
                'VolumeAttachment', 'MutatingWebhookConfiguration', 'ValidatingWebhookConfiguration',
                'PriorityClass', 'RuntimeClass', 'PersistentVolume',
            ].includes(short))
            namespaced = false;
    }
    return {
        ...obj,
        short: obj.name.split('.').reverse()[0],
        apiGroup: obj.definition['x-kubernetes-group-version-kind'][0]['group'],
        apiKind: obj.definition['x-kubernetes-group-version-kind'][0]['kind'],
        apiVersion: obj.definition['x-kubernetes-group-version-kind'][0]['version'],
        readProperties:  Object.fromEntries(Object.entries(obj.definition['properties']).map(([n,])=>n).filter(p=>!excludedReadNames.includes(p)).map(p=>{return [p,p.replaceAll('-','_')]})),
        writeProperties: Object.fromEntries(Object.entries(obj.definition['properties']).map(([n,])=>n).filter(p=>!excludedWriteNames.includes(p)).map(p=>{return [p,p.replaceAll('-','_')]})),
        ...getShort(group),
        listExcludes: excludes.filter(r=>r.group==getShort(group).group&&r.short==obj.name.split('.').reverse()[0]&&r.for.includes('list')).map(r=>r.values).flat(),
        readExcludes: excludes.filter(r=>r.group==getShort(group).group&&r.short==obj.name.split('.').reverse()[0]&&r.for.includes('read')).map(r=>r.values).flat(),
        simpleExcludes: excludes.filter(r=>r.group==getShort(group).group&&r.short==obj.name.split('.').reverse()[0]&&r.for.includes('simple')).map(r=>r.values).flat(),
        gqlDefs: Object.fromEntries(Object.entries(obj.definition['properties']).filter(([n])=>!['apiVersion','kind'].includes(n)).map(([n,v])=>{return [
            n.replaceAll('-','_'),
            (n=='metadata'?'metadata':
                (v as openapiDefinitionPropertiesDef).type=='string'?'String':
                (v as openapiDefinitionPropertiesDef).type=='boolean'?'Boolean':
                (v as openapiDefinitionPropertiesDef).type=='number'?'Float':
                (v as openapiDefinitionPropertiesDef).type=='integer'?'Int':
                (v as openapiDefinitionPropertiesDef).type=='object'?'JSONObject':
                typeof (v as openapiDefinitionPropertiesDef).type==='undefined'?'JSONObject':
                (v as openapiDefinitionPropertiesDef).type=='array'?
                    (v as openapiDefinitionPropertiesDef).items?.type=='string'?'[String]':
                    (v as openapiDefinitionPropertiesDef).items?.type=='boolean'?'[Boolean]':
                    (v as openapiDefinitionPropertiesDef).items?.type=='number'?'[Float]':
                    (v as openapiDefinitionPropertiesDef).items?.type=='integer'?'[Int]':'[JSONObject]'
                :(v as openapiDefinitionPropertiesDef).type) +''+(['apiVersion', 'kind', 'metadata'].includes(n)?'!':'')
        ]})),
        namespaced
    }
}
export const finalizeObject = (obj:k8sObject, all:k8sObject[]) => {
    const autos = autoResolvers.filter(r=>r.group==obj.group&&r.short==obj.short)
        .concat(autoAllResolvers.map(a=>{return {group:obj.group, short: obj.short,...a}}))
        .concat(autoTargetResolvers.filter(r=>r.group==obj.group&&r.short==obj.short).map(r=>all.map(o=>{return {
        algo: r.algo, type: r.type, inverse: r.inverse, group: obj.group, short: obj.short, targetGroup: o.group, targetShort: o.short, path: r.path
    }})).flat())
    const category = categoryMappingShort[obj.short]!=undefined?categoryMappingShort[obj.short]:categoryMappingGroup[obj.group]!=undefined?categoryMappingGroup[obj.group]:'varia';
    return {
        ...obj,
        alternatives: obj['alternatives'].length>1?obj['alternatives']:[],
        order: objectsOrder.filter(x=>x['category']==category&&x['group']==obj.group).length<1?null:objectsOrder.filter(x=>x['category']==category&&x['group']==obj.group)[0]['order'][obj.short],
        autoResolvers: autos,
        listTargets: autos.map(r=>`${r['targetGroup']}##${r['targetShort']}`).filter(uniq).map(s=>s.split('##')).map(([group,name])=>{return{group,name}}),
        category,
        resolvers: extraResolvers.filter(r=>r.group==obj.group&&r.short==obj.short)
            .concat(defaultResolvers)
            .concat(extraAllResolvers.map(a=>{return {group:obj.group, short: obj.short,...a}}))
            .map(r=>{return {...r, properties: all.filter(o=>o.group==r['resultGroup']&&o.short==r['resultShort']).map(o=>o.readProperties)[0]}})
            .concat(autoTargetResolvers.filter(r=>r.group==obj.group&&r.short==obj.short).map(r=>toExtraResolvers(r,all)).flat())
    }
}
export const getObjFQN = (c: k8sDefinitionProperties) => c.spec.group.split('.').reverse().join('.')+'.'+getTargetVersion(c.spec.versions)+'.'+c.spec.names.kind

export const replaceRefWithDef = (defs: [string, openapiDefinition][],extraExclude:string[]=[]) => {
    const excluded: string[] = extraExclude.concat([
        'io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.JSONSchemaProps',
    ]);

    const queue = structuredClone(defs);
    const ret:Map<string, openapiDefinitionPropertiesDef> = new Map();
    const deref = (data) => {
        const res = structuredClone(data);
        if (data.properties != undefined) {for (const [key, val] of Object.entries(data.properties as HashMap<openapiDefinitionPropertiesDef>)) {
            if (val['$ref'] != undefined && val['$ref'].split('/').length>2 && !excluded.includes(val['$ref'].split('/')[2])) {
                res.properties[key] = ret[val['$ref'].split('/')[2]]
            }
            if (val['type'] == 'array' && val['items'] != undefined && val['items']['$ref'] != undefined && val['items']['$ref'].split('/').length>2 && !excluded.includes(val['items']['$ref'].split('/')[2])) {
                res.properties[key]['items'] = ret[val['items']['$ref'].split('/')[2]]
            }
            if (val['type'] == 'object' && val.properties != undefined) {
                for (const [k2, v2] of Object.entries(val.properties)) {
                    if ((v2 as object)['$ref'] != undefined && !excluded.includes((v2 as object)['$ref'].split('/')[2])) {
                        res.properties[key]['properties'][k2] = ret[val['properties'][k2]['$ref'].split('/')[2]]
                    }
                }
            }
        }}
        return res
    }
    const deref_partial = (data, depth=0, queue) => {
        const res = structuredClone(data);
        if (depth>4) return res;
        if (data.properties != undefined) {for (const [key, val] of Object.entries(data.properties as HashMap<openapiDefinitionPropertiesDef>)) {
            if (val['$ref'] != undefined && val['$ref'].split('/').length>2 && !excluded.includes(val['$ref'].split('/')[2])) {
                const id = val['$ref'].split('/')[2]
                if (Object.keys(ret).includes(id))
                    res.properties[key] = ret[id]
                else if (queue.map(([k])=>k).includes(id))
                    res.properties[key] = deref_partial(queue.filter(([k])=>k==id).map(([_,v]) => v)[0], depth+1, queue)
            }
            if (val['type'] == 'array' && val['items'] != undefined && val['items']['$ref'] != undefined && val['items']['$ref'].split('/').length>2 && !excluded.includes(val['items']['$ref'].split('/')[2])) {
                const id = val['items']['$ref'].split('/')[2]
                if (Object.keys(ret).includes(id))
                    res.properties[key]['items'] = ret[id]
                else if (queue.map(([k])=>k).includes(id))
                    res.properties[key]['items'] = deref_partial(queue.filter(([k])=>k==id).map(([_,v]) => v)[0], depth+1, queue)
            }
            if (val['type'] == 'object' && val.properties != undefined) {
                for (const [k2, v2] of Object.entries(val.properties)) {
                    if ((v2 as object)['$ref'] != undefined && !excluded.includes((v2 as object)['$ref'].split('/')[2])) {
                        const id = val['properties'][k2]['$ref'].split('/')[2]
                        if (Object.keys(ret).includes(id))
                            res.properties[key]['properties'][k2] = ret[id]
                        else if (queue.filter(([k])=>k==id).length>0)
                            res.properties[key]['properties'][k2] = deref_partial(queue.filter(([k])=>k==id).map(([_,v]) => v)[0], depth+1, queue)
                    }
                }
            }
        }}
        return res
    }
    let counter=0;
    while (queue.length>0) {
        const item = queue.shift();
        if (item===undefined) continue;
        let missing = false;
        if (item[1].properties != undefined) {for (const [key, val] of Object.entries(item[1].properties)) {
            missing = missing || (val['$ref'] != undefined && key !='metadata' && !excluded.includes(val['$ref'].split('/')[2]) && !Object.keys(ret).includes(val['$ref'].split('/')[2]));
            if (val['type'] == 'array') {
                missing = missing || (val['items']['$ref'] != undefined && !excluded.includes(val['items']['$ref'].split('/')[2]) && !Object.keys(ret).includes(val['items']['$ref'].split('/')[2]));
            }
            if (val['type'] == 'object' && typeof val.properties == 'object') {
                for (const [, v2] of Object.entries(val.properties)) {
                    missing = missing || ((v2 as object)['$ref'] != undefined && !excluded.includes((v2 as object)['$ref'].split('/')[2]) && !Object.keys(ret).includes((v2 as object)['$ref'].split('/')[2]));
                }
            }
            if (missing) break;
        }}
        if (missing) {
            queue.push(item)
            counter++;
            if (counter>defs.length+1) {
                /*console.log('leaving with',
                    Object.fromEntries(queue.map(([n,v])=>[n,
                        Object.fromEntries(
                                    Object.entries(v['properties']).filter(([_,val])=>val['$ref']!=null && !Object.keys(ret).concat(excluded).includes(val['$ref'].split('/')[2])).map(([name,val])=>[name,val['$ref'].split('/')[2]])
                            .concat(Object.entries(v['properties']).filter(([_,val])=>val['type'] == 'array'&& val['items'] != null && val['items']['$ref']!=null&& !Object.keys(ret).concat(excluded).includes(val['items']['$ref'].split('/')[2])).map(([name,val])=>[name,val['items']['$ref'].split('/')[2]]))
                        )
                    ])),
                    queue.length)*/
                queue.forEach(item => ret[item[0]] = deref_partial(item[1], 0, queue))
                break;
            }
            continue;
        }
        counter=0;
        ret[item[0]] = deref(item[1])
    }
    return ret
}

