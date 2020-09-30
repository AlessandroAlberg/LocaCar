import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VeiculosService } from '../veiculos.service';

@Component({
  selector: 'app-veiculo-detalhe',
  templateUrl: './veiculo-detalhe.component.html',
  styleUrls: ['./veiculo-detalhe.component.css']
})
export class VeiculoDetalheComponent implements OnInit {

  vehicleId: number;
  res: any;

  constructor( 
    private route: ActivatedRoute,
    private veiculosService: VeiculosService
    ) { 
    this.route.params.subscribe(params => this.vehicleId = params['id']);
   }

  ngOnInit(): void {
    this.veiculosService.getVehicle(this.vehicleId).subscribe(
      (res) => {
        this.res = res;
      }
    ),
    (err) => {
      console.log(err);
    };
  }

}
