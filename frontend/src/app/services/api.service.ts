import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:5000/employee';
  constructor(private http: HttpClient) {}
  public createEmployee(data: Employee): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
  public updateEmployee(data: Employee): Observable<Employee> {
    return this.http.put<any>(`${this.url}/${data.id}`, data);
  }
  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }
  public getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`);
  }
}
