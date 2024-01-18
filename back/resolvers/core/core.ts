import {kc, k8s, getMetadata} from './libs.js';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { gramoConfig } from '../../config.js'
import { resolvers as vynilNSresolver } from './resolvers.ns.vynil.js';
import { resolvers as permNSresolver } from './resolvers.ns.Permissions.js';
import { resolvers as fluxcdSourceNSresolver } from './resolvers.ns.fluxcd.source.js';
import { resolvers as fluxcdNotificationNSresolver } from './resolvers.ns.fluxcd.notification.js';
import { resolvers as fluxcdKustomizeNSresolver } from './resolvers.ns.fluxcd.kustomize.js';
import { resolvers as fluxcdImageNSresolver } from './resolvers.ns.fluxcd.image.js';
import { resolvers as fluxcdHelmNSresolver } from './resolvers.ns.fluxcd.helm.js';
import { resolvers as k8upNSresolver } from './resolvers.ns.k8up.js';
import { resolvers as mariadbNSresolver } from './resolvers.ns.mariadb.js';
import { resolvers as mongodbcommunityNSresolver } from './resolvers.ns.mongodbcommunity.js';
import { resolvers as monitoringNSresolver } from './resolvers.ns.monitoring.js';
import { resolvers as postgresqlNSresolver } from './resolvers.ns.postgresql.js';
import { resolvers as redisNSresolver } from './resolvers.ns.redis.js';
import { resolvers as secretgeneratorNSresolver } from './resolvers.ns.secretgenerator.js';

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
export const queries = {
    gramoConfig: () => gramoConfig,
    namespaces: async () => {
        try {
            const nsRes = await k8sApi.listNamespace();
            return nsRes.body.items.filter(ns => {
                if (gramoConfig.limitNamespaceKey=="") return true;
                if (ns.metadata == undefined) return false;
                if (gramoConfig.limitNamespaceValue=="" && gramoConfig.limitNamespaceHave=="" && ns.metadata?.labels != undefined && (ns.metadata?.labels as object)[gramoConfig.limitNamespaceKey] != undefined) return true;
                if (gramoConfig.limitNamespaceHave!=""  && ns.metadata?.labels != undefined && (ns.metadata?.labels as object)[gramoConfig.limitNamespaceKey].split(',').includes(gramoConfig.limitNamespaceHave)) return true;
                if (gramoConfig.limitNamespaceValue!="" && ns.metadata?.labels != undefined && (ns.metadata?.labels as object)[gramoConfig.limitNamespaceKey] == gramoConfig.limitNamespaceValue) return true;
                return false;
            }).map((ns)=>{return{
                metadata: getMetadata(ns.metadata),
                status: {
                    phase: ns.status?.phase
                }
            }})
        } catch (err) {
            console.error((err as object)['body']);
        }
        return []
    },
    namespace: async (_parent, args: object) => {
        try {
            const nsRes = await k8sApi.readNamespace(args['name'])
            if (gramoConfig.limitNamespaceKey!="" && nsRes.body.metadata == undefined || nsRes.body.metadata?.labels == undefined) return null;
            if (gramoConfig.limitNamespaceKey!="" && (nsRes.body.metadata?.labels as object)[gramoConfig.limitNamespaceKey] == undefined) return null;
            if (gramoConfig.limitNamespaceKey!="" && gramoConfig.limitNamespaceValue!="" && (nsRes.body.metadata?.labels as object)[gramoConfig.limitNamespaceKey] != gramoConfig.limitNamespaceValue) return null;
            if (gramoConfig.limitNamespaceKey!="" && gramoConfig.limitNamespaceHave!="" && !(nsRes.body.metadata?.labels as object)[gramoConfig.limitNamespaceKey].split(',').includes(gramoConfig.limitNamespaceHave)) return null;
            return {
                metadata: getMetadata(nsRes.body.metadata),
                status: {
                    phase: nsRes.body.status?.phase
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const mutations = {
};
export const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    namespace: {
        vynilInstalls: async (parent, args: object) => {
            return (await vynilNSresolver.vynilInstalls(parent,args)).filter(inst => {
                if (gramoConfig.limitVynilDistrib != "" && inst.distrib != gramoConfig.limitVynilDistrib) return false;
                if (gramoConfig.limitVynilCategory != "" && inst.category != gramoConfig.limitVynilCategory) return false;
                return true
            })
        },
        ...permNSresolver,
        ...fluxcdSourceNSresolver,
        ...fluxcdNotificationNSresolver,
        ...fluxcdKustomizeNSresolver,
        ...fluxcdImageNSresolver,
        ...fluxcdHelmNSresolver,
        ...secretgeneratorNSresolver,
        ...k8upNSresolver,
        ...mariadbNSresolver,
        ...mongodbcommunityNSresolver,
        ...monitoringNSresolver,
        ...postgresqlNSresolver,
        ...redisNSresolver,
    }
};
