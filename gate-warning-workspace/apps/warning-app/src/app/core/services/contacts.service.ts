import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BASE_API_URL } from 'apps/warning-app/src/environments/environment';
import { Observable } from 'rxjs';

export interface Contacts {
  type: 'email' | 'phone' | 'address';
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(`${BASE_API_URL}/contacts`);
  }
}
