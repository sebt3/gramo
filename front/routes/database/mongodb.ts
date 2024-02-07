import {menuLinksProps} from '../interfaces';
import { iconMongoDBCommunity,  mongodbIcon, mongodbTitle }from '../../libs/mongodb/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'databasemongodb',
  title: mongodbTitle, icon: mongodbIcon,
  link: '/database/mongodb/',
  level: 1,
  children: [
  crds['mongodbcommunity.mongodbcommunity.mongodb.com'] == undefined?[]:[{
    name: 'mongodbMongoDBCommunitys',
    title: 'MongoDBCommunity', caption: 'List MongoDBCommunity', icon: iconMongoDBCommunity,
    link: '/database/mongodb/MongoDBCommunity/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  databasemongodb:                {breadcrumb: mongodbTitle, icon: mongodbIcon, ns: false},
  databasemongodbDashboard:       {breadcrumb: 'Dashboard', icon: mongodbIcon, ns: false},
  mongodbMongoDBCommunity:        {breadcrumb: 'MongoDBCommunity', icon: iconMongoDBCommunity, ns: false},
  mongodbMongoDBCommunityAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mongodbMongoDBCommunityTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  mongodbMongoDBCommunityView:     {breadcrumb: 'View', icon: iconMongoDBCommunity, ns: true },
  mongodbMongoDBCommunityEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  mongodbMongoDBCommunityCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'mongodb',
  name: 'databasemongodb',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'databasemongodbDashboard',
      component: () => import('../../pages/database/mongodb/Dashboard.vue'),
    },
    {
      path: 'MongoDBCommunity',
      name: 'mongodbMongoDBCommunity',
      children: [
        {
          path: '',
          name: 'mongodbMongoDBCommunityAllTable',
          component: () => import('../../pages/database/mongodb/MongoDBCommunityList.vue'),
        },
        {
          path: ':namespace',
          name: 'mongodbMongoDBCommunityTable',
          component: () => import('../../pages/database/mongodb/MongoDBCommunityList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mongodbMongoDBCommunityView',
          component: () => import('../../pages/database/mongodb/MongoDBCommunityView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mongodbMongoDBCommunityEdit',
          component: () => import('../../pages/database/mongodb/MongoDBCommunityEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mongodbMongoDBCommunityCreate',
          component: () => import('../../pages/database/mongodb/MongoDBCommunityNew.vue'),
        }
      ]
    },
  ],
}
export default route
