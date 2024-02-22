import k8s from '@kubernetes/client-node';
import { lists as listNamespace } from '../k8s/Namespace.js';
import {kc, cache, applyFilter, applyFieldSelection} from '../k8slibs.js';
import { knowledge } from '../knowledge.js'
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const short2plural = (short:string) => short.toLowerCase()+'s'
export const mutations = {
};
export const lists = {
  coreEvent: async (parent, args: object) => {
    let lst:Array<object>|undefined = cache.get('coreEvent')
    const perms = (cache.get(`permissions`)) as { apiGroup: string, resource: string, verb: string }[];
    if (perms!=undefined && lst==undefined) {
      if(!perms.reduce((res,perm) => res||((perm.verb=='*'||perm.verb=='list')&&(
        (perm.resource=='*' && perm.apiGroup=='*') ||
        (perm.resource=='*' && knowledge.filter(o=>o.group=='core'&&o.short=='Event'&&perm.apiGroup==o.apiGroup).length>0) ||
        (knowledge.filter(o=>o.group=='k8s'&&o.short=='APIService'&&(perm.apiGroup=='*'||perm.apiGroup==o.apiGroup)).map(o=>short2plural(o.short)).includes(perm.resource))
      )), false)) {
          cache.set('coreEvent', [], 60);
          return []
      }
    }
    if (lst==undefined) {
      try {
        const res = await k8sApi.listEventForAllNamespaces()
        lst = ((res as object)['body']['items'] as Array<object>).sort((a,b) => new Date(a['metadata']['creationTimestamp'])<new Date(b['metadata']['creationTimestamp'])?1:-1)
        cache.set('coreEvent', lst, 2);
      } catch (err) {
        if (typeof err === 'object' && (err as object)['body'] !=undefined) {
          if ((err as object)['body']['reason']!='Forbidden') {
            console.error('error', (err as object)['body']);
          } else {
            try {
              const nss = await listNamespace.k8sNamespace(parent, args)
              const lst = (await Promise.all(nss.map(n=>n['metadata']['name']).map(async (ns)=>{
                return (await k8sApi.listNamespacedEvent(ns)).body.items
              }))).flat().filter((v)=>v!=null).sort((a,b) => new Date((a['metadata'] as object)['creationTimestamp'])<new Date((b['metadata'] as object)['creationTimestamp'])?1:-1)
              cache.set('coreEvent', lst, 2);
              return lst.filter(o=>typeof parent != 'object' || parent==null || (
                          o['involvedObject']!=undefined && o['involvedObject']['name'] == parent['metadata']['name'] && o['involvedObject']['namespace'] == parent['metadata']['namespace']
                      )).filter(o=> typeof args['namespace'] != 'string' || (
                          o['involvedObject']!=undefined && o['involvedObject']['namespace']==args['namespace']
                      )).filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
            } catch (err) {
              if (typeof err === 'object' && (err as object)['body'] !=undefined) {
                if ((err as object)['body']['reason']!='Forbidden') {
                  console.error('error', (err as object)['body']);
                } else {
                  cache.set('coreEvent', [], 2);
                }
              } else {console.error('error', err)}
              return []
            }
          }
        } else {console.error('error', err)}
        return []
      }
    }
    return lst.filter(o=>typeof parent != 'object' || parent==null || (
                o['involvedObject']!=undefined && o['involvedObject']['name'] == parent['metadata']['name'] && o['involvedObject']['namespace'] == parent['metadata']['namespace']
            )).filter(o=> typeof args['namespace'] != 'string' || (
                o['involvedObject']!=undefined && o['involvedObject']['namespace']==args['namespace']
            )).filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
  }
};
export const queries = {
    coreEvent: lists.coreEvent,
};
export const resolvers = {
};
