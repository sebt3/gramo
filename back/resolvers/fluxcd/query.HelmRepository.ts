import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdHelmRepositoryList, FluxcdHelmRepository } from './type.HelmRepository.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    fluxcdHelmRepositorys: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmrepositories')
            const resList = res.body as FluxcdHelmRepositoryList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "accessFrom": ext.spec['accessFrom'],
                "interval": ext.spec['interval'],
                "passCredentials": ext.spec['passCredentials'],
                "provider": ext.spec['provider'],
                "secretRef": ext.spec['secretRef'],
                "suspend": ext.spec['suspend'],
                "timeout": ext.spec['timeout'],
                "type": ext.spec['type'],
                "url": ext.spec['url'],
                status: ext.status==undefined?null:{
                    "artifact": ext.status['artifact'],
                    "conditions": ext.status['conditions'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "observedGeneration": ext.status['observedGeneration'],
                    "url": ext.status['url'],
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    fluxcdHelmRepository: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmrepositories', args['name'])
            const ext = res.body as FluxcdHelmRepository
            return {
                metadata: getMetadata(ext.metadata),
                "accessFrom": ext.spec['accessFrom'],
                "interval": ext.spec['interval'],
                "passCredentials": ext.spec['passCredentials'],
                "provider": ext.spec['provider'],
                "secretRef": ext.spec['secretRef'],
                "suspend": ext.spec['suspend'],
                "timeout": ext.spec['timeout'],
                "type": ext.spec['type'],
                "url": ext.spec['url'],
                status: ext.status==undefined?null:{
                    "artifact": ext.status['artifact'],
                    "conditions": ext.status['conditions'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "observedGeneration": ext.status['observedGeneration'],
                    "url": ext.status['url'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
