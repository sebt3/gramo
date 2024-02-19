import 'quasar/dist/quasar.sass'
import './style/app.sass'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { useNavigationStore } from './stores/navigation'
import { useConfigStore } from './stores/config'
import { usePermissionStore } from './stores/permission'
import { useCRDStore } from './stores/crds'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

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

    const { Quasar, Dialog, Notify } = await import('quasar');
    app.use(Quasar, {
        config: {
            dark: 'auto'
        },
        plugins: {
            Dialog, Notify
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
        const {setPermissions, namespaces} = usePermissionStore();
        const {setCRDs} = useCRDStore();
        setConfig(res.data.gramoConfig)
        setPermissions(Object.fromEntries(res.data.k8sNamespace.map(ns => {return [ns.metadata.name, ns.permissions]})))
        setCurrentNamespace(res.data.gramoConfig.defaultNamespace)
        setCRDs(Object.fromEntries(res.data.k8sCustomResourceDefinition.map(crd => {return[crd.metadata.name, {group: crd.group, names:crd.names, versions:crd.versions}]})))
        setNamespaces(namespaces())
        useRoute(app).then(app =>{app.mount('#app')});
    });
});
