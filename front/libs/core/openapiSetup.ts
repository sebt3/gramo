import { OpenAPIV3 } from "openapi-types";
export function getProperties(val, filter=undefined) {
    if (val != undefined && val['properties'] != undefined && filter == undefined)
        return new Map(Object.entries(val.properties));
    if (val != undefined && val['properties'] != undefined && filter != undefined)
        return new Map(Object.entries(val.properties).filter(filter));
    return new Map()
}
export function getItems(val) {
    if (val != undefined && val['items'] != undefined)
        return val['items'] as OpenAPIV3.SchemaObject;
    return undefined
}
export function getType(val) {
    if (val != undefined && val['type'] != undefined)
        return val['type'] as string;
    return 'string'
}
export function getFullData(properties: Map<string, OpenAPIV3.SchemaObject>, ouput: any, data: any) {
    for (const [key, val] of properties) {
        if (data != undefined && data[key] != undefined && data[key] != null) {
            ouput[key] = data[key]
        /*} else if (val.default != undefined) {
            ouput[key] = val.default*/
        } else {
            switch (val.type) {
                case "array":
                    ouput[key] = []
                    break;
                case "object":
                    ouput[key] = {}
                    getFullData(getProperties(val), ouput[key], data != undefined ? data[key] : undefined)
                    break;
                default:
                    ouput[key] = null
                    break;
            }
        }
    }
}

export default getItems