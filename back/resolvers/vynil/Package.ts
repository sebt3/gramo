import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';
import { gramoConfig } from '../../config.js'
import { lists as distribQueries } from './Distrib.js';

function derefOptions(ret: object, dists) {
    Object.keys(ret).forEach((name) => {
        if (ret[name]!=null && ret[name]['type']=='object' && !['',null,undefined].includes(ret[name]['x-vynil-category']) && !['',null,undefined].includes(ret[name]['x-vynil-package']) && dists.filter(d=>d.status.components[ret[name]['x-vynil-category']]!=undefined&&d.status.components[ret[name]['x-vynil-category']][ret[name]['x-vynil-package']]!=undefined).length>0) {
            Object.assign(ret[name]['properties'], dists.filter(d=>d.status.components[ret[name]['x-vynil-category']]!=undefined&&d.status.components[ret[name]['x-vynil-category']][ret[name]['x-vynil-package']]!=undefined)[0].status.components[ret[name]['x-vynil-category']][ret[name]['x-vynil-package']]['options'])
        }
        if (ret[name]!=null && ret[name]['type']=='object' && ret[name]['properties']!=undefined) Object.keys(ret[name]['properties']).forEach(key=>derefOptions(ret[name]['properties'][key], dists))
        if (ret[name]!=null && ret[name]['type']=='array' && ret[name]['items']!=undefined) Object.keys(ret[name]['items']).forEach(key=>derefOptions(ret[name]['items'][key], dists))
    })
    return ret
}

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
};
export const lists = {
    vynilPackage: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('vynilPackage')
        if (lst==undefined) {
            lst = new Array()
            try {
                const dists = await distribQueries.vynilDistrib(null, {})
                dists.forEach((dist) => {
                  const distName = dist.metadata?.name;
                  if (dist.status!=null) Object.entries(dist.status.components).forEach(([category, pkgs])  => {
                    Object.entries(pkgs as object).forEach(([name, pkg])  => {
                      const item = Object.assign({}, pkg)
                      item.name = name;
                      item.distrib = distName as string;
                      item.category = category;
                      item.options = derefOptions(Object.assign({}, pkg['options']), dists);
                      (lst as object[]).push(item)
                    })
                  })
                });
                cache.set('vynilPackage', lst, 2);
            } catch (err) {
                if (typeof err === 'object' && (err as object)['body'] !=undefined && (err as object)['statusCode'] !=undefined) {
                    if ((err as object)['statusCode'] != 404 && (err as object)['body']['reason']!='Forbidden') {
                      console.error('error', (err as object)['body']);
                    }
                } else {console.error('error', err)}
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    },
};
export const queries = {
    vynilPackage: lists.vynilPackage,
};

export const resolvers = {
    vynilPackage: {
        consumevynilCategory: async (parent) => {
            return {
                name: parent.category,
            };
        },
        consumevynilDistrib: async (parent) => {
            const lst = (await distribQueries.vynilDistrib(parent,{})).filter((i) => i.metadata.name == parent.distrib)
            if (lst.length>0) return lst[0];
            return {
                metadata:{
                    name: parent.distrib,
                },
            };
        }
    },
};

