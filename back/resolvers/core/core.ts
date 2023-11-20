import {kc, k8s, getMetadata} from './libs.js';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { resolver as vynilNSresolver } from '../vynil/resolver.namespace.Install.js';
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
export const queries = {
    namespaces: async () => {
        try {
            const nsRes = await k8sApi.listNamespace();
            return nsRes.body.items.map((ns)=>{return{
                metadata: getMetadata(ns.metadata),
                status: {
                    phase: ns.status?.phase
                }
            }})
        } catch (err) {
            console.error(err);
        }
        return []
    },
};
export const mutations = {
};
export const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    namespace: {
        ...vynilNSresolver,
    }
};
