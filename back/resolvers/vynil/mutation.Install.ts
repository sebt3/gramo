
import {kc, k8s, getMetadata} from '../core/libs.js';
import { VynilInstall } from './type.Install.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createVynilInstall: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['auto_upgrade'] !== undefined && typeof args['spec']['auto_upgrade'] == 'boolean') spec['auto_upgrade'] = args['spec']['auto_upgrade'];
        spec['category'] = args['spec']['category'];
        spec['component'] = args['spec']['component'];
        spec['distrib'] = args['spec']['distrib'];
        if (args['spec']['options'] !== undefined) spec['options'] = args['spec']['options'];
        const payload = {
            apiVersion: 'vynil.solidite.fr/v1',
            kind: 'Install',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs', payload)
            const ext = res.body as VynilInstall
            return {
                metadata: getMetadata(ext.metadata),
                auto_upgrade: ext.spec.auto_upgrade,
                category: ext.spec.category,
                component: ext.spec.component,
                distrib: ext.spec.distrib,
                options: ext.spec.options,
                status: ext.status==undefined?null:{
                    commit_id: ext.status.commit_id,
                    digest: ext.status.digest,
                    errors: ext.status.errors,
                    last_updated: ext.status.last_updated,
                    plan: ext.status.plan,
                    status: ext.status.status,
                    tfstate: ext.status.tfstate,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    patchVynilInstall: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['auto_upgrade'] !== undefined && typeof args['spec']['auto_upgrade'] == 'boolean') spec['auto_upgrade'] = args['spec']['auto_upgrade'];
        spec['category'] = args['spec']['category'];
        spec['component'] = args['spec']['component'];
        spec['distrib'] = args['spec']['distrib'];
        if (args['spec']['options'] !== undefined) spec['options'] = args['spec']['options'];
        const request = {
            apiVersion: 'vynil.solidite.fr/v1',
            kind: 'Distrib',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs', args['name'])
            const extGet = resGet.body as VynilInstall
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as VynilInstall
            return {
                metadata: getMetadata(ext.metadata),
                auto_upgrade: ext.spec.auto_upgrade,
                category: ext.spec.category,
                component: ext.spec.component,
                distrib: ext.spec.distrib,
                options: ext.spec.options,
                status: ext.status==undefined?null:{
                    commit_id: ext.status.commit_id,
                    digest: ext.status.digest,
                    errors: ext.status.errors,
                    last_updated: ext.status.last_updated,
                    plan: ext.status.plan,
                    status: ext.status.status,
                    tfstate: ext.status.tfstate,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    deleteVynilInstall: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs', args['name'])
        const ext = res.body as VynilInstall
        return {
                metadata: getMetadata(ext.metadata),
                auto_upgrade: ext.spec.auto_upgrade,
                category: ext.spec.category,
                component: ext.spec.component,
                distrib: ext.spec.distrib,
                options: ext.spec.options,
                status: ext.status==undefined?null:{
                    commit_id: ext.status.commit_id,
                    digest: ext.status.digest,
                    errors: ext.status.errors,
                    last_updated: ext.status.last_updated,
                    plan: ext.status.plan,
                    status: ext.status.status,
                    tfstate: ext.status.tfstate,
                }
        }
    } catch (err) {
        console.error(err);
    }
    return null
},
};
