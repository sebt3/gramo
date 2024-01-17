import HB from 'handlebars';
import * as fs from 'fs';
import path from 'path';
import {k8sObject, HashMap} from './types.js'
import {getTargetVersion,minimizeFirstLetter,capitalizeFirstLetter} from './utils.js'

const templateRoutes = HB.compile(
`import {menuLinksProps} from '../interfaces';
const cat = 'install';
{{#each children}}
const icon{{ this.name }} = 'album';
{{/each}}
export const link:menuLinksProps = {
  title: '{{ short }}', icon: icon{{ name }},
  link: \`/\${cat}/{{ mini }}/{{ plural }}/\`,
  level: 1,
  children: [
{{#each children}}
  {
    title: '{{ this.name }}', caption: 'List {{ this.miniName }}', icon: 'album',
    link: \`/\${cat}/{{ ../mini }}/{{ this.plural }}/\`, level: 2, children: []
  },
{{/each}}
  ]
}
export const descriptions = {
  {{ mini }}:                {breadcrumb: '{{ short }}', icon: icon{{ name }}, ns: false},
{{#each children}}
  {{ ../mini }}{{ this.name }}s:        {breadcrumb: '{{ this.name }}', icon: icon{{ this.name }}, ns: false},
{{#if this.namespaced}}
  {{ ../mini }}{{ this.name }}AllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  {{ ../mini }}{{ this.name }}Table:    {breadcrumb: 'List', icon: 'list', ns: true},
  {{ ../mini }}{{ this.name }}View:     {breadcrumb: 'View', icon: icon{{ this.name }}, ns: true},
  {{ ../mini }}{{ this.name }}Edit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  {{ ../mini }}{{ this.name }}Create:   {breadcrumb: 'Create', icon: 'add', ns: true},
{{else}}
  {{ ../mini }}{{ this.name }}Table:    {breadcrumb: 'List', icon: 'list', ns: false},
  {{ ../mini }}{{ this.name }}View:     {breadcrumb: 'View', icon: icon{{ this.name }}, ns: false},
  {{ ../mini }}{{ this.name }}Edit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  {{ ../mini }}{{ this.name }}Create:   {breadcrumb: 'Create', icon: 'add', ns: false},
{{/if}}
{{/each}}
}
export const route = {
  path: '{{ mini }}',
  name: '{{ mini }}',
  children: [
{{#each children}}
    {
      path: '{{ this.plural }}',
      name: '{{ ../mini }}{{ this.name }}s',
      children: [
{{#if this.namespaced}}
        {
          path: '',
          name: '{{ ../mini }}{{ this.name }}AllTable',
          component: () => import('../../components/{{ ../mini }}/{{ this.name }}AllTable.vue'),
        },
        {
          path: ':namespace',
          name: '{{ ../mini }}{{ this.name }}Table',
          component: () => import('../../components/{{ ../mini }}/{{ this.name }}Table.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: '{{ ../mini }}{{ this.name }}View',
          component: () => import('../../components/{{ ../mini }}/{{ this.name }}View.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: '{{ ../mini }}{{ this.name }}Edit',
          component: () => import('../../components/{{ ../mini }}/{{ this.name }}Edit.vue'),
        },
        {
          path: ':namespace/create',
          name: '{{ ../mini }}{{ this.name }}Create',
          component: () => import('../../components/{{ ../mini }}/{{ this.name }}New.vue'),
        }
{{else}}
        {
          path: '',
          name: '{{ ../mini }}{{ this.name }}Table',
          component: () => import('../../components/{{ ../mini }}/{{ this.name }}Table.vue'),
        },
        {
          path: ':name/view',
          name: '{{ ../mini }}{{ this.name }}View',
          component: () => import('../../components/{{ ../mini }}/{{ this.name }}View.vue'),
        },
        {
          path: ':name/edit',
          name: '{{ ../mini }}{{ this.name }}Edit',
          component: () => import('../../components/{{ ../mini }}/{{ this.name }}Edit.vue'),
        },
        {
          path: 'create',
          name: '{{ ../mini }}{{ this.name }}Create',
          component: () => import('../../components/{{ ../mini }}/{{ this.name }}New.vue'),
        }
{{/if}}
      ]
    },
{{/each}}
  ],
}
export default route
`, {noEscape: true, preventIndent: true});

export function generateFrontRoutes(file: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>){
    const children = Object.entries(objects).map(([name, versions]) => {
        const targetVersion = getTargetVersion(versions);
        if (versions[targetVersion].crd == undefined) return null;
        const namespaced = versions[targetVersion].crd?.spec.scope == 'Namespaced';
        return {
            name: name,
            version: targetVersion,
            spec: versions[targetVersion].spec,
            miniName: minimizeFirstLetter(name),
            plural: versions[targetVersion].crd?.spec.names.plural,
            haveStatus: versions[targetVersion].status != undefined,
            status: versions[targetVersion].status,
            namespaced: namespaced
        }
    }).filter(x=>x!=null);
    fs.writeFileSync(file, templateRoutes({
        children: children,
        apiGroup: apiGroup,
        name: children[0]?.name,
        miniName: children[0]?.miniName,
        plural: children[0]?.plural,
        short: capitalizeFirstLetter(short),
        mini: minimizeFirstLetter(short)
    }));
}
