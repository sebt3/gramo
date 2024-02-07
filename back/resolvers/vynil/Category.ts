import {cache, applyFilter, applyFieldSelection } from '../k8slibs.js';
import { gramoConfig } from '../../config.js'
import { lists as packageQueries } from './Package.js';

export const mutations = {
};
export const lists = {
    vynilCategory: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('vynilCategory')
        if (lst==undefined) {
            try {
                const packages = await packageQueries.vynilPackage(null, {})
                lst = [...new Set(packages.map((pkg) => pkg['category']))].sort().map((n) => {return {name: n}})
                cache.set('vynilCategory', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    },
};
export const queries = {
    vynilCategory: lists.vynilCategory,
};
export const resolvers = {
    vynilCategory: {
        providePackage: async (parent) =>  {
            const packages = await packageQueries.vynilPackage(null, {})
            return packages.filter(pkg => {
                if (gramoConfig.limitVynilDistrib != "" && pkg['distrib'] != gramoConfig.limitVynilDistrib) return false;
                if (gramoConfig.limitVynilCategory != "" && pkg['category'] != gramoConfig.limitVynilCategory) return false;
                return pkg['category'] === parent.name
            });
        }
    }
};

