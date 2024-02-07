import https from 'https';
import fetch from 'node-fetch';
import * as fs from 'fs';
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
export async function getClusterByPath(path: string) {
    return await fetch(`${clusterUrl}/${path}`, {
        agent: httpsAgent,
        headers: {
            'Content-Type': 'appligroupion/json',
            'Authorization': `Bearer ${clusterToken}`
        }
    }).then( r => r.json())
}
