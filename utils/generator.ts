#!/usr/bin/env -S npx ts-node-esm
import https from 'https';
import fetch from 'node-fetch';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {crds, openapi, openapiDefinitionPropertiesDef, k8sObject, HashMap} from './gen/types.js'
import {getBaseName} from './gen/utils.js'
import {generateGraphQLTypes} from './gen/genGraphQLtypes.js'
import {generateResolverTypes} from './gen/genResolverTypes.js'
import {generateResolverQueries} from './gen/genResolverQueries.js'
import {generateResolverIndex,generateResolverNamespace} from './gen/genResolverIndexes.js'
import {generateFrontQueries} from './gen/genFrontQueries.js'
import {generateFrontComponents} from './gen/genFrontComponents.js'
////////////////////////////////////
/// Configure Handlebars
//
import HB from 'handlebars';
HB.registerHelper('eq', (left,right) => left == right);
HB.registerHelper('contain', (v1,v2) => Array.isArray(v1) && v1.includes(v2));
HB.registerHelper('haveType', (item:openapiDefinitionPropertiesDef) => ["array","object","boolean","string","number","integer"].includes(item.type==undefined?"":item.type));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
////////////////////////////////////
/// Setup the raw kube connection
//
const envTokenKey = 'TOKEN';
const envCAFileKey = 'CA_FILE';
const envSvcHostKey = 'KUBERNETES_SERVICE_HOST'
const envSvcPortKey = 'KUBERNETES_SERVICE_PORT_HTTPS'
const inClusterTokenFile = '/run/secrets/kubernetes.io/serviceaccount/token';
const inClusterCAFile = '/run/secrets/kubernetes.io/serviceaccount/ca.crt';
const clusterToken = (process.env[envTokenKey] != undefined && process.env[envTokenKey] != "") ? process.env[envTokenKey] : (fs.existsSync(inClusterTokenFile)) ? fs.readFileSync(inClusterTokenFile, 'utf-8') : "";
const clusterCAFile = (process.env[envCAFileKey] != undefined && process.env[envCAFileKey] != "") ? process.env[envCAFileKey] : (fs.existsSync(inClusterCAFile)) ? inClusterCAFile : "";
const httpsAgent = new https.Agent({
    ca: fs.readFileSync(clusterCAFile, 'utf-8')
});
if (clusterToken == "") {
    console.error("No token found")
    process.exit(1)
}
if (clusterCAFile == "") {
    console.error("No CA file found")
    process.exit(2)
}
if (process.env[envSvcHostKey] == undefined || process.env[envSvcHostKey] == "") {
    console.error("Please set "+envSvcHostKey)
    process.exit(3)
}
if (process.env[envSvcPortKey] == undefined || process.env[envSvcPortKey] == "") {
    console.error("Please set "+envSvcPortKey)
    process.exit(4)
}
const clusterUrl = `https://${process.env[envSvcHostKey]}:${process.env[envSvcPortKey]}`
async function getClusterByPath(path: string) {
    return await fetch(`${clusterUrl}/${path}`, {
        agent: httpsAgent,
        headers: {
            'Content-Type': 'appligroupion/json',
            'Authorization': `Bearer ${clusterToken}`
        }
    }).then( r => r.json())
}

////////////////////////////////////
/// Query kubernetes swagger and crds then deref the data to get the complete objects definitions
//
Promise.all([getClusterByPath('openapi/v2'), getClusterByPath('apis/apiextensions.k8s.io/v1/customresourcedefinitions')]).then(([data_in, crd_in]) => {
    const data = data_in as openapi
    const crds = crd_in as crds

    // deref: remplace $ref with actual referenced type
    const derefs:Map<string, openapiDefinitionPropertiesDef> = ((defs) => {
        const excluded = [
            'io.k8s.apimachinery.pkg.apis.meta.v1.Time',
            'io.k8s.apimachinery.pkg.util.intstr.IntOrString',
            'io.k8s.apimachinery.pkg.api.resource.Quantity',
            'io.k8s.api.core.v1.ConfigMapVolumeSource',
            'io.k8s.api.core.v1.ConfigMapProjection',
            'io.k8s.api.core.v1.DownwardAPIVolumeSource',
            'io.k8s.api.core.v1.DownwardAPIProjection',
            'io.k8s.api.core.v1.SecretProjection',
            'io.k8s.api.core.v1.SecretVolumeSource',
            'io.k8s.apimachinery.pkg.apis.meta.v1.MicroTime',
            'io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceSubresourceStatus',
            'io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.JSONSchemaProps']
        const queue = structuredClone(defs);
        const ret:Map<string, openapiDefinitionPropertiesDef> = new Map();
        const deref = (data) => {
            const res = structuredClone(data);
            for (const [key, val] of Object.entries(data.properties as HashMap<openapiDefinitionPropertiesDef>)) {
                if (val['$ref'] != undefined && !excluded.includes(val['$ref'].split('/')[2])) {
                    res.properties[key] = ret[val['$ref'].split('/')[2]]
                }
                if (val['type'] == 'array' && val['items'] != undefined && val['items']['$ref'] != undefined && !excluded.includes(val['items']['$ref'].split('/')[2])) {
                    res.properties[key]['items'] = ret[val['items']['$ref'].split('/')[2]]
                }
                if (val['type'] == 'object' && val.properties != undefined) {
                    for (const [k2, v2] of Object.entries(val.properties)) {
                        if ((v2 as object)['$ref'] != undefined && !excluded.includes((v2 as object)['$ref'].split('/')[2])) {
                            res.properties[key]['properties'][k2] = ret[val['properties'][k2]['$ref'].split('/')[2]]
                        }
                    }
                }
            }
            return res
        }
        let counter=0;
        while (queue.length>0) {
            const item = queue.shift();
            if (item===undefined) continue;
            let missing = false;
            for (const [key, val] of Object.entries(item[1].properties)) {
                missing = missing || (val['$ref'] != undefined && key !='metadata' && !excluded.includes(val['$ref'].split('/')[2]) && !Object.keys(ret).includes(val['$ref'].split('/')[2]));
                if (val['type'] == 'array') {
                    missing = missing || (val['items']['$ref'] != undefined && !excluded.includes(val['items']['$ref'].split('/')[2]) && !Object.keys(ret).includes(val['items']['$ref'].split('/')[2]));
                }
                if (val['type'] == 'object' && typeof val.properties == 'object') {
                    for (const [, v2] of Object.entries(val.properties)) {
                        missing = missing || ((v2 as object)['$ref'] != undefined && !excluded.includes((v2 as object)['$ref'].split('/')[2]) && !Object.keys(ret).includes((v2 as object)['$ref'].split('/')[2]));
                    }
                }
                if (missing) break;
            }
            if (missing) {
                queue.push(item)
                counter++;
                if (counter>queue.length) {
                    break;
                }
                //console.log(queue.length,Object.keys(ret).length)
                continue;
            }
            counter=0;
            ret[item[0]] = deref(item[1])
        }
        return ret
    })(Object.entries(data.definitions).filter(e => e[1].properties!=undefined && e[1].properties['items']==undefined));new Map();

    // Sort all the definition into kubernetes objects
    const groupedObjects: HashMap<HashMap<HashMap<k8sObject>>> = {}
    for (const [key, value] of Object.entries(derefs)) {
        // Detect goup, object and version from the definition name, exclude unknown
        let group = key.split('.').slice(0,3).join('.');
        let item = ""
        let version=""
        if (['com.coreos.monitoring','com.mongodb.mongodbcommunity','de.mittwald.secretgenerator','do.zalan.acid','fr.solidite.vynil','io.cert-manager.acme','io.cnpg.postgresql','io.mmontes.mariadb', 'org.projectcalico.crd', 'us.containo.traefik'].includes(group)) {
            version = key.split('.')[3]
            item = key.split('.')[4]
        } else if (['io.k8s.api','io.fluxcd.toolkit','in.opstreelabs.redis'].includes(group)) {
            group = key.split('.').slice(0,4).join('.');
            version = key.split('.')[4]
            item = key.split('.')[5]
        } else if (['io.k8s.apimachinery','io.k8s.kube-aggregator'].includes(group)) {
            group = key.split('.').slice(0,6).join('.');
            version = key.split('.')[6]
            item = key.split('.')[7]
            if (item == undefined) continue;
        } else if (['io.cert-manager.v1','io.traefik.v1alpha1','io.k8up.v1'].includes(group)) {
            group = key.split('.').slice(0,2).join('.');
            version = key.split('.')[2]
            item = key.split('.')[3]
        } else if (['io.k8s.apiextensions-apiserver'].includes(group)) {
            group = key.split('.').slice(0,6).join('.');
            version = key.split('.')[6]
            item = key.split('.')[7]
        } else {
            console.debug(`excluding ${key}`);
            continue;
        }
        if (value.properties == undefined || value.properties.spec == undefined || value.properties.apiVersion == undefined) {
            continue;
        }

        // Feed the final classment
        const api = group.split('.').reverse().join('.');
        if (groupedObjects[api] == undefined) groupedObjects[api] = {};
        if (groupedObjects[api][item] == undefined) groupedObjects[api][item] = {};
        let status:openapiDefinitionPropertiesDef|undefined = undefined;
        if (value.properties.status != undefined)
            status = value.properties.status;
        groupedObjects[api][item][version] = {
            crd: undefined,
            spec: value.properties.spec,
            status: status
        };
    }
    // Add the crd to the matching Objects
    crds.items.forEach((crd) => {
        const group = crd.spec.group;
        if (groupedObjects[group] == undefined) return;
        if (groupedObjects[group][crd.spec.names.kind] == undefined) return;
        crd.spec.versions.forEach((vers) => {
            if (groupedObjects[group][crd.spec.names.kind][vers.name] != undefined) crd.spec.group,groupedObjects[group][crd.spec.names.kind][vers.name].crd = crd;
        });
    });
    return groupedObjects
}).then((groupedObjects) => {
////////////////////////////////////
/// Generate the files based on the grouped data from previous step
//
    const isK8s = /k8s\.io$/
    const isFlux = /toolkit\.fluxcd\.io$/
    const isTraefik = /^traefik/
    //Object.keys(groupedObjects).filter((k) => ! isK8s.test(k) && !isFlux.test(k)).forEach(k => console.log(k))
    const filteredObjects = Object.entries(groupedObjects).filter(([key]) =>
        // Exclude official api for now
        ! isK8s.test(key)
        // Exclude traefik for now
        && ! isTraefik.test(key)
        // Include only vynil for now
        && (['vynil.solidite.fr'].includes(key) || isFlux.test(key))
    )
    filteredObjects.forEach(([key, value]) => {
        const baseFileName = getBaseName(key);
        const baseName = getBaseName(key).split('.')[0];
        const baseDirName = getBaseName(key).split('.')[0];
        const subGroup = getBaseName(key).includes('.')?`${getBaseName(key).split('.')[1]}.`:'';
        const acceptedPrefix = '';
        const unsurePrefix = 'gen.';
        generateGraphQLTypes(path.resolve(__dirname,'..', 'back','schema',`${unsurePrefix}${baseFileName}.graphql`), baseName, key, value);
        generateResolverTypes    (path.resolve(__dirname,'..', 'back','resolvers', baseDirName), baseName, key, value, acceptedPrefix);
        generateResolverQueries  (path.resolve(__dirname,'..', 'back','resolvers', baseDirName), baseName, key, value, acceptedPrefix);
        generateResolverIndex    (path.resolve(__dirname,'..', 'back','resolvers', baseDirName, `${unsurePrefix}${subGroup}index.ts`), baseName, key, value);
        generateResolverNamespace(path.resolve(__dirname,'..', 'back','resolvers','core', `${acceptedPrefix}resolvers.ns.${baseFileName}.ts`), baseDirName, subGroup, baseName, key, value);
        generateFrontQueries(path.resolve(__dirname,'..', 'front','queries', baseDirName), baseName, key, value, unsurePrefix);
        generateFrontComponents(path.resolve(__dirname,'..', 'front','components', baseDirName), baseName, key, value, unsurePrefix);
    })
})
