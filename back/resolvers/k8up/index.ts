import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as ArchiveMutations, resolvers as ArchiveResolvers } from './Archive.js';
import { mutations as BackupMutations, resolvers as BackupResolvers } from './Backup.js';
import { mutations as CheckMutations, resolvers as CheckResolvers } from './Check.js';
import { mutations as PreBackupPodMutations, resolvers as PreBackupPodResolvers } from './PreBackupPod.js';
import { mutations as PruneMutations, resolvers as PruneResolvers } from './Prune.js';
import { mutations as RestoreMutations, resolvers as RestoreResolvers } from './Restore.js';
import { mutations as ScheduleMutations, resolvers as ScheduleResolvers } from './Schedule.js';
import { mutations as SnapshotMutations, resolvers as SnapshotResolvers } from './Snapshot.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...ArchiveResolvers,
    ...BackupResolvers,
    ...CheckResolvers,
    ...PreBackupPodResolvers,
    ...PruneResolvers,
    ...RestoreResolvers,
    ...ScheduleResolvers,
    ...SnapshotResolvers,
    ...customResolvers
};

export const mutations = {
    ...ArchiveMutations,
    ...BackupMutations,
    ...CheckMutations,
    ...PreBackupPodMutations,
    ...PruneMutations,
    ...RestoreMutations,
    ...ScheduleMutations,
    ...SnapshotMutations,
    ...customMutations
};
