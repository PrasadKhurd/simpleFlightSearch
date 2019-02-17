import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export class FlightItem {
  constructor(
    public flightNumber: string,
    public carrier: string,
    public origin: string,
    public departure: string,
    public destination: string,
    public arrival: string,
    public aircraft: string,
    public distance: number,
    public travelTime: string,
    public status: string
  ) {}
}

@Injectable()
export class FlightsService {
  results: FlightItem[];

  constructor(private http: HttpClient) {
  }

  getAllFlights(){
      return this.http.get(`http://localhost:3001/api/getAll`);
  }

  getFlightsByNumberAndDate(formVal){
    let apiUrl = `http://localhost:3001/api/getByNumberAndDate`;
    let getUri = `${apiUrl}?`+
      `flightNumber=${formVal.flightNumber}&`+
      `date=${formVal.flightDate}`;

    console.log(getUri);
    return this.http.get(getUri);
  }

  getFlightsByOriginDestinationAndDate(formVal){
      let apiUrl = `http://localhost:3001/api/getByOriginDestinationAndDate`;
      let getUri = `${apiUrl}?`+
        `origin=${formVal.flightOrigin}&`+
        `destination=${formVal.flightDestination}&`+
        `date=${formVal.flightDate}`;

      console.log(getUri);
      return this.http.get(getUri);
  }

}
