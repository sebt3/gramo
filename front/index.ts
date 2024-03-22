import 'quasar/dist/quasar.sass'
import './style/app.sass'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
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
    const { i18n }  = await import('./libs/i18n');
    app.use(i18n);

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
    const { beforeEach } = await import('./stores/navigation')
    const { useConfigStore } = await import('./stores/config')
    const { gramoAppName } = useConfigStore();
    const DEFAULT_TITLE = gramoAppName;
    router.beforeEach(beforeEach);
    router.afterEach((to) => {
      if (Object.keys(to.meta).includes('title') && typeof to.meta.title == 'function') {
        if (Object.keys(to.meta).includes('useName')) {
          if (Object.keys(to.meta).includes('useObject')) {
            if (to.meta.ns||false) {
              document.title = to.meta.title(to.params.name, to.params.namespace, to.params.object)+` [${DEFAULT_TITLE}]`
            } else {
              document.title = to.meta.title(to.params.name, to.params.object)+` [${DEFAULT_TITLE}]`
            }
          } else {
            if (to.meta.ns||false) {
              document.title = to.meta.title(to.params.namespace, to.params.name)+` [${DEFAULT_TITLE}]`
            } else {
              document.title = to.meta.title(to.params.name)+` [${DEFAULT_TITLE}]`
            }
          }
        } else {
          if (to.meta.ns||false) {
            document.title = to.meta.title(to.params.namespace)+` [${DEFAULT_TITLE}]`
          } else {
            document.title = to.meta.title()+` [${DEFAULT_TITLE}]`
          }
        }
      } else {
        document.title = DEFAULT_TITLE;
      }
    });
    app.use(router);
    return app;
}
apolloClient.query({query: GramoConfig}).then(res => {
    if (res.loading) return;
    createApp().then(async (app) => {
        const { useNavigationStore } = await import('./stores/navigation')
        const { useConfigStore } = await import('./stores/config')
        const { usePermissionStore } = await import('./stores/permission')
        const { useCRDStore } = await import('./stores/crds')
        const {setConfig} = useConfigStore();
        const {setCurrentNamespace,setNamespaces} = useNavigationStore();
        const {setPermissions, namespaces} = usePermissionStore();
        const {setCRDs} = useCRDStore();
        setConfig(res.data.gramoConfig)
        setPermissions(Object.fromEntries(res.data.k8sNamespace.map(ns => {return [ns.metadata.name, ns.permissions]})))
        const namespace = localStorage.getItem("current-namespace")
        setCurrentNamespace(namespace!=null?namespace:res.data.gramoConfig.defaultNamespace)
        setCRDs(Object.fromEntries(res.data.k8sCustomResourceDefinition.map(crd => {return[crd.metadata.name, {group: crd.group, names:crd.names, versions:crd.versions}]})))
        setNamespaces(namespaces())
        useRoute(app).then(app =>{app.mount('#app')});
    });
});
