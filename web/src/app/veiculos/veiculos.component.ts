import { Component, OnInit } from '@angular/core';

import { VeiculosService } from '../veiculos.service';
import { Vehicle } from '../_models/veiculo.model';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  vehicles: Vehicle[] = [];

  constructor(
    private veiculosService: VeiculosService
  ) { }

  ngOnInit(): void {
    this.veiculosService.getAllVehicles().subscribe(
      (res) => {
        this.vehicles = res;
      }
    ),
    (err) => {
      console.log(err);
    };
  }

  handleDelete(id: number) {
    let msg = confirm("Tem certeza que deseja excluir? ");

    if (msg == true)
    {
      this.veiculosService.deleteVehicle(id).subscribe(
        (res) => {
          alert('Veículo excluido com sucesso!');
          location.reload();
        }
      ), (err) => {
        console.log(err);
      };

    }
  }

}
