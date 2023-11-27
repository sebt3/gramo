import 'quasar/dist/quasar.sass'
import './style/app.sass'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { useNavigationStore } from './stores/navigation'
import { useConfigStore } from './stores/config'
import { usePermissionStore } from './stores/permission'
import { useCRDStore } from './stores/crds'
const apolloClient = new ApolloClient({
    uri: () => {return window.location.origin+'/graphql'},
    cache: new InMemoryCache(),
})

import GramoConfig from './queries/core/GramoConfig.graphql'
async function createApp() {
    const { createApp, provide, defineAsyncComponent, h } = await import('vue');
    const app = createApp({
        setup() {
            provide(DefaultApolloClient, apolloClient);
        },
        render: () =>h(defineAsyncComponent(() => import('./App.vue')))
    });

    const { createPinia } = await import('pinia')
    app.use(createPinia());

    const { Quasar, Dialog } = await import('quasar');
    app.use(Quasar, {
        config: {
            dark: 'auto'
        },
        plugins: {
            Dialog
        }
    });
    return app
}
async function useRoute(app) {
    const { router } = await import('./routes/index')
    app.use(router);
    return app;
}
apolloClient.query({query: GramoConfig}).then(res => {
    if (res.loading) return;
    createApp().then((app) => {
        const {setConfig} = useConfigStore();
        const {setCurrentNamespace,setNamespaces} = useNavigationStore();
        const {setPermissions} = usePermissionStore();
        const {setCRDs} = useCRDStore();
        setConfig(res.data.gramoConfig)
        setPermissions(Object.fromEntries(res.data.namespaces.map(ns => {return [ns.metadata.name, ns.permissions]})))
        setCurrentNamespace(res.data.gramoConfig.defaultNamespace)
        setCRDs(Object.fromEntries(res.data.customResourceDefinitions.map(crd => {return[crd.metadata.name, {group: crd.group, names:crd.names, versions:crd.versions}]})))
        setNamespaces(res.data.namespaces.map(ns => ns.metadata.name))
        useRoute(app).then(app =>{app.mount('#app')});
    });
});
