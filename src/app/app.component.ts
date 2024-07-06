import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, Inject, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'first-18';
  a = true;
  subs: Subscription[] = [];
  destryRef = inject(DestroyRef)

  constructor(private http: HttpClient) {
    let subs: any;
    this.subs.push(http.post('http://localhost:3000/login', {
      "email": "safaryaara@gmail.com",
      "password": "Subham@202",
      "name": "Safaryaara Admin"
    }, {
      headers: {
        "Accept": "*/*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Allow-Headers": "*"
      },
    }).subscribe((user: any) => {
      console.log(user);
      localStorage.setItem('accessToken', user.token.accessToken)
      localStorage.setItem('refreshToken', user.token.refreshToken)
      setInterval(() => {
        http.post('http://localhost:3000/refresh', {
          email: "safaryaara@gmail.com",
          refreshToken: localStorage.getItem('refreshToken'),
          accessToken: localStorage.getItem('accessToken')
        }).pipe(takeUntilDestroyed(this.destryRef)).subscribe((response: any) => {
          console.log(response.accessToken);
          // Store the new access token in local storage
          localStorage.setItem('accessToken', response.accessToken);
        });
      }, 2000);
    }))
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }
}
