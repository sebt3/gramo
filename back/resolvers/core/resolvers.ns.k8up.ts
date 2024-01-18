
import { resolver as ArchiveNSresolver } from '../k8up/resolver.namespace.Archive.js';
import { resolver as BackupNSresolver } from '../k8up/resolver.namespace.Backup.js';
import { resolver as CheckNSresolver } from '../k8up/resolver.namespace.Check.js';
import { resolver as PreBackupPodNSresolver } from '../k8up/resolver.namespace.PreBackupPod.js';
import { resolver as PruneNSresolver } from '../k8up/resolver.namespace.Prune.js';
import { resolver as RestoreNSresolver } from '../k8up/resolver.namespace.Restore.js';
import { resolver as ScheduleNSresolver } from '../k8up/resolver.namespace.Schedule.js';
import { resolver as SnapshotNSresolver } from '../k8up/resolver.namespace.Snapshot.js';
export const resolvers = {
    ...ArchiveNSresolver,
    ...BackupNSresolver,
    ...CheckNSresolver,
    ...PreBackupPodNSresolver,
    ...PruneNSresolver,
    ...RestoreNSresolver,
    ...ScheduleNSresolver,
    ...SnapshotNSresolver,
};
