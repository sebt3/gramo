
import { queries as ArchiveQueries } from './query.Archive.js';
import { mutations as ArchiveMutations } from './mutation.Archive.js';
import { queries as BackupQueries } from './query.Backup.js';
import { mutations as BackupMutations } from './mutation.Backup.js';
import { queries as CheckQueries } from './query.Check.js';
import { mutations as CheckMutations } from './mutation.Check.js';
import { queries as PreBackupPodQueries } from './query.PreBackupPod.js';
import { mutations as PreBackupPodMutations } from './mutation.PreBackupPod.js';
import { queries as PruneQueries } from './query.Prune.js';
import { mutations as PruneMutations } from './mutation.Prune.js';
import { queries as RestoreQueries } from './query.Restore.js';
import { mutations as RestoreMutations } from './mutation.Restore.js';
import { queries as ScheduleQueries } from './query.Schedule.js';
import { mutations as ScheduleMutations } from './mutation.Schedule.js';
import { queries as SnapshotQueries } from './query.Snapshot.js';
import { mutations as SnapshotMutations } from './mutation.Snapshot.js';
export const queries = {
    ...ArchiveQueries,
    ...BackupQueries,
    ...CheckQueries,
    ...PreBackupPodQueries,
    ...PruneQueries,
    ...RestoreQueries,
    ...ScheduleQueries,
    ...SnapshotQueries,
};

export const resolvers = {
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
};
