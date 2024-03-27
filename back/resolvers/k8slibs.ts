import k8s from '@kubernetes/client-node';
import request from 'request';
import NodeCache from 'node-cache';
export const kc = new k8s.KubeConfig();
export const cache = new NodeCache({ stdTTL: 2, useClones: false, deleteOnExpire: true, checkperiod: 60 });

if (process.env['NODE_ENV']=='dev') kc.loadFromDefault();
else kc.loadFromCluster();
export function getMetaNS(args: object) {
    return args['metadata']
}
export function getMeta(args: object) {
    return args['metadata']
}

export function getByPath(obj, path) {
    return path.split("/").reduce((res,cur) => res==null?null:res[cur.replaceAll('~1','/')],obj)
}
function deleteByPath(obj,path) {
    const parent = path.split("/").slice(0,-1).reduce((res,cur) => res==null?null:res[cur.replaceAll('~1','/')],obj)
    if (parent!=null)
        delete parent[path.split("/").slice(-1)[0]];
}

const opts = {} as request.Options;
kc.applyToRequest(opts);
export const rawQuery = async (path:string) => {
    return new Promise((resolve,reject) => request.get(kc.getCurrentCluster().server + path, opts, (error, response, body) => {
        if (error) reject(error);
        if (response === undefined || response==null) { reject('no response from API'); return }
        if (response.statusCode != 200) { reject(`Query failed, ${response.statusCode}`); return }
        resolve(JSON.parse(body))
    }));
}

function addByPath(target,path,data) {
    path.split("/").slice(0,-1).reduce((res,cur) => {if (res[cur]==undefined) res[cur]={};return res[cur]},target)[path.split("/").slice(-1)[0]] = data
}

export async function applyHaving(obj,args, resolvers) {
    if (args['params']==null||args['params']==undefined||typeof args['params']!=='object'||((args['params']['havingAny']==null||args['params']['havingAny']==undefined||!Array.isArray(args['params']['havingAny'])&&(args['params']['havingAll']==null||args['params']['havingAll']==undefined||!Array.isArray(args['params']['havingAll'])))))
        return true;
    let ret = true;
    if (args['params']['havingAny']!=null&&args['params']['havingAny']!=undefined&&Array.isArray(args['params']['havingAny'])) {
        ret = args['params']['havingAny'].reduce(async (res,cur)=>{
            if (typeof resolvers[cur['resolver']] != 'function') return res;
            const content=await resolvers[cur['resolver']](obj,{...args, filters: cur['filters']})
            return res||Array.isArray(content)
        }, false)
        //if (ret) console.log('applyHaving', obj)
    }
    if (args['params']['havingAll']!=null&&args['params']['havingAll']!=undefined&&Array.isArray(args['params']['havingAll'])) {
        ret = ret && args['params']['havingAll'].reduce(async (res,cur)=>{
            if (typeof resolvers[cur['resolver']] != 'function') return false;
            return res&&Array.isArray(await resolvers[cur['resolver']](obj,{...args, filters: cur['filters']}))
        }, true)
    }
    return ret;
}
export function applyFilter(obj,args) {
    if (args['params']==null||args['params']==undefined||typeof args['params']!=='object'||args['params']['filters']==null||args['params']['filters']==undefined||!Array.isArray(args['params']['filters']))
        return true;
    for (const f of args['params']['filters']) {
        const val = getByPath(obj, f['path']);
        switch(f['op']) {
            case "eq":
            case "=":
            case "==":
                if (val != f['value'])
                    return false;
                break;
            case "ne":
            case "!=":
                if (val == f['value'])
                    return false;
                break;
            case "lt":
            case "<":
                if (val >= f['value'])
                    return false;
                break;
            case "gt":
            case ">":
                if (val <= f['value'])
                    return false;
                break;
            case "le":
            case "<=":
                if (val > f['value'])
                    return false;
                break;
            case "ge":
            case ">=":
                if (val < f['value'])
                    return false;
                break;
            case "start":
            case "begin":
                if (val==null || ! val.startsWith(f['value']))
                    return false;
                break;
            case "end":
                if (val==null || ! val.endsWith(f['value']))
                    return false;
                break;
            case "include":
            case "excludes":
            case "contain":
                if (val==null || ! val.excludes(f['value']))
                    return false;
                break;
        }
    }
    return true
}

type fieldRule = {path: string, include?: boolean}
export function applyFieldSelection(obj,args) {
    if (args['params']==null||args['params']==undefined||typeof args['params']!=='object'||args['params']['excludes']==null||args['params']['excludes']==undefined||!Array.isArray(args['params']['excludes']))
        return obj;
    const excludes = args['params']['excludes'] as Array<fieldRule>;
    const strategyAdd = excludes.reduce((acc,cur:fieldRule)=>acc || (cur.include!=undefined&&cur.include),false)
    if (strategyAdd) {
        const res = {
            metadata: JSON.parse(JSON.stringify(obj['metadata']))
        }
        // treat data add before deletes
        excludes.filter(rule=>rule.include!=undefined&&rule.include).forEach(rule=> {
            const data = getByPath(obj, rule.path);
            addByPath(res,rule.path, (data != undefined)?JSON.parse(JSON.stringify(data)):null);
        })
        // then delete the rest
        excludes.filter(rule=>rule.include==undefined||!rule.include).forEach(rule=> deleteByPath(res,rule.path))
        return res
    } else {
        const res = JSON.parse(JSON.stringify(obj))
        excludes.forEach(rule=> deleteByPath(res,rule.path))
        return res
    }
}

