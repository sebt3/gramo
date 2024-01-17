import {menuLinksProps} from '../interfaces';
const cat = 'database';
const iconMongoDBCommunity = 'data_object';
export const link:menuLinksProps = {
  title: 'MongoDB', icon: iconMongoDBCommunity,
  link: `/${cat}/mongodbcommunity/mongodbcommunity/`,
  level: 1,
  children: [
  {
    title: 'MongoDBCommunity', caption: 'List mongoDBCommunity', icon: 'fas fa-database',
    link: `/${cat}/mongodbcommunity/mongodbcommunity/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  mongodbcommunity:                {breadcrumb: 'MongoDB', icon: iconMongoDBCommunity, ns: false},
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
