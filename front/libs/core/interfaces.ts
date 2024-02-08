
export interface dataEntry {
    name: string
    value: number
}
export interface chartSizeOptions {
    width?: number
    height?: number
}
export interface chartMarginOptions {
    margin?: number
    marginLegend?: number
}
export interface metadataType {
    namespace?: string
    name: string
    annotations?: Array<dataEntry>
    labels?: Array<dataEntry>
}

export interface HierarchyObject {
    short:string,
    catColor:string,
    itemColor?:string,
    properties:{},
    items:{}[]
}

export default dataEntry
