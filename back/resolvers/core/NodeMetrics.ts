import {cache, rawQuery, applyFilter, applyFieldSelection} from '../k8slibs.js';
const metricMaxLength = 500;
export const mutations = {
};
export const lists = {
  coreNodeMetrics: async (parent, args: object) => {
    const ret:{name:string,data:{timestamp: string, window: string, cpu: string, memory: string}[]}[] = cache.get('coreNodeMetrics') || []
    const lst:Array<object>|undefined = cache.get('coreNodeMetricsInternal')
    if (lst==undefined) {
      try {
        const parsed = await rawQuery('/apis/metrics.k8s.io/v1beta1/nodes') as {items:{metadata:{name:string}, window:string, timestamp:string, usage:{cpu:string,memory:string}}[]}
        if (!Array.isArray(parsed.items)) throw new Error(`No data`);
        parsed.items.forEach(i=>{
            const line = {
              timestamp: i.timestamp,
              window: i.window,
              cpu: i.usage.cpu,
              memory: i.usage.memory
            }
            if (ret.filter(node=>node.name==i.metadata.name).length>0) {
              if (ret.filter(node=>node.name==i.metadata.name)[0].data.filter(d=>d.timestamp==i.timestamp).length<1)
                ret.filter(node=>node.name==i.metadata.name)[0].data.push(line)
            } else {
              ret.push({
                name: i.metadata.name,
                data: [line]
              })
            }
            if (ret.filter(node=>node.name==i.metadata.name)[0].data.length>500)
                ret.filter(node=>node.name==i.metadata.name)[0].data.pop();
        });
        cache.set('coreNodeMetricsInternal', [], 2);
        cache.set('coreNodeMetrics', ret, 2*metricMaxLength);
        return ret
      } catch (err) {
        if (typeof err === 'object' && (err as object)['body'] !=undefined) {
          if ((err as object)['body']['reason']!='Forbidden') {
            console.error('error', (err as object)['body']);
          } else {
            cache.set('coreNodeMetricsInternal', [], 2);
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
    coreNodeMetrics: lists.coreNodeMetrics,
};
export const resolvers = {
};
