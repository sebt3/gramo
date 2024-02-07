import { nsResolver as ArchiveNSresolver } from '../k8up/Archive.js';
import { nsResolver as BackupNSresolver } from '../k8up/Backup.js';
import { nsResolver as CheckNSresolver } from '../k8up/Check.js';
import { nsResolver as PreBackupPodNSresolver } from '../k8up/PreBackupPod.js';
import { nsResolver as PruneNSresolver } from '../k8up/Prune.js';
import { nsResolver as RestoreNSresolver } from '../k8up/Restore.js';
import { nsResolver as ScheduleNSresolver } from '../k8up/Schedule.js';
import { nsResolver as SnapshotNSresolver } from '../k8up/Snapshot.js';
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
