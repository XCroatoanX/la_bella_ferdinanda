export class Image {
  public name: string;
  public type: string;
  public image: string; // Change from string to

  constructor(name: string, type: string, image: string) {
    this.name = name;
    this.type = type;
    this.image = image;
  }
}
