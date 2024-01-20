import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoKubeControllersConfiguration } from './type.KubeControllersConfiguration.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoKubeControllersConfiguration: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['controllers'] = args['spec']['controllers'];
        if (args['spec']['debugProfilePort'] !== undefined && typeof args['spec']['debugProfilePort'] == 'number') spec['debugProfilePort'] = args['spec']['debugProfilePort'];
        if (args['spec']['etcdV3CompactionPeriod'] !== undefined && typeof args['spec']['etcdV3CompactionPeriod'] == 'string') spec['etcdV3CompactionPeriod'] = args['spec']['etcdV3CompactionPeriod'];
        if (args['spec']['healthChecks'] !== undefined && typeof args['spec']['healthChecks'] == 'string') spec['healthChecks'] = args['spec']['healthChecks'];
        if (args['spec']['logSeverityScreen'] !== undefined && typeof args['spec']['logSeverityScreen'] == 'string') spec['logSeverityScreen'] = args['spec']['logSeverityScreen'];
        if (args['spec']['prometheusMetricsPort'] !== undefined && typeof args['spec']['prometheusMetricsPort'] == 'number') spec['prometheusMetricsPort'] = args['spec']['prometheusMetricsPort'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'KubeControllersConfiguration',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','kubecontrollersconfigurations', payload)
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
    patchProjectcalicoKubeControllersConfiguration: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['controllers'] = args['spec']['controllers'];
        if (args['spec']['debugProfilePort'] !== undefined && typeof args['spec']['debugProfilePort'] == 'number') spec['debugProfilePort'] = args['spec']['debugProfilePort'];
        if (args['spec']['etcdV3CompactionPeriod'] !== undefined && typeof args['spec']['etcdV3CompactionPeriod'] == 'string') spec['etcdV3CompactionPeriod'] = args['spec']['etcdV3CompactionPeriod'];
        if (args['spec']['healthChecks'] !== undefined && typeof args['spec']['healthChecks'] == 'string') spec['healthChecks'] = args['spec']['healthChecks'];
        if (args['spec']['logSeverityScreen'] !== undefined && typeof args['spec']['logSeverityScreen'] == 'string') spec['logSeverityScreen'] = args['spec']['logSeverityScreen'];
        if (args['spec']['prometheusMetricsPort'] !== undefined && typeof args['spec']['prometheusMetricsPort'] == 'number') spec['prometheusMetricsPort'] = args['spec']['prometheusMetricsPort'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'KubeControllersConfiguration',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','kubecontrollersconfigurations', args['name'])
            const extGet = resGet.body as ProjectcalicoKubeControllersConfiguration
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','kubecontrollersconfigurations', args['name'], payload, undefined, undefined, undefined, options)
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
    deleteProjectcalicoKubeControllersConfiguration: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','kubecontrollersconfigurations', args['name'])
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
