import { QTableColumn } from 'quasar'
import { ref, gqlDataToYaml, tableColumnAlign, useCore, useNavigationStoreRef } from '../core'
export { ref, useCore, useQuery, useMutation, sanitizeData, getProperties } from '../core';
export { PrometheusRuleListExcludes, PrometheusRuleReadExcludes, PrometheusRuleSimpleExcludes } from './custom.js'
import { extraPrometheusRuleColumns } from './custom.js'
import { stringify, parse } from 'yaml'

export const PrometheusRuleColumns:Array<QTableColumn> = ([
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(extraPrometheusRuleColumns).concat([
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
]);
export const PrometheusRuleAllColumns = ([
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left}
] as Array<QTableColumn>).concat(PrometheusRuleColumns);

export const PrometheusRuleDefinition = {"description":"PrometheusRule defines recording and alerting rules for a Prometheus instance","type":"object","required":["spec"],"properties":{"apiVersion":{"description":"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources","type":"string"},"kind":{"description":"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds","type":"string"},"spec":{"description":"Specification of desired alerting rule definitions for Prometheus.","type":"object","properties":{"groups":{"description":"Content of Prometheus rule file","type":"array","items":{"description":"RuleGroup is a list of sequentially evaluated recording and alerting rules.","type":"object","required":["name"],"properties":{"interval":{"description":"Interval determines how often rules in the group are evaluated.","type":"string","pattern":"^(0|(([0-9]+)y)?(([0-9]+)w)?(([0-9]+)d)?(([0-9]+)h)?(([0-9]+)m)?(([0-9]+)s)?(([0-9]+)ms)?)$"},"limit":{"description":"Limit the number of alerts an alerting rule and series a recording rule can produce. Limit is supported starting with Prometheus >= 2.31 and Thanos Ruler >= 0.24.","type":"integer"},"name":{"description":"Name of the rule group.","type":"string","minLength":1},"partial_response_strategy":{"description":"PartialResponseStrategy is only used by ThanosRuler and will be ignored by Prometheus instances. More info: https://github.com/thanos-io/thanos/blob/main/docs/components/rule.md#partial-response","type":"string","pattern":"^(?i)(abort|warn)?$"},"rules":{"description":"List of alerting and recording rules.","type":"array","items":{"description":"Rule describes an alerting or recording rule See Prometheus documentation: [alerting](https://www.prometheus.io/docs/prometheus/latest/configuration/alerting_rules/) or [recording](https://www.prometheus.io/docs/prometheus/latest/configuration/recording_rules/#recording-rules) rule","type":"object","required":["expr"],"properties":{"alert":{"description":"Name of the alert. Must be a valid label value. Only one of `record` and `alert` must be set.","type":"string"},"annotations":{"description":"Annotations to add to each alert. Only valid for alerting rules.","type":"object","additionalProperties":{"type":"string"}},"expr":{"description":"PromQL expression to evaluate.","x-kubernetes-int-or-string":true},"for":{"description":"Alerts are considered firing once they have been returned for this long.","type":"string","pattern":"^(0|(([0-9]+)y)?(([0-9]+)w)?(([0-9]+)d)?(([0-9]+)h)?(([0-9]+)m)?(([0-9]+)s)?(([0-9]+)ms)?)$"},"keep_firing_for":{"description":"KeepFiringFor defines how long an alert will continue firing after the condition that triggered it has cleared.","type":"string","minLength":1,"pattern":"^(0|(([0-9]+)y)?(([0-9]+)w)?(([0-9]+)d)?(([0-9]+)h)?(([0-9]+)m)?(([0-9]+)s)?(([0-9]+)ms)?)$"},"labels":{"description":"Labels to add or overwrite.","type":"object","additionalProperties":{"type":"string"}},"record":{"description":"Name of the time series to output to. Must be a valid metric name. Only one of `record` and `alert` must be set.","type":"string"}}}}}},"x-kubernetes-list-map-keys":["name"],"x-kubernetes-list-type":"map"}}}},"x-kubernetes-group-version-kind":[{"group":"monitoring.coreos.com","kind":"PrometheusRule","version":"v1"}]};

export function usePrometheusRule() {
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
        if (["spec"].includes(k)||k=='metadata')
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
    onNotPrometheusRuleFound: (res) => {
    if ( !res.loading && res.data.k8sNamespace[0].monitoringPrometheusRule == null) {
        const matched = router.currentRoute.value.matched
        notifyError('PrometheusRule not found');
        router.push({
          path: matched[matched.length>1?matched.length-2:matched.length-1].path,
          replace: true
        })
      }
    },
    toView: (namespace, name) => router.push({ name: 'monitoringPrometheusRuleView', params: {name, namespace}}),
    toViewReloaded: async (namespace, name) => {await router.push({ name: 'monitoringPrometheusRuleView', params: {name, namespace}});router.go(0);},
    toEdit: (namespace, name) => router.push({ name: 'monitoringPrometheusRuleEdit', params: {name, namespace}}),
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
    actionNew: (namespace)    => router.push({ name: 'monitoringPrometheusRuleCreate', params: {namespace}}),
    actionDelete: (deletor, meta) => {
      $q.dialog({
        title: 'Confirm <span class="text-red">delete</span>',
        message: `<em>You are</em> about to <span class="text-red">delete</span> PrometheusRule <strong>${meta.name}</strong>`,
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        notifyWorking('Delete in progress');
        deletor({"name": meta.name, "namespace":meta.namespace});
      })
    },
  }
}