import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';
import { gramoConfig } from '../../config.js'
import { lists as distribQueries } from './Distrib.js';

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
                      (lst as object[]).push(item)
                    })
                  })
                });
                cache.set('vynilPackage', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
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
        consumeCategory: async (parent) => {
            return {
                name: parent.category,
            };
        },
        consumeDistrib: async (parent) => {
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

