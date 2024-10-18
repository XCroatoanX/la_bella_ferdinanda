import { Image } from './image.model';

export class Kitten {
  public id: string;
  public name: string;
  public color: string;
  public age: string;
  public bornWeight: number;
  public weight: number;
  public sex: 'Male' | 'Female';
  public article: string;
  public images?: Image[];
}
