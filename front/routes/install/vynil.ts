import { storeToRefs } from 'pinia'
import { useNavigationStore } from '../../stores/navigation'
const navigation = useNavigationStore()
const installRedirect = {path: '/install/vynil/installs/'+navigation.namespace}
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
          component: () => import('../../components/vynil/TableInstalls.vue'),
        }
      /*
        {
          path: ':namespace/:install',
          component: () => import('../../components/vynil/ViewInstall.vue'),
        },
        {
          path: ':namespace/:install/edit',
          component: () => import('../../components/vynil/EditInstall.vue'),
        },
      */
      ]
    },
  ],
}
export default route