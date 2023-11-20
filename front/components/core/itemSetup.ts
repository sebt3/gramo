import { useRoute } from 'vue-router'
import { useNavigationStore } from '../../stores/navigation'

export function setupItem() {
    const { setCurrentNamespace, setCurrentItem } = useNavigationStore();
    const route = useRoute();
    function setNamespaceFromRoute() {
        if (route.params.namespace != undefined && typeof route.params.namespace === 'string' && route.params.namespace != '')
            setCurrentNamespace(route.params.namespace);
    }
    function setNamespacedItemFromRoute() {
        setNamespaceFromRoute();
        if (route.params.name != undefined && typeof route.params.name === 'string' && route.params.name != '')
            setCurrentItem(route.params.name);
    }
    function setItemFromRoute() {
        if (route.params.name != undefined && typeof route.params.name === 'string' && route.params.name != '')
            setCurrentItem(route.params.name);
    }
    return { setNamespacedItemFromRoute, setNamespaceFromRoute, setItemFromRoute }
}
export default setupItem