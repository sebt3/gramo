import { useQuasar } from 'quasar'
import { setupTableWidget } from './tableSetup.js'
import { setupItem } from './itemSetup.js'
import { stringify } from 'yaml'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from "vue-i18n"

export * from './itemSetup.js'
export * from './openapiSetup.js'
export * from './tableSetup.js'
export * from './interfaces.js'
export { ref } from 'vue'
export { useQuery, useMutation } from '@vue/apollo-composable'
export { useNavigationStoreRef } from '../../stores'
export function onlyUnique(value, index, array) {return array.indexOf(value) === index;}
export function useCore() {
    const { t } = useI18n()
    const router = useRouter();
    const $q = useQuasar();
    const { pagination, setNamespaceFromRoute } = setupTableWidget();
    const { setItemFromRoute, setNamespacedItemFromRoute } = setupItem();
    return {
        router, $q, pagination, setNamespaceFromRoute, setItemFromRoute, setNamespacedItemFromRoute,
        notify: (arg) => $q.notify(arg),
        notifyWorking: (msg:string) => $q.notify({
            spinner: true,
            message: `${t("core.wait",{msg})}`,
            timeout: 1000
        }),
        notifySuccess: (msg:string) => $q.notify({
            message: msg,
            icon: 'announcement',
            color: 'positive'
        }),
        notifyError: (msg:string) => $q.notify({
            message: msg,
            icon: 'announcement',
            color: 'negative'
        }),
        isNamespaced: () => {
            const route = useRoute();
            if (route != undefined && route.meta != undefined) {
              return route.meta.ns||false
            }
            return false
        },
        onErrorHandler: ({ graphQLErrors, networkError }) => {
            if (networkError) {
                console.log('[Network error]:', networkError);
                $q.notify({
                    message: `${t("core.networkError")}`,
                    icon: 'error',
                    color: 'negative'
                })
            }
            if (graphQLErrors) {
                console.log('[graphQL error]:', graphQLErrors);
                $q.notify({
                    message: `${t("core.graphqlError")}`,
                    icon: 'error',
                    color: 'negative'
                })
            }
        }
    }
}
// Remove the 'null' values produced by the openAPI editor component for unused fields so mutations are happy
export function sanitizeData(data:object) {
    const result = Array.isArray(data) ? [] : {};
    let value;
    for (const key in data) {
      value = data[key];
      if (value != null && typeof value === "object") {
        const saner = sanitizeData(value);
        if (saner==null) continue;
        if (typeof saner === "object" && Object.keys(saner).length>0)
            result[key] = saner;
      } else if (value != null) {
        result[key] = value;
      }
    }
    if (typeof result === "object" && Object.keys(result).length<1) return null;
    return result;
}

export function elude(str:string, maxsize:number=20) {
    if (typeof str=='string' && str.length>maxsize) {
      return str.substring(0,maxsize-3)+'...'
    }
    return str;
}
function deepRemoveType(ret: object) {
    if (Object.keys(ret).includes('__typename')) {delete ret['__typename']}
    Object.keys(ret).filter(k => typeof ret[k] == 'object' && ret[k] != null && ret[k] != undefined).forEach(k => ret[k] = deepRemoveType(ret[k]))
    return ret
}
export function gqlDataToYaml(o: object) {
    if (typeof o !== 'object') return o;
    return stringify(deepRemoveType(JSON.parse(JSON.stringify(o))));
}

export function getColor(name) {
    const vynil = /^vynil.solidite.fr/;
    const k8s = /kubernetes.io/;
    if (k8s.test(name)) return 'primary'
    if (vynil.test(name)) return 'secondary'
    return 'info'
}
export function getConditionColor(cond) {
    if (cond.type == "Ready") return cond.status=='True'?'positive':'negative'
    return 'info' // 'warning'
}
export function addByPath(target,path,data) {
    path.split("/").slice(0,-1).reduce((res,cur) => {if (res[cur]==undefined) res[cur]={};return res[cur]},target)[path.split("/").slice(-1)[0]] = data
}
export function getByPath(obj, path) {
    return path.split("/").reduce((res,cur) => res==null?null:res[cur.replaceAll('~1','/')],obj)
}

export function timeAgo(date:string) {
    const { t } = useI18n()
    const delta = new Date().getTime() - new Date(date).getTime();
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((delta % (1000 * 60)) / 1000);
    return `${days>0?`${t("meta.days",days)} `:''}${hours>0?`${t("meta.hours",hours)} `:''}${minutes>0?`${t("meta.minutes",minutes)} `:''}${seconds>0?t("meta.seconds",seconds):''}`
}
