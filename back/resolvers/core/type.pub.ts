export interface metadataLabelsPub {
    name: string
    value: string
}
export interface metadataPub {
    name: string
    namespace: string | undefined
    labels: Array<metadataLabelsPub>
    annotations: Array<metadataLabelsPub>
}
