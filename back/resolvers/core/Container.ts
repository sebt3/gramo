import k8s from '@kubernetes/client-node';
//import { lists as listNamespace } from '../k8s/Namespace.js';
import {kc, cache /*, applyFilter, applyFieldSelection, getByPath, getMeta*/ } from '../k8slibs.js';
//import { knowledge } from '../knowledge.js'
//import { LogPubSub } from '../../pubsub/logpubsub.js'
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const log = new k8s.Log(kc);

//const short2plural = (short:string) => short.toLowerCase()+'s'
export const mutations = {
};
export const lists = {
};
export const queries = {
};
export const resolvers = {
    coreContainer: {
        getcoreLog: async (cont, args: object) => {
            let lst:object|undefined|null = cache.get(`getcoreLog-${cont['namespace']}-${cont['pod_name']}-${cont['name']}`)
            const perms = (cache.get(`permissions`)) as { apiGroup: string, resource: string, verb: string }[];
            if (perms!=undefined && lst==undefined) {
                if(!perms.reduce((res,perm) => res||((perm.verb=='*'||perm.verb=='get')&&(
                  ['*','pods/log'].includes(perm.resource) && ['*',''].includes(perm.apiGroup)
                )), false)) {
                    cache.set(`getcoreLog-${cont['namespace']}-${cont['pod_name']}-${cont['name']}`, undefined, 60);
                    return []
                }
            }
            if (lst==undefined && typeof cont['namespace']==='string' && typeof cont['pod_name']==='string' && typeof cont['name']==='string') {
                try {
                  const res = (await k8sApi.readNamespacedPodLog(cont['pod_name'],cont['namespace'],cont['name'],false,undefined,undefined,undefined,undefined,undefined,typeof args['maxLines']== 'number'?args['maxLines']:500)).body
                  if (typeof res==='string') {
                    lst = {lines: (res as string).split('\n')}
                    cache.set(`getcoreLog-${cont['namespace']}-${cont['pod_name']}-${cont['name']}`, lst, 2);
                  } else {
                    lst = {lines: []}
                    cache.set(`getcoreLog-${cont['namespace']}-${cont['pod_name']}-${cont['name']}`, lst, 2);
                  }
                } catch (err) {
                  if (typeof err === 'object' && (err as object)['body'] !=undefined) {
                    if ((err as object)['body']['reason']!='Forbidden') {
                      console.error('error', (err as object)['body']);
                    } else {
                        cache.set(`getcoreLog-${cont['namespace']}-${cont['pod_name']}-${cont['name']}`, undefined, 2);
                    }
                  } else {console.error('error', err)}
                  return null
                }
            }
            return lst
        },
    }
};
