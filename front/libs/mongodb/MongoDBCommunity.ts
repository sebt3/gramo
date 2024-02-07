import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { MongoDBCommunityListExcludes, MongoDBCommunityReadExcludes, MongoDBCommunitySimpleExcludes } from './custom.js'
import { extraMongoDBCommunityColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const MongoDBCommunityColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraMongoDBCommunityColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const MongoDBCommunityAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(MongoDBCommunityColumns);

export const MongoDBCommunityDefinition = {"description":"MongoDBCommunity is the Schema for the mongodbs API","type":"object","properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"MongoDBCommunitySpec defines the desired state of MongoDB","type":"object","required":["security","type","users"],"properties":{"additionalMongodConfig":{"description":"AdditionalMongodConfig is additional configuration that can be passed to each data-bearing mongod at runtime. Uses the same structure as the mongod configuration file: https://www.mongodb.com/docs/manual/reference/configuration-options/","x-kubernetes-preserve-unknown-fields":true},"arbiters":{"description":"Arbiters is the number of arbiters to add to the Replica Set. It is not recommended to have more than one arbiter per Replica Set. More info: https://www.mongodb.com/docs/manual/tutorial/add-replica-set-arbiter/","type":"integer"},"automationConfig":{"description":"AutomationConfigOverride is merged on top of the operator created automation config. Processes are merged by name. Currently Only the process.disabled field is supported.","type":"object","required":["processes"],"properties":{"processes":{"type":"array","items":{"description":"OverrideProcess contains fields that we can override on the AutomationConfig processes.","type":"object","required":["disabled","name"],"properties":{"disabled":{"type":"boolean"},"name":{"type":"string"}}}}}},"featureCompatibilityVersion":{"description":"FeatureCompatibilityVersion configures the feature compatibility version that will be set for the deployment","type":"string"},"members":{"description":"Members is the number of members in the replica set","type":"integer"},"prometheus":{"description":"Prometheus configurations.","type":"object","required":["passwordSecretRef","username"],"properties":{"metricsPath":{"description":"Indicates path to the metrics endpoint.","type":"string","pattern":"^\\/[a-z0-9]+$"},"passwordSecretRef":{"description":"Name of a Secret containing a HTTP Basic Auth Password.","type":"object","required":["name"],"properties":{"key":{"description":"Key is the key in the secret storing this password. Defaults to \"password\"","type":"string"},"name":{"description":"Name is the name of the secret storing this user's password","type":"string"}}},"port":{"description":"Port where metrics endpoint will bind to. Defaults to 9216.","type":"integer"},"tlsSecretKeyRef":{"description":"Name of a Secret (type kubernetes.io/tls) holding the certificates to use in the Prometheus endpoint.","type":"object","required":["name"],"properties":{"key":{"description":"Key is the key in the secret storing this password. Defaults to \"password\"","type":"string"},"name":{"description":"Name is the name of the secret storing this user's password","type":"string"}}},"username":{"description":"HTTP Basic Auth Username for metrics endpoint.","type":"string"}}},"replicaSetHorizons":{"description":"ReplicaSetHorizons Add this parameter and values if you need your database to be accessed outside of Kubernetes. This setting allows you to provide different DNS settings within the Kubernetes cluster and to the Kubernetes cluster. The Kubernetes Operator uses split horizon DNS for replica set members. This feature allows communication both within the Kubernetes cluster and from outside Kubernetes.","type":"array","items":{"type":"object","additionalProperties":{"type":"string"}}},"security":{"description":"Security configures security features, such as TLS, and authentication settings for a deployment","type":"object","properties":{"authentication":{"type":"object","required":["modes"],"properties":{"ignoreUnknownUsers":{},"modes":{"description":"Modes is an array specifying which authentication methods should be enabled.","type":"array","items":{"type":"string","enum":["SCRAM","SCRAM-SHA-256","SCRAM-SHA-1"]}}}},"roles":{"description":"User-specified custom MongoDB roles that should be configured in the deployment.","type":"array","items":{"description":"CustomRole defines a custom MongoDB role.","type":"object","required":["db","privileges","role"],"properties":{"authenticationRestrictions":{"description":"The authentication restrictions the server enforces on the role.","type":"array","items":{"description":"AuthenticationRestriction specifies a list of IP addresses and CIDR ranges users are allowed to connect to or from.","type":"object","required":["clientSource","serverAddress"],"properties":{"clientSource":{"type":"array","items":{"type":"string"}},"serverAddress":{"type":"array","items":{"type":"string"}}}}},"db":{"description":"The database of the role.","type":"string"},"privileges":{"description":"The privileges to grant the role.","type":"array","items":{"description":"Privilege defines the actions a role is allowed to perform on a given resource.","type":"object","required":["actions","resource"],"properties":{"actions":{"type":"array","items":{"type":"string"}},"resource":{"description":"Resource specifies specifies the resources upon which a privilege permits actions. See https://www.mongodb.com/docs/manual/reference/resource-document for more.","type":"object","properties":{"anyResource":{"type":"boolean"},"cluster":{"type":"boolean"},"collection":{"type":"string"},"db":{"type":"string"}}}}}},"role":{"description":"The name of the role.","type":"string"},"roles":{"description":"An array of roles from which this role inherits privileges.","type":"array","items":{"description":"Role is the database role this user should have","type":"object","required":["db","name"],"properties":{"db":{"description":"DB is the database the role can act on","type":"string"},"name":{"description":"Name is the name of the role","type":"string"}}}}}}},"tls":{"description":"TLS configuration for both client-server and server-server communication","type":"object","required":["enabled"],"properties":{"caCertificateSecretRef":{"description":"CaCertificateSecret is a reference to a Secret containing the certificate for the CA which signed the server certificates The certificate is expected to be available under the key \"ca.crt\"","type":"object","required":["name"],"properties":{"name":{"type":"string"}}},"caConfigMapRef":{"description":"CaConfigMap is a reference to a ConfigMap containing the certificate for the CA which signed the server certificates The certificate is expected to be available under the key \"ca.crt\" This field is ignored when CaCertificateSecretRef is configured","type":"object","required":["name"],"properties":{"name":{"type":"string"}}},"certificateKeySecretRef":{"description":"CertificateKeySecret is a reference to a Secret containing a private key and certificate to use for TLS. The key and cert are expected to be PEM encoded and available at \"tls.key\" and \"tls.crt\". This is the same format used for the standard \"kubernetes.io/tls\" Secret type, but no specific type is required. Alternatively, an entry tls.pem, containing the concatenation of cert and key, can be provided. If all of tls.pem, tls.crt and tls.key are present, the tls.pem one needs to be equal to the concatenation of tls.crt and tls.key","type":"object","required":["name"],"properties":{"name":{"type":"string"}}},"enabled":{"type":"boolean"},"optional":{"description":"Optional configures if TLS should be required or optional for connections","type":"boolean"}}}}},"statefulSet":{"description":"StatefulSetConfiguration holds the optional custom StatefulSet that should be merged into the operator created one.","type":"object","required":["spec"],"properties":{"spec":{"x-kubernetes-preserve-unknown-fields":true}}},"type":{"description":"Type defines which type of MongoDB deployment the resource should create","type":"string","enum":["ReplicaSet"]},"users":{"description":"Users specifies the MongoDB users that should be configured in your deployment","type":"array","items":{"type":"object","required":["name","passwordSecretRef","roles","scramCredentialsSecretName"],"properties":{"connectionStringSecretName":{"description":"ConnectionStringSecretName is the name of the secret object created by the operator which exposes the connection strings for the user. If provided, this secret must be different for each user in a deployment.","type":"string"},"db":{"description":"DB is the database the user is stored in. Defaults to \"admin\"","type":"string"},"name":{"description":"Name is the username of the user","type":"string"},"passwordSecretRef":{"description":"PasswordSecretRef is a reference to the secret containing this user's password","type":"object","required":["name"],"properties":{"key":{"description":"Key is the key in the secret storing this password. Defaults to \"password\"","type":"string"},"name":{"description":"Name is the name of the secret storing this user's password","type":"string"}}},"roles":{"description":"Roles is an array of roles assigned to this user","type":"array","items":{"description":"Role is the database role this user should have","type":"object","required":["db","name"],"properties":{"db":{"description":"DB is the database the role can act on","type":"string"},"name":{"description":"Name is the name of the role","type":"string"}}}},"scramCredentialsSecretName":{"description":"ScramCredentialsSecretName appended by string \"scram-credentials\" is the name of the secret object created by the mongoDB operator for storing SCRAM credentials These secrets names must be different for each user in a deployment.","type":"string","pattern":"^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$"}}}},"version":{"description":"Version defines which version of MongoDB will be used","type":"string"}}},"status":{"description":"MongoDBCommunityStatus defines the observed state of MongoDB","type":"object","required":["currentMongoDBMembers","currentStatefulSetReplicas","mongoUri","phase"],"properties":{"currentMongoDBArbiters":{"type":"integer"},"currentMongoDBMembers":{"type":"integer"},"currentStatefulSetArbitersReplicas":{"type":"integer"},"currentStatefulSetReplicas":{"type":"integer"},"message":{"type":"string"},"mongoUri":{"type":"string"},"phase":{"type":"string"},"version":{"type":"string"}}}},"x-kubernetes-group-version-kind":[{"group":"mongodbcommunity.mongodb.com","kind":"MongoDBCommunity","version":"v1"}]};

export function useMongoDBCommunity() {
  const { router, $q, pagination, setItemFromRoute, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking, isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute } = useCore();
  const viewer = ref({
      tab: 'simple',
      full: '',
      props: {
        "spec": '',
      }
  });
  const onlyReadProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["spec","status"].includes(k)||k=='metadata')
          res[k] = obj[k];
      })
      return res
    };
  const onlyWriteProperties = (obj) => {
      const res = {}
      Object.keys(obj).forEach(k=>{
        if (["spec"].includes(k))
          res[k] = obj[k];
      })
      return res
    };
  const editor = ref({
      tab: 'simple',
      yaml: '',
      obj: {},
      setKey: (key, o) => {editor.value.obj[key] = o;editor.value.yaml = stringify(editor.value.obj)},
      ready: false,
      setYaml: (y) => {editor.value.yaml = y;editor.value.obj = parse(y);},
      updateFromQuery: (res: object, obj: object) => {editor.value.ready=false;if(!res['loading']){editor.value.obj = onlyWriteProperties(obj);editor.value.yaml = stringify(editor.value.obj);editor.value.ready=true;}},
  });
  return {
    onlyReadProperties, onlyWriteProperties, editor, viewer, viewerUpdate: (obj) => {
      viewer.value.full=gqlDataToYaml(obj)
      viewer.value.props["spec"]=gqlDataToYaml({"spec": obj["spec"]})
    },
    navigation: useNavigationStoreRef(),
    isNamespaced, setNamespaceFromRoute, setNamespacedItemFromRoute,
    router, pagination, setItemFromRoute, notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    onNotMongoDBCommunityFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].mongodbMongoDBCommunity == null) {
        const matched = router.currentRoute.value.matched
        notifyError('MongoDBCommunity not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'mongodbMongoDBCommunityView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'mongodbMongoDBCommunityView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'mongodbMongoDBCommunityEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'mongodbMongoDBCommunityCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> MongoDBCommunity <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}