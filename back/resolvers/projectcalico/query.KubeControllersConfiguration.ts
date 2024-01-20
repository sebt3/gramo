import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoKubeControllersConfigurationList, ProjectcalicoKubeControllersConfiguration } from './type.KubeControllersConfiguration.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoKubeControllersConfigurations: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','kubecontrollersconfigurations')
            const resList = res.body as ProjectcalicoKubeControllersConfigurationList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "controllers": ext.spec['controllers'],
                "debugProfilePort": ext.spec['debugProfilePort'],
                "etcdV3CompactionPeriod": ext.spec['etcdV3CompactionPeriod'],
                "healthChecks": ext.spec['healthChecks'],
                "logSeverityScreen": ext.spec['logSeverityScreen'],
                "prometheusMetricsPort": ext.spec['prometheusMetricsPort'],
                status: ext.status==undefined?null:{
                    "environmentVars": ext.status['environmentVars'],
                    "runningConfig": ext.status['runningConfig'],
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoKubeControllersConfigurations: lists.projectcalicoKubeControllersConfigurations,
    projectcalicoKubeControllersConfiguration: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','kubecontrollersconfigurations', args['name'])
            const ext = res.body as ProjectcalicoKubeControllersConfiguration
            return {
                metadata: getMetadata(ext.metadata, ext),
                "controllers": ext.spec['controllers'],
                "debugProfilePort": ext.spec['debugProfilePort'],
                "etcdV3CompactionPeriod": ext.spec['etcdV3CompactionPeriod'],
                "healthChecks": ext.spec['healthChecks'],
                "logSeverityScreen": ext.spec['logSeverityScreen'],
                "prometheusMetricsPort": ext.spec['prometheusMetricsPort'],
                status: ext.status==undefined?null:{
                    "environmentVars": ext.status['environmentVars'],
                    "runningConfig": ext.status['runningConfig'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
