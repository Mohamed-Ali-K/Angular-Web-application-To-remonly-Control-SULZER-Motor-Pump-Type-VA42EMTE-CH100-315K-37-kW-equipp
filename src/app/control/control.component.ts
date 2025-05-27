import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { AngularFireDatabase, AngularFireObject   } from '@angular/fire/database';

/**
 * @Component
 * The ControlComponent is responsible for providing the user interface
 * to control the SULZER motor pump. It allows users to start/stop the pump,
 * monitor its status, adjust frequency, and interact with other connected devices.
 * It communicates with Firebase to send commands and receive state updates.
 */
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit, OnDestroy {

  /** Based on the screen size, switch from standard to one column per row */
  cols = 2 ;
  /** Reference to the 'output' object in Firebase, used to send commands. */
  outputRef: AngularFireObject<any>;

  // Firebase Subscriptions
  /** Subscription to breakpoint changes for responsive layout. */
  sub: Subscription;
  /** Subscription to the 'start' state from Firebase (connection status). */
  connecter: Subscription;
  /** Subscription to the 'moniteur' state from Firebase. */
  moniteur: Subscription;
  /** Subscription to the 'marche' state from Firebase (pump running status). */
  marche: Subscription;
  /** Subscription to the 'extlamp' state from Firebase. */
  lampe: Subscription;
  /** Subscription to the 'Mfrequance' (frequency) value from Firebase. */
  Mfrequance: Subscription;
  /** Subscription to the 'time' value from Firebase. */
  temps: Subscription;
  /** Subscription to the 'S3' (constant speed 1) state from Firebase. */
  S3: Subscription;
  /** Subscription to the 'S4' (constant speed 2) state from Firebase. */
  S4: Subscription;

  // Device State Flags
  /** Flag indicating if the device is connected (startKey === 'ON'). */
  ONconnecter: boolean;
  /** Flag indicating if the monitor is ON (moniteurKey === 'ON'). */
  ONmoniteur: boolean;
  /** Flag indicating if the pump is running (marcheKey === 'ON'). */
  ONmarche: boolean;
  /** Flag indicating if the external lamp is ON (lampeKey === 'ON'). */
  ONlampe: boolean;
  /** Flag indicating if constant speed S3 is active (S3key === 'ON'). */
  ONS3: boolean;
  /** Flag indicating if constant speed S4 is active (S4key === 'ON'). */
  ONS4: boolean;
  /** @deprecated Unused property. */
  ONno: boolean; // TODO: Check if this is used or can be removed
  /** Flag to disable all controls, typically when not connected. */
  disableall: boolean;

  // Firebase Data Keys (raw values from Firebase)
  /** Raw value of 'start' from Firebase. */
  startKey: any;
  /** Raw value of 'moniteur' from Firebase. */
  moniteurKey: any;
  /** Raw value of 'marche' from Firebase. */
  marcheKey: any;
  /** Raw value of 'extlamp' from Firebase. */
  lampeKey: any;
  /** Current frequency value from Firebase. */
  frequance: any ;
  /** Time value from Firebase. */
  tempskey: any ;
  /** Temporary variable for time update. */
  timesn: any ;
  /** Raw value of 'S3' from Firebase. */
  S3key: any ;
  /** Raw value of 'S4' from Firebase. */
  S4key: any ;

  // UI State & Colors
  /** Color for the start/connect button, typically 'warn' when OFF. */
  startcolor: string;
  /** Color for the monitor button. */
  moniteurcolor: string;
  /** Color for the marche (pump run) button. */
  marchecolor: string;
  /** Color for the lamp button. */
  lampecolor: string;
  /** Color for the S3 (constant speed 1) button. */
  S3color: string;
  /** Color for the S4 (constant speed 2) button. */
  S4color: string;
  /** Color for the 'no constant speed' indicator. */
  NOvitesscolor: string;

  /**
   * Constructor for ControlComponent.
   * @param breakpointObserver Service to observe screen breakpoints for responsive design.
   * @param db AngularFireDatabase service for interacting with Firebase.
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private db: AngularFireDatabase
    ) {}

  /**
   * Initializes the component.
   * Sets up Firebase subscriptions to monitor device states and sensor data.
   * Adjusts layout based on screen size.
   */
  ngOnInit(): void {
    // Reference to the 'output' path in Firebase for sending commands
    this.outputRef = this.db.object('output');

    // Adjusts the number of columns in the layout based on screen size (Handset or larger)
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

    /** connecter Subscription: Monitors the connection state ('output/start'). */
    this.connecter = this.db
    .object('output/start') // Path to the 'start' field in Firebase
    .snapshotChanges()
    .subscribe(action => {
      this.startKey = action.payload.val(); // Get the value ('ON' or 'OFF')
      console.log(this.startKey);
      if (this.startKey === 'ON') {
        this.ONconnecter = true; // Set connection flag
        this.disableall = false; // Enable controls
        this.startcolor = null; // Default button color
      } else if (this.startKey === 'OFF') {
        this.ONconnecter = false; // Clear connection flag
        this.disableall = true; // Disable controls
        this.startcolor = 'warn'; // Warning button color
      }
      console.log(this.ONconnecter);
    });

    /** moniteur Subscription: Monitors the 'moniteur' state ('output/moniteur'). */
    this.moniteur = this.db
    .object('output/moniteur') // Path to the 'moniteur' field
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

    /** marche Subscription: Monitors the pump running state ('output/marche'). */
    this.marche = this.db
      .object('output/marche') // Path to the 'marche' field
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

    /** lampe Subscription: Monitors the external lamp state ('output/extlamp'). */
    this.lampe = this.db
      .object('output/extlamp') // Path to the 'extlamp' field
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

    /** Mfrequance Subscription: Monitors the frequency value ('output/Mfrequance'). */
    this.Mfrequance = this.db
    .object('output/Mfrequance') // Path to the 'Mfrequance' field
    .snapshotChanges()
    .subscribe(action => {
      this.frequance = action.payload.val(); // Get the frequency value
      console.log(this.frequance);
    });

    /** temps Subscription: Monitors the time value ('output/time'). */
    this.temps = this.db
    .object('output/time') // Path to the 'time' field
    .snapshotChanges()
    .subscribe(action => {
      this.tempskey = action.payload.val(); // Get the time value
      console.log(this.tempskey);
    });

    /** S3 Subscription: Monitors the constant speed S3 state ('output/S3'). */
    this.S3 = this.db
      .object('output/S3') // Path to the 'S3' field
      .snapshotChanges()
      .subscribe(action => {
        this.S3key = action.payload.val();
        console.log( 'S3' + this.S3key);
        if (this.S3key === 'ON') {
        this.ONS3 = true; // Set S3 active flag
        this.S3color = null;
        this.NOvitesscolor = 'warn'; // Indicate a constant speed is active
          } else if (this.S3key === 'OFF') {
          this.ONS3 = false; // Clear S3 active flag
          this.S3color = 'warn';
            }
        console.log('S3' + this.ONS3);
      });

    /** S4 Subscription: Monitors the constant speed S4 state ('output/S4'). */
    this.S4 = this.db
      .object('output/S4') // Path to the 'S4' field
      .snapshotChanges()
      .subscribe(action => {
        this.S4key = action.payload.val();
        console.log( 'S4' + this.S4key);
        if (this.S4key === 'ON') {
        this.ONS4 = true; // Set S4 active flag
        this.S4color = null;
        this.NOvitesscolor = 'warn'; // Indicate a constant speed is active
          } else if (this.S4key === 'OFF') {
          this.ONS4 = false; // Clear S4 active flag
          this.S4color = 'warn';
            }
        console.log(  'S4' + this.ONS4);
      });

}

/**
 * Toggles the connection state ('start') of the device.
 * Updates the 'start' field in Firebase to 'ON' or 'OFF'.
 */
connectertoggle() {
  // Note: The logic here seems reversed. If ONconnecter is true, it means it *was* ON,
  // so toggling it means we want to turn it OFF.
  // Current Firebase update logic:
  // If ONconnecter is true (meaning currently connected), send 'OFF'
  // If ONconnecter is false (meaning currently disconnected), send 'ON'
  // This seems to correctly reflect the *desired* state after the toggle.
  this.ONconnecter = !this.ONconnecter; // This updates the local flag *before* sending to Firebase
  if (this.ONconnecter) { // If local flag is now true, it means user wants to turn it ON
    this.outputRef.update({
        start: 'ON' // Send ON command
    });
  } else { // If local flag is now false, it means user wants to turn it OFF
    this.outputRef.update({
        start: 'OFF' // Send OFF command
    });
  }
  // The Firebase subscription for 'output/start' will then update ONconnecter, disableall, and startcolor.
}

/**
 * Toggles the 'moniteur' state.
 * Updates the 'moniteur' field in Firebase to 'ON' or 'OFF'.
 */
moniteurtoggle() {
  // Similar logic to connectertoggle: Toggles local state, then sends the new desired state to Firebase.
  this.ONmoniteur = !this.ONmoniteur;
  if (this.ONmoniteur) { // If local flag is now true, user wants to turn it ON
    this.outputRef.update({
      moniteur: 'ON'
    });
  } else { // If local flag is now false, user wants to turn it OFF
    this.outputRef.update({
      moniteur: 'OFF'
    });
  }
  // The Firebase subscription for 'output/moniteur' will update ONmoniteur and moniteurcolor.
}

/**
 * Toggles the 'extlamp' (external lamp) state.
 * Updates the 'extlamp' field in Firebase to 'ON' or 'OFF'.
 */
lampetoggle() {
  // Similar logic: Toggles local state, then sends the new desired state to Firebase.
  this.ONlampe = !this.ONlampe;
  if (this.ONlampe) { // If local flag is now true, user wants to turn it ON
    this.outputRef.update({
      extlamp: 'ON'
    });
  } else { // If local flag is now false, user wants to turn it OFF
    this.outputRef.update({
      extlamp: 'OFF'
    });
  }
  // The Firebase subscription for 'output/extlamp' will update ONlampe and lampecolor.
}

/**
 * Toggles the 'marche' (pump running) state.
 * Updates the 'marche' field in Firebase to 'ON' or 'OFF'.
 */
marchetoggle() {
  // Similar logic: Toggles local state, then sends the new desired state to Firebase.
  this.ONmarche = !this.ONmarche;
  if (this.ONmarche) { // If local flag is now true, user wants to turn it ON
    this.outputRef.update({
      marche: 'ON'
    });
  } else { // If local flag is now false, user wants to turn it OFF
    this.outputRef.update({
      marche: 'OFF'
    });
  }
  // The Firebase subscription for 'output/marche' will update ONmarche and marchecolor.
}

/**
 * Updates the 'time' value in Firebase.
 * @param times The new time value to set.
 */
Updatetime(times: number) {
  this.timesn = (times * 10) / 10 ; // This seems to be a way to ensure it's a number, possibly to one decimal place.
  this.outputRef.update({
    time : this.timesn // Update 'time' in Firebase
  });
  // The Firebase subscription for 'output/time' will update tempskey.
}

/**
 * Formats the label for the frequency slider.
 * Appends 'Hz' to values greater than or equal to 15.
 * @param value The numerical value from the slider.
 * @returns The formatted label string or 0 if value is null.
 */
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 15) {
      return value + 'Hz';
    }
    return value;
  }

/**
 * Increases the motor frequency by 1, up to a maximum of 50Hz.
 * Also deactivates constant speed modes (S3, S4).
 * Updates 'Mfrequance', 'S3', and 'S4' in Firebase.
 */
  frequanceMax() {
    this.frequance = this.frequance + 1 ; // Increment local frequency
    this.outputRef.update({
      Mfrequance: this.frequance, // Send updated frequency
      S3 : 'OFF', // Deactivate constant speed S3
      S4 : 'OFF'  // Deactivate constant speed S4
    });
    this.novitessconstante(); // Update UI for no constant speed
    if (this.frequance > 50 ) { // Enforce maximum frequency
      this.outputRef.update({
        Mfrequance: 50
      });
      this.frequance = 50; // Sync local frequency with max
    }
    // The Firebase subscription for 'output/Mfrequance' will update this.frequance.
    // The subscriptions for 'S3' and 'S4' will update their respective states.
  }

/**
 * Decreases the motor frequency by 1, down to a minimum of 14Hz.
 * Also deactivates constant speed modes (S3, S4).
 * Updates 'Mfrequance', 'S3', and 'S4' in Firebase.
 */
  frequanceMin() {
  this.frequance = this.frequance - 1 ; // Decrement local frequency
  this.outputRef.update({
    Mfrequance: this.frequance, // Send updated frequency
    S3 : 'OFF', // Deactivate constant speed S3
    S4 : 'OFF'  // Deactivate constant speed S4
  });
  this.novitessconstante(); // Update UI for no constant speed
  if (this.frequance < 14 ) { // Enforce minimum frequency
    this.outputRef.update({
      Mfrequance: 14
    });
    this.frequance = 14; // Sync local frequency with min
    }
    // Firebase subscriptions will update corresponding local state variables.
  }

/**
 * Handles frequency changes from an input element (e.g., a slider).
 * Updates 'Mfrequance' in Firebase and deactivates constant speed modes.
 * @param event The input event, expected to have a `value` property for the new frequency.
 */
  onInputChange(event: any) {
    this.outputRef.update({
      Mfrequance: event.value, // Set frequency from input
      S3 : 'OFF', // Deactivate constant speed S3
      S4 : 'OFF'  // Deactivate constant speed S4
    });
    this.novitessconstante(); // Update UI for no constant speed
    // Firebase subscriptions will update corresponding local state variables.
  }

/**
 * Activates constant speed mode 1 (S3).
 * Sets frequency to 20Hz and updates 'S3' and 'S4' in Firebase.
 */
   vitesscontante1() {
    this.outputRef.update({
      S3 : 'ON',  // Activate S3
      S4 : 'OFF' // Deactivate S4
    });
    this.frequance = 20; // Set local frequency for display, Firebase will confirm via Mfrequance update
    // Firebase subscriptions for S3, S4, and Mfrequance will update local states.
    // Note: This method directly sets this.frequance. Consider if Mfrequance should also be updated here
    // or if relying on ESP32 to set it based on S3 is intended.
    // For UI consistency, it might be better to also send `Mfrequance: 20` in the update.
   }

/**
 * Activates constant speed mode 2 (S4).
 * Sets frequency to 30Hz and updates 'S3' and 'S4' in Firebase.
 */
   vitesscontante2() {
    this.outputRef.update({
      S3 : 'OFF', // Deactivate S3
      S4 : 'ON'   // Activate S4
    });
    this.frequance = 30; // Set local frequency for display
    // Similar to vitesscontante1, consider updating Mfrequance in Firebase directly.
   }

/**
 * Deactivates both constant speed modes (S3 and S4).
 * Updates 'S3' and 'S4' in Firebase and resets the 'no constant speed' UI indicator.
 */
   novitessconstante() {
    this.outputRef.update({
      S3 : 'OFF', // Deactivate S3
      S4 : 'OFF'  // Deactivate S4
    });
    this.NOvitesscolor = null; // Reset UI indicator color
    // Firebase subscriptions for S3 and S4 will update local states.
   }

  /**
   * Cleans up subscriptions when the component is destroyed.
   * This prevents memory leaks by unsubscribing from all active Firebase listeners
   * and the breakpoint observer.
   */
  ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
    if (this.connecter) { this.connecter.unsubscribe(); }
    if (this.moniteur) { this.moniteur.unsubscribe(); }
    if (this.lampe) { this.lampe.unsubscribe(); }
    if (this.marche) { this.marche.unsubscribe(); }
    if (this.Mfrequance) { this.Mfrequance.unsubscribe(); }
    if (this.temps) { this.temps.unsubscribe(); }
    if (this.S3) { this.S3.unsubscribe(); }
    if (this.S4) { this.S4.unsubscribe(); }
  }
}

