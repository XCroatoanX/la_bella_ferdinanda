import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatKit } from '../models/catkit.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) { }

  public getAllCats(): Observable<CatKit[]> {
    return this.http.get<CatKit[]>(environment.base_url + '/cat');
  }

  public getAllCatsMin(): Observable<CatKit[]> {
    return this.http.get<CatKit[]>(environment.base_url + '/cat/min');
  }

  public getCatById(id: string): Observable<CatKit> {
    return this.http.get<CatKit>(environment.base_url + '/cat/' + id);
  }

  public getCatBySex(sex: string): Observable<CatKit[]> {
    return this.http.get<CatKit[]>(environment.base_url + '/cat/sex/' + sex);
  }

  public getCatBySexMin(sex: string): Observable<CatKit[]> {
    return this.http.get<CatKit[]>(environment.base_url + '/cat/sex/min/' + sex);
  }

  public createCat(formData: FormData): Observable<any> {
    return this.http.post(environment.base_url + '/cat', formData);
  }

  public updateCat(formData: FormData, id): Observable<any> {
    return this.http.put<CatKit>(environment.base_url + '/cat/' + id, formData);
  }

  public deleteCat(id: string): Observable<any> {
    return this.http.delete(environment.base_url + '/cat/' + id);
  }

}
