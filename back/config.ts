const envMapping = [
// Backend config
    {name: 'enableGraphQLClient',    key: "GRAMO_ENABLE_GRAPHQL_CLIENT"},
    {name: 'limitNamespaceKey',      key: "GRAMO_LIMIT_NAMESPACE_KEY"},
    {name: 'limitNamespaceValue',    key: "GRAMO_LIMIT_NAMESPACE_VALUE"},
    {name: 'limitNamespaceHave',     key: "GRAMO_LIMIT_NAMESPACE_HAVE"},
    {name: 'limitVynilDistrib',      key: "GRAMO_LIMIT_VYNIL_DISTRIB"},
    {name: 'limitVynilCategory',     key: "GRAMO_LIMIT_VYNIL_CATEGORY"},
    {name: 'vynilNamespace',         key: "GRAMO_VYNIL_NAMESPACE"},
// Frontend config
    {name: 'defaultNamespace',       key: "GRAMO_DEFAULT_NAMESPACE"},
    {name: 'defaultRoute',           key: "GRAMO_DEFAULT_ROUTE"},
];
export const defaultConfig = {
    enableGraphQLClient: false,
    limitVynilDistrib: "",
    limitVynilCategory: "",
    limitNamespaceKey: "",
    limitNamespaceValue: "",
    limitNamespaceHave: "",
    vynilNamespace: "vynil",
    defaultNamespace: "default",
    defaultRoute: "",
};
export function getConfig() {
    const config = defaultConfig
    if (typeof window !== 'undefined') return defaultConfig
    envMapping.forEach(item =>{
        const env = process.env[item.key] || ""
        if (env!="") {
            switch(typeof config[item.name]){
                case 'boolean':
                    switch(env) {
                        case "false":
                        case "no":
                        case "NO":
                        case "off":
                        case "OFF":
                        case "n":
                        case "N":
                        case "0":
                            config[item.name] = false;
                            break;
                        default:
                            config[item.name] = true;
                    }
                    break;
                case 'number': {
                    const val = parseFloat(env);
                    if (!isNaN(val))
                        config[item.name] = val;
                    break;
                }
                default:
                    config[item.name] = env;
            }
        }
    });
    return config
}
export const gramoConfig = getConfig();
export type gramoConfigType = ReturnType<typeof getConfig>;
