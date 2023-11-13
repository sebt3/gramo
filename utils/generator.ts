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
    function deref(val:openapiDefinitionPropertiesDef) {
        let res:openapiDefinitionPropertiesDef = {...val};
        if (res["$ref"] != undefined) {
            res = data.definitions[res["$ref"].split('/')[2]] as unknown as openapiDefinitionPropertiesDef
        }
        if (res.properties != undefined) {
            Object.entries(res.properties).forEach(([k,]) => {
                if (res.properties != undefined && res.properties[k]["$ref"] != undefined) {
                    res.properties[k] = deref(data.definitions[res.properties[k]["$ref"].split('/')[2]] as unknown as openapiDefinitionPropertiesDef);
                }
            })
        }
        return res
    }
    // Sort and deref all the definition into kubernetes objects
    const groupedObjects: HashMap<HashMap<HashMap<k8sObject>>> = {}
    Object.entries(data.definitions).forEach(([key, value]) => {
        // Detect goup, object and version from the definition name, exclude unknown
        let group = key.split('.').slice(0,3).join('.');
        let item = ""
        let version=""
        if (['com.coreos.monitoring','com.mongodb.mongodbcommunity','de.mittwald.secretgenerator','do.zalan.acid','fr.solidite.vynil','io.cert-manager.acme','io.cnpg.postgresql','io.mmontes.mariadb', 'org.projectcalico.crd', 'us.containo.traefik'].includes(group)) {
            version = key.split('.')[3]
            item = key.split('.')[4]
        } else if (['io.k8s.api','io.fluxcd.toolkit','in.opstreelabs.redis'].includes(group)) {
            version = key.split('.')[4]
            item = key.split('.')[5]
        } else if (['io.k8s.apimachinery','io.k8s.kube-aggregator'].includes(group)) {
            group = key.split('.').slice(0,5).join('.');
            version = key.split('.')[6]
            item = key.split('.')[7]
            if (item == undefined) return;
        } else if (['io.cert-manager.v1','io.traefik.v1alpha1','io.k8up.v1'].includes(group)) {
            group = key.split('.').slice(0,2).join('.');
            version = key.split('.')[2]
            item = key.split('.')[3]
        } else if (['io.k8s.apiextensions-apiserver'].includes(group)) {
            group = key.split('.').slice(0,5).join('.');
            version = key.split('.')[6]
            item = key.split('.')[7]
        } else {
            console.debug(`excluding ${key}`);
            return;
        }
        if (value.properties == undefined || value.properties.spec == undefined || value.properties.apiVersion == undefined) {
            return;
        }

        // Feed the final classment
        const api = group.split('.').reverse().join('.');
        if (groupedObjects[api] == undefined) groupedObjects[api] = {};
        if (groupedObjects[api][item] == undefined) groupedObjects[api][item] = {};
        let status:openapiDefinitionPropertiesDef|undefined = undefined;
        if (value.properties.status != undefined)
            status = deref(value.properties.status);
        groupedObjects[api][item][version] = {
            crd: undefined,
            spec: deref(value.properties.spec),
            status: status
        };
    });
    // Add the crd to the matching Objects
    crds.items.forEach((crd) => {
        if (groupedObjects[crd.spec.group] == undefined) return;
        if (groupedObjects[crd.spec.group][crd.spec.names.kind] == undefined) return;
        crd.spec.versions.forEach((vers) => {
            if (groupedObjects[crd.spec.group][crd.spec.names.kind][vers.name] != undefined) crd.spec.group,groupedObjects[crd.spec.group][crd.spec.names.kind][vers.name].crd = crd;
        });
    });
    return groupedObjects
}).then((groupedObjects) => {
////////////////////////////////////
/// Generate the files based on the grouped data from previous step
//
    const filteredObjects = Object.entries(groupedObjects).filter(([key]) =>
        // Exclude official api for now
        ! ['api.k8s.io', 'apis.pkg.apiextensions-apiserver.k8s.io', 'apis.pkg.kube-aggregator.k8s.io'].includes(key)
        // Exclude traefik for now
        && ! ['traefik.containo.us', 'traefik.io'].includes(key)
        // Include only vynil for now
        && ['vynil.solidite.fr'].includes(key)
    )
    filteredObjects.forEach(([key, value]) => {
        const baseName = getBaseName(key);
        generateGraphQLTypes(path.resolve(__dirname,'..', 'back','schema',`gen.${baseName}.graphql`), baseName, key, value);
        generateResolverTypes(path.resolve(__dirname,'..', 'back','resolvers', baseName), baseName, key, value, 'gen.');
        generateResolverQueries(path.resolve(__dirname,'..', 'back','resolvers', baseName), baseName, key, value, 'gen.');
        generateFrontQueries(path.resolve(__dirname,'..', 'front','queries', baseName), baseName, value, 'gen.');
    })
    //generateGraphQLQueries(path.resolve(__dirname,'..', 'back','schema',`gen.queries.graphql`), Object.fromEntries(filteredObjects.map(([k,v]) => [getBaseName(k),v])))
})
HB.registerHelper('contain', function (v1,v2) { return Array.isArray(v1) && v1.includes(v2) });
HB.registerHelper('haveType', (item:openapiDefinitionPropertiesDef) => ["array","object","boolean","string","number","integer"].includes(item.type==undefined?"":item.type));
function getBaseName(key:string) {
    return ['crd.projectcalico.org','toolkit.fluxcd.io'].includes(key)?key.split('.')[1]:key.split('.')[0];
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
        switch (val.type) {
            case "string":  properties[prop] = `String${req}`;break;
            case "number":  properties[prop] = `Float${req}`;break;
            case "integer": properties[prop] = `Int${req}`;break;
            case "boolean": properties[prop] = `Boolean${req}`;break;
            case "object":
                if (prop != 'metadata') {
                    properties[prop] = `${name}${capitalizeFirstLetter(prop)}${req}`;
                    res+=generateGraphQLSubType(`${name}${capitalizeFirstLetter(prop)}`, val, strType);
                } else {
                    properties[prop] = 'metadata'
                }
                break;
            case "array": switch (val.items?.type) {
                case "string":  properties[prop] = `[String]${req}`;break;
                case "number":  properties[prop] = `[Float]${req}`;break;
                case "integer": properties[prop] = `[Int]${req}`;break;
                case "boolean": properties[prop] = `[Boolean]${req}`;break;
                case "object":
                    properties[prop] = `[${name}${capitalizeFirstLetter(prop)}Item]${req}`;
                    res+=generateGraphQLSubType(`${name}${capitalizeFirstLetter(prop)}Item`, val.items, strType);
                    break;
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
    res+=template({
        name: name,
        properties: properties,
        haveMeta: haveMeta,
        haveStatus: haveStatus,
        strType: strType
    });
    return res
}
function generateGraphQLTypes(file: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>){
    let generated  = "";
    const queries:HashMap<string> = {};
    const mutations:HashMap<string> = {};
    Object.entries(objects).forEach(([name, versions]) => {
        const targetVersion = getTargetVersion(versions);
        const group = getBaseName(apiGroup);
        if (versions[targetVersion].status != undefined) {
            const status = versions[targetVersion].status as openapiDefinitionPropertiesDef;
            generated += generateGraphQLSubType(`${short}${name}Status`, status);
        }
        generated += generateGraphQLSubType(`${short}${name}Spec`, versions[targetVersion].spec, 'input');
        generated += generateGraphQLSubType(`${short}${name}`, versions[targetVersion].spec, 'type', true, versions[targetVersion].status != undefined)
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
    generated += template({queries: queries});
    const templateMut = HB.compile(`
type Mutation {
{{#each mutations}}
  {{@key}}: {{this}}
{{/each}}
}`, {noEscape: true});
    generated += templateMut({mutations: mutations});
    fs.writeFileSync(file, generated);
}
function generateResolverSubType(name: string, def: openapiDefinitionPropertiesDef) {
    let res = "";
    const properties:HashMap<string> = {}
    if (def.properties != undefined) Object.entries(def.properties).forEach(([prop, val]) => {
        const req = def.required != undefined && def.required.includes(prop) ? '':' | undefined';
        switch (val.type) {
            case "string":
            case "number":
            case "integer":
            case "boolean": properties[prop] = `${val.type}${req}`;break;
            case "object":
                if (prop != 'metadata') {
                    properties[prop] = `${capitalizeFirstLetter(name)}${capitalizeFirstLetter(prop)}${req}`;
                    res+=generateResolverSubType(`${capitalizeFirstLetter(name)}${capitalizeFirstLetter(prop)}`, val);
                } else {
                    properties[prop] = 'metadata'
                }
                break;
            case "array": switch (val.items?.type) {
                case "string":
                case "number":
                case "integer":
                case "boolean": properties[prop] = `Array<${val.items?.type}>${req}`;break;
                case "object":
                    properties[prop] = `Array<${capitalizeFirstLetter(name)}${capitalizeFirstLetter(prop)}Item>${req}`;
                    res+=generateResolverSubType(`${capitalizeFirstLetter(name)}${capitalizeFirstLetter(prop)}Item`, val.items);
                    break;
                default: properties[prop] = `Array<object>${req}`;break;
            }break;
            default: properties[prop] = `object${req}`;break;
        }
    });
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
        const templateQueries = HB.compile(`
import {kc, k8s, getMetadata} from '../k8s/libs.js';
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
`, {noEscape: true});
        const templateMutations = HB.compile(`
import {kc, k8s, getMetadata} from '../core/libs.js';
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
        if (args['spec']['{{@key}}'] !== undefined && typeof args['spec']['{{@key}}'] == '{{this.type}}') spec['{{@key}}'] = args['spec']['{{@key}}'];
        {{else}}
        if (args['spec']['{{@key}}'] !== undefined) spec['{{@key}}'] = args['spec']['{{@key}}'];
        {{/if}}
    {{/if}}
{{/each}}
        const payload = {
            apiVersion: 'vynil.solidite.fr/v1',
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
        if (args['spec']['{{@key}}'] !== undefined && typeof args['spec']['{{@key}}'] == '{{this.type}}') spec['{{@key}}'] = args['spec']['{{@key}}'];
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
`, {noEscape: true});
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
    });
    return;
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
  {{ mini }}{{ name }}(namespace: $namespace, $name: String!) {
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
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}s.graphql`), listTmpl({
            name: name,
            spec: versions[targetVersion].spec,
            mini: minimizeFirstLetter(short),
            short: capitalizeFirstLetter(short),
            haveStatus: versions[targetVersion].status != undefined,
            status: versions[targetVersion].status,
            namespaced: namespaced
        }));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}.graphql`), getTmpl({
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
