import { useNavigationStore } from '../../stores/navigation'
const installRedirect = {path: '/install/vynil/installs/'+useNavigationStore().namespace}
export const link = {
  title: 'Vynil', icon: 'album',
  link: installRedirect.path,
  level: 1,
  children: [{
    title: 'Installations', caption: 'Install vynil packages', icon: 'album',
    link: installRedirect.path, level: 2, children: []
  }]
}
export const route = {
  path: 'vynil',
  name: 'vynil',
  redirect: installRedirect,
  children: [
    {
      path: 'installs',
      name: 'vynilInstalls',
      redirect: installRedirect,
      children: [
        {
          path: ':namespace?',
          name: 'vynilInstallTable',
          component: () => import('../../components/vynil/InstallTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'vynilInstallView',
          component: () => import('../../components/vynil/InstallView.vue'),
        }/*,
        {
          path: ':namespace/edit/:name',
          name: 'vynilInstallEdit',
          component: () => import('../../components/vynil/EditInstall.vue'),
        },
        {
          path: ':namespace/create',
          name: 'vynilInstallCreate',
          component: () => import('../../components/vynil/CreateInstall.vue'),
        }*/
      ]
    },
  ],
}
export default route