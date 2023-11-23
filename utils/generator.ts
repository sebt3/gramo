#!/usr/bin/env -S npx ts-node-esm
import HB from 'handlebars';
import https from 'https';
import fetch from 'node-fetch';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function minimizeFirstLetter(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
////////////////////////////////////
/// Setup the raw kube connection
//
const envTokenKey = 'TOKEN';
const envCAFileKey = 'CA_FILE';
const envSvcHostKey = 'KUBERNETES_SERVICE_HOST'
const envSvcPortKey = 'KUBERNETES_SERVICE_PORT_HTTPS'
const inClusterTokenFile = '/run/secrets/kubernetes.io/serviceaccount/token';
const inClusterCAFile = '/run/secrets/kubernetes.io/serviceaccount/ca.crt';
const clusterToken = (process.env[envTokenKey] != undefined && process.env[envTokenKey] != "") ? process.env[envTokenKey] : (fs.existsSync(inClusterTokenFile)) ? fs.readFileSync(inClusterTokenFile, 'utf-8') : "";
const clusterCAFile = (process.env[envCAFileKey] != undefined && process.env[envCAFileKey] != "") ? process.env[envCAFileKey] : (fs.existsSync(inClusterCAFile)) ? inClusterCAFile : "";
const httpsAgent = new https.Agent({
    ca: fs.readFileSync(clusterCAFile, 'utf-8')
});
if (clusterToken == "") {
    console.error("No token found")
    process.exit(1)
}
if (clusterCAFile == "") {
    console.error("No CA file found")
    process.exit(2)
}
if (process.env[envSvcHostKey] == undefined || process.env[envSvcHostKey] == "") {
    console.error("Please set "+envSvcHostKey)
    process.exit(3)
}
if (process.env[envSvcPortKey] == undefined || process.env[envSvcPortKey] == "") {
    console.error("Please set "+envSvcPortKey)
    process.exit(4)
}
const clusterUrl = `https://${process.env[envSvcHostKey]}:${process.env[envSvcPortKey]}`
async function getClusterByPath(path: string) {
    return await fetch(`${clusterUrl}/${path}`, {
        agent: httpsAgent,
        headers: {
            'Content-Type': 'appligroupion/json',
            'Authorization': `Bearer ${clusterToken}`
        }
    }).then( r => r.json())
}

////////////////////////////////////
/// Define types
//
interface k8sObject {
    crd: k8sDefinitionProperties|undefined,
    spec: openapiDefinitionPropertiesDef,
    status: openapiDefinitionPropertiesDef|undefined
}
interface HashMap<T> { [key: string]: T }
interface openapiDefinitionPropertiesDef {
    description: string|undefined,
    type: string,
    title: string|undefined,
    required: Array<string>|undefined,
    items: openapiDefinitionPropertiesDef|undefined,
    properties: HashMap<openapiDefinitionPropertiesDef>|undefined
}
interface openapiDefinitionPropertiesK8s {
    apiVersion: string,
    kind: string,
    metadata: object,
    spec: openapiDefinitionPropertiesDef,
    status: openapiDefinitionPropertiesDef|undefined
}
interface openapiDefinition {
    description: string,
    type: string,
    title: string,
    required: Array<string>,
    properties: openapiDefinitionPropertiesK8s
}
interface openapi { paths: object, definitions: HashMap<openapiDefinition> }
interface k8sDefinitionPropertiesNames {
    plural: string,
    singular: string,
    kind: string,
    listKind: string
}
interface k8sDefinitionPropertiesVersion {
    name: string,
    served: boolean,
    storage: boolean,
    schema: { openAPIV3Schema: openapiDefinitionPropertiesK8s }
}
interface k8sDefinitionPropertiesSpec {
    group: string,
    names: k8sDefinitionPropertiesNames,
    scope: string,
    versions: Array<k8sDefinitionPropertiesVersion>,
    conversion: object
}
interface k8sDefinitionPropertiesStatus {
    conditions: Array<object>,
    acceptedNames: k8sDefinitionPropertiesNames,
    storedVersions: Array<string>
}
interface k8sDefinitionProperties {
    apiVersion: string,
    kind: string,
    metadata: object,
    spec: k8sDefinitionPropertiesSpec,
    status: k8sDefinitionPropertiesStatus
}
interface crds { items: Array<k8sDefinitionProperties>}
////////////////////////////////////
/// Query kubernetes swagger and crds then deref the data to get the complete objects definitions
//
Promise.all([getClusterByPath('openapi/v2'), getClusterByPath('apis/apiextensions.k8s.io/v1/customresourcedefinitions')]).then(([data_in, crd_in]) => {
    const data = data_in as openapi
    const crds = crd_in as crds

    // deref: remplace $ref with actual referenced type
    const derefs:Map<string, openapiDefinitionPropertiesDef> = ((defs) => {
        const excluded = [
            'io.k8s.apimachinery.pkg.apis.meta.v1.Time',
            'io.k8s.apimachinery.pkg.util.intstr.IntOrString',
            'io.k8s.apimachinery.pkg.api.resource.Quantity',
            'io.k8s.api.core.v1.ConfigMapVolumeSource',
            'io.k8s.api.core.v1.ConfigMapProjection',
            'io.k8s.api.core.v1.DownwardAPIVolumeSource',
            'io.k8s.api.core.v1.DownwardAPIProjection',
            'io.k8s.api.core.v1.SecretProjection',
            'io.k8s.api.core.v1.SecretVolumeSource',
            'io.k8s.apimachinery.pkg.apis.meta.v1.MicroTime',
            'io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceSubresourceStatus',
            'io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.JSONSchemaProps']
        const queue = structuredClone(defs);
        const ret:Map<string, openapiDefinitionPropertiesDef> = new Map();
        const deref = (data) => {
            const res = structuredClone(data);
            for (const [key, val] of Object.entries(data.properties as HashMap<openapiDefinitionPropertiesDef>)) {
                if (val['$ref'] != undefined && !excluded.includes(val['$ref'].split('/')[2])) {
                    res.properties[key] = ret[val['$ref'].split('/')[2]]
                }
                if (val['type'] == 'array' && val['items'] != undefined && val['items']['$ref'] != undefined && !excluded.includes(val['items']['$ref'].split('/')[2])) {
                    res.properties[key]['items'] = ret[val['items']['$ref'].split('/')[2]]
                }
                if (val['type'] == 'object' && val.properties != undefined) {
                    for (const [k2, v2] of Object.entries(val.properties)) {
                        if ((v2 as object)['$ref'] != undefined && !excluded.includes((v2 as object)['$ref'].split('/')[2])) {
                            res.properties[key]['properties'][k2] = ret[val['properties'][k2]['$ref'].split('/')[2]]
                        }
                    }
                }
            }
            return res
        }
        let counter=0;
        while (queue.length>0) {
            const item = queue.shift();
            if (item===undefined) continue;
            let missing = false;
            for (const [key, val] of Object.entries(item[1].properties)) {
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
            }
            if (missing) {
                queue.push(item)
                counter++;
                if (counter>queue.length) {
                    break;
                }
                //console.log(queue.length,Object.keys(ret).length)
                continue;
            }
            counter=0;
            ret[item[0]] = deref(item[1])
        }
        return ret
    })(Object.entries(data.definitions).filter(e => e[1].properties!=undefined && e[1].properties['items']==undefined));new Map();

    // Sort all the definition into kubernetes objects
    const groupedObjects: HashMap<HashMap<HashMap<k8sObject>>> = {}
    for (const [key, value] of Object.entries(derefs)) {
        // Detect goup, object and version from the definition name, exclude unknown
        let group = key.split('.').slice(0,3).join('.');
        let item = ""
        let version=""
        if (['com.coreos.monitoring','com.mongodb.mongodbcommunity','de.mittwald.secretgenerator','do.zalan.acid','fr.solidite.vynil','io.cert-manager.acme','io.cnpg.postgresql','io.mmontes.mariadb', 'org.projectcalico.crd', 'us.containo.traefik'].includes(group)) {
            version = key.split('.')[3]
            item = key.split('.')[4]
        } else if (['io.k8s.api','io.fluxcd.toolkit','in.opstreelabs.redis'].includes(group)) {
            group = key.split('.').slice(0,4).join('.');
            version = key.split('.')[4]
            item = key.split('.')[5]
        } else if (['io.k8s.apimachinery','io.k8s.kube-aggregator'].includes(group)) {
            group = key.split('.').slice(0,6).join('.');
            version = key.split('.')[6]
            item = key.split('.')[7]
            if (item == undefined) continue;
        } else if (['io.cert-manager.v1','io.traefik.v1alpha1','io.k8up.v1'].includes(group)) {
            group = key.split('.').slice(0,2).join('.');
            version = key.split('.')[2]
            item = key.split('.')[3]
        } else if (['io.k8s.apiextensions-apiserver'].includes(group)) {
            group = key.split('.').slice(0,6).join('.');
            version = key.split('.')[6]
            item = key.split('.')[7]
        } else {
            console.debug(`excluding ${key}`);
            continue;
        }
        if (value.properties == undefined || value.properties.spec == undefined || value.properties.apiVersion == undefined) {
            continue;
        }

        // Feed the final classment
        const api = group.split('.').reverse().join('.');
        if (groupedObjects[api] == undefined) groupedObjects[api] = {};
        if (groupedObjects[api][item] == undefined) groupedObjects[api][item] = {};
        let status:openapiDefinitionPropertiesDef|undefined = undefined;
        if (value.properties.status != undefined)
            status = value.properties.status;
        groupedObjects[api][item][version] = {
            crd: undefined,
            spec: value.properties.spec,
            status: status
        };
    }
    // Add the crd to the matching Objects
    crds.items.forEach((crd) => {
        const group = crd.spec.group;
        if (groupedObjects[group] == undefined) return;
        if (groupedObjects[group][crd.spec.names.kind] == undefined) return;
        crd.spec.versions.forEach((vers) => {
            if (groupedObjects[group][crd.spec.names.kind][vers.name] != undefined) crd.spec.group,groupedObjects[group][crd.spec.names.kind][vers.name].crd = crd;
        });
    });
    return groupedObjects
}).then((groupedObjects) => {
////////////////////////////////////
/// Generate the files based on the grouped data from previous step
//
    const isK8s = /k8s\.io$/
    const isFlux = /toolkit\.fluxcd\.io$/
    const isTraefik = /^traefik/
    //Object.keys(groupedObjects).filter((k) => ! isK8s.test(k) && !isFlux.test(k)).forEach(k => console.log(k))
    const filteredObjects = Object.entries(groupedObjects).filter(([key]) =>
        // Exclude official api for now
        ! isK8s.test(key)
        // Exclude traefik for now
        && ! isTraefik.test(key)
        // Include only vynil for now
        && (['vynil.solidite.fr'].includes(key) || isFlux.test(key))
    )
    filteredObjects.forEach(([key, value]) => {
        const baseFileName = getBaseName(key);
        const baseName = getBaseName(key).split('.')[0];
        const baseDirName = getBaseName(key).split('.')[0];
        const subGroup = getBaseName(key).includes('.')?`${getBaseName(key).split('.')[1]}.`:'';
        const acceptedPrefix = '';
        const unsurePrefix = 'gen.';
        generateGraphQLTypes(path.resolve(__dirname,'..', 'back','schema',`${unsurePrefix}${baseFileName}.graphql`), baseName, key, value);
        generateResolverTypes(path.resolve(__dirname,'..', 'back','resolvers', baseDirName), baseName, key, value, acceptedPrefix);
        generateResolverQueries(path.resolve(__dirname,'..', 'back','resolvers', baseDirName), baseName, key, value, acceptedPrefix);
        generateResolverIndex(path.resolve(__dirname,'..', 'back','resolvers',baseDirName, `${unsurePrefix}${subGroup}index.ts`), baseName, key, value);
        generateFrontQueries(path.resolve(__dirname,'..', 'front','queries', baseDirName), baseName, value, unsurePrefix);
    })
    //generateGraphQLQueries(path.resolve(__dirname,'..', 'back','schema',`gen.queries.graphql`), Object.fromEntries(filteredObjects.map(([k,v]) => [getBaseName(k),v])))
})
HB.registerHelper('eq', (left,right) => left == right);
HB.registerHelper('contain', (v1,v2) => Array.isArray(v1) && v1.includes(v2));
HB.registerHelper('haveType', (item:openapiDefinitionPropertiesDef) => ["array","object","boolean","string","number","integer"].includes(item.type==undefined?"":item.type));
function getBaseName(key:string) {
    const isFlux = /toolkit\.fluxcd\.io$/
    return ['crd.projectcalico.org'].includes(key)?key.split('.')[1]:
    isFlux.test(key)?`${key.split('.')[2]}.${key.split('.')[0]}`:key.split('.')[0];
}
function getTargetVersion(versions: HashMap<k8sObject>) {
    const targetVersion = Object.keys(versions).reduce((res,item) => res<item?item:res,"");
    const regexpV1 = new RegExp('^v1')
    return Object.keys(versions).includes('v1') && regexpV1.test(targetVersion)? 'v1': targetVersion;
}
function generateGraphQLSubType(name: string, def: openapiDefinitionPropertiesDef, strType:string='type', haveMeta:boolean=false, haveStatus:boolean=false) {
    let res = "";
    const properties:HashMap<string> = {}
    if (def.properties != undefined) Object.entries(def.properties).forEach(([prop, val]) => {
        const req = def.required != undefined && def.required.includes(prop) ? '!':'';
        if (val == undefined) return;
        switch (val.type) {
            case "string":  properties[prop] = `String${req}`;break;
            case "number":  properties[prop] = `Float${req}`;break;
            case "integer": properties[prop] = `Int${req}`;break;
            case "boolean": properties[prop] = `Boolean${req}`;break;
            case "object":
                /*if (prop != 'metadata')*/ {
                    const tmp = generateGraphQLSubType(`${name}${capitalizeFirstLetter(prop)}`, val, strType);
                    if(tmp.length>1) {
                        properties[prop] = `${name}${capitalizeFirstLetter(prop)}${req}`;
                        res+= tmp;
                    } else {
                        properties[`#${prop}`] = `JSONObject${req}`;break;
                    }
                /*} else {
                    properties[prop] = 'metadata'*/
                }
                break;
            case "array": switch (val.items?.type) {
                case "string":  properties[prop] = `[String]${req}`;break;
                case "number":  properties[prop] = `[Float]${req}`;break;
                case "integer": properties[prop] = `[Int]${req}`;break;
                case "boolean": properties[prop] = `[Boolean]${req}`;break;
                case "object":{
                    const tmp = generateGraphQLSubType(`${name}${capitalizeFirstLetter(prop)}Item`, val.items, strType);
                    if (tmp.length>1) {
                        properties[prop] = `[${name}${capitalizeFirstLetter(prop)}Item]${req}`;
                        res+=tmp;
                    } else {
                        properties[`#${prop}`] = `JSONObject${req}`;break;
                    }
                    break;}
                default: properties[`#${prop}`] = `[JSONObject]${req}`;break;
            }break;
            default: properties[`#${prop}`] = `JSONObject${req}`;break;
        }
    });
    const template = HB.compile(`
{{ strType }} {{ name }} {
{{#if haveMeta}}
  metadata: metadata
{{/if}}
{{#each properties}}
  {{@key}}: {{this}}
{{/each}}
{{#if haveStatus}}
  status: {{ name }}Status
{{/if}}
}`);
    if (Object.keys(properties).filter(i => i[0]!='#').length>0 || haveMeta || haveStatus) {
        res+=template({
            name: name,
            properties: properties,
            haveMeta: haveMeta,
            haveStatus: haveStatus,
            strType: strType
        });
    }
    return res
}
function generateGraphQLTypes(file: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>){
    let generated  = "";
    const queries:HashMap<string> = {};
    const mutations:HashMap<string> = {};
    Object.entries(objects).forEach(([name, versions]) => {
        const targetVersion = getTargetVersion(versions);
        const group = getBaseName(apiGroup).split('.')[0];
        let haveStatus = versions[targetVersion].status != undefined
        if (versions[targetVersion].status != undefined) {
            const status = versions[targetVersion].status as openapiDefinitionPropertiesDef;
            const tmp = generateGraphQLSubType(`${short}${name}Status`, status);
            if (tmp.length>1)
                generated += tmp;
            else haveStatus = false;
        }
        generated += generateGraphQLSubType(`${short}${name}Spec`, versions[targetVersion].spec, 'input');
        generated += generateGraphQLSubType(`${short}${name}`, versions[targetVersion].spec, 'type', true, haveStatus)
        if (versions[targetVersion].crd == undefined) return;
        if (versions[targetVersion].crd?.spec.scope == 'Namespaced') {
            queries[`${group}${name}s(namespace: String!)`] = `[${group}${name}]`;
            queries[`${group}${name}(namespace: String!, name: String!)`] = `${group}${name}`;
            mutations[`create${capitalizeFirstLetter(group)}${name}(namespace: String!, name: String!, spec: ${group}${name}Spec!)`] = `${group}${name}`;
            mutations[`patch${capitalizeFirstLetter(group)}${name}(namespace: String!, name: String!, spec: ${group}${name}Spec!)`] = `${group}${name}`;
            mutations[`delete${capitalizeFirstLetter(group)}${name}(namespace: String!, name: String!)`] = `${group}${name}`;
        } else {
            queries[`${group}${name}s`] = `[${group}${name}]`;
            queries[`${group}${name}(name: String!)`] = `${group}${name}`;
            mutations[`create${capitalizeFirstLetter(group)}${name}(name: String!, spec: ${group}${name}Spec!)`] = `${group}${name}`;
            mutations[`patch${capitalizeFirstLetter(group)}${name}(name: String!, spec: ${group}${name}Spec!)`] = `${group}${name}`;
            mutations[`delete${capitalizeFirstLetter(group)}${name}(name: String!)`] = `${group}${name}`;
        }
    });
    const template = HB.compile(`
type Query {
{{#each queries}}
  {{@key}}: {{this}}
{{/each}}
}`, {noEscape: true});
    if (Object.keys(queries).length>0) generated += template({queries: queries});
    const templateMut = HB.compile(`
type Mutation {
{{#each mutations}}
  {{@key}}: {{this}}
{{/each}}
}`, {noEscape: true});
if (Object.keys(mutations).length>0) generated += templateMut({mutations: mutations});
    fs.writeFileSync(file, generated);
}
function generateResolverSubType(name: string, def: openapiDefinitionPropertiesDef) {
    let res = "";
    const properties:HashMap<string> = {}
    if (def.properties != undefined && typeof def.properties == 'object') for (const [prop, val] of Object.entries(def.properties)) {
        const req = def.required != undefined && def.required.includes(prop) ? '':' | undefined';
        if (val == undefined) continue;
        switch (val.type) {
            case "string":
            case "number":
            case "boolean": properties[prop] = `${val.type}${req}`;break;
            case "integer": properties[prop] = `number${req}`;break;
            case "object":
                //if (prop != 'metadata') {
                    properties[prop] = `${capitalizeFirstLetter(name)}${capitalizeFirstLetter(prop)}${req}`;
                    res+=generateResolverSubType(`${capitalizeFirstLetter(name)}${capitalizeFirstLetter(prop)}`, val);
                /*} else {
                    properties[prop] = 'metadata'
                }*/
                break;
            case "array": switch (val.items?.type) {
                case "string":
                case "number":
                case "boolean": properties[prop] = `Array<${val.items?.type}>${req}`;break;
                case "integer": properties[prop] = `Array<number>${req}`;break;
                case "object":
                    properties[prop] = `Array<${capitalizeFirstLetter(name)}${capitalizeFirstLetter(prop)}Item>${req}`;
                    res+=generateResolverSubType(`${capitalizeFirstLetter(name)}${capitalizeFirstLetter(prop)}Item`, val.items);
                    break;
                default: properties[prop] = `Array<object>${req}`;break;
            }break;
            default: properties[prop] = `object${req}`;break;
        }
    }
    const template = HB.compile(`
export interface {{ name }} {
{{#each properties}}
  {{@key}}: {{this}}
{{/each}}
}`, {noEscape: true});
    res+=template({
        name: capitalizeFirstLetter(name),
        properties: properties
    });
    return res
}
function generateResolverSubTypeGroup(name: string, haveStatus:boolean=false) {
    let res = "";
    const template = HB.compile(`
export interface {{ name }} extends KubernetesObject {
  spec: {{ name }}Spec
{{#if haveStatus}}
  status: {{ name }}Status | undefined
{{/if}}
}
export type {{ name }}List = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<{{ name }}>
`, {noEscape: true});
    res+=template({
        name: capitalizeFirstLetter(name),
        haveStatus: haveStatus
    });
    return res
}
function generateResolverTypes(directory: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>, filePrefix:string){
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory, { recursive: true });
    }
    Object.entries(objects).forEach(([name, versions]) => {
        let generated  = "type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject";
        const targetVersion = getTargetVersion(versions);
        if (versions[targetVersion].status != undefined) {
            const status = versions[targetVersion].status as openapiDefinitionPropertiesDef;
            generated += generateResolverSubType(`${short}${name}Status`, status);
        }
        generated += generateResolverSubType(`${short}${name}Spec`, versions[targetVersion].spec)
        generated += generateResolverSubTypeGroup(`${short}${name}`, versions[targetVersion].status != undefined)
        fs.writeFileSync(path.resolve(directory,`${filePrefix}type.${name}.ts`), generated);
    });
    return;
}
function generateResolverQueries(directory: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>, filePrefix:string){
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory, { recursive: true });
    }
    Object.entries(objects).forEach(([name, versions]) => {
        const targetVersion = getTargetVersion(versions);
        if (versions[targetVersion].crd == undefined) return;
        const namespaced = versions[targetVersion].crd?.spec.scope == 'Namespaced';
        const templateNSResolvers = HB.compile(
`import { queries } from './${filePrefix}query.{{ name }}.js'
export const resolver = {
    {{ mini }}{{ name }}s: async (parent, args: object) => {
        return queries.{{ mini }}{{ name }}s(parent,{namespace: parent.metadata.name, ...args})
    }
};
`, {noEscape: true, preventIndent: true});
        const templateQueries = HB.compile(
`import {kc, k8s, getMetadata} from '../core/libs.js';
import { {{ short }}{{ name }}List, {{ short }}{{ name }} } from './${filePrefix}type.{{ name }}.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const queries = {
{{#if namespaced}}
    {{ mini }}{{ name }}s: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('{{apiGroup}}','{{version}}',args['namespace'],'{{plural}}')
{{else}}
    {{ mini }}{{ name }}s: async () => {
        try {
            const res = await customApi.listClusterCustomObject('{{apiGroup}}','{{version}}','{{plural}}')
{{/if}}
            const resList = res.body as {{ short }}{{ name }}List
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
{{#each spec.properties}}
                {{@key}}: ext.spec.{{@key}},
{{/each}}
{{#if haveStatus}}
                status: ext.status==undefined?null:{
  {{#each status.properties}}
                    {{@key}}: ext.status.{{@key}},
  {{/each}}
                }
{{/if}}
            }})
        } catch (err) {
          console.error(err);
        }
        return []
    },
    {{ mini }}{{ name }}: async (_parent, args: object) => {
        try {
{{#if namespaced}}
            const res = await customApi.getNamespacedCustomObject('{{apiGroup}}','{{version}}',args['namespace'],'{{plural}}', args['name'])
{{else}}
            const res = await customApi.getClusterCustomObject('{{apiGroup}}','{{version}}','{{plural}}', args['name'])
{{/if}}
            const ext = res.body as {{ short }}{{ name }}
            return {
                metadata: getMetadata(ext.metadata),
{{#each spec.properties}}
                {{@key}}: ext.spec.{{@key}},
{{/each}}
{{#if haveStatus}}
                status: ext.status==undefined?null:{
  {{#each status.properties}}
                    {{@key}}: ext.status.{{@key}},
  {{/each}}
                }
{{/if}}
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
};
`, {noEscape: true, preventIndent: true});
        const templateMutations = HB.compile(
`import {kc, k8s, getMetadata} from '../core/libs.js';
import { {{ short }}{{ name }} } from './${filePrefix}type.{{ name }}.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    create{{ short }}{{ name }}: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
{{#each spec.properties}}
{{#if (contain ../spec.required @key) }}
        spec['{{@key}}'] = args['spec']['{{@key}}'];
{{else}}
{{#if (haveType this) }}
{{#if (eq this.type "array") }}
        if (args['spec']['{{@key}}'] !== undefined && Array.isArray(args['spec']['{{@key}}'])) spec['{{@key}}'] = args['spec']['{{@key}}'];
{{else if (eq this.type "integer") }}
        if (args['spec']['{{@key}}'] !== undefined && typeof args['spec']['{{@key}}'] == 'number') spec['{{@key}}'] = args['spec']['{{@key}}'];
{{else}}
        if (args['spec']['{{@key}}'] !== undefined && typeof args['spec']['{{@key}}'] == '{{this.type}}') spec['{{@key}}'] = args['spec']['{{@key}}'];
{{/if}}
{{else}}
        if (args['spec']['{{@key}}'] !== undefined) spec['{{@key}}'] = args['spec']['{{@key}}'];
{{/if}}
{{/if}}
{{/each}}
        const payload = {
            apiVersion: '{{apiGroup}}/{{version}}',
            kind: '{{ name }}',
            metadata: {
{{#if namespaced}}
              namespace: args['namespace'],
{{/if}}
              name: args['name']
            },
            spec: spec
        }
        try {
{{#if namespaced}}
            const res = await customApi.createNamespacedCustomObject('{{apiGroup}}','{{version}}',args['namespace'],'{{plural}}', payload)
{{else}}
            const res = await customApi.createClusterCustomObject('{{apiGroup}}','{{version}}','{{plural}}', payload)
{{/if}}
            const ext = res.body as {{ short }}{{ name }}
            return {
                metadata: getMetadata(ext.metadata),
{{#each spec.properties}}
                {{@key}}: ext.spec.{{@key}},
{{/each}}
{{#if haveStatus}}
                status: ext.status==undefined?null:{
  {{#each status.properties}}
                    {{@key}}: ext.status.{{@key}},
  {{/each}}
                }
{{/if}}
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    patch{{ short }}{{ name }}: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
{{#each spec.properties}}
{{#if (contain ../spec.required @key) }}
        spec['{{@key}}'] = args['spec']['{{@key}}'];
{{else}}
{{#if (haveType this) }}
{{#if (eq this.type "array") }}
        if (args['spec']['{{@key}}'] !== undefined && Array.isArray(args['spec']['{{@key}}'])) spec['{{@key}}'] = args['spec']['{{@key}}'];
{{else if (eq this.type "integer") }}
        if (args['spec']['{{@key}}'] !== undefined && typeof args['spec']['{{@key}}'] == 'number') spec['{{@key}}'] = args['spec']['{{@key}}'];
{{else}}
        if (args['spec']['{{@key}}'] !== undefined && typeof args['spec']['{{@key}}'] == '{{this.type}}') spec['{{@key}}'] = args['spec']['{{@key}}'];
{{/if}}
{{else}}
        if (args['spec']['{{@key}}'] !== undefined) spec['{{@key}}'] = args['spec']['{{@key}}'];
{{/if}}
{{/if}}
{{/each}}
        const request = {
            apiVersion: '{{apiGroup}}/{{version}}',
            kind: 'Distrib',
            metadata: {
{{#if namespaced}}
                namespace: args['namespace'],
{{/if}}
                name: args['name']
            },
            spec: spec
        }
        try {
{{#if namespaced}}
            const resGet = await customApi.getNamespacedCustomObject('{{apiGroup}}','{{version}}',args['namespace'],'{{plural}}', args['name'])
{{else}}
            const resGet = await customApi.getClusterCustomObject('{{apiGroup}}','{{version}}','{{plural}}', args['name'])
{{/if}}
            const extGet = resGet.body as {{ short }}{{ name }}
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
{{#if namespaced}}
            const res = await customApi.patchNamespacedCustomObject('{{apiGroup}}','{{version}}',args['namespace'],'{{plural}}', args['name'], payload, undefined, undefined, undefined, options)
{{else}}
            const res = await customApi.patchClusterCustomObject('{{apiGroup}}','{{version}}','{{plural}}', args['name'], payload, undefined, undefined, undefined, options)
{{/if}}
            const ext = res.body as {{ short }}{{ name }}
            return {
                metadata: getMetadata(ext.metadata),
{{#each spec.properties}}
                {{@key}}: ext.spec.{{@key}},
{{/each}}
{{#if haveStatus}}
                status: ext.status==undefined?null:{
  {{#each status.properties}}
                    {{@key}}: ext.status.{{@key}},
  {{/each}}
                }
{{/if}}
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    delete{{ short }}{{ name }}: async (_parent, args: object) => {
    try {
{{#if namespaced}}
        const res = await customApi.deleteNamespacedCustomObject('{{apiGroup}}','{{version}}',args['namespace'],'{{plural}}', args['name'])
{{else}}
        const res = await customApi.deleteClusterCustomObject('{{apiGroup}}','{{version}}','{{plural}}', args['name'])
{{/if}}
        const ext = res.body as {{ short }}{{ name }}
        return {
            metadata: getMetadata(ext.metadata),
{{#each spec.properties}}
            {{@key}}: ext.spec.{{@key}},
{{/each}}
{{#if haveStatus}}
            status: ext.status==undefined?null:{
  {{#each status.properties}}
                {{@key}}: ext.status.{{@key}},
  {{/each}}
            }
{{/if}}
        }
    } catch (err) {
        console.error(err);
    }
    return null
},
};
`, {noEscape: true, preventIndent: true});
        fs.writeFileSync(path.resolve(directory,`${filePrefix}query.${name}.ts`), templateQueries({
            name: name,
            apiGroup: apiGroup,
            version: targetVersion,
            spec: versions[targetVersion].spec,
            mini: minimizeFirstLetter(short),
            short: capitalizeFirstLetter(short),
            plural: versions[targetVersion].crd?.spec.names.plural,
            haveStatus: versions[targetVersion].status != undefined,
            status: versions[targetVersion].status,
            namespaced: namespaced
        }));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}mutation.${name}.ts`), templateMutations({
            name: name,
            apiGroup: apiGroup,
            version: targetVersion,
            spec: versions[targetVersion].spec,
            required: versions[targetVersion].spec.required,
            mini: minimizeFirstLetter(short),
            short: capitalizeFirstLetter(short),
            plural: versions[targetVersion].crd?.spec.names.plural,
            haveStatus: versions[targetVersion].status != undefined,
            status: versions[targetVersion].status,
            namespaced: namespaced
        }));
        if (namespaced) fs.writeFileSync(path.resolve(directory,`${filePrefix}resolver.namespace.${name}.ts`), templateNSResolvers({
            name: name,
            mini: minimizeFirstLetter(short),
        }));
    });
    return;
}
function generateResolverIndex(file: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>){
    const queries:Array<string> = [];
    const mutations:Array<string> = [];
    const imports:Array<string> = [];
    Object.entries(objects).forEach(([name]) => {
        queries.push(`...${name}Queries,`);
        mutations.push(`...${name}Mutations,`);
        imports.push(`import { queries as ${name}Queries } from './query.${name}.js';`);
        imports.push(`import { mutations as ${name}Mutations } from './mutation.${name}.js';`);
    });
    const template = HB.compile(`
{{#each imports}}
{{this}}
{{/each}}
export const queries = {
{{#each queries}}
    {{this}}
{{/each}}
};

export const resolvers = {
};

export const mutations = {
{{#each mutations}}
    {{this}}
{{/each}}
};
`, {noEscape: true});
    if (Object.keys(queries).length>0) fs.writeFileSync(file, template({queries: queries, mutations: mutations, imports: imports}));
}
function generateFrontQueries(directory: string, short:string, objects: HashMap<HashMap<k8sObject>>, filePrefix:string){
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory, { recursive: true });
    }
    Object.entries(objects).forEach(([name, versions]) => {
        const targetVersion = getTargetVersion(versions);
        if (versions[targetVersion].crd == undefined) return;
        const namespaced = versions[targetVersion].crd?.spec.scope == 'Namespaced';
        const listTmpl = HB.compile(`
{{#if namespaced}}
query {{ short }}{{ name }}s($namespace: String!) {
  {{ mini }}{{ name }}s(namespace: $namespace) {
{{else}}
query {{ short }}{{ name }}s {
  {{ mini }}{{ name }}s {
{{/if}}
    metadata {
      annotations {
        name
        value
      }
      labels {
        name
        value
      }
      name
      namespace
    }
{{#each spec.properties}}
  {{#if (haveType this)}}
    {{@key}}
  {{else}}
    # {{@key}}
  {{/if}}
{{/each}}
{{#if haveStatus}}
    status {
  {{#each status.properties}}
    {{#if (haveType this)}}
        {{@key}}
    {{else}}
        # {{@key}}
    {{/if}}
  {{/each}}
    }
{{/if}}
  }
}
`);
        const getTmpl = HB.compile(`
{{#if namespaced}}
query {{ short }}{{ name }}($namespace: String!, $name: String!) {
  {{ mini }}{{ name }}(namespace: $namespace, name: $name) {
{{else}}
query {{ short }}{{ name }}($name: String!) {
  {{ mini }}{{ name }}($name: String!) {
{{/if}}
    metadata {
      annotations {
        name
        value
      }
      labels {
        name
        value
      }
      name
      namespace
    }
{{#each spec.properties}}
  {{#if (haveType this)}}
    {{@key}}
  {{else}}
    # {{@key}}
  {{/if}}
{{/each}}
{{#if haveStatus}}
    status {
  {{#each status.properties}}
    {{#if (haveType this)}}
        {{@key}}
    {{else}}
        # {{@key}}
    {{/if}}
  {{/each}}
    }
{{/if}}
  }
}
`);
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}Table.graphql`), listTmpl({
            name: name,
            spec: versions[targetVersion].spec,
            mini: minimizeFirstLetter(short),
            short: capitalizeFirstLetter(short),
            haveStatus: versions[targetVersion].status != undefined,
            status: versions[targetVersion].status,
            namespaced: namespaced
        }));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}View.graphql`), getTmpl({
            name: name,
            spec: versions[targetVersion].spec,
            mini: minimizeFirstLetter(short),
            short: capitalizeFirstLetter(short),
            haveStatus: versions[targetVersion].status != undefined,
            status: versions[targetVersion].status,
            namespaced: namespaced
        }));
    });
    return;
}
