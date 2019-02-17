import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { FlightsService, FlightItem } from './flightsService.srv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Simple Flight Search'
  loading = false;
  flightsByNumberAndDateSubscription: Subscription;
  flightsByOriginDestinationAndDateSubscription: Subscription;

  searchModel: SearchModel  = new SearchModel();
  isValidFormSubmitted: boolean = false;
  valuesEnteredInBothForms: boolean = false;
  flights: FlightItem[];

  flightNumberPattern:      string = "^[0-9]{4}$";
  flightOriginPattern:      string = "^[A-Z]{3}$";
  flightDestinationPattern: string = "^[A-Z]{3}$";
  flightDatePattern:        string = "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"; //"\d{1,2}/\d{1,2}/\d{4}"

 constructor(private flightsService: FlightsService) {
 }

 ngOnDestroy(){
   if (this.flightsByNumberAndDateSubscription !== null){
     this.flightsByNumberAndDateSubscription.unsubscribe();
   }
   if (this.flightsByOriginDestinationAndDateSubscription !== null){
     this.flightsByOriginDestinationAndDateSubscription.unsubscribe();
   }
 }

   onFormSubmit(form: NgForm) {
     this.isValidFormSubmitted = false;
     this.valuesEnteredInBothForms = false;
     this.loading = true;

     if (this.searchModel.invalid(form.value)){
      this.valuesEnteredInBothForms = true;
     }
     if (form.invalid || this.valuesEnteredInBothForms) {
       console.log(this.valuesEnteredInBothForms);
       this.loading = false;
        return;
     }
     this.isValidFormSubmitted = true;
     if (this.searchModel.hasFlightNumberAndDateOnly(form.value)){
       this.flightsByNumberAndDateSubscription =
         this.flightsService.getFlightsByNumberAndDate(form.value)
           .subscribe(res => {
               this.handleResponse(res);
         });
     }
     if (this.searchModel.hasFlightOriginDestinationAndDateOnly(form.value)){
       this.flightsByOriginDestinationAndDateSubscription =
         this.flightsService.getFlightsByOriginDestinationAndDate(form.value)
           .subscribe(res => {
               this.handleResponse(res);
         });
     }
     form.resetForm();
  }

  handleResponse(res){
    console.log(res);
    this.flights = res.results as FlightItem[];
    console.log(this.flights);
    this.loading = false;
  }
}

class SearchModel {
     number: string = "";
     origin: string = "";
     destination: string = "";
     date: string = "";

    invalid(sm){
      let rv = !(this.hasFlightNumberAndDateOnly(sm) ||
                  this.hasFlightOriginDestinationAndDateOnly(sm));
      console.log('Invalid: '+ rv);
      return rv;
    }

    hasFlightNumberAndDateOnly(sm){
        let rv = this.notEmpty(sm.flightNumber) && !this.notEmpty(sm.flightOrigin)
              && !this.notEmpty(sm.flightDestination) && this.notEmpty(sm.flightDate);
        console.log('FND: '+ rv);
        return rv;
    }

    hasFlightOriginDestinationAndDateOnly(sm){
        let rv = !this.notEmpty(sm.flightNumber) && this.notEmpty(sm.flightOrigin)
              && this.notEmpty(sm.flightDestination) && this.notEmpty(sm.flightDate);
        console.log('FODD: '+ rv);
        return rv;
    }

    emptyIfNull(s){
      return s === null ? "" : s;
    }

    notEmpty(s){
      return !this.empty(s);
    }

    empty(s){
      return (this.emptyIfNull(s) === "");
    }
}
