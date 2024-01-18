import {menuLinksProps} from '../interfaces';
const cat = 'automation';
const iconHelmRelease = 'auto_mode';
export const link:menuLinksProps = {
  title: 'Fluxcd', icon: iconHelmRelease,
  link: `/${cat}/fluxcd/helmreleases/`,
  name: 'fluxcd',
  level: 1,
  children: [
  {
    name: 'fluxcdHelmReleases',
    title: 'HelmRelease', caption: 'List helmRelease', icon: 'auto_mode',
    link: `/${cat}/fluxcd/helmreleases/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  fluxcdHelmReleases:        {breadcrumb: 'HelmRelease', icon: iconHelmRelease, ns: false},
  fluxcdHelmReleaseAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdHelmReleaseTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdHelmReleaseView:     {breadcrumb: 'View', icon: iconHelmRelease, ns: true},
  fluxcdHelmReleaseEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdHelmReleaseCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'fluxcd',
  name: 'fluxcd',
  children: [
    {
      path: 'helmreleases',
      name: 'fluxcdHelmReleases',
      children: [
        {
          path: '',
          name: 'fluxcdHelmReleaseAllTable',
          component: () => import('../../components/fluxcd/HelmReleaseAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdHelmReleaseTable',
          component: () => import('../../components/fluxcd/HelmReleaseTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdHelmReleaseView',
          component: () => import('../../components/fluxcd/HelmReleaseView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdHelmReleaseEdit',
          component: () => import('../../components/fluxcd/HelmReleaseEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdHelmReleaseCreate',
          component: () => import('../../components/fluxcd/HelmReleaseNew.vue'),
        }
      ]
    },
  ],
}
export default route
