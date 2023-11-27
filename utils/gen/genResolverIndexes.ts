import HB from 'handlebars';
import * as fs from 'fs';
import {k8sObject, HashMap} from './types.js'
import {getTargetVersion} from './utils.js'

export function generateResolverNamespace(file: string, baseDirName:string, subGroup:string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>){
    const template = HB.compile(`
{{#each imports}}
{{this}}
{{/each}}
export const resolvers = {
{{#each resolvers}}
    {{this}}
{{/each}}
};
`, {noEscape: true});
    const resolvers:Array<string> = [];
    const imports:Array<string> = [];
    Object.entries(objects).forEach(([name, versions]) => {
        const targetVersion = getTargetVersion(versions);
        if (versions[targetVersion].crd == undefined) return;
        if (versions[targetVersion].crd?.spec.scope != 'Namespaced') return;
        resolvers.push(`...${name}NSresolver,`);
        imports.push(`import { resolver as ${name}NSresolver } from '../${baseDirName}/resolver.namespace.${name}.js';`);
    });
    if (Object.keys(resolvers).length>0) fs.writeFileSync(file, template({resolvers: resolvers, imports: imports}));
}

export function generateResolverIndex(file: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>){
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
    const queries:Array<string> = [];
    const mutations:Array<string> = [];
    const imports:Array<string> = [];
    Object.entries(objects).forEach(([name]) => {
        queries.push(`...${name}Queries,`);
        mutations.push(`...${name}Mutations,`);
        imports.push(`import { queries as ${name}Queries } from './query.${name}.js';`);
        imports.push(`import { mutations as ${name}Mutations } from './mutation.${name}.js';`);
    });
    if (Object.keys(queries).length>0) fs.writeFileSync(file, template({queries: queries, mutations: mutations, imports: imports}));
}
