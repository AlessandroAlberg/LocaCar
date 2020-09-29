import { Component, OnInit } from '@angular/core';

import { VeiculosService } from '../veiculos.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  vehicles: string[] = [];
  veiculosService: VeiculosService;

  constructor() {
    this.veiculosService = new VeiculosService();
   }

  ngOnInit(): void {
    this.veiculosService.getVehicles().subscribe(
      (vehicles) => {
        this.vehicles = vehicles
      }
    );
  }

}
