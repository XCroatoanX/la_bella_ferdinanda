import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cat } from '../models/cat.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) {}

  public getAllCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(environment.base_url + '/cat');
  }

  public getCatById(id: number): Observable<Cat> {
    return this.http.get<Cat>(environment.base_url + '/cat/' + id);
  }

  public createCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>(environment.base_url + '/cat', cat);
  }
}
