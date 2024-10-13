import { Image } from './image.model';

export class Cat {
  public name: string;
  public color: string;
  public age: string;
  public weight: number;
  public sex: 'Male' | 'Female';
  public article: string;
  public image?: Image[];
}
