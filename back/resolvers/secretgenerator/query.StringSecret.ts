import {kc, k8s, getMetadata} from '../core/libs.js';
import { SecretgeneratorStringSecretList, SecretgeneratorStringSecret } from './type.StringSecret.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    secretgeneratorStringSecrets: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'stringsecrets')
            const resList = res.body as SecretgeneratorStringSecretList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "data": ext.spec['data'],
                "fields": ext.spec['fields'],
                "forceRegenerate": ext.spec['forceRegenerate'],
                "type": ext.spec['type'],
                status: ext.status==undefined?null:{
                    "secret": ext.status['secret'],
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    secretgeneratorStringSecret: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'stringsecrets', args['name'])
            const ext = res.body as SecretgeneratorStringSecret
            return {
                metadata: getMetadata(ext.metadata, ext),
                "data": ext.spec['data'],
                "fields": ext.spec['fields'],
                "forceRegenerate": ext.spec['forceRegenerate'],
                "type": ext.spec['type'],
                status: ext.status==undefined?null:{
                    "secret": ext.status['secret'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
