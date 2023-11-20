import { OpenAPIV3 } from "openapi-types";
export function getProperties(val) {
    if (val!=undefined && val['properties']!=undefined)
        return val.properties as Map<string, OpenAPIV3.SchemaObject>;
    return undefined
}
export function getItems(val) {
    if (val!=undefined && val['items']!=undefined)
        return val['items'] as OpenAPIV3.SchemaObject;
    return undefined
}
export function getType(val) {
    if (val!=undefined && val['type']!=undefined)
        return val['items'] as string;
    return 'string'
}
export default getItems