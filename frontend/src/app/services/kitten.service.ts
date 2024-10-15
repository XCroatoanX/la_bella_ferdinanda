import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Kitten } from '../models/kitten.model';

@Injectable({
  providedIn: 'root',
})
export class KittenService {
  constructor(private http: HttpClient) { }

  public getAllKittens(): Observable<Kitten[]> {
    return this.http.get<Kitten[]>(environment.base_url + '/kitten');
  }

  public getKittenById(id: string): Observable<Kitten> {
    return this.http.get<Kitten>(environment.base_url + '/kitten/' + id);
  }

  public createKitten(formData: FormData): Observable<any> {
    return this.http.post(environment.base_url + '/kitten', formData);
  }

  public deleteKitten(id: string): Observable<any> {
    return this.http.delete(environment.base_url + '/kitten/' + id);
  }
}
