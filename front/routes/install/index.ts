import {menuLinksProps} from '../interfaces';
import { route as vynilRoute, link as vynilLink, descriptions as vynilDescriptions } from './vynil'
const vynilRedirect = vynilRoute['redirect']!=undefined?vynilRoute['redirect']:{path: '/install/vynil'}
export const link:menuLinksProps = {
  title: 'Installation', caption: "d'applications", icon: 'apps',
  link: vynilRedirect.path,
  level: 0,
  children: [vynilLink]
}
export const descriptions = {
  install:      {breadcrumb: 'Applications', icon: 'apps', ns: false},
  ...vynilDescriptions
}

export const route = {
  path: 'install',
  name: 'install',
  redirect: vynilRedirect,
  children: [vynilRoute]
}
export default route
