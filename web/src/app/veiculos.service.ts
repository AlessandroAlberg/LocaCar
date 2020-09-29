import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Vehicle } from './_models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  constructor(private http: HttpClient) { }

  public getVehicles( vehicle?: Vehicle ) {
    return this.http.get(`${environment.apiUrl}vehicles?board=${vehicle.board}&model=${vehicle.model}&brand=${vehicle.brand}`)
    .pipe(
      first(),
      map((res: any) => res.data)
    );
  }

  public getVehicle(id: number) {
    return this.http.get(`${environment.apiUrl}vehicles/${id}`)
    .pipe(first());
  }

  public updateVehicle( vehicle: Vehicle ) {
    return this.http.put(`${environment.apiUrl}vehicles/${vehicle.id}`, vehicle )
    .pipe(first());
  }

  public createVehicle( vehicle: Vehicle ) {
    return this.http.post(`${environment.apiUrl}vehicles`, vehicle )
    .pipe(first());
  }

  public deleteVehicle( id: number ) {
    return this.http.delete(`${environment.apiUrl}vehicles/${id}`)
    .pipe(first());
  }

}
