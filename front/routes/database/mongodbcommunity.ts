import {menuLinksProps} from '../interfaces';
const cat = 'database';
const iconMongoDB = 'data_object';
const iconMongoDBCommunity = 'fas fa-database';
export const link:menuLinksProps = {
  title: 'MongoDB', icon: iconMongoDB,
  link: `/${cat}/mongodbcommunity/mongodbcommunity/`,
  name: 'mongodbcommunity',
  level: 1,
  children: [
  {
    name: 'mongodbcommunityMongoDBCommunitys',
    title: 'MongoDBCommunity', caption: 'List mongoDBCommunity', icon: iconMongoDBCommunity,
    link: `/${cat}/mongodbcommunity/mongodbcommunity/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  mongodbcommunity:                {breadcrumb: 'MongoDB', icon: iconMongoDB, ns: false},
  mongodbcommunityMongoDBCommunitys:        {breadcrumb: 'MongoDBCommunity', icon: iconMongoDBCommunity, ns: false},
  mongodbcommunityMongoDBCommunityAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mongodbcommunityMongoDBCommunityTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mongodbcommunityMongoDBCommunityView:     {breadcrumb: 'View', icon: 'fas fa-database', ns: true},
  mongodbcommunityMongoDBCommunityEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mongodbcommunityMongoDBCommunityCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'mongodbcommunity',
  name: 'mongodbcommunity',
  redirect: {path: link.link as string},
  children: [
    {
      path: 'mongodbcommunity',
      name: 'mongodbcommunityMongoDBCommunitys',
      children: [
        {
          path: '',
          name: 'mongodbcommunityMongoDBCommunityAllTable',
          component: () => import('../../components/mongodbcommunity/MongoDBCommunityAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mongodbcommunityMongoDBCommunityTable',
          component: () => import('../../components/mongodbcommunity/MongoDBCommunityTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mongodbcommunityMongoDBCommunityView',
          component: () => import('../../components/mongodbcommunity/MongoDBCommunityView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mongodbcommunityMongoDBCommunityEdit',
          component: () => import('../../components/mongodbcommunity/MongoDBCommunityEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mongodbcommunityMongoDBCommunityCreate',
          component: () => import('../../components/mongodbcommunity/MongoDBCommunityNew.vue'),
        }
      ]
    },
  ],
}
export default route
