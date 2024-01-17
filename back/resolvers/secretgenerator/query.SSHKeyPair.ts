import {kc, k8s, getMetadata} from '../core/libs.js';
import { SecretgeneratorSSHKeyPairList, SecretgeneratorSSHKeyPair } from './type.SSHKeyPair.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    secretgeneratorSSHKeyPairs: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'sshkeypairs')
            const resList = res.body as SecretgeneratorSSHKeyPairList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                data: ext.spec.data,
                forceRegenerate: ext.spec.forceRegenerate,
                length: ext.spec.length,
                privateKey: ext.spec.privateKey,
                type: ext.spec.type,
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
    secretgeneratorSSHKeyPair: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'sshkeypairs', args['name'])
            const ext = res.body as SecretgeneratorSSHKeyPair
            return {
                metadata: getMetadata(ext.metadata),
                data: ext.spec.data,
                forceRegenerate: ext.spec.forceRegenerate,
                length: ext.spec.length,
                privateKey: ext.spec.privateKey,
                type: ext.spec.type,
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
