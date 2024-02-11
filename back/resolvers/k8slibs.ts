import k8s from '@kubernetes/client-node';
import NodeCache from 'node-cache';
export const kc = new k8s.KubeConfig();
export const cache = new NodeCache({ stdTTL: 2, useClones: false, deleteOnExpire: true, checkperiod: 60 });

kc.loadFromCluster();
export function getMetaNS(args: object) {
    return {
        namespace: args['namespace'],
        name: args['name'],
    }
}
export function getMeta(args: object) {
    return {
        name: args['name'],
    }
}

export function getByPath(obj, path) {
    return path.split("/").reduce((res,cur) => res==null?null:res[cur.replaceAll('~1','/')],obj)
}
function deleteByPath(obj,path) {
    const parent = path.split("/").slice(0,-1).reduce((res,cur) => res==null?null:res[cur.replaceAll('~1','/')],obj)
    if (parent!=null)
        delete parent[path.split("/").slice(-1)[0]];
}

function addByPath(target,path,data) {
    path.split("/").slice(0,-1).reduce((res,cur) => {if (res[cur]==undefined) res[cur]={};return res[cur]},target)[path.split("/").slice(-1)[0]] = data
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
            metadata: obj['metadata']
        }
        // treat data add before deletes
        excludes.filter(rule=>rule.include!=undefined&&rule.include).forEach(rule=> addByPath(res,rule.path, JSON.parse(JSON.stringify(getByPath(obj, rule.path)))))
        // then delete the rest
        excludes.filter(rule=>rule.include==undefined||!rule.include).forEach(rule=> deleteByPath(res,rule.path))
        return res
    } else {
        const res = JSON.parse(JSON.stringify(obj))
        excludes.forEach(rule=> deleteByPath(res,rule.path))
        return res
    }
}

