#!/usr/bin/env -S npx tsx
import path from 'path';
import { fileURLToPath } from 'url';
import {LoadFrom,finalizeObject,mkdir,rmdir,uniq} from './generator/utils.js'
import {loadCompile,loadPartial} from './generator/hb.js'
import {allCategories} from './generator/config.js'
import * as fs from 'fs';
import { k8sObject } from './generator/types.js';

const args = process.argv.slice(2);
const deleteFiles = args.includes('-d') || args.includes('--delete');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const path_data = path.resolve(__dirname, '..', 'data');
const path_back = path.resolve(__dirname, '..', 'back');
const path_front = path.resolve(__dirname, '..', 'front');
const path_lib = path.resolve(__dirname, 'generator');
const partials_front = path.resolve(path_lib, 'partials', 'front');
const partials_back = path.resolve(path_lib, 'partials', 'back');
const partials_resolvers = path.resolve(path_lib, 'partials', 'resolvers');
const partials_customs = path.resolve(path_lib, 'partials', 'customs');
loadPartial('resolversProblems',        path.resolve(partials_back, 'problems.ts.hbs'));
loadPartial('resolversAdvices',         path.resolve(partials_back, 'advices.ts.hbs'));
loadPartial('createResolver',           path.resolve(partials_back, 'create.resolver.ts.hbs'));
loadPartial('deleteResolver',           path.resolve(partials_back, 'delete.resolver.ts.hbs'));
loadPartial('patchResolver',            path.resolve(partials_back, 'patch.resolver.ts.hbs'));
loadPartial('listResolver',             path.resolve(partials_back, 'list.resolver.ts.hbs'));
loadPartial('resolversPVC',             path.resolve(partials_resolvers, 'pvc.ts.hbs'));
loadPartial('resolversK8S',             path.resolve(partials_resolvers, 'k8s.ts.hbs'));
loadPartial('resolversVynil',           path.resolve(partials_resolvers, 'vynil.ts.hbs'));
loadPartial('resolversSelector',        path.resolve(partials_resolvers, 'selector.ts.hbs'));
loadPartial('resolversIngress',         path.resolve(partials_resolvers, 'ingress.ts.hbs'));
loadPartial('resolversServiceAccount',  path.resolve(partials_resolvers, 'serviceAccount.ts.hbs'));
loadPartial('resolversNodeName',        path.resolve(partials_resolvers, 'nodeName.ts.hbs'));
loadPartial('resolversEndpoint',        path.resolve(partials_resolvers, 'endpoint.ts.hbs'));
loadPartial('resolversStateful',        path.resolve(partials_resolvers, 'stateful.ts.hbs'));
loadPartial('resolversRole',            path.resolve(partials_resolvers, 'role.ts.hbs'));
loadPartial('resolversRoleBinding',     path.resolve(partials_resolvers, 'roleBinding.ts.hbs'));
loadPartial('resolversCertManager',     path.resolve(partials_resolvers, 'certmanager.ts.hbs'));
loadPartial('resolversTraefik',         path.resolve(partials_resolvers, 'traefik.ts.hbs'));
loadPartial('resolversApiService',      path.resolve(partials_resolvers, 'apiService.ts.hbs'));
loadPartial('resolversStorageClass',    path.resolve(partials_resolvers, 'storageClass.ts.hbs'));
loadPartial('resolversSecret',          path.resolve(partials_resolvers, 'secret.ts.hbs'));
loadPartial('resolversFluxCD',          path.resolve(partials_resolvers, 'fluxcd.ts.hbs'));
loadPartial('resolversK8up',            path.resolve(partials_resolvers, 'k8up.ts.hbs'));
loadPartial('resolversConfigMap',       path.resolve(partials_resolvers, 'configMap.ts.hbs'));
loadPartial('resolversCRD',             path.resolve(partials_resolvers, 'crd.ts.hbs'));
loadPartial('vueLabelFields',           path.resolve(partials_front, 'labels.fields.vue.hbs'));
loadPartial('vueNameFields',            path.resolve(partials_front, 'name.fields.vue.hbs'));
loadPartial('vueExtraFields',           path.resolve(partials_front, 'extra.fields.vue.hbs'));
loadPartial('cattleCustom',             path.resolve(partials_customs, 'cattle.hbs'));
loadPartial('certmanagerCustom',        path.resolve(partials_customs, 'certmanager.hbs'));
loadPartial('ciliumCustom',             path.resolve(partials_customs, 'cilium.hbs'));
loadPartial('cnpgCustom',               path.resolve(partials_customs, 'cnpg.hbs'));
loadPartial('fluxcdCustom',             path.resolve(partials_customs, 'fluxcd.hbs'));
loadPartial('jaegertracingCustom',      path.resolve(partials_customs, 'jaegertracing.hbs'));
loadPartial('k8sCustom',                path.resolve(partials_customs, 'k8s.hbs'));
loadPartial('k8upCustom',               path.resolve(partials_customs, 'k8up.hbs'));
loadPartial('mariadbCustom',            path.resolve(partials_customs, 'mariadb.hbs'));
loadPartial('mongodbCustom',            path.resolve(partials_customs, 'mongodb.hbs'));
loadPartial('monitoringCustom',         path.resolve(partials_customs, 'monitoring.hbs'));
loadPartial('opentelemetryCustom',      path.resolve(partials_customs, 'opentelemetry.hbs'));
loadPartial('oracleCustom',             path.resolve(partials_customs, 'oracle.hbs'));
loadPartial('projectcalicoCustom',      path.resolve(partials_customs, 'projectcalico.hbs'));
loadPartial('rabbitmqCustom',           path.resolve(partials_customs, 'rabbitmq.hbs'));
loadPartial('redisCustom',              path.resolve(partials_customs, 'redis.hbs'));
loadPartial('secretgeneratorCustom',    path.resolve(partials_customs, 'secretgenerator.hbs'));
loadPartial('traefikCustom',            path.resolve(partials_customs, 'traefik.hbs'));
loadPartial('vynilCustom',              path.resolve(partials_customs, 'vynil.hbs'));
loadPartial('zalandoCustom',            path.resolve(partials_customs, 'zalando.hbs'));
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
    const allObjects = (data as object[]).map(s=>s['objects']).flat();
    const allUniqObjects = allObjects.filter(obj=>allObjects.filter(o=>o.group==obj.group&&o.short==obj.short).indexOf(obj)==0)
    return (data as object[]).map(g=>{return {
            name:g['name'],
            objects:(g['objects']).map(tmp=>{
                return finalizeObject({
                    ...tmp, ...tmp.alternatives
                        .sort((a,b)=>a.apiVersion.length>b.apiVersion.length?-1:a.apiVersion.length==b.apiVersion.length?a.apiVersion<b.apiVersion?-1:1:1).reverse()[0]
            } as k8sObject,allUniqObjects)
        })
    }})
}).then(data => {
////////////////////////////////////
//// Generate the backend
///
// Use the defined templates with the generated enhenced data to build the backend
    const allKnown          = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'all.known.ts.hbs'))
    const allBackIndex      = loadCompile(deleteFiles, path.resolve(path_lib, 'back', 'all.resolvers.index.ts.hbs'))
    const allBackResolvers  = loadCompile(deleteFiles, path.resolve(path_lib, 'back', 'all.resolvers.ns.resolvers.ts.hbs'))
    const allBackSchemaNS   = loadCompile(deleteFiles, path.resolve(path_lib, 'back', 'all.schema.ns.graphql.hbs'))
    const grpBackSchema     = loadCompile(deleteFiles, path.resolve(path_lib, 'back', 'grp.schema.graphql.hbs'))
    const grpBackCustom     = loadCompile(deleteFiles, path.resolve(path_lib, 'back', 'grp.resolvers.custom.ts.hbs'))
    const grpBackIndex      = loadCompile(deleteFiles, path.resolve(path_lib, 'back', 'grp.resolvers.index.ts.hbs'))
    const grpBackResolvers  = loadCompile(deleteFiles, path.resolve(path_lib, 'back', 'grp.resolvers.ns.resolvers.ts.hbs'))
    const objBackNsResolver = loadCompile(deleteFiles, path.resolve(path_lib, 'back', 'obj.resolvers.ts.hbs'))

    mkdir(path.resolve(path_back, 'schema'));
    mkdir(path.resolve(path_back, 'resolvers', 'k8s'));
    const current = data as {name:string,objects:{short:string}[]}[];
    allKnown(path.resolve(path_back, 'resolvers'), `knowledge.ts`, {groups: current})
    allBackIndex(path.resolve(path_back, 'resolvers'), 'index.ts',{groups: current});
    allBackResolvers(path.resolve(path_back, 'resolvers', 'k8s'), `nsResolvers.ts`,{groups: current});
    allBackSchemaNS(path.resolve(path_back, 'schema'), `k8sNamespace.graphql`,{groups: current});
    current.forEach(g => {
        grpBackSchema(path.resolve(path_back, 'schema'), `${g.name}.graphql`, g);
        if (!deleteFiles) mkdir(path.resolve(path_back, 'resolvers', g.name));
        grpBackCustom(path.resolve(path_back, 'resolvers', g.name), 'custom.ts', g);
        grpBackIndex(path.resolve(path_back, 'resolvers', g.name), 'index.ts', g);
        grpBackResolvers(path.resolve(path_back, 'resolvers', 'k8s'), `nsResolvers.${g.name}.ts`, g);
        g.objects.forEach(o => {
            objBackNsResolver(path.resolve(path_back, 'resolvers', g.name), `${o.short}.ts`, o)
        })
        if (deleteFiles) rmdir(path.resolve(path_back, 'resolvers', g.name));
    })
    return data
}).then(data => {
////////////////////////////////////
//// Generate the Frontend
///
// Exact same strategy and data as for the backend, using diffrent templates
    const objQueryMutation  = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.query.mutation.graphql.hbs'))
    const objQueryRead      = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.query.read.graphql.hbs'))
    const grpQueryRead      = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'grp.query.read.graphql.hbs'))
    const allQueryRead      = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'all.query.read.graphql.hbs'))
    const allKnown          = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'all.known.ts.hbs'))
    const allLib            = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'all.lib.ts.hbs'))
    const allPageAdvices    = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'all.pages.advices.vue.hbs'))
    const allRoutes         = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'all.routes.ts.hbs'))
    const catRoutes         = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'cat.routes.ts.hbs'))
    const catPageAdvices    = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'cat.pages.advices.vue.hbs'))
    const catLib            = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'cat.lib.ts.hbs'))
    const grpPageDashboard  = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'grp.pages.dashboard.vue.hbs'))
    const grpPageAdvices    = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'grp.pages.advices.vue.hbs'))
    const grpLib            = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'grp.lib.ts.hbs'))
    const grpRoutes         = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'grp.routes.ts.hbs'))
    const grpCustom         = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'grp.custom.def.ts.hbs'))
    const objCompEdit       = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.components.edit.vue.hbs'))
    const objCompMeta       = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.components.meta.vue.hbs'))
    const objCompStatus     = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.components.status.vue.hbs'))
    const objCompList       = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.components.list.vue.hbs'))
    const objCompView       = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.components.view.vue.hbs'))
    const objPageEdit       = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.pages.edit.vue.hbs'))
    const objPageList       = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.pages.list.vue.hbs'))
    const objPageNew        = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.pages.new.vue.hbs'))
    const objPageView       = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.pages.view.vue.hbs'))
    const objLib            = loadCompile(deleteFiles, path.resolve(path_lib, 'front', 'obj.lib.ts.hbs'))

    const current = data as {name:string,objects:{short:string, category:string, readProperties:string[]}[]}[];
    allKnown(path.resolve(path_front, 'libs'), `knowledge.ts`, {groups: current})
    allQueryRead(path.resolve(path_front, 'queries'), `all.read.graphql`, {name: 'Advice', detailed: false, objects: current.map(g=>g.objects).flat()})
    allLib(path.resolve(path_front, 'libs'), `index.ts`, {groups: current, categories: allCategories})
    allPageAdvices(path.resolve(path_front, 'pages'), 'AllAdvices.vue', {groups: current, categories: allCategories.map(c=>{return { category: c, groups: current.map(g=>{return{...g, objects: g.objects.filter(o=>o.category==c)}}).filter(g=>g.objects.length>0)}})})
    allRoutes(path.resolve(path_front, 'routes'), `index.ts`, {groups: current, categories: allCategories})
    allCategories.forEach(c=>{
        if (!deleteFiles) mkdir(path.resolve(path_front, 'routes', c));
        if (!deleteFiles) mkdir(path.resolve(path_front, 'pages', c));
        const groups = current.map(g=>{return{
            ...g,
            objects: g.objects.filter(o=>o.category==c)
        }}).filter(g=>g.objects.length>0)
        catLib(path.resolve(path_front, 'libs'), `${c}.ts`,{category: c, groups: groups})
        catPageAdvices(path.resolve(path_front, 'pages', c), `${c}Advices.vue`,{category: c, groups: groups})
        catRoutes(path.resolve(path_front, 'routes', c), 'index.ts',{category: c, groups: groups})
    })
    current.forEach(g => {
        if (!deleteFiles) mkdir(path.resolve(path_front, 'queries', g.name));
        if (!deleteFiles) mkdir(path.resolve(path_front, 'components', g.name));
        if (!deleteFiles) mkdir(path.resolve(path_front, 'libs', g.name));
        grpCustom(path.resolve(path_front, 'libs', g.name),`custom.ts`, {...g, categories: g.objects.map(o=>o.category).filter(uniq)})
        allCategories.filter(c=> g.objects.filter(o=>o.category==c).length>0).forEach(c=>{
            grpLib(path.resolve(path_front, 'libs', g.name), `${c}Cat.ts`, {...g, category: c, plural: g.objects.filter(o=>o.category==c)[0].short,objects: g.objects.filter(o=>o.category==c)});
            grpRoutes(path.resolve(path_front, 'routes', c), `${g.name}.ts`, {...g, category: c, plural: g.objects.filter(o=>o.category==c)[0].short,objects: g.objects.filter(o=>o.category==c)});
            if (!deleteFiles) mkdir(path.resolve(path_front, 'pages', c, g.name))
            grpPageDashboard(path.resolve(path_front, 'pages', c, g.name), `${c}Dashboard.vue`, {...g, category: c, plural: g.objects.filter(o=>o.category==c)[0].short,objects: g.objects.filter(o=>o.category==c)});
            grpPageAdvices(path.resolve(path_front, 'pages', c, g.name), `${c}Advices.vue`, {...g, category: c, plural: g.objects.filter(o=>o.category==c)[0].short,objects: g.objects.filter(o=>o.category==c)});
            grpQueryRead(path.resolve(path_front, 'queries', g.name), `${c}.read.graphql`, {...g, detailed: false, category: c, plural: g.objects.filter(o=>o.category==c)[0].short,objects: g.objects.filter(o=>o.category==c)})
            grpQueryRead(path.resolve(path_front, 'queries', g.name), `${c}.details.graphql`, {...g, detailed: true, category: c, plural: g.objects.filter(o=>o.category==c)[0].short,objects: g.objects.filter(o=>o.category==c)})
            if (deleteFiles) rmdir(path.resolve(path_front, 'pages', c, g.name))
        })
        g.objects.forEach(o => {
            if (o['crd']==undefined) {
                objQueryMutation(path.resolve(path_front, 'queries', g.name), `${o.short}.create.graphql`, {...o, mutationType: 'Create'})
                objQueryMutation(path.resolve(path_front, 'queries', g.name), `${o.short}.delete.graphql`, {...o, mutationType: 'Delete'})
                objQueryMutation(path.resolve(path_front, 'queries', g.name), `${o.short}.patch.graphql`, {...o, mutationType: 'Patch'})
            }
            objQueryRead(path.resolve(path_front, 'queries', g.name), `${o.short}.read.graphql`, {...o, detailed: false})
            objQueryRead(path.resolve(path_front, 'queries', g.name), `${o.short}.details.graphql`, {...o, detailed: true})
            objCompEdit(path.resolve(path_front, 'components', g.name),`${o.short}Edit.vue`, o)
            objCompList(path.resolve(path_front, 'components', g.name),`${o.short}List.vue`, o)
            objCompMeta(path.resolve(path_front, 'components', g.name),`${o.short}Meta.vue`, o)
            objCompStatus(path.resolve(path_front, 'components', g.name),`${o.short}Status.vue`, o);
            objCompView(path.resolve(path_front, 'components', g.name),`${o.short}View.vue`, o)
            if (!deleteFiles) mkdir(path.resolve(path_front, 'pages', o['category'], g.name));
            objPageEdit(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}Edit.vue`, o)
            objPageList(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}List.vue`, o)
            objPageView(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}View.vue`, o)
            objPageNew(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}New.vue`, o)
            objLib(path.resolve(path_front, 'libs', g.name),`${o.short}.ts`, o)
            /*if (Object.keys(o.readProperties).includes('status') &&
                o['definition'] != undefined && o['definition']['properties'] != undefined &&
                o['definition']['properties']['status'] != undefined &&
                o['definition']['properties']['status']['properties'] != undefined &&
                o['definition']['properties']['status']['properties']['conditions'] != undefined)
                console.log(o['group'],o['short'])*/
            if (deleteFiles) rmdir(path.resolve(path_front, 'pages', o['category'], g.name));
        })
        if (deleteFiles) rmdir(path.resolve(path_front, 'queries', g.name));
        if (deleteFiles) rmdir(path.resolve(path_front, 'components', g.name));
        if (deleteFiles) rmdir(path.resolve(path_front, 'libs', g.name));
    })
    if (deleteFiles) allCategories.forEach(c=>{
        rmdir(path.resolve(path_front, 'routes', c));
    })
    return data
})
