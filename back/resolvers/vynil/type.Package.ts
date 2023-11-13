import { metadataPub } from "../core/type.pub.js";
import { VynilDistribSpec, VynilDistribStatus } from "./type.Distrib.js";

export interface VynilPackageContent {
  commit_id: string;
  description: string;
  options: object,
  providers: object
}
export type VynilPackage = VynilPackageContent & {
  name: string;
  category: string;
  distrib: string;
}
export interface VynilDistribPublic extends VynilDistribSpec {
  metadata: metadataPub
  status: VynilDistribStatus | undefined
}
