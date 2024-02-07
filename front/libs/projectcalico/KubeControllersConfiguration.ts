import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { KubeControllersConfigurationListExcludes, KubeControllersConfigurationReadExcludes, KubeControllersConfigurationSimpleExcludes } from './custom.js'
import { extraKubeControllersConfigurationColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const KubeControllersConfigurationColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraKubeControllersConfigurationColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);

export const KubeControllersConfigurationDefinition = {"type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"KubeControllersConfigurationSpec contains the values of the Kubernetes controllers configuration.","type":"object","required":["controllers"],"properties":{"controllers":{"description":"Controllers enables and configures individual Kubernetes controllers","type":"object","properties":{"namespace":{"description":"Namespace enables and configures the namespace controller. Enabled by default, set to nil to disable.","type":"object","properties":{"reconcilerPeriod":{"description":"ReconcilerPeriod is the period to perform reconciliation with the Calico datastore. [Default: 5m]","type":"string"}}},"node":{"description":"Node enables and configures the node controller. Enabled by default, set to nil to disable.","type":"object","properties":{"hostEndpoint":{"description":"HostEndpoint controls syncing nodes to host endpoints. Disabled by default, set to nil to disable.","type":"object","properties":{"autoCreate":{"description":"AutoCreate enables automatic creation of host endpoints for every node. [Default: Disabled]","type":"string"}}},"leakGracePeriod":{"description":"LeakGracePeriod is the period used by the controller to determine if an IP address has been leaked. Set to 0 to disable IP garbage collection. [Default: 15m]","type":"string"},"reconcilerPeriod":{"description":"ReconcilerPeriod is the period to perform reconciliation with the Calico datastore. [Default: 5m]","type":"string"},"syncLabels":{"description":"SyncLabels controls whether to copy Kubernetes node labels to Calico nodes. [Default: Enabled]","type":"string"}}},"policy":{"description":"Policy enables and configures the policy controller. Enabled by default, set to nil to disable.","type":"object","properties":{"reconcilerPeriod":{"description":"ReconcilerPeriod is the period to perform reconciliation with the Calico datastore. [Default: 5m]","type":"string"}}},"serviceAccount":{"description":"ServiceAccount enables and configures the service account controller. Enabled by default, set to nil to disable.","type":"object","properties":{"reconcilerPeriod":{"description":"ReconcilerPeriod is the period to perform reconciliation with the Calico datastore. [Default: 5m]","type":"string"}}},"workloadEndpoint":{"description":"WorkloadEndpoint enables and configures the workload endpoint controller. Enabled by default, set to nil to disable.","type":"object","properties":{"reconcilerPeriod":{"description":"ReconcilerPeriod is the period to perform reconciliation with the Calico datastore. [Default: 5m]","type":"string"}}}}},"debugProfilePort":{"description":"DebugProfilePort configures the port to serve memory and cpu profiles on. If not specified, profiling is disabled.","type":"integer","format":"int32"},"etcdV3CompactionPeriod":{"description":"EtcdV3CompactionPeriod is the period between etcdv3 compaction requests. Set to 0 to disable. [Default: 10m]","type":"string"},"healthChecks":{"description":"HealthChecks enables or disables support for health checks [Default: Enabled]","type":"string"},"logSeverityScreen":{"description":"LogSeverityScreen is the log severity above which logs are sent to the stdout. [Default: Info]","type":"string"},"prometheusMetricsPort":{"description":"PrometheusMetricsPort is the TCP port that the Prometheus metrics server should bind to. Set to 0 to disable. [Default: 9094]","type":"integer"}}},"status":{"description":"KubeControllersConfigurationStatus represents the status of the configuration. It's useful for admins to be able to see the actual config that was applied, which can be modified by environment variables on the kube-controllers process.","type":"object","properties":{"environmentVars":{"description":"EnvironmentVars contains the environment variables on the kube-controllers that influenced the RunningConfig.","type":"object","additionalProperties":{"type":"string"}},"runningConfig":{"description":"RunningConfig contains the effective config that is running in the kube-controllers pod, after merging the API resource with any environment variables.","type":"object","required":["controllers"],"properties":{"controllers":{"description":"Controllers enables and configures individual Kubernetes controllers","type":"object","properties":{"namespace":{"description":"Namespace enables and configures the namespace controller. Enabled by default, set to nil to disable.","type":"object","properties":{"reconcilerPeriod":{"description":"ReconcilerPeriod is the period to perform reconciliation with the Calico datastore. [Default: 5m]","type":"string"}}},"node":{"description":"Node enables and configures the node controller. Enabled by default, set to nil to disable.","type":"object","properties":{"hostEndpoint":{"description":"HostEndpoint controls syncing nodes to host endpoints. Disabled by default, set to nil to disable.","type":"object","properties":{"autoCreate":{"description":"AutoCreate enables automatic creation of host endpoints for every node. [Default: Disabled]","type":"string"}}},"leakGracePeriod":{"description":"LeakGracePeriod is the period used by the controller to determine if an IP address has been leaked. Set to 0 to disable IP garbage collection. [Default: 15m]","type":"string"},"reconcilerPeriod":{"description":"ReconcilerPeriod is the period to perform reconciliation with the Calico datastore. [Default: 5m]","type":"string"},"syncLabels":{"description":"SyncLabels controls whether to copy Kubernetes node labels to Calico nodes. [Default: Enabled]","type":"string"}}},"policy":{"description":"Policy enables and configures the policy controller. Enabled by default, set to nil to disable.","type":"object","properties":{"reconcilerPeriod":{"description":"ReconcilerPeriod is the period to perform reconciliation with the Calico datastore. [Default: 5m]","type":"string"}}},"serviceAccount":{"description":"ServiceAccount enables and configures the service account controller. Enabled by default, set to nil to disable.","type":"object","properties":{"reconcilerPeriod":{"description":"ReconcilerPeriod is the period to perform reconciliation with the Calico datastore. [Default: 5m]","type":"string"}}},"workloadEndpoint":{"description":"WorkloadEndpoint enables and configures the workload endpoint controller. Enabled by default, set to nil to disable.","type":"object","properties":{"reconcilerPeriod":{"description":"ReconcilerPeriod is the period to perform reconciliation with the Calico datastore. [Default: 5m]","type":"string"}}}}},"debugProfilePort":{"description":"DebugProfilePort configures the port to serve memory and cpu profiles on. If not specified, profiling is disabled.","type":"integer","format":"int32"},"etcdV3CompactionPeriod":{"description":"EtcdV3CompactionPeriod is the period between etcdv3 compaction requests. Set to 0 to disable. [Default: 10m]","type":"string"},"healthChecks":{"description":"HealthChecks enables or disables support for health checks [Default: Enabled]","type":"string"},"logSeverityScreen":{"description":"LogSeverityScreen is the log severity above which logs are sent to the stdout. [Default: Info]","type":"string"},"prometheusMetricsPort":{"description":"PrometheusMetricsPort is the TCP port that the Prometheus metrics server should bind to. Set to 0 to disable. [Default: 9094]","type":"integer"}}}}}},"x-kubernetes-group-version-kind":[{"group":"crd.projectcalico.org","kind":"KubeControllersConfiguration","version":"v1"}]};

export function useKubeControllersConfiguration() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "spec": '',
      }
  });
  const editor = ref({
      tab: 'simple',
      yaml: '',
      obj: {},
      setKey: (key, o) => {editor.value.obj[key] = o;editor.value.yaml = stringify(editor.value.obj)},
      ready: false,
      setYaml: (y) => {editor.value.yaml = y;editor.value.obj = parse(y);},
//      updateFromQuery: (res: object, obj: object) => {editor.value.ready=false;if(!res['loading']){editor.value.setSpec(obj);editor.value.ready=true;}},
  });
  return {
    editor, viewer, viewerUpdate: (obj) => {
      viewer.value.full=gqlDataToYaml(obj)
      viewer.value.props["spec"]=gqlDataToYaml({"spec": obj["spec"]})
    },
    navigation: useNavigationStoreRef(),
    onlyReadProperties: (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["spec","status"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    },
    onlyWriteProperties: (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["spec"].includes(k))
          res[k] = obj[k];
      })
      return res
    },
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotKubeControllersConfigurationFound: (res) => {
    if ( !res.loading && res.data.projectcalicoKubeControllersConfiguration == null) {
        const matched = router.currentRoute.value.matched
        notifyError('KubeControllersConfiguration not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (name) => router.push({ name: 'projectcalicoKubeControllersConfigurationView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'projectcalicoKubeControllersConfigurationView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'projectcalicoKubeControllersConfigurationEdit', params: {name}}),
    deleteDone: () => notifySuccess('Deletion proceded'),
    deleteError: (err) => {
      notifyError('Deletion failed');
      console.log('deletion error',err);
    },
    patchDone: () => {
      notifySuccess('Modification applied');
      router.go(-1);
    },
    patchError: (err) => {
      notifyError('Modification failed');
      console.log('mutation error', err)
    },
    actionNew: ()    => router.push({ name: 'projectcalicoKubeControllersConfigurationCreate'}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> KubeControllersConfiguration <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name});
      })
    },
  }
}