import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';


import { AngularFireDatabase, AngularFireObject   } from '@angular/fire/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  /** Based on the screen size, switch from standard to one column per row */
  cols = 2 ;
  sub: Subscription;
  distance: Observable<any> ;
  ready: Observable<any> ;
  thermistors: Observable<any> ;
  courant: Observable<any> ;
  defaut: Observable<any> ;
  frequance: Observable<any> ;
  inUse: Observable<any> ;
  vitesse: Observable<any> ;
  lampe: Observable<any> ;
  lampes: Subscription;
  ONlampe: boolean;
  lampeKey: any;
  lampext: string;
  constructor(
    private breakpointObserver: BreakpointObserver ,
    private db: AngularFireDatabase
    ) {}

  ngOnInit(): void {
    this.distance = this.db
    .object('input/ditance')
    .valueChanges();
    this.ready = this.db
    .object('input/Ready')
    .valueChanges();
    this.thermistors = this.db
    .object('input/thermistors')
    .valueChanges();
    this.courant = this.db
    .object('input/courant')
    .valueChanges();
    this.defaut = this.db
    .object('input/defaut')
    .valueChanges();
    this.frequance = this.db
    .object('input/frequance')
    .valueChanges();
    this.inUse = this.db
    .object('input/in use')
    .valueChanges();
    this.vitesse = this.db
    .object('input/vitesse')
    .valueChanges();
    this.lampe = this.db
    .object('output/extlamp')
    .valueChanges();
    /** lampe Subscription */
    this.lampes = this.db
    .object('output/extlamp')
    .snapshotChanges()
    .subscribe(action => {
      this.lampeKey = action.payload.val();
      if (this.lampeKey === 'ON') {
      this.ONlampe = true;

      this.lampext = 'Allumé';
        } else if (this.lampeKey === 'OFF') {
        this.ONlampe = false;
        this.lampext = 'Éteint';
          };
    });

    this.sub = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
         return 2;
        }
        return 1;
      })
    ).subscribe(
      data => {
        this.cols = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.lampes.unsubscribe();
  }
}
