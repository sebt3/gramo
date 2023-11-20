
declare module '*.vue' { // NOTE: ts-loader
    import { defineComponent } from 'vue';

    const component: ReturnType<typeof defineComponent>;
    export default component;
}

declare module "*.graphql" {
    const content: any;
    export default content;
}
