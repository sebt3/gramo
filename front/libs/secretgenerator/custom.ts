// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
import { configColor } from '../../routes/custom';
export const secretgeneratorIcon = 'key';
export const secretgeneratorTitle = 'Secrets generator';
export const iconBasicAuth = 'fas fa-user-secret';
export const iconSSHKeyPair = 'fab fa-keycdn';
export const iconStringSecret = 'key';
export const colorBasicAuth = configColor;
export const descriptionBasicAuth = '';
export const shortBasicAuth = 'BasicAuth';
export const colorSSHKeyPair = configColor;
export const descriptionSSHKeyPair = '';
export const shortSSHKeyPair = 'SSHKeyPair';
export const colorStringSecret = configColor;
export const descriptionStringSecret = '';
export const shortStringSecret = 'StringSecret';
export const extraBasicAuthColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraSSHKeyPairColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraStringSecretColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const BasicAuthListExcludes = [
];
export const BasicAuthReadExcludes = [
];
export const BasicAuthSimpleExcludes = [
];
export const SSHKeyPairListExcludes = [
];
export const SSHKeyPairReadExcludes = [
];
export const SSHKeyPairSimpleExcludes = [
];
export const StringSecretListExcludes = [
];
export const StringSecretReadExcludes = [
];
export const StringSecretSimpleExcludes = [
];
