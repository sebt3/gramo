
import {getPackages} from './cache.js';
import { queries as installQueries } from './query.Install.js';
import { queries as distribQueries } from './query.Distrib.js';
import { mutations as distribMutations } from './mutation.Distrib.js';
import { VynilDistribPublic } from './type.Package.js';

export const queries = {
    vynilCategories: async () => {
        const packages = await getPackages()
        return [...new Set(packages.map((pkg) => pkg.category))].sort().map((n) => {return {name: n}})
    },
    vynilPackages: async () => {
        return await getPackages()
    },
    vynilPackage: async (_parent, args: object) => {
        const pkgs = (await getPackages()).filter(p => p.distrib == args['distrib'] && p.category == args['category'] && p.name == args['name']);
        if (pkgs.length>0) return pkgs[0];
        return null;
    },
    ...installQueries,
    ...distribQueries,
};

export const resolvers = {
    vynilInstall: {
        component: async (parent) => {
            const packages = await getPackages()
            const lstPkg = packages.filter((pck) => pck.name == parent.component && pck.category  == parent.category && pck.distrib  == parent.distrib);
            if (lstPkg.length>0) return lstPkg[0];
            const lst = (await distribQueries.vynilDistribs()).filter((i) => i.metadata.name == parent.distrib)
            let distribution:VynilDistribPublic = {
                metadata: {
                    name: parent.distribName,
                    namespace: undefined,
                    labels: [],
                    annotations: []
                },
                schedule: "",
                url: "",
                status: undefined,
                branch: undefined,
                insecure: undefined,
                login: undefined
            };
            if (lst.length>0) distribution = lst[0] as VynilDistribPublic;
            return {
                category: {
                    name: parent.category
                },
                distribution: distribution,
                commit_id: "",
                name: parent.component
            }
        },
        category: async (parent) => {
            return {
                name: parent.category,
            };
        },
        distrib: async (parent) => {
            const lst = (await distribQueries.vynilDistribs()).filter((i) => i.metadata.name == parent.distrib)
            if (lst.length>0) return lst[0];
            return {
                metadata:{
                    name: parent.distrib,
                    labels: [],
                    annotations: []
                },
                schedule: "",
                url: ""
            };
        }
    },
    vynilDistrib: {
        packages: async (parent) => {
            const packages = await getPackages()
            return packages.filter((pck) => pck.distrib === parent.metadata.name);
        }
    },
    vynilPackage: {
        category: async (parent) => {
            return {
                name: parent.category,
            };
        },
        distribution: async (parent) => {
            const lst = (await distribQueries.vynilDistribs()).filter((i) => i.metadata.name == parent.distrib)
            if (lst.length>0) return lst[0];
            return {
                metadata:{
                    name: parent.distrib,
                    labels: [],
                    annotations: []
                },
                schedule: "",
                url: ""
            };
        }
    },
    vynilCategory: {
        packages: async (parent) =>  {
            const packages = await getPackages()
            return packages.filter((pck) => pck.category === parent.name);
        }
    }
};

export const mutations = {
    ...distribMutations
};
