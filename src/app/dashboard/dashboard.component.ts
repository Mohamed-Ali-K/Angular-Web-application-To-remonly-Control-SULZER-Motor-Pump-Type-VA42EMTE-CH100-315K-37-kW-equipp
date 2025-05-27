import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';


import { AngularFireDatabase } from '@angular/fire/database'; // AngularFireObject is not used directly in this component

/**
 * @Component
 * The DashboardComponent is responsible for displaying real-time data
 * from the SULZER motor pump and associated sensors. It subscribes to
 * various data points in Firebase and presents them to the user.
 * It also adjusts its layout based on screen size.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Layout Properties
  /** Number of columns for the dashboard layout, responsive to screen size. */
  cols = 2 ;
  /** Subscription to screen breakpoint changes for responsive layout. */
  sub: Subscription;

  // Data Observables from Firebase
  /** Observable for the distance sensor data from 'input/ditance'. */
  distance: Observable<any> ;
  /** Observable for the 'Ready' state from 'input/Ready'. */
  ready: Observable<any> ;
  /** Observable for the thermistor sensor data from 'input/thermistors'. */
  thermistors: Observable<any> ;
  /** Observable for the current sensor data from 'input/courant'. */
  courant: Observable<any> ;
  /** Observable for the 'defaut' (fault) state from 'input/defaut'. */
  defaut: Observable<any> ;
  /** Observable for the frequency data from 'input/frequance'. */
  frequance: Observable<any> ;
  /** Observable for the 'in use' state from 'input/in use'. */
  inUse: Observable<any> ;
  /** Observable for the speed data from 'input/vitesse'. */
  vitesse: Observable<any> ;
  /** @deprecated This 'lampe' observable seems redundant as 'lampes' subscription and 'lampeKey' handle the same data. */
  lampe: Observable<any> ; // TODO: Review if this can be removed.

  // UI State Properties & Related Firebase Subscription
  /** Subscription to the 'extlamp' state from 'output/extlamp' for detailed logic. */
  lampes: Subscription;
  /** Boolean flag indicating if the external lamp is ON. */
  ONlampe: boolean;
  /** Raw value of the 'extlamp' state from Firebase ('ON' or 'OFF'). */
  lampeKey: any;
  /** Textual representation of the external lamp state (e.g., 'Allumé' or 'Éteint'). */
  lampext: string;

  /**
   * Constructor for DashboardComponent.
   * @param breakpointObserver Service to observe screen breakpoints for responsive design.
   * @param db AngularFireDatabase service for interacting with Firebase.
   */
  constructor(
    private breakpointObserver: BreakpointObserver ,
    private db: AngularFireDatabase
    ) {}

  /**
   * Initializes the component.
   * Sets up Firebase observables to receive real-time data for various pump and sensor readings.
   * Subscribes to the external lamp state for UI updates.
   * Adjusts layout based on screen size.
   */
  ngOnInit(): void {
    // Subscribing to various data points from the 'input' path in Firebase
    this.distance = this.db
    .object('input/ditance') // Path to distance sensor data
    .valueChanges();
    this.ready = this.db
    .object('input/Ready') // Path to 'Ready' state
    .valueChanges();
    this.thermistors = this.db
    .object('input/thermistors') // Path to thermistors data
    .valueChanges();
    this.courant = this.db
    .object('input/courant') // Path to current sensor data
    .valueChanges();
    this.defaut = this.db
    .object('input/defaut') // Path to 'defaut' (fault) state
    .valueChanges();
    this.frequance = this.db
    .object('input/frequance') // Path to frequency data
    .valueChanges();
    this.inUse = this.db
    .object('input/in use') // Path to 'in use' state
    .valueChanges();
    this.vitesse = this.db
    .object('input/vitesse') // Path to speed data
    .valueChanges();

    // This subscription seems redundant if `lampes` subscription below is used for UI logic.
    // If only the value is needed for direct display, it's fine.
    // However, `ONlampe` and `lampext` are derived from `lampes` subscription.
    this.lampe = this.db
    .object('output/extlamp') // Path to external lamp state
    .valueChanges();

    /** lampes Subscription: Monitors the 'extlamp' state from 'output/extlamp' for UI logic. */
    this.lampes = this.db
    .object('output/extlamp') // Path to external lamp state
    .snapshotChanges() // Using snapshotChanges to get the payload value
    .subscribe(action => {
      this.lampeKey = action.payload.val(); // Get the raw value ('ON' or 'OFF')
      if (this.lampeKey === 'ON') {
      this.ONlampe = true; // Set boolean flag
      this.lampext = 'Allumé'; // Set display text for ON state (French for "On")
        } else if (this.lampeKey === 'OFF') {
        this.ONlampe = false; // Clear boolean flag
        this.lampext = 'Éteint'; // Set display text for OFF state (French for "Off")
          };
    });

    // Adjusts the number of columns in the layout based on screen size (Handset or larger)
    this.sub = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
         return 2; // Use 2 columns for handset (mobile)
        }
        return 1; // Use 1 column for larger screens
      })
    ).subscribe(
      data => {
        this.cols = data; // Update the number of columns
      }
    );
  }

  /**
   * Cleans up subscriptions when the component is destroyed.
   * This prevents memory leaks by unsubscribing from the breakpoint observer
   * and the Firebase listener for the external lamp state.
   */
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.lampes) {
      this.lampes.unsubscribe();
    }
  }
}
