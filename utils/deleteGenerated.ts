#!/usr/bin/env -S npx ts-node-esm
import path from 'path';
import { fileURLToPath } from 'url';
import {LoadFrom,mkdir} from './generator/utils.js'
import {removeGenerated} from './generator/hb.js'
import {allCategories} from './generator/config.js'
import * as fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const path_data = path.resolve(__dirname, '..', 'data');
const path_back = path.resolve(__dirname, '..', 'back');
const path_front = path.resolve(__dirname, '..', 'front');
const path_lib = path.resolve(__dirname, 'generator');

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

    const current = data as {name:string,objects:{short:string}[]}[];
    removeGenerated(path.resolve(path_back, 'resolvers'), 'index.ts');
    removeGenerated(path.resolve(path_back, 'resolvers', 'k8s'), `nsResolvers.ts`);
    removeGenerated(path.resolve(path_back, 'schema'), `k8sNamespace.graphql`);
    current.forEach(g => {
        removeGenerated(path.resolve(path_back, 'schema'), `${g.name}.graphql`);
        removeGenerated(path.resolve(path_back, 'resolvers', g.name), 'custom.ts');
        removeGenerated(path.resolve(path_back, 'resolvers', g.name), 'index.ts');
        removeGenerated(path.resolve(path_back, 'resolvers', 'k8s'), `nsResolvers.${g.name}.ts`);
        g.objects.forEach(o => {
            removeGenerated(path.resolve(path_back, 'resolvers', g.name), `${o.short}.ts`)
        })
    })
    return data
}).then(data => {
////////////////////////////////////
//// Generate the Frontend
///
// Exact same strategy and data as for the backend, using diffrent templates
    const current = data as {name:string,objects:{short:string, category:string, readProperties:string[]}[]}[];
    removeGenerated(path.resolve(path_front, 'routes'), `index.ts`)
    allCategories.forEach(c=>{
        removeGenerated(path.resolve(path_front, 'routes', c), 'index.ts')
    })
    current.forEach(g => {
        removeGenerated(path.resolve(path_front, 'libs', g.name),`custom.ts`)
        allCategories.filter(c=> g.objects.filter(o=>o.category==c).length>0).forEach(c=>{
            removeGenerated(path.resolve(path_front, 'routes', c), `${g.name}.ts`);
            removeGenerated(path.resolve(path_front, 'pages', c, g.name), 'Dashboard.vue');
            removeGenerated(path.resolve(path_front, 'queries', g.name), `${c}.read.graphql`)
            removeGenerated(path.resolve(path_front, 'queries', g.name), `${c}.details.graphql`)
        })
        g.objects.forEach(o => {
            removeGenerated(path.resolve(path_front, 'queries', g.name), `${o.short}.create.graphql`)
            removeGenerated(path.resolve(path_front, 'queries', g.name), `${o.short}.delete.graphql`)
            removeGenerated(path.resolve(path_front, 'queries', g.name), `${o.short}.patch.graphql`)
            removeGenerated(path.resolve(path_front, 'queries', g.name), `${o.short}.read.graphql`)
            removeGenerated(path.resolve(path_front, 'queries', g.name), `${o.short}.details.graphql`)
            removeGenerated(path.resolve(path_front, 'components', g.name),`${o.short}Edit.vue`)
            removeGenerated(path.resolve(path_front, 'components', g.name),`${o.short}List.vue`)
            removeGenerated(path.resolve(path_front, 'components', g.name),`${o.short}Meta.vue`)
            if (o.readProperties.includes('status'))
                removeGenerated(path.resolve(path_front, 'components', g.name),`${o.short}Status.vue`);
            removeGenerated(path.resolve(path_front, 'components', g.name),`${o.short}View.vue`)
            removeGenerated(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}Edit.vue`)
            removeGenerated(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}List.vue`)
            removeGenerated(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}View.vue`)
            removeGenerated(path.resolve(path_front, 'pages', o['category'], g.name),`${o.short}New.vue`)
            removeGenerated(path.resolve(path_front, 'libs', g.name),`${o.short}.ts`)
        })
    })
    return data
})
