import {cache, rawQuery, applyFilter, applyFieldSelection} from '../k8slibs.js';
const metricMaxLength = 500;
export const mutations = {
};
export const lists = {
  corePodMetrics: async (parent, args: object) => {
    const ret:{pod_name:string, name:string,namespace:string,data:{timestamp: string, window: string, cpu: string, memory:string}[]}[] = cache.get('corePodMetrics') || []
    const lst:Array<object>|undefined = cache.get('corePodMetricsInternal')
    if (lst==undefined) {
      try {
        const parsed = await rawQuery('/apis/metrics.k8s.io/v1beta1/pods') as {items:{metadata:{name:string,namespace:string}, containers:object[],window:string, timestamp:string}[]}
        if (!Array.isArray(parsed.items)) throw new Error(`No data`);
        parsed.items.map(i=>i.containers.map(c=>{return {pod_name:i.metadata.name, namespace:i.metadata.namespace, name: c['name'], data: {timestamp: i.timestamp, window: i.window, cpu: c['usage']['cpu'], memory: c['usage']['memory']}}})).flat().forEach(i=>{
            if (ret.filter(pod=>pod.pod_name==i.pod_name&&pod.name==i.name&&pod.namespace==i.namespace).length>0) {
              if (ret.filter(pod=>pod.pod_name==i.pod_name&&pod.name==i.name&&pod.namespace==i.namespace)[0].data.filter(d=>d.timestamp==i.data.timestamp).length<1)
                ret.filter(pod=>pod.pod_name==i.pod_name&&pod.name==i.name&&pod.namespace==i.namespace)[0].data.push(i.data)
            } else {
              ret.push({
                name: i.name,
                pod_name: i.pod_name,
                namespace: i.namespace,
                data: [i.data]
              })
            }
            if (ret.filter(pod=>pod.pod_name==i.pod_name&&pod.name==i.name&&pod.namespace==i.namespace)[0].data.length>500)
                ret.filter(pod=>pod.pod_name==i.pod_name&&pod.name==i.name&&pod.namespace==i.namespace)[0].data.pop();
        });
        cache.set('corePodMetricsInternal', [], 2);
        cache.set('corePodMetrics', ret, 2*metricMaxLength);
        return ret
      } catch (err) {
        if (typeof err === 'object' && (err as object)['body'] !=undefined) {
          if ((err as object)['body']['reason']!='Forbidden') {
            console.error('error', (err as object)['body']);
          } else {
            cache.set('corePodMetricsInternal', [], 2);
          }
        } else {console.error('error', err)}
        return []
      }
    }
    if (lst===undefined) return []
    return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
  }
};
export const queries = {
    corePodMetrics: lists.corePodMetrics,
};
export const resolvers = {
};
