import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, Inject, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AgmComponent } from "./agm/agm.component";
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AgmComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'first-18';
  a = true;
  subs: Subscription[] = [];
  destryRef = inject(DestroyRef)

  constructor(private http: HttpClient, private cs: CommonService) {
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
      setTimeout(() => {
        // cs.updateToken().then(d => {
        //   console.log(d);

        // }).catch(e => {
        //   console.log(e);

        // })
        http.get('http://localhost:3000/admin/payment/get-all-status')
          .pipe(takeUntilDestroyed(this.destryRef)).subscribe((response: any) => {
            console.log(response);
          });
      }, 6000);
    }))
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }
}
