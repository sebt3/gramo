const { useRoute } = await import('vue-router')
const { useNavigationStore } = await import('../../stores/navigation.js')
const { setCurrentNamespace, setCurrentItem } = useNavigationStore();
export function setNamespaceFromRoute() {
    const route = useRoute();
    if (route.params.namespace != undefined && typeof route.params.namespace === 'string' && route.params.namespace != '')
        setCurrentNamespace(route.params.namespace);
}
export function setNamespacedItemFromRoute() {
    const route = useRoute();
    setNamespaceFromRoute();
    if (route.params.name != undefined && typeof route.params.name === 'string' && route.params.name != '')
        setCurrentItem(route.params.name);
}
export function setItemFromRoute() {
    const route = useRoute();
    if (route.params.name != undefined && typeof route.params.name === 'string' && route.params.name != '')
        setCurrentItem(route.params.name);
}
export enum tableColumnAlign {
    left = "left",
    right = "right"
}
export function isNamespaced() {
    const route = useRoute();
    if (route != undefined && route.meta != undefined) {
      return route.meta.ns||false
    }
    return false
}
export default setNamespaceFromRoute