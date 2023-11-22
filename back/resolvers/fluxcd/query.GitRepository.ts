import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdGitRepositoryList, FluxcdGitRepository } from './type.GitRepository.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const queries = {
    fluxcdGitRepositorys: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('source.toolkit.fluxcd.io','v1',args['namespace'],'gitrepositories')
            const resList = res.body as FluxcdGitRepositoryList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                ignore: ext.spec.ignore,
                include: ext.spec.include,
                interval: ext.spec.interval,
                recurseSubmodules: ext.spec.recurseSubmodules,
                ref: ext.spec.ref,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                url: ext.spec.url,
                verify: ext.spec.verify,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    includedArtifacts: ext.status.includedArtifacts,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    observedIgnore: ext.status.observedIgnore,
                    observedInclude: ext.status.observedInclude,
                    observedRecurseSubmodules: ext.status.observedRecurseSubmodules,
                }
            }})
        } catch (err) {
          console.error(err);
        }
        return []
    },
    fluxcdGitRepository: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1',args['namespace'],'gitrepositories', args['name'])
            const ext = res.body as FluxcdGitRepository
            return {
                metadata: getMetadata(ext.metadata),
                ignore: ext.spec.ignore,
                include: ext.spec.include,
                interval: ext.spec.interval,
                recurseSubmodules: ext.spec.recurseSubmodules,
                ref: ext.spec.ref,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                url: ext.spec.url,
                verify: ext.spec.verify,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    includedArtifacts: ext.status.includedArtifacts,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    observedIgnore: ext.status.observedIgnore,
                    observedInclude: ext.status.observedInclude,
                    observedRecurseSubmodules: ext.status.observedRecurseSubmodules,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
};
