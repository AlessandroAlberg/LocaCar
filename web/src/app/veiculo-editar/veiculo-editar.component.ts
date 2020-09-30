import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../_models/veiculo.model';
import { VeiculosService } from '../veiculos.service';

@Component({
  selector: 'app-veiculo-editar',
  templateUrl: './veiculo-editar.component.html',
  styleUrls: ['./veiculo-editar.component.css']
})
export class VeiculoEditarComponent implements OnInit {

  formUpdateVehicles: FormGroup;
  router: Router;
  vehicleId: number;

  constructor(
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private veiculosService: VeiculosService
    ) {
      this.route.params.subscribe(params => this.vehicleId = params['id']);
    }

  ngOnInit(): void {
    this.formUpdateVehicles = this.formBuilder.group({
      board: [ null, [Validators.required, Validators.minLength(7)]],
      chassi: [ null, [Validators.required, Validators.minLength(17)]],
      renavam: [ null, [Validators.required, Validators.minLength(11)]],
      model: [ null, [Validators.required]],
      brand: [ null, [Validators.required]],
      year: [ null, [Validators.required, Validators.minLength(4)]],
    });

    this.veiculosService.getVehicle(this.vehicleId).subscribe(
      (res: any) => {
        this.board.setValue(res.vehicle.board),
        this.chassi.setValue(res.vehicle.chassi),
        this.renavam.setValue(res.vehicle.renavam),
        this.model.setValue(res.vehicle.model),
        this.brand.setValue(res.vehicle.brand),
        this.year.setValue(res.vehicle.year)
      }
    ),
    (err) => {
      console.log(err);
    };

  }

  handleUpdate() {
    if ( this.formUpdateVehicles.valid ) {
      let vehicle: Vehicle = {
        id: this.vehicleId,
        board: this.board.value,
        chassi: this.chassi.value,
        renavam: this.renavam.value,
        model: this.model.value,
        brand: this.brand.value,
        year: this.year.value
      };

      this.veiculosService.updateVehicle(vehicle).subscribe(
        () => {
          alert("Os dados do veículo foram atualizados!");
          window.location.replace("/");
        }, (err) => console.log( err )
      )
    }
  }

  get board(): FormControl { return this.formUpdateVehicles.get('board') as FormControl; }
  get chassi(): FormControl { return this.formUpdateVehicles.get('chassi') as FormControl; }
  get renavam(): FormControl { return this.formUpdateVehicles.get('renavam') as FormControl; }
  get model(): FormControl { return this.formUpdateVehicles.get('model') as FormControl; }
  get brand(): FormControl { return this.formUpdateVehicles.get('brand') as FormControl; }
  get year(): FormControl { return this.formUpdateVehicles.get('year') as FormControl; }
}
