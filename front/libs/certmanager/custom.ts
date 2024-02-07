// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const certmanagerIcon = 'apps';
export const certmanagerTitle = 'cert-manager';
export const iconChallenge = 'album';
export const colorChallenge = '';
export const descriptionChallenge = '';
export const shortChallenge = '';
export const iconOrder = 'album';
export const colorOrder = '';
export const descriptionOrder = '';
export const shortOrder = '';
export const iconCertificate = 'album';
export const colorCertificate = '';
export const descriptionCertificate = '';
export const shortCertificate = '';
export const iconCertificateRequest = 'album';
export const colorCertificateRequest = '';
export const descriptionCertificateRequest = '';
export const shortCertificateRequest = '';
export const iconClusterIssuer = 'album';
export const colorClusterIssuer = '';
export const descriptionClusterIssuer = '';
export const shortClusterIssuer = '';
export const iconIssuer = 'album';
export const colorIssuer = '';
export const descriptionIssuer = '';
export const shortIssuer = '';
export const extraChallengeColumns:Array<QTableColumn> = [
  {name: 'State', label: 'State', field: row => row.status.state, sortable: true, align: tableColumnAlign.left},
  {name: 'Domain', label: 'Domain', field: row => row.spec.dnsName, sortable: true, align: tableColumnAlign.left},
  {name: 'Reason', label: 'Reason', field: row => row.status.reason, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraOrderColumns:Array<QTableColumn> = [
  {name: 'State', label: 'State', field: row => row.status.state, sortable: true, align: tableColumnAlign.left},
  {name: 'Issuer', label: 'Issuer', field: row => row.spec.issuerRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Reason', label: 'Reason', field: row => row.status.reason, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraCertificateColumns:Array<QTableColumn> = [
  {name: 'Secret', label: 'Secret', field: row => row.spec.secretName, sortable: true, align: tableColumnAlign.left},
  {name: 'Issuer', label: 'Issuer', field: row => row.spec.issuerRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraCertificateRequestColumns:Array<QTableColumn> = [
  {name: 'Issuer', label: 'Issuer', field: row => row.spec.issuerRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Requestor', label: 'Requestor', field: row => row.spec.username, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraClusterIssuerColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraIssuerColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const ChallengeListExcludes = [
  { path: 'status/state', include: true },
  { path: 'spec/dnsName', include: true },
  { path: 'status/reason', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const ChallengeReadExcludes = [
];
export const ChallengeSimpleExcludes = [
];
export const OrderListExcludes = [
  { path: 'status/state', include: true },
  { path: 'spec/issuerRef/name', include: true },
  { path: 'status/reason', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const OrderReadExcludes = [
];
export const OrderSimpleExcludes = [
];
export const CertificateListExcludes = [
  { path: 'spec/secretName', include: true },
  { path: 'spec/issuerRef/name', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const CertificateReadExcludes = [
];
export const CertificateSimpleExcludes = [
];
export const CertificateRequestListExcludes = [
  { path: 'spec/issuerRef/name', include: true },
  { path: 'spec/username', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const CertificateRequestReadExcludes = [
];
export const CertificateRequestSimpleExcludes = [
];
export const ClusterIssuerListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const ClusterIssuerReadExcludes = [
];
export const ClusterIssuerSimpleExcludes = [
];
export const IssuerListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const IssuerReadExcludes = [
];
export const IssuerSimpleExcludes = [
];
