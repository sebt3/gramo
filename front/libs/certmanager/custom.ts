// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign, timeAgo } from '../core'
import { networkColor, networkIcon } from '../../routes/custom';
import { i18n } from "../i18n"
export const certmanagerIcon = networkIcon;
export const certmanagerTitle = 'cert-manager';
export const iconChallenge = networkIcon;
export const colorChallenge = networkColor;
export const descriptionChallenge = '';
export const shortChallenge = 'Challenge';
export const iconOrder = networkIcon;
export const colorOrder = networkColor;
export const descriptionOrder = '';
export const shortOrder = 'Order';
export const iconCertificate = networkIcon;
export const colorCertificate = networkColor;
export const descriptionCertificate = '';
export const shortCertificate = 'Certificate';
export const iconCertificateRequest = networkIcon;
export const colorCertificateRequest = networkColor;
export const descriptionCertificateRequest = '';
export const shortCertificateRequest = 'CertificateRequest';
export const iconClusterIssuer = networkIcon;
export const colorClusterIssuer = networkColor;
export const descriptionClusterIssuer = '';
export const shortClusterIssuer = 'ClusterIssuer';
export const iconIssuer = networkIcon;
export const colorIssuer = networkColor;
export const descriptionIssuer = '';
export const shortIssuer = 'Issuer';
export const extraChallengeColumns:Array<QTableColumn> = [
  {name: 'Domain', label: i18n.global.t('certmanager.Domain'), field: row => row.spec.dnsName, sortable: true, align: tableColumnAlign.left},
  {name: 'Reason', label: i18n.global.t('certmanager.Reason'), field: row => row.status.reason, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: i18n.global.t('meta.age'), field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraOrderColumns:Array<QTableColumn> = [
  {name: 'Issuer', label: i18n.global.t('certmanager.Issuer'), field: row => row.spec.issuerRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Reason', label: i18n.global.t('certmanager.Reason'), field: row => row.status.reason, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: i18n.global.t('meta.age'), field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraCertificateColumns:Array<QTableColumn> = [
  {name: 'Secret', label: i18n.global.t('certmanager.Secret'), field: row => row.spec.secretName, sortable: true, align: tableColumnAlign.left},
  {name: 'Issuer', label: i18n.global.t('certmanager.Issuer'), field: row => row.spec.issuerRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: i18n.global.t('meta.age'), field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraCertificateRequestColumns:Array<QTableColumn> = [
  {name: 'Issuer', label: i18n.global.t('certmanager.Issuer'), field: row => row.spec.issuerRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Requestor', label: i18n.global.t('certmanager.Requestor'), field: row => row.spec.username, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: i18n.global.t('meta.age'), field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraClusterIssuerColumns:Array<QTableColumn> = [
  {name: 'Age', label: i18n.global.t('meta.age'), field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraIssuerColumns:Array<QTableColumn> = [
  {name: 'Age', label: i18n.global.t('meta.age'), field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
// Certificate') (eq short 'CertificateRequest')) (or (eq short 'ClusterIssuer') (eq short 'Issuer'
export const ChallengeListExcludes = [
  { path: 'status/state', include: true },
  { path: 'spec/dnsName', include: true },
  { path: 'status/reason', include: true },
];
export const ChallengeReadExcludes = [
];
export const ChallengeSimpleExcludes = [
];
export const OrderListExcludes = [
  { path: 'status/state', include: true },
  { path: 'spec/issuerRef', include: true },
  { path: 'status/reason', include: true },
];
export const OrderReadExcludes = [
];
export const OrderSimpleExcludes = [
];
export const CertificateListExcludes = [
  { path: 'spec/secretName', include: true },
  { path: 'spec/issuerRef', include: true },
  { path: 'status/conditions', include: true },
];
export const CertificateReadExcludes = [
];
export const CertificateSimpleExcludes = [
];
export const CertificateRequestListExcludes = [
  { path: 'spec/issuerRef', include: true },
  { path: 'spec/username', include: true },
  { path: 'status/conditions', include: true },
];
export const CertificateRequestReadExcludes = [
];
export const CertificateRequestSimpleExcludes = [
];
export const ClusterIssuerListExcludes = [
];
export const ClusterIssuerReadExcludes = [
];
export const ClusterIssuerSimpleExcludes = [
];
export const IssuerListExcludes = [
];
export const IssuerReadExcludes = [
];
export const IssuerSimpleExcludes = [
];
