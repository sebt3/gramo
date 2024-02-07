import { useQuasar } from 'quasar'
import { setupTableWidget } from './tableSetup.js'
import { setupItem } from './itemSetup.js'
import { stringify } from 'yaml'
import { descriptions } from '../../routes'
import { useRouter, useRoute } from 'vue-router'

export * from './itemSetup.js'
export * from './openapiSetup.js'
export * from './tableSetup.js'
export * from './interfaces.js'
export { ref } from 'vue'
export { useQuery, useMutation } from '@vue/apollo-composable'
export { useNavigationStoreRef } from '../../stores'
export function onlyUnique(value, index, array) {return array.indexOf(value) === index;}
export function useCore() {
    const router = useRouter();
    const $q = useQuasar();
    const { pagination, setNamespaceFromRoute } = setupTableWidget();
    const { setItemFromRoute, setNamespacedItemFromRoute } = setupItem();
    return {
        router, $q, pagination, setNamespaceFromRoute, setItemFromRoute, setNamespacedItemFromRoute,
        notify: (arg) => $q.notify(arg),
        notifyWorking: (msg:string) => $q.notify({
            spinner: true,
            message: `${msg}. Please wait...`,
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
            if (route.name != undefined && descriptions[route.name] != undefined) {
              return descriptions[route.name].ns
            }
            return false
        },
        onErrorHandler: ({ graphQLErrors, networkError }) => {
            if (networkError) {
                console.log('[Network error]:', networkError);
                $q.notify({
                    message: 'A network error have occured',
                    icon: 'error',
                    color: 'negative'
                })
            }
            if (graphQLErrors) {
                console.log('[graphQL error]:', graphQLErrors);
                $q.notify({
                    message: 'A GraphQL error have occured, this is likely a bug',
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
    if (str.length>maxsize) {
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