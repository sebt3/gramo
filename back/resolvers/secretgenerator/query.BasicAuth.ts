import {kc, k8s, getMetadata} from '../core/libs.js';
import { SecretgeneratorBasicAuthList, SecretgeneratorBasicAuth } from './type.BasicAuth.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    secretgeneratorBasicAuths: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths')
            const resList = res.body as SecretgeneratorBasicAuthList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                data: ext.spec.data,
                encoding: ext.spec.encoding,
                forceRegenerate: ext.spec.forceRegenerate,
                length: ext.spec.length,
                username: ext.spec.username,
                status: ext.status==undefined?null:{
                    secret: ext.status.secret,
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    secretgeneratorBasicAuth: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths', args['name'])
            const ext = res.body as SecretgeneratorBasicAuth
            return {
                metadata: getMetadata(ext.metadata),
                data: ext.spec.data,
                encoding: ext.spec.encoding,
                forceRegenerate: ext.spec.forceRegenerate,
                length: ext.spec.length,
                username: ext.spec.username,
                status: ext.status==undefined?null:{
                    secret: ext.status.secret,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
