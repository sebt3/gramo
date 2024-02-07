import {menuLinksProps} from '../interfaces';
import { iconPersistentVolume, iconPersistentVolumeClaim, iconStorageClass, iconCSIDriver, iconCSINode, iconCSIStorageCapacity, iconVolumeAttachment,  k8sIcon, k8sTitle }from '../../libs/k8s/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'storagek8s',
  title: k8sTitle, icon: k8sIcon,
  link: '/storage/k8s/',
  level: 1,
  children: [
  [{
    name: 'k8sPersistentVolumes',
    title: 'PersistentVolume', caption: 'List PersistentVolume', icon: iconPersistentVolume,
    link: '/storage/k8s/PersistentVolume/', level: 2, children: []
  }],
  [{
    name: 'k8sPersistentVolumeClaims',
    title: 'PersistentVolumeClaim', caption: 'List PersistentVolumeClaim', icon: iconPersistentVolumeClaim,
    link: '/storage/k8s/PersistentVolumeClaim/', level: 2, children: []
  }],
  [{
    name: 'k8sStorageClasss',
    title: 'StorageClass', caption: 'List StorageClass', icon: iconStorageClass,
    link: '/storage/k8s/StorageClass/', level: 2, children: []
  }],
  [{
    name: 'k8sCSIDrivers',
    title: 'CSIDriver', caption: 'List CSIDriver', icon: iconCSIDriver,
    link: '/storage/k8s/CSIDriver/', level: 2, children: []
  }],
  [{
    name: 'k8sCSINodes',
    title: 'CSINode', caption: 'List CSINode', icon: iconCSINode,
    link: '/storage/k8s/CSINode/', level: 2, children: []
  }],
  [{
    name: 'k8sCSIStorageCapacitys',
    title: 'CSIStorageCapacity', caption: 'List CSIStorageCapacity', icon: iconCSIStorageCapacity,
    link: '/storage/k8s/CSIStorageCapacity/', level: 2, children: []
  }],
  [{
    name: 'k8sVolumeAttachments',
    title: 'VolumeAttachment', caption: 'List VolumeAttachment', icon: iconVolumeAttachment,
    link: '/storage/k8s/VolumeAttachment/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  storagek8s:                {breadcrumb: k8sTitle, icon: k8sIcon, ns: false},
  storagek8sDashboard:       {breadcrumb: 'Dashboard', icon: k8sIcon, ns: false},
  k8sPersistentVolume:        {breadcrumb: 'PersistentVolume', icon: iconPersistentVolume, ns: false},
  k8sPersistentVolumeTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sPersistentVolumeView:     {breadcrumb: 'View', icon: iconPersistentVolume, ns: false },
  k8sPersistentVolumeEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sPersistentVolumeCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sPersistentVolumeClaim:        {breadcrumb: 'PersistentVolumeClaim', icon: iconPersistentVolumeClaim, ns: false},
  k8sPersistentVolumeClaimAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sPersistentVolumeClaimTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sPersistentVolumeClaimView:     {breadcrumb: 'View', icon: iconPersistentVolumeClaim, ns: true },
  k8sPersistentVolumeClaimEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sPersistentVolumeClaimCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sStorageClass:        {breadcrumb: 'StorageClass', icon: iconStorageClass, ns: false},
  k8sStorageClassTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sStorageClassView:     {breadcrumb: 'View', icon: iconStorageClass, ns: false },
  k8sStorageClassEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sStorageClassCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sCSIDriver:        {breadcrumb: 'CSIDriver', icon: iconCSIDriver, ns: false},
  k8sCSIDriverTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sCSIDriverView:     {breadcrumb: 'View', icon: iconCSIDriver, ns: false },
  k8sCSIDriverEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sCSIDriverCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sCSINode:        {breadcrumb: 'CSINode', icon: iconCSINode, ns: false},
  k8sCSINodeTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sCSINodeView:     {breadcrumb: 'View', icon: iconCSINode, ns: false },
  k8sCSINodeEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sCSINodeCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sCSIStorageCapacity:        {breadcrumb: 'CSIStorageCapacity', icon: iconCSIStorageCapacity, ns: false},
  k8sCSIStorageCapacityAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sCSIStorageCapacityTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sCSIStorageCapacityView:     {breadcrumb: 'View', icon: iconCSIStorageCapacity, ns: true },
  k8sCSIStorageCapacityEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sCSIStorageCapacityCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sVolumeAttachment:        {breadcrumb: 'VolumeAttachment', icon: iconVolumeAttachment, ns: false},
  k8sVolumeAttachmentTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sVolumeAttachmentView:     {breadcrumb: 'View', icon: iconVolumeAttachment, ns: false },
  k8sVolumeAttachmentEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sVolumeAttachmentCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
}
export const route = {
  path: 'k8s',
  name: 'storagek8s',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'storagek8sDashboard',
      component: () => import('../../pages/storage/k8s/Dashboard.vue'),
    },
    {
      path: 'PersistentVolume',
      name: 'k8sPersistentVolume',
      children: [
        {
          path: '',
          name: 'k8sPersistentVolumeTable',
          component: () => import('../../pages/storage/k8s/PersistentVolumeList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sPersistentVolumeView',
          component: () => import('../../pages/storage/k8s/PersistentVolumeView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sPersistentVolumeEdit',
          component: () => import('../../pages/storage/k8s/PersistentVolumeEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sPersistentVolumeCreate',
          component: () => import('../../pages/storage/k8s/PersistentVolumeNew.vue'),
        }
      ]
    },
    {
      path: 'PersistentVolumeClaim',
      name: 'k8sPersistentVolumeClaim',
      children: [
        {
          path: '',
          name: 'k8sPersistentVolumeClaimAllTable',
          component: () => import('../../pages/storage/k8s/PersistentVolumeClaimList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sPersistentVolumeClaimTable',
          component: () => import('../../pages/storage/k8s/PersistentVolumeClaimList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sPersistentVolumeClaimView',
          component: () => import('../../pages/storage/k8s/PersistentVolumeClaimView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sPersistentVolumeClaimEdit',
          component: () => import('../../pages/storage/k8s/PersistentVolumeClaimEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sPersistentVolumeClaimCreate',
          component: () => import('../../pages/storage/k8s/PersistentVolumeClaimNew.vue'),
        }
      ]
    },
    {
      path: 'StorageClass',
      name: 'k8sStorageClass',
      children: [
        {
          path: '',
          name: 'k8sStorageClassTable',
          component: () => import('../../pages/storage/k8s/StorageClassList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sStorageClassView',
          component: () => import('../../pages/storage/k8s/StorageClassView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sStorageClassEdit',
          component: () => import('../../pages/storage/k8s/StorageClassEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sStorageClassCreate',
          component: () => import('../../pages/storage/k8s/StorageClassNew.vue'),
        }
      ]
    },
    {
      path: 'CSIDriver',
      name: 'k8sCSIDriver',
      children: [
        {
          path: '',
          name: 'k8sCSIDriverTable',
          component: () => import('../../pages/storage/k8s/CSIDriverList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sCSIDriverView',
          component: () => import('../../pages/storage/k8s/CSIDriverView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sCSIDriverEdit',
          component: () => import('../../pages/storage/k8s/CSIDriverEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sCSIDriverCreate',
          component: () => import('../../pages/storage/k8s/CSIDriverNew.vue'),
        }
      ]
    },
    {
      path: 'CSINode',
      name: 'k8sCSINode',
      children: [
        {
          path: '',
          name: 'k8sCSINodeTable',
          component: () => import('../../pages/storage/k8s/CSINodeList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sCSINodeView',
          component: () => import('../../pages/storage/k8s/CSINodeView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sCSINodeEdit',
          component: () => import('../../pages/storage/k8s/CSINodeEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sCSINodeCreate',
          component: () => import('../../pages/storage/k8s/CSINodeNew.vue'),
        }
      ]
    },
    {
      path: 'CSIStorageCapacity',
      name: 'k8sCSIStorageCapacity',
      children: [
        {
          path: '',
          name: 'k8sCSIStorageCapacityAllTable',
          component: () => import('../../pages/storage/k8s/CSIStorageCapacityList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sCSIStorageCapacityTable',
          component: () => import('../../pages/storage/k8s/CSIStorageCapacityList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sCSIStorageCapacityView',
          component: () => import('../../pages/storage/k8s/CSIStorageCapacityView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sCSIStorageCapacityEdit',
          component: () => import('../../pages/storage/k8s/CSIStorageCapacityEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sCSIStorageCapacityCreate',
          component: () => import('../../pages/storage/k8s/CSIStorageCapacityNew.vue'),
        }
      ]
    },
    {
      path: 'VolumeAttachment',
      name: 'k8sVolumeAttachment',
      children: [
        {
          path: '',
          name: 'k8sVolumeAttachmentTable',
          component: () => import('../../pages/storage/k8s/VolumeAttachmentList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sVolumeAttachmentView',
          component: () => import('../../pages/storage/k8s/VolumeAttachmentView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sVolumeAttachmentEdit',
          component: () => import('../../pages/storage/k8s/VolumeAttachmentEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sVolumeAttachmentCreate',
          component: () => import('../../pages/storage/k8s/VolumeAttachmentNew.vue'),
        }
      ]
    },
  ],
}
export default route
