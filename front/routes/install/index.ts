import { route as vynilRoute, link as vynilLink } from './vynil'
const vynilRedirect = vynilRoute.redirect!=undefined?vynilRoute.redirect:{path: '/install/vynil'}
export const link = {
  title: 'Installation', caption: 'de composants', icon: 'album',
  link: vynilRedirect.path,
  level: 0,
  children: [vynilLink]
}
export const route = {
  path: 'install',
  name: 'install',
  redirect: vynilRedirect,
  children: [vynilRoute]
}
export default route
