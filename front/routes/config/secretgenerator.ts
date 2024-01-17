import {menuLinksProps} from '../interfaces';
const cat = 'config';
const iconBasicAuth = 'fas fa-user-secret';
const iconSSHKeyPair = 'fab fa-keycdn';
const iconStringSecret = 'key';
export const link:menuLinksProps = {
  title: 'Secretgenerator', icon: iconBasicAuth,
  link: `/${cat}/secretgenerator/basicauths/`,
  level: 1,
  children: [
  {
    title: 'BasicAuth', caption: 'List basicAuth', icon: 'fas fa-user-secret',
    link: `/${cat}/secretgenerator/basicauths/`, level: 2, children: []
  },
  {
    title: 'SSHKeyPair', caption: 'List SSHKeyPair', icon: 'fab fa-keycdn',
    link: `/${cat}/secretgenerator/sshkeypairs/`, level: 2, children: []
  },
  {
    title: 'StringSecret', caption: 'List stringSecret', icon: 'key',
    link: `/${cat}/secretgenerator/stringsecrets/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  secretgenerator:                {breadcrumb: 'Secretgenerator', icon: iconBasicAuth, ns: false},
  secretgeneratorBasicAuths:        {breadcrumb: 'BasicAuth', icon: iconBasicAuth, ns: false},
  secretgeneratorBasicAuthAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  secretgeneratorBasicAuthTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  secretgeneratorBasicAuthView:     {breadcrumb: 'View', icon: iconBasicAuth, ns: true},
  secretgeneratorBasicAuthEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  secretgeneratorBasicAuthCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  secretgeneratorSSHKeyPairs:        {breadcrumb: 'SSHKeyPair', icon: iconSSHKeyPair, ns: false},
  secretgeneratorSSHKeyPairAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  secretgeneratorSSHKeyPairTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  secretgeneratorSSHKeyPairView:     {breadcrumb: 'View', icon: iconSSHKeyPair, ns: true},
  secretgeneratorSSHKeyPairEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  secretgeneratorSSHKeyPairCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  secretgeneratorStringSecrets:        {breadcrumb: 'StringSecret', icon: iconStringSecret, ns: false},
  secretgeneratorStringSecretAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  secretgeneratorStringSecretTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  secretgeneratorStringSecretView:     {breadcrumb: 'View', icon: iconStringSecret, ns: true},
  secretgeneratorStringSecretEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  secretgeneratorStringSecretCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'secretgenerator',
  name: 'secretgenerator',
  children: [
    {
      path: 'basicauths',
      name: 'secretgeneratorBasicAuths',
      children: [
        {
          path: '',
          name: 'secretgeneratorBasicAuthAllTable',
          component: () => import('../../components/secretgenerator/BasicAuthAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'secretgeneratorBasicAuthTable',
          component: () => import('../../components/secretgenerator/BasicAuthTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'secretgeneratorBasicAuthView',
          component: () => import('../../components/secretgenerator/BasicAuthView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'secretgeneratorBasicAuthEdit',
          component: () => import('../../components/secretgenerator/BasicAuthEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'secretgeneratorBasicAuthCreate',
          component: () => import('../../components/secretgenerator/BasicAuthNew.vue'),
        }
      ]
    },
    {
      path: 'sshkeypairs',
      name: 'secretgeneratorSSHKeyPairs',
      children: [
        {
          path: '',
          name: 'secretgeneratorSSHKeyPairAllTable',
          component: () => import('../../components/secretgenerator/SSHKeyPairAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'secretgeneratorSSHKeyPairTable',
          component: () => import('../../components/secretgenerator/SSHKeyPairTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'secretgeneratorSSHKeyPairView',
          component: () => import('../../components/secretgenerator/SSHKeyPairView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'secretgeneratorSSHKeyPairEdit',
          component: () => import('../../components/secretgenerator/SSHKeyPairEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'secretgeneratorSSHKeyPairCreate',
          component: () => import('../../components/secretgenerator/SSHKeyPairNew.vue'),
        }
      ]
    },
    {
      path: 'stringsecrets',
      name: 'secretgeneratorStringSecrets',
      children: [
        {
          path: '',
          name: 'secretgeneratorStringSecretAllTable',
          component: () => import('../../components/secretgenerator/StringSecretAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'secretgeneratorStringSecretTable',
          component: () => import('../../components/secretgenerator/StringSecretTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'secretgeneratorStringSecretView',
          component: () => import('../../components/secretgenerator/StringSecretView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'secretgeneratorStringSecretEdit',
          component: () => import('../../components/secretgenerator/StringSecretEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'secretgeneratorStringSecretCreate',
          component: () => import('../../components/secretgenerator/StringSecretNew.vue'),
        }
      ]
    },
  ],
}
export default route
