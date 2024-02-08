#!/usr/bin/env -S npx ts-node-esm
import path from 'path';
import { fileURLToPath } from 'url';
import {LoadFrom,mkdir} from './generator/utils.js'
import {loadCompile,loadPartial} from './generator/hb.js'
import {allCategories} from './generator/config.js'
import * as fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const path_data = path.resolve(__dirname, '..', 'data');
const path_back = path.resolve(__dirname, '..', 'back');
const path_front = path.resolve(__dirname, '..', 'front');
const path_lib = path.resolve(__dirname, 'generator');
loadPartial('resolversPVC', path.resolve(path_lib, 'back', 'tmpl.resolvers.pvc.ts.hbs'));
loadPartial('resolversK8S', path.resolve(path_lib, 'back', 'tmpl.resolvers.k8s.ts.hbs'));
loadPartial('resolversVynil', path.resolve(path_lib, 'back', 'tmpl.resolvers.vynil.ts.hbs'));
loadPartial('resolversSelector', path.resolve(path_lib, 'back', 'tmpl.resolvers.selector.ts.hbs'));
loadPartial('resolversIngress', path.resolve(path_lib, 'back', 'tmpl.resolvers.ingress.ts.hbs'));
loadPartial('resolversServiceAccount', path.resolve(path_lib, 'back', 'tmpl.resolvers.serviceAccount.ts.hbs'));
loadPartial('resolversNodeName', path.resolve(path_lib, 'back', 'tmpl.resolvers.nodeName.ts.hbs'));
loadPartial('resolversRole', path.resolve(path_lib, 'back', 'tmpl.resolvers.role.ts.hbs'));
loadPartial('resolversRoleBinding', path.resolve(path_lib, 'back', 'tmpl.resolvers.roleBinding.ts.hbs'));
loadPartial('resolversApiService', path.resolve(path_lib, 'back', 'tmpl.resolvers.apiService.ts.hbs'));
loadPartial('resolversStorageClass', path.resolve(path_lib, 'back', 'tmpl.resolvers.storageClass.ts.hbs'));
loadPartial('resolversSecret', path.resolve(path_lib, 'back', 'tmpl.resolvers.secret.ts.hbs'));
loadPartial('resolversConfigMap', path.resolve(path_lib, 'back', 'tmpl.resolvers.configMap.ts.hbs'));
loadPartial('createResolver', path.resolve(path_lib, 'back', 'tmpl.create.resolver.ts.hbs'));
loadPartial('deleteResolver', path.resolve(path_lib, 'back', 'tmpl.delete.resolver.ts.hbs'));
loadPartial('patchResolver', path.resolve(path_lib, 'back', 'tmpl.patch.resolver.ts.hbs'));
loadPartial('listResolver', path.resolve(path_lib, 'back', 'tmpl.list.resolver.ts.hbs'));

////////////////////////////////////
//// Load the data
///
new Promise((resolve) => {
    resolve(
        fs.readdirSync(path_data)
            .map(f=>path.resolve(path_data,f))
            .filter(f=>fs.statSync(f).isFile() && f.match(/.*\.json$/))
            .map(f=>LoadFrom(f))
    );
}).then(data => {
////////////////////////////////////
//// Generate the backend
///
// Use the defined templates with the generated enhenced data to build the backend
    const allBackIndex      = loadCompile(path.resolve(path_lib, 'back', 'all.resolvers.index.ts.hbs'))
    const allBackResolvers  = loadCompile(path.resolve(path_lib, 'back', 'all.resolvers.ns.resolvers.ts.hbs'))
    const allBackSchemaNS   = loadCompile(path.resolve(path_lib, 'back', 'all.schema.ns.graphql.hbs'))
    const grpBackSchema     = loadCompile(path.resolve(path_lib, 'back', 'grp.schema.graphql.hbs'))
    const grpBackCustom     = loadCompile(path.resolve(path_lib, 'back', 'grp.resolvers.custom.ts.hbs'))
    const grpBackIndex      = loadCompile(path.resolve(path_lib, 'back', 'grp.resolvers.index.ts.hbs'))
    const grpBackResolvers  = loadCompile(path.resolve(path_lib, 'back', 'grp.resolvers.ns.resolvers.ts.hbs'))
    const objBackNsResolver = loadCompile(path.resolve(path_lib, 'back', 'obj.resolvers.ts.hbs'))

    mkdir(path.resolve(path_back, 'schema'));
    mkdir(path.resolve(path_back, 'resolvers', 'k8s'));
    const current = data as {name:string,objects:{short:string}[]}[];
    allBackIndex(path.resolve(path_back, 'resolvers'), 'index.ts',{groups: current});
    allBackResolvers(path.resolve(path_back, 'resolvers', 'k8s'), `nsResolvers.ts`,{groups: current});
    allBackSchemaNS(path.resolve(path_back, 'schema'), `k8sNamespace.graphql`,{groups: current});
    current.forEach(g => {
        grpBackSchema(path.resolve(path_back, 'schema'), `${g.name}.graphql`, g);
        mkdir(path.resolve(path_back, 'resolvers', g.name));
        grpBackCustom(path.resolve(path_back, 'resolvers', g.name), 'custom.ts', g);
        grpBackIndex(path.resolve(path_back, 'resolvers', g.name), 'index.ts', g);
        grpBackResolvers(path.resolve(path_back, 'resolvers', 'k8s'), `nsResolvers.${g.name}.ts`, g);
        g.objects.forEach(o => {
            objBackNsResolver(path.resolve(path_back, 'resolvers', g.name), `${o.short}.ts`, o)
        })
    })
    return data
}).then(data => {
////////////////////////////////////
//// Generate the Frontend
///
// Exact same strategy and data as for the backend, using diffrent templates
    const objQueryMutation  = loadCompile(path.resolve(path_lib, 'front', 'obj.query.mutation.graphql.hbs'))
    const objQueryRead      = loadCompile(path.resolve(path_lib, 'front', 'obj.query.read.graphql.hbs'))
    const grpQueryRead      = loadCompile(path.resolve(path_lib, 'front', 'grp.query.read.graphql.hbs'))
    const allRoutes         = loadCompile(path.resolve(path_lib, 'front', 'all.routes.ts.hbs'))
    const catRoutes         = loadCompile(path.resolve(path_lib, 'front', 'cat.routes.ts.hbs'))
    const grpPageList       = loadCompile(path.resolve(path_lib, 'front', 'grp.pages.list.vue.hbs'))
    const grpRoutes         = loadCompile(path.resolve(path_lib, 'front', 'grp.routes.ts.hbs'))
    const grpCustom         = loadCompile(path.resolve(path_lib, 'front', 'grp.custom.def.ts.hbs'))
    const objCompEdit       = loadCompile(path.resolve(path_lib, 'front', 'obj.components.edit.vue.hbs'))
    const objCompMeta       = loadCompile(path.resolve(path_lib, 'front', 'obj.components.meta.vue.hbs'))
    const objCompStatus     = loadCompile(path.resolve(path_lib, 'front', 'obj.components.status.vue.hbs'))
    const objCompList       = loadCompile(path.resolve(path_lib, 'front', 'obj.components.list.vue.hbs'))
    const objCompView       = loadCompile(path.resolve(path_lib, 'front', 'obj.components.view.vue.hbs'))
    const objPageEdit       = loadCompile(path.resolve(path_lib, 'front', 'obj.pages.edit.vue.hbs'))
    const objPageList       = loadCompile(path.resolve(path_lib, 'front', 'obj.pages.list.vue.hbs'))
    const objPageNew        = loadCompile(path.resolve(path_lib, 'front', 'obj.pages.new.vue.hbs'))
    const objPageView       = loadCompile(path.resolve(path_lib, 'front', 'obj.pages.view.vue.hbs'))
    const objLib            = loadCompile(path.resolve(path_lib, 'front', 'obj.lib.ts.hbs'))

    const current = data as {name:string,objects:{short:string, category:string, readProperties:string[]}[]}[];
    allRoutes(path.resolve(path_front, 'routes'), `index.ts`, {groups: current, categories: allCategories})
    allCategories.forEach(c=>{
        mkdir(path.resolve(path_front, 'routes', c));
        const groups = current.map(g=>{return{
            ...g,
            objects: g.objects.filter(o=>o.category==c)
        }}).filter(g=>g.objects.length>0)
        catRoutes(path.resolve(path_front, 'routes', c), 'index.ts',{category: c, groups: groups})
    })
    current.forEach(g => {
        mkdir(path.resolve(path_front, 'queries', g.name));
        mkdir(path.resolve(path_front, 'components', g.name));
        mkdir(path.resolve(path_front, 'libs', g.name));
        grpCustom(path.resolve(path_front, 'libs', g.name),`custom.ts`, g)
        allCategories.filter(c=> g.objects.filter(o=>o.category==c).length>0).forEach(c=>{
            grpRoutes(path.resolve(path_front, 'routes', c), `${g.name}.ts`, {...g, category: c, plural: g.objects.filter(o=>o.category==c)[0].short,objects: g.objects.filter(o=>o.category==c)});
            grpPageList(path.resolve(path_front, 'pages', c, g.name), 'Dashboard.vue', {...g, category: c, plural: g.objects.filter(o=>o.category==c)[0].short,objects: g.objects.filter(o=>o.category==c)});
            grpQueryRead(path.resolve(path_front, 'queries', g.name), `${c}.read.graphql`, {...g, detailed: false, category: c, plural: g.objects.filter(o=>o.category==c)[0].short,objects: g.objects.filter(o=>o.category==c)})
            grpQueryRead(path.resolve(path_front, 'queries', g.name), `${c}.details.graphql`, {...g, detailed: true, category: c, plural: g.objects.filter(o=>o.category==c)[0].short,objects: g.objects.filter(o=>o.category==c)})
        })
        g.objects.forEach(o => {
            objQueryMutation(path.resolve(path_front, 'queries', g.name), `${o.short}.create.graphql`, {...o, mutationType: 'Create'})
            objQueryMutation(path.resolve(path_front, 'queries', g.name), `${o.short}.delete.graphql`, {...o, mutationType: 'Delete'})
            objQueryMutation(path.resolve(path_front, 'queries', g.name), `${o.short}.patch.graphql`, {...o, mutationType: 'Patch'})
            objQueryRead(path.resolve(path_front, 'queries', g.name), `${o.short}.read.graphql`, {...o, detailed: false})
            objQueryRead(path.resolve(path_front, 'queries', g.name), `${o.short}.details.graphql`, {...o, detailed: true})
            objCompEdit(path.resolve(path_front, 'components', g.name),`${o.short}Edit.vue`, o)
            objCompList(path.resolve(path_front, 'components', g.name),`${o.short}List.vue`, o)
            objCompMeta(path.resolve(path_front, 'components', g.name),`${o.short}Meta.vue`, o)
            if (o.readProperties.includes('status'))
                objCompStatus(path.resolve(path_front, 'components', g.name),`${o.short}Status.vue`, o);
            objCompView(path.resolve(path_front, 'components', g.name),`${o.short}View.vue`, o)
            mkdir(path.resolve(path_front, 'pages', o['category'], g.name));
            objPageEdit(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}Edit.vue`, o)
            objPageList(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}List.vue`, o)
            objPageView(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}View.vue`, o)
            objPageNew(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}New.vue`, o)
            objLib(path.resolve(path_front, 'libs', g.name),`${o.short}.ts`, o)
        })
    })
    return data
})
