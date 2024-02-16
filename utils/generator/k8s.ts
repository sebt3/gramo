import https from 'https';
import fetch from 'node-fetch';
import path from 'path';
import * as fs from 'fs';
import { parse as parseYaml } from 'yaml'

function setupKube() {
    const args = process.argv.slice(2);
    const KUBECONFIG = process.env['KUBECONFIG']||path.resolve(process.env['HOME']||'','.kube','config')
    let clusterUrl:string|undefined=undefined
    let ca:string|undefined=undefined
    let key:string|undefined=undefined
    let cert:string|undefined=undefined
    let token:string|undefined=undefined
    const headers = {'Content-Type': 'application/json'}
    if (fs.statSync(KUBECONFIG).isFile()) {
        const config = parseYaml(fs.readFileSync(KUBECONFIG).toLocaleString())
        const context = config.contexts==undefined?undefined:config.contexts.filter(c=>c.name==config['current-context']).map(c=>c.context)
        let cluster=undefined
        let user=undefined
        if (Array.isArray(context)&& context.length>0) {
            cluster=config.clusters.filter(c=>c.name==context[0]['cluster']).map(c=>c.cluster)
            user=config.users.filter(c=>c.name==context[0]['user']).map(c=>c.user)
        }
        if (Array.isArray(cluster)&& (cluster as object[]).length>0){
            clusterUrl=cluster[0]['server']
            if (cluster[0]['certificate-authority-data'])
                ca=Buffer.from(cluster[0]['certificate-authority-data'], 'base64').toString('utf-8');
            if (cluster[0]['certificate-authority'] && fs.existsSync(cluster[0]['certificate-authority']))
                ca=fs.readFileSync(cluster[0]['certificate-authority'], 'utf-8')
        }
        if(Array.isArray(user) && (user as object[]).length>0) {
            if (user[0]['client-certificate-data'])
                cert=Buffer.from(user[0]['client-certificate-data'], 'base64').toString('utf-8');
            if (user[0]['client-certificate'] && fs.existsSync(user[0]['client-certificate']))
                cert=fs.readFileSync(user[0]['client-certificate'], 'utf-8')
            if (user[0]['client-key-data'])
                key=Buffer.from(user[0]['client-key-data'], 'base64').toString('utf-8');
                if (user[0]['client-key'] && fs.existsSync(user[0]['client-key']))
                key=fs.readFileSync(user[0]['client-key'], 'utf-8')
            if (user[0]['token']!=undefined)
                token=user[0]['token']
        }
    }
    if (clusterUrl==undefined) {
        const envTokenKey = 'TOKEN';
        const envCAFileKey = 'CA_FILE';
        const envSvcHostKey = 'KUBERNETES_SERVICE_HOST'
        const envSvcPortKey = 'KUBERNETES_SERVICE_PORT_HTTPS'
        const inClusterTokenFile = '/run/secrets/kubernetes.io/serviceaccount/token';
        const inClusterCAFile = '/run/secrets/kubernetes.io/serviceaccount/ca.crt';
        token = (process.env[envTokenKey] != undefined && process.env[envTokenKey] != "") ? process.env[envTokenKey] : (fs.existsSync(inClusterTokenFile)) ? fs.readFileSync(inClusterTokenFile, 'utf-8') : "";
        const clusterCAFile = (process.env[envCAFileKey] != undefined && process.env[envCAFileKey] != "") ? process.env[envCAFileKey] : (fs.existsSync(inClusterCAFile)) ? inClusterCAFile : "";
        if (token == "") {
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
        clusterUrl = `https://${process.env[envSvcHostKey]}:${process.env[envSvcPortKey]}`
        ca = fs.readFileSync(clusterCAFile, 'utf-8')
    }
    const httpsAgent = new https.Agent({
        ca,
        ...(key==undefined?{}:{key}),
        ...(cert==undefined?{}:{cert}),
    });
    if(token!=undefined) headers['Authorization'] = `Bearer ${token}`
    return { clusterUrl, httpsAgent, headers }
}
const { clusterUrl, httpsAgent: agent, headers } = setupKube()
console.log('Using :', clusterUrl)
export async function getClusterByPath(path: string) {
    return await fetch(`${clusterUrl}/${path}`, {agent, headers}).then( r => r.json())
}
