import HB from 'handlebars';
import * as fs from 'fs';
import path from 'path';
import {k8sObject, HashMap} from './types.js'
import {getTargetVersion,minimizeFirstLetter,capitalizeFirstLetter} from './utils.js'

export function generateResolverQueries(directory: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>, filePrefix:string){
    const templateNSResolvers = HB.compile(
`import { lists } from './${filePrefix}query.{{ name }}.js'
export const resolver = {
    {{ mini }}{{ name }}s: async (parent, args: object) => {
        return lists.{{ mini }}{{ name }}s(parent,{namespace: parent.metadata.name, ...args})
    }
};
`, {noEscape: true, preventIndent: true});
    const templateQueries = HB.compile(
`import {kc, k8s, getMetadata} from '../core/libs.js';
import { {{ short }}{{ name }}List, {{ short }}{{ name }} } from './${filePrefix}type.{{ name }}.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
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
                metadata: getMetadata(ext.metadata, ext),
{{#each spec.properties}}
                "{{@key}}": ext.spec['{{@key}}'],
{{/each}}
{{#if haveStatus}}
                status: ext.status==undefined?null:{
  {{#each status.properties}}
                    "{{@key}}": ext.status['{{@key}}'],
  {{/each}}
                }
{{/if}}
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
{{#unless namespaced}}
    {{ mini }}{{ name }}s: lists.{{ mini }}{{ name }}s,
{{/unless}}
    {{ mini }}{{ name }}: async (_parent, args: object) => {
        try {
{{#if namespaced}}
            const res = await customApi.getNamespacedCustomObject('{{apiGroup}}','{{version}}',args['namespace'],'{{plural}}', args['name'])
{{else}}
            const res = await customApi.getClusterCustomObject('{{apiGroup}}','{{version}}','{{plural}}', args['name'])
{{/if}}
            const ext = res.body as {{ short }}{{ name }}
            return {
                metadata: getMetadata(ext.metadata, ext),
{{#each spec.properties}}
                "{{@key}}": ext.spec['{{@key}}'],
{{/each}}
{{#if haveStatus}}
                status: ext.status==undefined?null:{
  {{#each status.properties}}
                    "{{@key}}": ext.status['{{@key}}'],
  {{/each}}
                }
{{/if}}
            }
        } catch (err) {
            console.error((err as object)['body']);
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
                metadata: getMetadata(ext.metadata, ext),
{{#each spec.properties}}
                "{{@key}}": ext.spec['{{@key}}'],
{{/each}}
{{#if haveStatus}}
                status: ext.status==undefined?null:{
  {{#each status.properties}}
                    "{{@key}}": ext.status['{{@key}}'],
  {{/each}}
                }
{{/if}}
            }
        } catch (err) {
            console.error((err as object)['body']);
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
            kind: '{{name}}',
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
                metadata: getMetadata(ext.metadata, ext),
{{#each spec.properties}}
                "{{@key}}": ext.spec['{{@key}}'],
{{/each}}
{{#if haveStatus}}
                status: ext.status==undefined?null:{
  {{#each status.properties}}
                    "{{@key}}": ext.status['{{@key}}'],
  {{/each}}
                }
{{/if}}
            }
        } catch (err) {
            console.error((err as object)['body']);
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
            metadata: getMetadata(ext.metadata, ext),
{{#each spec.properties}}
            "{{@key}}": ext.spec['{{@key}}'],
{{/each}}
{{#if haveStatus}}
            status: ext.status==undefined?null:{
  {{#each status.properties}}
                "{{@key}}": ext.status['{{@key}}'],
  {{/each}}
            }
{{/if}}
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
`, {noEscape: true, preventIndent: true});
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory, { recursive: true });
    }
    Object.entries(objects).forEach(([name, versions]) => {
        const targetVersion = getTargetVersion(versions);
        if (versions[targetVersion].crd == undefined) return;
        const namespaced = versions[targetVersion].crd?.spec.scope == 'Namespaced';
        const cfg = {
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
        };
        fs.writeFileSync(path.resolve(directory,`${filePrefix}query.${name}.ts`), templateQueries(cfg));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}mutation.${name}.ts`), templateMutations(cfg));
        if (namespaced) fs.writeFileSync(path.resolve(directory,`${filePrefix}resolver.namespace.${name}.ts`), templateNSResolvers({
            name: name,
            mini: minimizeFirstLetter(short),
        }));
    });
}
