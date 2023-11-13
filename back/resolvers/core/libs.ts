import k8s from '@kubernetes/client-node';
export const kc = new k8s.KubeConfig();
kc.loadFromCluster();
export { default as k8s } from '@kubernetes/client-node';


export function getMetadata(obj: k8s.V1ObjectMeta | undefined) {
    if (obj === undefined) {
        return {
            name: "",
            annotations: [],
            labels: []
        }
    } else {
        return {
            name: obj.name,
            namespace: obj.namespace,
            annotations: obj.annotations===undefined?[]:Object.entries(obj.annotations).map(([key, val]) => {return {name: key, value: val}}),
            labels: obj.labels===undefined?[]:Object.entries(obj.labels).map(([key, val]) => {return {name: key, value: val}})
        }
    }
}