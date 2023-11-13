import { VynilPackage } from './type.Package.js';
import { queries as distribQueries } from './query.Distrib.js';
import NodeCache from 'node-cache';

const vynilCache = new NodeCache();
export async function getPackages() {
  let list  = vynilCache.get('packages') as VynilPackage[]
  if (list == undefined) {
    list = new Array()
    try {
      const dists = await distribQueries.vynilDistribs()
      dists.forEach((dist) => {
        const distName = dist.metadata?.name;
        Object.entries(dist.status.components).forEach(([category, pkgs])  => {
          Object.entries(pkgs).forEach(([name, pkg])  => {
            const item = Object.assign({}, pkg) as VynilPackage
            item.name = name;
            item.distrib = distName as string;
            item.category = category;
            list.push(item)
          })
        })
      });
    } catch (err) {
      console.error(err);
    }
    vynilCache.set('packages', list, 2)
  }
  return list
}
