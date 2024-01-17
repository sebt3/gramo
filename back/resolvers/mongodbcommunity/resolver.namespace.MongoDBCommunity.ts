import { lists } from './query.MongoDBCommunity.js'
export const resolver = {
    mongodbcommunityMongoDBCommunitys: async (parent, args: object) => {
        return lists.mongodbcommunityMongoDBCommunitys(parent,{namespace: parent.metadata.name, ...args})
    }
};
