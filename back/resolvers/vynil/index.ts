
import {getPackages} from './cache.js';
import { queries as installQueries } from './query.Install.js';
import { queries as distribQueries } from './query.Distrib.js';
import { VynilDistribPublic } from './type.Package.js';

export const queries = {
    vynilCategories: async () => {
        const packages = await getPackages()
        return [...new Set(packages.map((pkg) => pkg.category))].sort().map((n) => {return {name: n}})
    },
    vynilPackages: async () => {
        return await getPackages()
    },
    ...installQueries,
    ...distribQueries,
};

export const resolvers = {
    vynilInstall: {
        component: async (parent) => {
            const packages = await getPackages()
            const lstPkg = packages.filter((pck) => pck.name == parent.componentName && pck.category  == parent.categoryName && pck.distrib  == parent.distribName);
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
                    name: parent.categoryName
                },
                distribution: distribution,
                commit_id: "",
                name: parent.componentName
            }
        },
        category: async (parent) => {
            return {
                name: parent.categoryName,
            };
        },
        distrib: async (parent) => {
            const lst = (await distribQueries.vynilDistribs()).filter((i) => i.metadata.name == parent.distribName)
            if (lst.length>0) return lst[0];
            return {
                metadata:{
                    name: parent.distribName,
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
            return packages.filter((pck) => pck.category === parent.metadata.name);
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
};
