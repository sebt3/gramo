import 'quasar/dist/quasar.sass'
import './style/app.sass'
import { DefaultApolloClient } from '@vue/apollo-composable'

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

    const { ApolloClient, InMemoryCache } = await import('@apollo/client/core')
    const { createApolloProvider } = await import('@vue/apollo-option')
    const apolloClient = new ApolloClient({
        uri: () => {return window.location.origin+'/graphql'},
        cache: new InMemoryCache(),
    })
    app.use(createApolloProvider({defaultClient: apolloClient}));

    const { router } = await import('./routes/index')
    app.use(router);

    const { Quasar } = await import('quasar');
    app.use(Quasar, {
        config: {},
        plugins: {
        }
    });
    return app
}
createApp().then((app) => {
    app.mount('#app');
});
