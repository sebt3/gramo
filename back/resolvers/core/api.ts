import {kc, k8s} from './libs.js';
const apiApi = kc.makeApiClient(k8s.ApisApi);
import * as permissions from './query.Permissions.js';
import * as crds from './query.crds.js';

export const resolvers = {
    ...permissions.resolvers,
    ...crds.resolvers,
};
export const mutations = {
    ...permissions.mutations,
    ...crds.mutations,
};
export const queries = {
    apiVersions: async () => {
        try {
            const grpRes = await apiApi.getAPIVersions();
            return grpRes.body.groups.map((api)=>{return{
                name: api.name,
                versions: api.versions,
                preferredVersion: api.preferredVersion,
            }})
        } catch (err) {
            console.error(err);
        }
        return []
    },
    ...permissions.queries,
    ...crds.queries,
};
