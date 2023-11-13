import k8s from '@kubernetes/client-node';
export const kc = new k8s.KubeConfig();
kc.loadFromCluster();
export { default as k8s } from '@kubernetes/client-node';


export function getMetadata(meta: k8s.V1ObjectMeta | undefined) {
    if (meta === undefined) {
        return {
            name: "",
            annotations: [],
            labels: []
        }
    } else {
        return {
            name: meta.name,
            namespace: meta.namespace,
            annotations: meta.annotations===undefined?[]:Object.entries(meta.annotations).map(([key, val]) => {return {name: key, value: val}}),
            labels: meta.labels===undefined?[]:Object.entries(meta.labels).map(([key, val]) => {return {name: key, value: val}})
        }
    }
}