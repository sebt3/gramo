import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigationStore } from '../../stores/navigation'
export enum tableColumnAlign {
    left = "left",
    right = "right"
}
export function setupTableWidget() {
    const filter = ref('')
    const pagination = ref({rowsPerPage: 0})

    const { setCurrentNamespace } = useNavigationStore()
    const route = useRoute();
    function setNamespaceFromRoute() {
        if (route.params.namespace != undefined  && typeof route.params.namespace === 'string' && route.params.namespace != '') {
            setCurrentNamespace(route.params.namespace)
        }
    }
    return { filter, pagination, setNamespaceFromRoute }
}
export default setupTableWidget