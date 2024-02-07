#!/usr/bin/env -S npx ts-node-esm
import path from 'path';
import { fileURLToPath } from 'url';
import {crds, k8sObject, openapi} from './generator/types.js'
import {uniq, getShort, enhenceObject, finalizeObject, getObjFQN,mkdir, replaceRefWithDef} from './generator/utils.js'
import {getClusterByPath} from './generator/k8s.js'
import {loadCompile,loadPartial} from './generator/hb.js'
import {allCategories} from './generator/config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

Promise.all([getClusterByPath('openapi/v2'), getClusterByPath('apis'), getClusterByPath('apis/apiextensions.k8s.io/v1/customresourcedefinitions')]).then(([data_in, apis_in, crd_in]) => {
////////////////////////////////////
//// Prepare the data
///
// Use the k8s swagger, its defined apiGroups and CRDs to build all supported Objects type
// and group them according to their defined apiGroup and final super group
    // Group all swagger definitions marked as a kubernetes object into their apiGroup,
    // add its CRD if found and start to refine the object properties
    const definitions = replaceRefWithDef(Object.entries((data_in as openapi).definitions).filter(e => e[1].properties!=undefined && e[1].properties['items']==undefined))
    const known_data = ((apis_in as object)['groups'] as Array<object>).map(i => { return {
        name: i['name'],
        ...getShort(i['name']),
        objects: Object.entries(definitions).filter(([_, value]) =>
            Object.keys(value).includes('x-kubernetes-group-version-kind') && value['x-kubernetes-group-version-kind'][0]['group'] == i['name'] &&
            Object.keys(value).includes('properties') && value.properties!=undefined && value.properties['items']==undefined
        ).map(([name, def]) => {return enhenceObject(i['name'], {
            name: name, definition: def,
            crd: (crd_in as crds).items.filter(c => getObjFQN(c) == name).length<1?null:(crd_in as crds).items.filter(c => getObjFQN(c) == name)[0]
        })})
    }});
    // List the remaining objects not matched in a defined apiGroup (they belong to the group '' which is kubernetes main objects)
    const excluded_objects = Object.entries((data_in as openapi).definitions).filter(([n, i]) =>
        Object.keys(i).includes('x-kubernetes-group-version-kind') && i['x-kubernetes-group-version-kind'].length==1 &&
        !known_data.map(d=>d.name).includes(i['x-kubernetes-group-version-kind'][0]['group']) &&
        !/List$/.test(n) && !/^io.k8s.apimachinery.pkg.apis/.test(n)
    );
    // Merge the 2 lists into apiGroups
    const subgroups = [{
        name: 'core',
        group: 'k8s',
        sub: '',
        objects: excluded_objects.map(([name, def]) => {return enhenceObject('core',{ name: name, definition: def, crd: null})}).filter(o=>o.namespaced!=null)
    }].concat(known_data.map(d=>{return {...d, objects: d.objects.filter(o=>o.namespaced!=null)}}));
    const allObjects = subgroups.map(s=>(s.objects as unknown as k8sObject)).flat();
    // Finally merge all the apiGroups the should go toghether into "groups" finising the objects refinment in the process
    // Deduplicate same objects in distinct apiGroup and mark the alternative options
    return subgroups.map(s=>s.group).filter(uniq).map(g => { return {
        name: g,
        subs: subgroups.filter(s=>s.group==g && s.objects.length>0),
        objects: subgroups.filter(s=>s.group==g && s.objects.length>0).map(s=>s.objects).flat().map(o=>o.short).filter(uniq).map((short) => {return {
            alternatives: subgroups.filter(s=>s.group==g && s.objects.length>0).map(s=>s.objects.filter(o=>o.short==short)).flat()
        }}).map(tmp=>{return finalizeObject({...tmp,...tmp.alternatives.sort((a,b)=>a.apiVersion.length>b.apiVersion.length?-1:a.apiVersion.length==b.apiVersion.length?a.apiVersion<b.apiVersion?-1:1:1).reverse()[0]} as k8sObject,allObjects)})
    }})
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
    const current = data;
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

    const current = data;
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
            //objCompEdit(path.resolve(path_front, 'components', g.name),`${o.short}Edit.vue`, o)
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
