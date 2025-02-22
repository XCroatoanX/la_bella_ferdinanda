import { Image } from './image.model';

export class CatKit {
  public id: string;
  public name: string;
  public color: string;
  public age: string;
  public sex: 'Male' | 'Female';
  public article: string;
  public status: string;
  public isKitten?: boolean;
  public litter?: string;
  public images?: Image[];
  public image?: Image;
}
