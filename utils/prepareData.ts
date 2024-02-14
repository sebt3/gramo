#!/usr/bin/env -S npx ts-node-esm
import path from 'path';
import { fileURLToPath } from 'url';
import {crds, k8sObject, openapi} from './generator/types.js'
import {uniq, getShort, enhenceObject, finalizeObject, getObjFQN, mkdir, saveTo, replaceRefWithDef} from './generator/utils.js'
import {getClusterByPath} from './generator/k8s.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const path_data = path.resolve(__dirname, '..', 'data');

Promise.all([getClusterByPath('openapi/v2'), getClusterByPath('apis'), getClusterByPath('apis/apiextensions.k8s.io/v1/customresourcedefinitions')]).then(([data_in, apis_in, crd_in]) => {
////////////////////////////////////
//// Prepare the data
///
// Use the k8s swagger, its defined apiGroups and CRDs to build all supported Objects type
// and group them according to their defined apiGroup and final super group
    // Group all swagger definitions marked as a kubernetes object into their apiGroup,
    // add its CRD if found and start to refine the object properties
    const definitions = replaceRefWithDef(Object.entries((data_in as openapi).definitions))//.filter(e => e[1].properties!=undefined && e[1].properties['items']==undefined))
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
    const excluded_objects = Object.entries(definitions).filter(([n, i]) =>
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
    const allUniqObjects = allObjects.filter(obj=>allObjects.filter(o=>o.group==obj.group&&o.short==obj.short).indexOf(obj)==0)
    // Finally merge all the apiGroups the should go toghether into "groups" finising the objects refinment in the process
    // Deduplicate same objects in distinct apiGroup and mark the alternative options
    return subgroups.map(s=>s.group).filter(uniq).map(g => { return {
        name: g,
        objects: subgroups.filter(s=>s.group==g && s.objects.length>0).map(s=>s.objects).flat().map(o=>o.short).filter(uniq).map((short) => {return {
            alternatives: subgroups.filter(s=>s.group==g && s.objects.length>0).map(s=>s.objects.filter(o=>o.short==short)).flat()
        }}).map(tmp=>{return finalizeObject({...tmp,...tmp.alternatives.sort((a,b)=>a.apiVersion.length>b.apiVersion.length?-1:a.apiVersion.length==b.apiVersion.length?a.apiVersion<b.apiVersion?-1:1:1).reverse()[0]} as k8sObject,allUniqObjects)})
    }})
}).then(data => {
////////////////////////////////////
//// Generate the datafiles
///
    mkdir(path_data);
    data.forEach(g => saveTo(path.resolve(path_data, `${g.name}.json`), g));
})