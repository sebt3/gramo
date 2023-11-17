import 'quasar/dist/quasar.sass'
import './style/app.sass'
import { DefaultApolloClient } from '@vue/apollo-composable'

async function createApp() {
    const { createApp, provide, defineAsyncComponent, h } = await import('vue');
    const { ApolloClient, InMemoryCache } = await import('@apollo/client/core')
    const apolloClient = new ApolloClient({
        uri: () => {return window.location.origin+'/graphql'},
        cache: new InMemoryCache(),
    })
    const app = createApp({
        setup() {
            provide(DefaultApolloClient, apolloClient);
        },
        render: () =>h(defineAsyncComponent(() => import('./App.vue')))
    });

    const { createPinia } = await import('pinia')
    app.use(createPinia());

    const { router } = await import('./routes/index')
    app.use(router);

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
createApp().then((app) => {
    app.mount('#app');
});
