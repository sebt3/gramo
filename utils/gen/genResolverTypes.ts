import HB from 'handlebars';
import * as fs from 'fs';
import path from 'path';
import {openapiDefinitionPropertiesDef, k8sObject, HashMap} from './types.js'
import {getTargetVersion,capitalizeFirstLetter} from './utils.js'

function generateResolverSubType(name: string, def: openapiDefinitionPropertiesDef) {
    const template = HB.compile(`
export interface {{ name }} {
{{#each properties}}
  "{{@key}}": {{this}}
{{/each}}
}`, {noEscape: true});
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
                properties[prop] = `${capitalizeFirstLetter(name)}${capitalizeFirstLetter(prop)}${req}`;
                res+=generateResolverSubType(`${capitalizeFirstLetter(name)}${capitalizeFirstLetter(prop)}`, val);
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

export function generateResolverTypes(directory: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>, filePrefix:string){
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
