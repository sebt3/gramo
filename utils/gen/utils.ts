import {HashMap,k8sObject} from './types.js'
export function getTargetVersion(versions: HashMap<k8sObject>) {
    const targetVersion = Object.keys(versions).reduce((res,item) => res<item?item:res,"");
    const regexpV1 = new RegExp('^v1')
    return Object.keys(versions).includes('v1') && regexpV1.test(targetVersion)? 'v1': targetVersion;
}
export function getBaseName(key:string) {
    const isFlux = /toolkit\.fluxcd\.io$/
    return ['crd.projectcalico.org'].includes(key)?key.split('.')[1]:
    isFlux.test(key)?`${key.split('.')[2]}.${key.split('.')[0]}`:key.split('.')[0];
}
export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function minimizeFirstLetter(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
