import {kc, k8s, getMetadata} from './libs.js';
const extApi = kc.makeApiClient(k8s.ApiextensionsV1Api);

export const resolvers = {
};
export const mutations = {
};
export const queries = {
    customResourceDefinitions: async () => {
        try {
            const extRes = await extApi.listCustomResourceDefinition();
            return extRes.body.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                group: ext.spec.group,
                scope: ext.spec.scope,
                names: ext.spec.names,
                versions: ext.spec.versions,
                acceptedNames: ext.status?.acceptedNames
            }})
        } catch (err) {
            console.error(err);
        }
        return []
    },
    customResourceDefinition: async (_parent, args:object) => {
        try {
            const extRes = await extApi.readCustomResourceDefinition(args["name"]);
            return {
                metadata: getMetadata(extRes.body.metadata, extRes.body),
                group: extRes.body.spec.group,
                scope: extRes.body.spec.scope,
                names: extRes.body.spec.names,
                versions: extRes.body.spec.versions,
                acceptedNames: extRes.body.status?.acceptedNames
            }
        } catch (err) {
            console.error(err);
        }
        return []
    },
};
