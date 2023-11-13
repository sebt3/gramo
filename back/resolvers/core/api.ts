import { V1SelfSubjectAccessReview, V1SelfSubjectRulesReview } from '@kubernetes/client-node';
import {kc, k8s, getMetadata} from './libs.js';
const apiApi = kc.makeApiClient(k8s.ApisApi);
const extApi = kc.makeApiClient(k8s.ApiextensionsV1Api);
const authApi = kc.makeApiClient(k8s.AuthorizationV1Api);

export const mutations = {
};
export const resolvers = {
};
export const queries = {
    permissions: async (_parent, args:object) => {
        //let {group, resource, verb, namespace} = args
        const body: V1SelfSubjectAccessReview = {spec: {
            resourceAttributes: {
                group: args["group"],
                resource: args["resource"],
                subresource: args["subresource"],
                name: args["name"],
                namespace: args["namespace"],
                verb: args["verb"],
                version: args["version"],
            }
        }}
        try {
            const perms = await authApi.createSelfSubjectAccessReview(body);
            if (perms.body.status != undefined) return perms.body.status.allowed
        } catch (err) {
            console.error(err);
        }
        return false;
    },
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
    permissionReview: async (_parent, args:object) => {
        const body: V1SelfSubjectRulesReview = {spec: {namespace: args["namespace"]}}
        try {
            const perms = await authApi.createSelfSubjectRulesReview(body);
            if (perms.body.status != undefined) return perms.body.status
        } catch (err) {
            console.error(err);
        }
        return {}
    },
    customResourceDefinitions: async () => {
        try {
            const extRes = await extApi.listCustomResourceDefinition();
            return extRes.body.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                group: ext.spec.group,
                scope: ext.spec.scope,
                names: ext.spec.names,
                acceptedNames: ext.status?.acceptedNames
            }})
        } catch (err) {
            console.error(err);
        }
        return []
    },
};
