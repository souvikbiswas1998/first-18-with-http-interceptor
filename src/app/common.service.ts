import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  http!: HttpClient;
  constructor() {
    this.http = inject(HttpClient)
  }

  public updateToken() {
    return this.http.post('http://localhost:3000/refresh', {
      email: "safaryaara@gmail.com",
      refreshToken: localStorage.getItem('refreshToken'),
      accessToken: localStorage.getItem('accessToken')
    }, {
      // headers: {
      //   "Accept": "*/*",
      //   "Access-Control-Expose-Headers": "*",
      //   "Access-Control-Allow-Headers": "*"
      // },
    }).pipe(map((user: any) => {
      // Store the new access token in local storage
      localStorage.setItem('accessToken', user.accessToken)
      return user;
    }))
  }
}
