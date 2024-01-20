import HB from 'handlebars';
import * as fs from 'fs';
import path from 'path';
import {k8sObject, HashMap} from './types.js'
import {getBaseName,getTargetVersion,minimizeFirstLetter,capitalizeFirstLetter} from './utils.js'

export function generateFrontQueries(directory: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>, filePrefix:string){
    const output = `  metadata {
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
      obj
    }
{{#each spec.properties}}{{GQueryObject @key 2 this}}{{/each}}{{#if haveStatus}}    status {
{{#each status.properties}}{{GQueryObject @key 3 this}}{{/each}}    }
{{/if}}`;
    const listTmpl = HB.compile(`
{{#if namespaced}}
query {{ short }}{{ name }}s($namespace: String!) {
 namespace(name: $namespace) {
  {{ mini }}{{ name }}s {
{{else}}
query {{ short }}{{ name }}s {
  {{ mini }}{{ name }}s {
{{/if}}
  ${output}
  }
{{#if namespaced}}
 }
{{/if}}
}
`);
    const allTmpl = HB.compile(`
query {{ short }}{{ name }}s {
 namespaces {
  {{ mini }}{{ name }}s {
  ${output}
  }
 }
}
`);
    const getTmpl = HB.compile(`
{{#if namespaced}}
query {{ short }}{{ name }}($namespace: String!, $name: String!) {
  customResourceDefinition(name: "{{plural}}.{{apiGroup}}") {
    versions {
      name
      served
      schema {
        openAPIV3Schema
      }
    }
    names {
      categories
      kind
      listKind
      plural
      singular
      shortNames
    }
    group
  }
  {{ mini }}{{ name }}(namespace: $namespace, name: $name) {
{{else}}
query {{ short }}{{ name }}($name: String!) {
  customResourceDefinition(name: "{{plural}}.{{apiGroup}}") {
    versions {
      name
      served
      schema {
        openAPIV3Schema
      }
    }
    names {
      categories
      kind
      listKind
      plural
      singular
      shortNames
    }
    group
  }
  {{ mini }}{{ name }}(name: $name) {
{{/if}}
  ${output}
  }
}
`);
    const mutTmpl = HB.compile(`
{{#if namespaced}}
{{#if haveSpec}}
mutation {{ short }}{{ name }}($namespace: String!, $name: String!, $spec: {{ group }}{{ name }}Spec!) {
  {{ action }}{{ Group }}{{ name }}(namespace: $namespace, name: $name, spec: $spec) {
{{else}}
mutation {{ short }}{{ name }}($namespace: String!, $name: String!) {
  {{ action }}{{ Group }}{{ name }}(namespace: $namespace, name: $name) {
{{/if}}
{{else}}
{{#if haveSpec}}
mutation {{ short }}{{ name }}($name: String!, $spec: {{ group }}{{ name }}Spec!) {
  {{ action }}{{ Group }}{{ name }}(name: $name, spec: $spec) {
{{else}}
mutation {{ short }}{{ name }}($name: String!) {
  {{ action }}{{ Group }}{{ name }}(name: $name) {
{{/if}}
{{/if}}
  ${output}
  }
}
`);
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory, { recursive: true });
    }
    Object.entries(objects).forEach(([name, versions]) => {
        const targetVersion = getTargetVersion(versions);
        const group = getBaseName(apiGroup).split('.')[0];
        if (versions[targetVersion].crd == undefined) return;
        const namespaced = versions[targetVersion].crd?.spec.scope == 'Namespaced';
        const baseCfg = {
            name: name,
            apiGroup: apiGroup,
            spec: versions[targetVersion].spec,
            mini: minimizeFirstLetter(short),
            short: capitalizeFirstLetter(short),
            plural: versions[targetVersion].crd?.spec.names.plural,
            haveStatus: versions[targetVersion].status != undefined,
            status: versions[targetVersion].status,
            namespaced: namespaced
        };
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}New.graphql`), mutTmpl({
            group: group,
            action: 'create',
            Group: capitalizeFirstLetter(group),
            haveSpec: true,
            ...baseCfg
        }));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}Edit.graphql`), mutTmpl({
            group: group,
            action: 'patch',
            Group: capitalizeFirstLetter(group),
            haveSpec: true,
            ...baseCfg,
        }));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}Delete.graphql`), mutTmpl({
            group: group,
            action: 'delete',
            Group: capitalizeFirstLetter(group),
            haveSpec: false,
            ...baseCfg,
        }));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}Table.graphql`), listTmpl(baseCfg));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}View.graphql`), getTmpl(baseCfg));
        if (namespaced)
          fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}AllTable.graphql`), allTmpl(baseCfg));
    });
}
