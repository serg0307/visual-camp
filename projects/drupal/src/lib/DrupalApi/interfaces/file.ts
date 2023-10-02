import { EntityBundleInterface } from "./entity-bundle";
export interface IFile {
  bundle: EntityBundleInterface;
  uuid: string;
  id: number;
  styles: {
    [key: string]: string;
  }
}
