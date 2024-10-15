import { SafeUrl } from '@angular/platform-browser';

export class Image {
  public name: string;
  public type: string;
  public image: Uint8Array;

  constructor(name: string, type: string, image: Uint8Array) {
    this.name = name;
    this.type = type;
    this.image = image;
  }

  getBase64(): string {
    const binary = String.fromCharCode(...this.image);
    return `data:${this.type};base64,${btoa(binary)}`;
  }
}
