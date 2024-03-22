const { ref } = await import('vue')
const { useRoute } = await import('vue-router')
const { useNavigationStore } = await import('../../stores/navigation')
const route = useRoute();
export function setupTableWidget() {
    const filter = ref('')
    const pagination = ref({rowsPerPage: 0})

    const { setCurrentNamespace } = useNavigationStore()
    function setNamespaceFromRoute() {
        if (route.params.namespace != undefined  && typeof route.params.namespace === 'string' && route.params.namespace != '') {
            setCurrentNamespace(route.params.namespace)
        }
    }
    return { filter, pagination, setNamespaceFromRoute }
}
export default setupTableWidget