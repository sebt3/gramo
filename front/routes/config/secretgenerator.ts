import {menuLinksProps} from '../interfaces';
import { iconBasicAuth, iconSSHKeyPair, iconStringSecret,  secretgeneratorIcon, secretgeneratorTitle }from '../../libs/secretgenerator/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'configsecretgenerator',
  title: secretgeneratorTitle, icon: secretgeneratorIcon,
  link: '/config/secretgenerator/',
  level: 1,
  children: [
  crds['basicauths.secretgenerator.mittwald.de'] == undefined?[]:[{
    name: 'secretgeneratorBasicAuths',
    title: 'BasicAuth', caption: 'List BasicAuth', icon: iconBasicAuth,
    link: '/config/secretgenerator/BasicAuth/', level: 2, children: []
  }],
  crds['sshkeypairs.secretgenerator.mittwald.de'] == undefined?[]:[{
    name: 'secretgeneratorSSHKeyPairs',
    title: 'SSHKeyPair', caption: 'List SSHKeyPair', icon: iconSSHKeyPair,
    link: '/config/secretgenerator/SSHKeyPair/', level: 2, children: []
  }],
  crds['stringsecrets.secretgenerator.mittwald.de'] == undefined?[]:[{
    name: 'secretgeneratorStringSecrets',
    title: 'StringSecret', caption: 'List StringSecret', icon: iconStringSecret,
    link: '/config/secretgenerator/StringSecret/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  configsecretgenerator:                {breadcrumb: secretgeneratorTitle, icon: secretgeneratorIcon, ns: false},
  configsecretgeneratorDashboard:       {breadcrumb: 'Dashboard', icon: secretgeneratorIcon, ns: false},
  secretgeneratorBasicAuth:        {breadcrumb: 'BasicAuth', icon: iconBasicAuth, ns: false},
  secretgeneratorBasicAuthAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  secretgeneratorBasicAuthTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  secretgeneratorBasicAuthView:     {breadcrumb: 'View', icon: iconBasicAuth, ns: true },
  secretgeneratorBasicAuthEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  secretgeneratorBasicAuthCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  secretgeneratorSSHKeyPair:        {breadcrumb: 'SSHKeyPair', icon: iconSSHKeyPair, ns: false},
  secretgeneratorSSHKeyPairAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  secretgeneratorSSHKeyPairTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  secretgeneratorSSHKeyPairView:     {breadcrumb: 'View', icon: iconSSHKeyPair, ns: true },
  secretgeneratorSSHKeyPairEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  secretgeneratorSSHKeyPairCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  secretgeneratorStringSecret:        {breadcrumb: 'StringSecret', icon: iconStringSecret, ns: false},
  secretgeneratorStringSecretAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  secretgeneratorStringSecretTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  secretgeneratorStringSecretView:     {breadcrumb: 'View', icon: iconStringSecret, ns: true },
  secretgeneratorStringSecretEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  secretgeneratorStringSecretCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'secretgenerator',
  name: 'configsecretgenerator',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'configsecretgeneratorDashboard',
      component: () => import('../../pages/config/secretgenerator/Dashboard.vue'),
    },
    {
      path: 'BasicAuth',
      name: 'secretgeneratorBasicAuth',
      children: [
        {
          path: '',
          name: 'secretgeneratorBasicAuthAllTable',
          component: () => import('../../pages/config/secretgenerator/BasicAuthList.vue'),
        },
        {
          path: ':namespace',
          name: 'secretgeneratorBasicAuthTable',
          component: () => import('../../pages/config/secretgenerator/BasicAuthList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'secretgeneratorBasicAuthView',
          component: () => import('../../pages/config/secretgenerator/BasicAuthView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'secretgeneratorBasicAuthEdit',
          component: () => import('../../pages/config/secretgenerator/BasicAuthEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'secretgeneratorBasicAuthCreate',
          component: () => import('../../pages/config/secretgenerator/BasicAuthNew.vue'),
        }
      ]
    },
    {
      path: 'SSHKeyPair',
      name: 'secretgeneratorSSHKeyPair',
      children: [
        {
          path: '',
          name: 'secretgeneratorSSHKeyPairAllTable',
          component: () => import('../../pages/config/secretgenerator/SSHKeyPairList.vue'),
        },
        {
          path: ':namespace',
          name: 'secretgeneratorSSHKeyPairTable',
          component: () => import('../../pages/config/secretgenerator/SSHKeyPairList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'secretgeneratorSSHKeyPairView',
          component: () => import('../../pages/config/secretgenerator/SSHKeyPairView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'secretgeneratorSSHKeyPairEdit',
          component: () => import('../../pages/config/secretgenerator/SSHKeyPairEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'secretgeneratorSSHKeyPairCreate',
          component: () => import('../../pages/config/secretgenerator/SSHKeyPairNew.vue'),
        }
      ]
    },
    {
      path: 'StringSecret',
      name: 'secretgeneratorStringSecret',
      children: [
        {
          path: '',
          name: 'secretgeneratorStringSecretAllTable',
          component: () => import('../../pages/config/secretgenerator/StringSecretList.vue'),
        },
        {
          path: ':namespace',
          name: 'secretgeneratorStringSecretTable',
          component: () => import('../../pages/config/secretgenerator/StringSecretList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'secretgeneratorStringSecretView',
          component: () => import('../../pages/config/secretgenerator/StringSecretView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'secretgeneratorStringSecretEdit',
          component: () => import('../../pages/config/secretgenerator/StringSecretEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'secretgeneratorStringSecretCreate',
          component: () => import('../../pages/config/secretgenerator/StringSecretNew.vue'),
        }
      ]
    },
  ],
}
export default route
