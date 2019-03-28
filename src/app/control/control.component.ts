import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { AngularFireDatabase, AngularFireObject   } from '@angular/fire/database';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit, OnDestroy {

  /** Based on the screen size, switch from standard to one column per row */
  cols = 2 ;
  outputRef: AngularFireObject<any>;
  // Subscription
  sub: Subscription;
  connecter: Subscription;
  moniteur: Subscription;
  marche: Subscription;
  lampe: Subscription;
  Mfrequance: Subscription;
  temps: Subscription;
  S3: Subscription;
  S4: Subscription;
  // boolean
  ONconnecter: boolean;
  ONmoniteur: boolean;
  ONmarche: boolean;
  ONlampe: boolean;
  ONS3: boolean;
  ONS4: boolean;
  ONno: boolean;
  disableall: boolean;
  // any
  startKey: any;
  moniteurKey: any;
  marcheKey: any;
  lampeKey: any;
  frequance: any ;
  tempskey: any ;
  timesn: any ;
  S3key: any ;
  S4key: any ;
  // color
  startcolor: string;
  moniteurcolor: string;
  marchecolor: string;
  lampecolor: string;
  S3color: string;
  S4color: string;
  NOvitesscolor: string;
  // LOgique
  constructor(
    private breakpointObserver: BreakpointObserver,
    private db: AngularFireDatabase
    ) {}
  ngOnInit(): void {
    this.outputRef = this.db.object('output');

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
      /** connecter Subscription */
    this.connecter = this.db
    .object('output/start')
    .snapshotChanges()
    .subscribe(action => {
      this.startKey = action.payload.val();
      console.log(this.startKey);
      if (this.startKey === 'ON') {
        this.ONconnecter = true;
        this.disableall = false;
        this.startcolor = null;
      } else if (this.startKey === 'OFF') {
        this.ONconnecter = false;
        this.disableall = true;
        this.startcolor = 'warn';
      }
      console.log(this.ONconnecter);
    });
/** moniteur Subscription */
    this.moniteur = this.db
    .object('output/moniteur')
    .snapshotChanges()
    .subscribe(action => {
      this.moniteurKey = action.payload.val();
      console.log(this.moniteurKey);
      if (this.moniteurKey === 'ON') {
        this.ONmoniteur = true;
        this.moniteurcolor = null;
      } else if (this.moniteurKey === 'OFF') {
        this.ONmoniteur = false;
        this.moniteurcolor = 'warn';
      }
      console.log(this.ONmoniteur);
    });
/** marche Subscription */
    this.marche = this.db
      .object('output/marche')
      .snapshotChanges()
      .subscribe(action => {
        this.marcheKey = action.payload.val();
        console.log(this.marcheKey);
        if (this.marcheKey === 'ON') {
        this.ONmarche = true;
        this.marchecolor = null;
          } else if (this.marcheKey === 'OFF') {
          this.ONmarche = false;
          this.marchecolor = 'warn';
            }
        console.log(this.ONmarche);
      });
/** lampe Subscription */
    this.lampe = this.db
      .object('output/extlamp')
      .snapshotChanges()
      .subscribe(action => {
        this.lampeKey = action.payload.val();
        console.log(this.lampeKey);
        if (this.lampeKey === 'ON') {
        this.ONlampe = true;
        this.lampecolor = null;
          } else if (this.lampeKey === 'OFF') {
          this.ONlampe = false;
          this.lampecolor = 'warn';
            }
        console.log(this.ONlampe);
      });
      /** Mfrequance Subscription */
    this.Mfrequance = this.db
    .object('output/Mfrequance')
    .snapshotChanges()
    .subscribe(action => {
      this.frequance = action.payload.val();
      console.log(this.frequance);
    });

      /** temps Subscription */
    this.temps = this.db
    .object('output/time')
    .snapshotChanges()
    .subscribe(action => {
      this.tempskey = action.payload.val();
      console.log(this.tempskey);
    });
    /** S3 Subscription */
    this.S3 = this.db
      .object('output/S3')
      .snapshotChanges()
      .subscribe(action => {
        this.S3key = action.payload.val();
        console.log( 'S3' + this.S3key);
        if (this.S3key === 'ON') {
        this.ONS3 = true;
        this.S3color = null;
        this.NOvitesscolor = 'warn';
          } else if (this.S3key === 'OFF') {
          this.ONS3 = false;
          this.S3color = 'warn';
            }
        console.log('S3' + this.ONS3);
      });
    /** S4 Subscription */
    this.S4 = this.db
      .object('output/S4')
      .snapshotChanges()
      .subscribe(action => {
        this.S4key = action.payload.val();
        console.log( 'S4' + this.S4key);
        if (this.S4key === 'ON') {
        this.ONS4 = true;
        this.S4color = null;
        this.NOvitesscolor = 'warn';
          } else if (this.S4key === 'OFF') {
          this.ONS4 = false;
          this.S4color = 'warn';
            }
        console.log(  'S4' + this.ONS4);
      });

}
/** connectertoggle */
connectertoggle() {
  this.ONconnecter = !this.ONconnecter;
  if (this.ONconnecter) {
    this.outputRef.update({
        start: 'OFF'
    });
  } else {
    this.outputRef.update({
        start: 'ON'
    });
  }

}
/** moniteurtoggle */
moniteurtoggle() {
  this.ONmoniteur = !this.ONmoniteur;
  if (this.ONmoniteur) {
    this.outputRef.update({
      moniteur: 'OFF'
    });
  } else {
    this.outputRef.update({
      moniteur: 'ON'
    });
  }

}
/** lampetoggle */
lampetoggle() {
  this.ONlampe = !this.ONlampe;
  if (this.ONlampe) {
    this.outputRef.update({
      extlamp: 'OFF'
    });
  } else {
    this.outputRef.update({
      extlamp: 'ON'
    });
  }

}
/** marchetoggle */
marchetoggle() {
  this.ONmarche = !this.ONmarche;
  if (this.ONmarche) {
    this.outputRef.update({
      marche: 'OFF'
    });
  } else {
    this.outputRef.update({
      marche: 'ON'
    });
  }

}
Updatetime(times: number) {
  this.timesn = (times * 10) / 10 ;
  this.outputRef.update({
    time : this.timesn
  });
}
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 15) {
      return value + 'Hz';
    }
    return value;
  }
  frequanceMax() {
    this.frequance = this.frequance + 1 ;
    this.outputRef.update({
      Mfrequance: this.frequance,
      S3 : 'OFF',
      S4 : 'OFF'
    });
    this.novitessconstante();
    if (this.frequance > 50 ) {
      this.outputRef.update({
        Mfrequance: 50
      });
      this.frequance = 50;
    }
  }
  frequanceMin() {
  this.frequance = this.frequance - 1 ;
  this.outputRef.update({
    Mfrequance: this.frequance,
    S3 : 'OFF',
    S4 : 'OFF'
  });
  this.novitessconstante();
  if (this.frequance < 14 ) {
    this.outputRef.update({
      Mfrequance: 14
    });
    this.frequance = 14;
    }
  }
  onInputChange(event: any) {
    this.outputRef.update({
      Mfrequance: event.value,
      S3 : 'OFF',
      S4 : 'OFF'
    });
    this.novitessconstante();
  }
   vitesscontante1() {
    this.outputRef.update({
      S3 : 'ON',
      S4 : 'OFF'
    });
    this.frequance = 20;
   }
   vitesscontante2() {
    this.outputRef.update({
      S3 : 'OFF',
      S4 : 'ON'
    });
    this.frequance = 30;
   }
   novitessconstante() {
    this.outputRef.update({
      S3 : 'OFF',
      S4 : 'OFF'
    });
    this.NOvitesscolor = null;

   }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.connecter.unsubscribe();
    this.moniteur.unsubscribe();
    this.lampe.unsubscribe();
    this.marche.unsubscribe();
    this.Mfrequance.unsubscribe();
    this.temps.unsubscribe();
    this.S3.unsubscribe();
    this.S4.unsubscribe();
  }
}

