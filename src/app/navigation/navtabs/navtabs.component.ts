import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-navtabs',
  templateUrl: './navtabs.component.html',
  styleUrls: ['./navtabs.component.css']
})
export class NavtabsComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription: Subscription;
  constructor(private authService: AuthService
    ) {}



    ngOnInit() {
      this.authSubscription = this.authService.authChange.subscribe(authStatus => {
        this.isAuth = authStatus;
      });
    }

    ngOnDestroy() {
      this.authSubscription.unsubscribe();
    }
}
