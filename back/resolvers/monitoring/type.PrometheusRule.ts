type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MonitoringPrometheusRuleSpecGroupsItemRulesItemAnnotations {
}
export interface MonitoringPrometheusRuleSpecGroupsItemRulesItemLabels {
}
export interface MonitoringPrometheusRuleSpecGroupsItemRulesItem {
  "alert": string | undefined
  "annotations": MonitoringPrometheusRuleSpecGroupsItemRulesItemAnnotations | undefined
  "expr": object
  "for": string | undefined
  "labels": MonitoringPrometheusRuleSpecGroupsItemRulesItemLabels | undefined
  "record": string | undefined
}
export interface MonitoringPrometheusRuleSpecGroupsItem {
  "interval": string | undefined
  "limit": number | undefined
  "name": string
  "partial_response_strategy": string | undefined
  "rules": Array<MonitoringPrometheusRuleSpecGroupsItemRulesItem> | undefined
}
export interface MonitoringPrometheusRuleSpec {
  "groups": Array<MonitoringPrometheusRuleSpecGroupsItem> | undefined
}
export interface MonitoringPrometheusRule extends KubernetesObject {
  spec: MonitoringPrometheusRuleSpec
}
export type MonitoringPrometheusRuleList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MonitoringPrometheusRule>
