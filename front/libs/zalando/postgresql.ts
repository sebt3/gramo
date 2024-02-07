import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { postgresqlListExcludes, postgresqlReadExcludes, postgresqlSimpleExcludes } from './custom.js'
import { extrapostgresqlColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const postgresqlColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extrapostgresqlColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const postgresqlAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(postgresqlColumns);

export const postgresqlDefinition = {"type":"object","required":["kind","apiVersion","spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"type":"object","required":["numberOfInstances","teamId","postgresql","volume"],"properties":{"additionalVolumes":{"type":"array","items":{"type":"object","required":["name","mountPath","volumeSource"],"properties":{"mountPath":{"type":"string"},"name":{"type":"string"},"subPath":{"type":"string"},"targetContainers":{},"volumeSource":{"x-kubernetes-preserve-unknown-fields":true}}}},"allowedSourceRanges":{},"clone":{"type":"object","required":["cluster"],"properties":{"cluster":{"type":"string"},"s3_access_key_id":{"type":"string"},"s3_endpoint":{"type":"string"},"s3_force_path_style":{"type":"boolean"},"s3_secret_access_key":{"type":"string"},"s3_wal_path":{"type":"string"},"timestamp":{"type":"string","pattern":"^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\\.[0-9]+)?(([+-]([01][0-9]|2[0-3]):[0-5][0-9]))$"},"uid":{"type":"string","format":"uuid"}}},"connectionPooler":{"type":"object","properties":{"dockerImage":{"type":"string"},"maxDBConnections":{"type":"integer"},"mode":{"type":"string","enum":["session","transaction"]},"numberOfInstances":{"type":"integer","minimum":1},"resources":{"type":"object","properties":{"limits":{"type":"object","properties":{"cpu":{"type":"string","pattern":"^(\\d+m|\\d+(\\.\\d{1,3})?)$"},"memory":{"type":"string","pattern":"^(\\d+(e\\d+)?|\\d+(\\.\\d+)?(e\\d+)?[EPTGMK]i?)$"}}},"requests":{"type":"object","properties":{"cpu":{"type":"string","pattern":"^(\\d+m|\\d+(\\.\\d{1,3})?)$"},"memory":{"type":"string","pattern":"^(\\d+(e\\d+)?|\\d+(\\.\\d+)?(e\\d+)?[EPTGMK]i?)$"}}}}},"schema":{"type":"string"},"user":{"type":"string"}}},"databases":{"type":"object","additionalProperties":{"type":"string"}},"dockerImage":{"type":"string"},"enableConnectionPooler":{"type":"boolean"},"enableLogicalBackup":{"type":"boolean"},"enableMasterLoadBalancer":{"type":"boolean"},"enableMasterPoolerLoadBalancer":{"type":"boolean"},"enableReplicaConnectionPooler":{"type":"boolean"},"enableReplicaLoadBalancer":{"type":"boolean"},"enableReplicaPoolerLoadBalancer":{"type":"boolean"},"enableShmVolume":{"type":"boolean"},"env":{},"initContainers":{},"init_containers":{"description":"deprecated"},"logicalBackupSchedule":{"type":"string","pattern":"^(\\d+|\\*)(/\\d+)?(\\s+(\\d+|\\*)(/\\d+)?){4}$"},"maintenanceWindows":{"type":"array","items":{"type":"string","pattern":"^\\ *((Mon|Tue|Wed|Thu|Fri|Sat|Sun):(2[0-3]|[01]?\\d):([0-5]?\\d)|(2[0-3]|[01]?\\d):([0-5]?\\d))-((Mon|Tue|Wed|Thu|Fri|Sat|Sun):(2[0-3]|[01]?\\d):([0-5]?\\d)|(2[0-3]|[01]?\\d):([0-5]?\\d))\\ *$"}},"nodeAffinity":{"type":"object","properties":{"preferredDuringSchedulingIgnoredDuringExecution":{"type":"array","items":{"type":"object","required":["preference","weight"],"properties":{"preference":{"type":"object","properties":{"matchExpressions":{"type":"array","items":{"type":"object","required":["key","operator"],"properties":{"key":{"type":"string"},"operator":{"type":"string"},"values":{"type":"array","items":{"type":"string"}}}}},"matchFields":{"type":"array","items":{"type":"object","required":["key","operator"],"properties":{"key":{"type":"string"},"operator":{"type":"string"},"values":{"type":"array","items":{"type":"string"}}}}}}},"weight":{"type":"integer","format":"int32"}}}},"requiredDuringSchedulingIgnoredDuringExecution":{"type":"object","required":["nodeSelectorTerms"],"properties":{"nodeSelectorTerms":{"type":"array","items":{"type":"object","properties":{"matchExpressions":{"type":"array","items":{"type":"object","required":["key","operator"],"properties":{"key":{"type":"string"},"operator":{"type":"string"},"values":{"type":"array","items":{"type":"string"}}}}},"matchFields":{"type":"array","items":{"type":"object","required":["key","operator"],"properties":{"key":{"type":"string"},"operator":{"type":"string"},"values":{"type":"array","items":{"type":"string"}}}}}}}}}}}},"numberOfInstances":{"type":"integer","minimum":0},"patroni":{"type":"object","properties":{"failsafe_mode":{"type":"boolean"},"initdb":{"type":"object","additionalProperties":{"type":"string"}},"loop_wait":{"type":"integer"},"maximum_lag_on_failover":{"type":"integer"},"pg_hba":{"type":"array","items":{"type":"string"}},"retry_timeout":{"type":"integer"},"slots":{"type":"object","additionalProperties":{"type":"object","additionalProperties":{"type":"string"}}},"synchronous_mode":{"type":"boolean"},"synchronous_mode_strict":{"type":"boolean"},"synchronous_node_count":{"type":"integer"},"ttl":{"type":"integer"}}},"podAnnotations":{"type":"object","additionalProperties":{"type":"string"}},"podPriorityClassName":{"type":"string"},"pod_priority_class_name":{"description":"deprecated","type":"string"},"postgresql":{"type":"object","required":["version"],"properties":{"parameters":{"type":"object","additionalProperties":{"type":"string"}},"version":{"type":"string","enum":["10","11","12","13","14","15"]}}},"preparedDatabases":{"type":"object","additionalProperties":{"type":"object","properties":{"defaultUsers":{"type":"boolean"},"extensions":{"type":"object","additionalProperties":{"type":"string"}},"schemas":{"type":"object","additionalProperties":{"type":"object","properties":{"defaultRoles":{"type":"boolean"},"defaultUsers":{"type":"boolean"}}}},"secretNamespace":{"type":"string"}}}},"replicaLoadBalancer":{"description":"deprecated","type":"boolean"},"resources":{"type":"object","properties":{"limits":{"type":"object","properties":{"cpu":{"type":"string","pattern":"^(\\d+m|\\d+(\\.\\d{1,3})?)$"},"memory":{"type":"string","pattern":"^(\\d+(e\\d+)?|\\d+(\\.\\d+)?(e\\d+)?[EPTGMK]i?)$"}}},"requests":{"type":"object","properties":{"cpu":{"type":"string","pattern":"^(\\d+m|\\d+(\\.\\d{1,3})?)$"},"memory":{"type":"string","pattern":"^(\\d+(e\\d+)?|\\d+(\\.\\d+)?(e\\d+)?[EPTGMK]i?)$"}}}}},"schedulerName":{"type":"string"},"serviceAnnotations":{"type":"object","additionalProperties":{"type":"string"}},"sidecars":{},"spiloFSGroup":{"type":"integer"},"spiloRunAsGroup":{"type":"integer"},"spiloRunAsUser":{"type":"integer"},"standby":{"type":"object","properties":{"gs_wal_path":{"type":"string"},"s3_wal_path":{"type":"string"},"standby_host":{"type":"string"},"standby_port":{"type":"string"}}},"streams":{"type":"array","items":{"type":"object","required":["applicationId","database","tables"],"properties":{"applicationId":{"type":"string"},"batchSize":{"type":"integer"},"database":{"type":"string"},"filter":{"type":"object","additionalProperties":{"type":"string"}},"tables":{"type":"object","additionalProperties":{"type":"object","required":["eventType"],"properties":{"eventType":{"type":"string"},"idColumn":{"type":"string"},"payloadColumn":{"type":"string"}}}}}}},"teamId":{"type":"string"},"tls":{"type":"object","required":["secretName"],"properties":{"caFile":{"type":"string"},"caSecretName":{"type":"string"},"certificateFile":{"type":"string"},"privateKeyFile":{"type":"string"},"secretName":{"type":"string"}}},"tolerations":{"type":"array","items":{"type":"object","properties":{"effect":{"type":"string","enum":["NoExecute","NoSchedule","PreferNoSchedule"]},"key":{"type":"string"},"operator":{"type":"string","enum":["Equal","Exists"]},"tolerationSeconds":{"type":"integer"},"value":{"type":"string"}}}},"useLoadBalancer":{"description":"deprecated","type":"boolean"},"users":{"type":"object","additionalProperties":{}},"usersWithInPlaceSecretRotation":{},"usersWithSecretRotation":{},"volume":{"type":"object","required":["size"],"properties":{"iops":{"type":"integer"},"selector":{"type":"object","properties":{"matchExpressions":{"type":"array","items":{"type":"object","required":["key","operator"],"properties":{"key":{"type":"string"},"operator":{"type":"string","enum":["DoesNotExist","Exists","In","NotIn"]},"values":{"type":"array","items":{"type":"string"}}}}},"matchLabels":{"x-kubernetes-preserve-unknown-fields":true}}},"size":{"type":"string","pattern":"^(\\d+(e\\d+)?|\\d+(\\.\\d+)?(e\\d+)?[EPTGMK]i?)$"},"storageClass":{"type":"string"},"subPath":{"type":"string"},"throughput":{"type":"integer"}}}}},"status":{"type":"object","additionalProperties":{"type":"string"}}},"x-kubernetes-group-version-kind":[{"group":"acid.zalan.do","kind":"postgresql","version":"v1"}]};

export function usepostgresql() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute } = useCore();
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
    isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute,
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotpostgresqlFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].zalandopostgresql == null) {
        const matched = router.currentRoute.value.matched
        notifyError('postgresql not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'zalandopostgresqlView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'zalandopostgresqlView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'zalandopostgresqlEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'zalandopostgresqlCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> postgresql <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}