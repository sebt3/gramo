export interface unspeciedObject {
    name: string, definition: object, crd: k8sDefinitionProperties|null
}
export interface k8sObject extends unspeciedObject {
    namespaced: boolean
    gqlDefs: object
    group: string
    short: string
    sub: string
    readProperties: string[]
    resolvers: object[]
}
export interface HashMap<T> { [key: string]: T }

export interface openapiDefinitionPropertiesDef {
    description: string|undefined,
    type: string,
    title: string|undefined,
    required: Array<string>|undefined,
    items: openapiDefinitionPropertiesDef|undefined,
    properties: HashMap<openapiDefinitionPropertiesDef>|undefined
}
interface openapiDefinitionPropertiesK8s {
    apiVersion: string,
    kind: string,
    metadata: object,
    spec: openapiDefinitionPropertiesDef,
    status: openapiDefinitionPropertiesDef|undefined
}
export interface openapiDefinition {
    description: string,
    type: string,
    title: string,
    required: Array<string>,
    properties: openapiDefinitionPropertiesK8s
}
export interface openapi { paths: object, definitions: HashMap<openapiDefinition> }

interface k8sDefinitionPropertiesNames {
    plural: string,
    singular: string,
    kind: string,
    listKind: string
}
export interface k8sDefinitionPropertiesVersion {
    name: string,
    served: boolean,
    storage: boolean,
    schema: { openAPIV3Schema: openapiDefinitionPropertiesK8s }
}
interface k8sDefinitionPropertiesSpec {
    group: string,
    names: k8sDefinitionPropertiesNames,
    scope: string,
    versions: Array<k8sDefinitionPropertiesVersion>,
    conversion: object
}
interface k8sDefinitionPropertiesStatus {
    conditions: Array<object>,
    acceptedNames: k8sDefinitionPropertiesNames,
    storedVersions: Array<string>
}
export interface k8sDefinitionProperties {
    apiVersion: string,
    kind: string,
    metadata: object,
    spec: k8sDefinitionPropertiesSpec,
    status: k8sDefinitionPropertiesStatus
}
export interface crds { items: Array<k8sDefinitionProperties>}
