import k8s from '@kubernetes/client-node';
export const kc = new k8s.KubeConfig();
kc.loadFromCluster();
export { default as k8s } from '@kubernetes/client-node';


export function getMetadata(meta: k8s.V1ObjectMeta | undefined, obj: object|undefined = undefined) {
    if (meta === undefined) {
        return {
            obj,
            name: "",
            annotations: [],
            labels: []
        }
    } else {
        return {
            obj,
            name: meta.name,
            namespace: meta.namespace,
            annotations: meta.annotations===undefined?[]:Object.entries(meta.annotations).map(([key, val]) => {return {name: key, value: val}}),
            labels: meta.labels===undefined?[]:Object.entries(meta.labels).map(([key, val]) => {return {name: key, value: val}})
        }
    }
}