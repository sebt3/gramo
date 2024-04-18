#!/usr/bin/env -S npx tsx
import path from 'path';
import { fileURLToPath } from 'url';
import { crds, openapi, k8sDefinitionPropertiesStatus  } from './generator/types.js'
import { uniq, getShort, enhenceObject, getObjFQN, mkdir, saveTo, replaceRefWithDef, getTargetVersion } from './generator/utils.js'
import { getClusterByPath } from './generator/k8s.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const path_data = path.resolve(__dirname, '..', 'data');

const AdditionnalDefSources = [
    'https://github.com/tektoncd/triggers/raw/v0.26.1/pkg/apis/triggers/v1beta1/swagger.json',
    'https://github.com/tektoncd/pipeline/raw/v0.57.0/pkg/apis/pipeline/v1alpha1/swagger.json',
    'https://github.com/tektoncd/pipeline/raw/v0.57.0/pkg/apis/pipeline/v1beta1/swagger.json',
    'https://github.com/tektoncd/pipeline/raw/v0.57.0/pkg/apis/pipeline/v1/swagger.json'
]
const AdditionnalDefinitions = (await Promise.all(AdditionnalDefSources.map(async u=>(await fetch(u).then(r => r.json()).then(o=>o.definitions))))).reduce((res,cur)=>{return {...cur,...res}},{})
Promise.all([getClusterByPath('openapi/v2'), getClusterByPath('apis'), getClusterByPath('apis/apiextensions.k8s.io/v1/customresourcedefinitions')])
    .then(([data_in, apis_in, crd_in]) => {
////////////////////////////////////
//// Prepare the data
///
// Use the k8s swagger, its defined apiGroups and CRDs to build all supported Objects type
// and group them according to their defined apiGroup and final super group
    // Group all swagger definitions marked as a kubernetes object into their apiGroup,
    // add its CRD if found and start to refine the object properties
    const definitions = replaceRefWithDef(Object.entries({...AdditionnalDefinitions,...((data_in as openapi).definitions)}))
    const known_data = ((apis_in as object)['groups'] as Array<object>).map(i => { return {
        name: i['name'],
        ...getShort(i['name']),
        objects: Object.entries(definitions).filter(([name, value]) =>
            Object.keys(value).includes('x-kubernetes-group-version-kind') && value['x-kubernetes-group-version-kind'][0]['group'] == i['name'] &&
            Object.keys(value).includes('properties') && value.properties!=undefined && value.properties['items']==undefined &&
            (crd_in as crds).items.filter(c => getObjFQN(c) == name).length<1
        ).map(([name, def]) => {return enhenceObject(i['name'], {name: name, definition: def, crd: null})})
        .concat(Object.entries(definitions).filter(([name, value]) =>
            Object.keys(value).includes('x-kubernetes-group-version-kind') && value['x-kubernetes-group-version-kind'][0]['group'] == i['name'] &&
            (crd_in as crds).items.filter(c => getObjFQN(c) == name).length>0
        ).map(([name, def]) => {
            const crd = (crd_in as crds).items.filter(c => getObjFQN(c) == name)[0];
            const ver = crd.spec.versions.filter(v=> v.name == getTargetVersion(crd.spec.versions))[0]
            const minDef = { properties: ver.subresources?.status!=undefined?{metadata: undefined,spec: Object.keys(definitions).includes(`${name.split('.').slice(-2).join('.')}Spec`)?definitions[`${name.split('.').slice(-2).join('.')}Spec`]:{type: 'object'},status: Object.keys(definitions).includes(`${name.split('.').slice(-2).join('.')}Status`)?definitions[`${name.split('.').slice(-2).join('.')}Status`]:{type: 'object'}}:{metadata: undefined,spec: Object.keys(definitions).includes(`${name.split('.').slice(-2).join('.')}Spec`)?definitions[`${name.split('.').slice(-2).join('.')}Spec`]:{type: 'object'}} }
            return enhenceObject(i['name'], {name: name,definition: {...minDef, ...def}, crd: {kind:crd.kind,apiVersion:crd.apiVersion,metadata:{name:crd.metadata['name']},spec:{...crd.spec,conversion:{}},status:({conditions:[],acceptedNames:crd.status.acceptedNames,storedVersions:crd.status.storedVersions} as k8sDefinitionPropertiesStatus)}})
        }))
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
    // Finally merge all the apiGroups the should go toghether into "groups" finising the objects refinment in the process
    // Deduplicate same objects in distinct apiGroup and mark the alternative options
    return subgroups.map(s=>s.group).filter(uniq).map(g => { return {
        name: g,
        objects: subgroups.filter(s=>s.group==g && s.objects.length>0).map(s=>s.objects).flat().map(o=>o.short).filter(uniq).map((short) => {return {
            alternatives: subgroups.filter(s=>s.group==g && s.objects.length>0).map(s=>s.objects.filter(o=>o.short==short)).flat()
        }}).map(tmp=>{return {...tmp,...tmp.alternatives.sort((a,b)=>a.apiVersion.length>b.apiVersion.length?-1:a.apiVersion.length==b.apiVersion.length?a.apiVersion<b.apiVersion?-1:1:1).reverse()[0]}})
        .map(tmp=>{return {...tmp, alternatives: tmp.alternatives.length<2?[]:tmp.alternatives}})
    }})
}).then(data => {
////////////////////////////////////
//// Generate the datafiles
///
    mkdir(path_data);
    data.forEach(g => saveTo(path.resolve(path_data, `${g.name}.json`), g));
})