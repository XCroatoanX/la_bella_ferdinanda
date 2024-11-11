import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CatKit } from '../models/catkit.model';

@Injectable({
  providedIn: 'root',
})
export class KittenService {
  constructor(private http: HttpClient) { }

  public getAllKittens(): Observable<CatKit[]> {
    return this.http.get<CatKit[]>(environment.base_url + '/kitten');
  }

  public getKittenById(id: string): Observable<CatKit> {
    return this.http.get<CatKit>(environment.base_url + '/kitten/' + id);
  }

  public createKitten(formData: FormData): Observable<any> {
    return this.http.post(environment.base_url + '/kitten', formData);
  }

  public updateKitten(formData: FormData, id): Observable<any> {
    return this.http.put(environment.base_url + '/kitten/' + id, formData);
  }

  public deleteKitten(id: string): Observable<any> {
    return this.http.delete(environment.base_url + '/kitten/' + id);
  }

}
