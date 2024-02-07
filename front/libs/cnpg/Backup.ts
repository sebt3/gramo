import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { BackupListExcludes, BackupReadExcludes, BackupSimpleExcludes } from './custom.js'
import { extraBackupColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const BackupColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraBackupColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const BackupAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(BackupColumns);

export const BackupDefinition = {"description":"Backup is the Schema for the backups API","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"Specification of the desired behavior of the backup. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status","type":"object","properties":{"cluster":{"description":"The cluster to backup","type":"object","required":["name"],"properties":{"name":{"description":"Name of the referent.","type":"string"}}},"target":{"description":"The policy to decide which instance should perform this backup. If empty, it defaults to `cluster.spec.backup.target`. Available options are empty string, `primary` and `prefer-standby`. `primary` to have backups run always on primary instances, `prefer-standby` to have backups run preferably on the most updated standby, if available.","type":"string","enum":["primary","prefer-standby"]}}},"status":{"description":"Most recently observed status of the backup. This data may not be up to date. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status","type":"object","properties":{"azureCredentials":{"description":"The credentials to use to upload data to Azure Blob Storage","type":"object","properties":{"connectionString":{"description":"The connection string to be used","type":"object","required":["key","name"],"properties":{"key":{"description":"The key to select","type":"string"},"name":{"description":"Name of the referent.","type":"string"}}},"inheritFromAzureAD":{"description":"Use the Azure AD based authentication without providing explicitly the keys.","type":"boolean"},"storageAccount":{"description":"The storage account where to upload data","type":"object","required":["key","name"],"properties":{"key":{"description":"The key to select","type":"string"},"name":{"description":"Name of the referent.","type":"string"}}},"storageKey":{"description":"The storage account key to be used in conjunction with the storage account name","type":"object","required":["key","name"],"properties":{"key":{"description":"The key to select","type":"string"},"name":{"description":"Name of the referent.","type":"string"}}},"storageSasToken":{"description":"A shared-access-signature to be used in conjunction with the storage account name","type":"object","required":["key","name"],"properties":{"key":{"description":"The key to select","type":"string"},"name":{"description":"Name of the referent.","type":"string"}}}}},"backupId":{"description":"The ID of the Barman backup","type":"string"},"backupName":{"description":"The Name of the Barman backup","type":"string"},"beginLSN":{"description":"The starting xlog","type":"string"},"beginWal":{"description":"The starting WAL","type":"string"},"commandError":{"description":"The backup command output in case of error","type":"string"},"commandOutput":{"description":"Unused. Retained for compatibility with old versions.","type":"string"},"destinationPath":{"description":"The path where to store the backup (i.e. s3://bucket/path/to/folder) this path, with different destination folders, will be used for WALs and for data. This may not be populated in case of errors.","type":"string"},"encryption":{"description":"Encryption method required to S3 API","type":"string"},"endLSN":{"description":"The ending xlog","type":"string"},"endWal":{"description":"The ending WAL","type":"string"},"endpointCA":{"description":"EndpointCA store the CA bundle of the barman endpoint. Useful when using self-signed certificates to avoid errors with certificate issuer and barman-cloud-wal-archive.","type":"object","required":["key","name"],"properties":{"key":{"description":"The key to select","type":"string"},"name":{"description":"Name of the referent.","type":"string"}}},"endpointURL":{"description":"Endpoint to be used to upload data to the cloud, overriding the automatic endpoint discovery","type":"string"},"error":{"description":"The detected error","type":"string"},"googleCredentials":{"description":"The credentials to use to upload data to Google Cloud Storage","type":"object","properties":{"applicationCredentials":{"description":"The secret containing the Google Cloud Storage JSON file with the credentials","type":"object","required":["key","name"],"properties":{"key":{"description":"The key to select","type":"string"},"name":{"description":"Name of the referent.","type":"string"}}},"gkeEnvironment":{"description":"If set to true, will presume that it's running inside a GKE environment, default to false.","type":"boolean"}}},"instanceID":{"description":"Information to identify the instance where the backup has been taken from","type":"object","properties":{"ContainerID":{"description":"The container ID","type":"string"},"podName":{"description":"The pod name","type":"string"}}},"phase":{"description":"The last backup status","type":"string"},"s3Credentials":{"description":"The credentials to use to upload data to S3","type":"object","properties":{"accessKeyId":{"description":"The reference to the access key id","type":"object","required":["key","name"],"properties":{"key":{"description":"The key to select","type":"string"},"name":{"description":"Name of the referent.","type":"string"}}},"inheritFromIAMRole":{"description":"Use the role based authentication without providing explicitly the keys.","type":"boolean"},"region":{"description":"The reference to the secret containing the region name","type":"object","required":["key","name"],"properties":{"key":{"description":"The key to select","type":"string"},"name":{"description":"Name of the referent.","type":"string"}}},"secretAccessKey":{"description":"The reference to the secret access key","type":"object","required":["key","name"],"properties":{"key":{"description":"The key to select","type":"string"},"name":{"description":"Name of the referent.","type":"string"}}},"sessionToken":{"description":"The references to the session key","type":"object","required":["key","name"],"properties":{"key":{"description":"The key to select","type":"string"},"name":{"description":"Name of the referent.","type":"string"}}}}},"serverName":{"description":"The server name on S3, the cluster name is used if this parameter is omitted","type":"string"},"startedAt":{"description":"When the backup was started","type":"string","format":"date-time"},"stoppedAt":{"description":"When the backup was terminated","type":"string","format":"date-time"}}}},"x-kubernetes-group-version-kind":[{"group":"postgresql.cnpg.io","kind":"Backup","version":"v1"}]};

export function useBackup() {
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
    onNotBackupFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].cnpgBackup == null) {
        const matched = router.currentRoute.value.matched
        notifyError('Backup not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'cnpgBackupView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'cnpgBackupView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'cnpgBackupEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'cnpgBackupCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> Backup <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}