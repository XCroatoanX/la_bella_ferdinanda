import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cat } from '../models/cat.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) { }

  public getAllCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(environment.base_url + '/cat');
  }

  public getCatById(id: number): Observable<Cat> {
    return this.http.get<Cat>(environment.base_url + '/cat/' + id);
  }

  // createCat(formData: FormData): Observable<any> {
  //   return this.http.post<any>(environment.base_url + '/cat', formData);
  // }
  createCat(formData: FormData): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    return this.http.post(`${environment.base_url}/cats`, formData,);
  }
}
