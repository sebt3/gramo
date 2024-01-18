import HB from 'handlebars';
import * as fs from 'fs';
import {openapiDefinitionPropertiesDef, k8sObject, HashMap} from './types.js'
import {getBaseName, getTargetVersion,capitalizeFirstLetter} from './utils.js'

interface TypeCache {
    properties: object
    name: string
    type: string
}

let cache:Array<TypeCache> = [];

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}

const depthLimit=198;
export function generateGraphQLSubType(name: string, def: openapiDefinitionPropertiesDef, strType:string='type', haveMeta:boolean=false, haveStatus:boolean=false, depth:number=depthLimit) {
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
    let res = "";
    const properties:HashMap<string> = {}
    const match = cache.filter(i => i.type==strType && deepEqual(i.properties, def.properties));
    if (match.length>0 && depth<depthLimit) {
        return match[0].name;
    }
    if (def.properties != undefined) Object.entries(def.properties).forEach(([prop, val]) => {
        const req = def.required != undefined && def.required.includes(prop) ? '!':'';
        if (val == undefined) return;
        switch (val.type) {
            case "string":  properties[prop] = `String${req}`;break;
            case "number":  properties[prop] = `Float${req}`;break;
            case "integer": properties[prop] = `Int${req}`;break;
            case "boolean": properties[prop] = `Boolean${req}`;break;
            case "object":
                if (depth>0) {
                    const tmp = generateGraphQLSubType(`${name}${capitalizeFirstLetter(prop)}`, val, strType, false, false, depth-1);
                    if(tmp.length>1 && tmp.includes('{')) {
                        properties[prop] = `${name}${capitalizeFirstLetter(prop)}${req}`;
                        res+= tmp;
                    } else if(tmp.length>1) {
                        properties[prop] = `${tmp}${req}`;
                    } else {
                        properties[`#${prop}`] = `JSONObject${req}`;break;
                    }
                } else {
                    properties[prop] = `JSONObject${req}`
                }
                break;
            case "array": switch (val.items?.type) {
                case "string":  properties[prop] = `[String]${req}`;break;
                case "number":  properties[prop] = `[Float]${req}`;break;
                case "integer": properties[prop] = `[Int]${req}`;break;
                case "boolean": properties[prop] = `[Boolean]${req}`;break;
                case "object":
                    if (depth>0) {
                        const tmp = generateGraphQLSubType(`${name}${capitalizeFirstLetter(prop)}Item`, val.items, strType, false, false, depth-1);
                        if (tmp.length>1 && tmp.includes('{')) {
                            properties[prop] = `[${name}${capitalizeFirstLetter(prop)}Item]${req}`;
                            res+=tmp;
                        } else if(tmp.length>1) {
                            properties[prop] = `[${tmp}${req}]`;
                        } else {
                            properties[`#${prop}`] = `[JSONObject]${req}`;break;
                        }
                    } else {
                        properties[prop] = `[JSONObject]${req}`
                    }
                    break;
                default: properties[`#${prop}`] = `[JSONObject]${req}`;break;
            }break;
            default: properties[`#${prop}`] = `JSONObject${req}`;break;
        }
    });
    if (Object.keys(properties).filter(i => i[0]!='#').length>0 || haveMeta || haveStatus) {
        cache.push({
            name,
            type: strType,
            properties: def.properties as object,
        })
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

export function generateGraphQLTypes(file: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>) {
    cache = [];
    const template = HB.compile(`
type Query {
{{#each queries}}
  {{@key}}: {{this}}
{{/each}}
}`, {noEscape: true});
    const templateMut = HB.compile(`
type Mutation {
{{#each mutations}}
  {{@key}}: {{this}}
{{/each}}
}`, {noEscape: true});
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
            //queries[`${group}${name}s(namespace: String!)`] = `[${group}${name}]`;
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
    if (Object.keys(queries).length>0) generated += template({queries: queries});
    if (Object.keys(mutations).length>0) generated += templateMut({mutations: mutations});
    fs.writeFileSync(file, generated);
}
