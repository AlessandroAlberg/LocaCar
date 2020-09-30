import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Vehicle } from '../_models/veiculo.model';
import { VeiculosService } from '../veiculos.service';

@Component({
  selector: 'app-veiculo-novo',
  templateUrl: './veiculo-novo.component.html',
  styleUrls: ['./veiculo-novo.component.css']
})
export class VeiculoNovoComponent implements OnInit {

  formCreateVehicles: FormGroup;
  vehicleId: number;

  constructor(
    private formBuilder: FormBuilder,
    private veiculosService: VeiculosService
  ) { }

  ngOnInit(): void {
    this.formCreateVehicles = this.formBuilder.group({
      board: [ null, [Validators.required, Validators.minLength(7)]],
      chassi: [ null, [Validators.required, Validators.minLength(17)]],
      renavam: [ null, [Validators.required, Validators.minLength(11)]],
      model: [ null, [Validators.required]],
      brand: [ null, [Validators.required]],
      year: [ null, [Validators.required, Validators.minLength(4)]],
    });
  }

  handleCreate() {
    if ( this.formCreateVehicles.valid ) {
      let vehicle: Vehicle = {
        board: this.board.value,
        chassi: this.chassi.value,
        renavam: this.renavam.value,
        model: this.model.value,
        brand: this.brand.value,
        year: this.year.value
      };

      this.veiculosService.createVehicle(vehicle).subscribe(
        () => {
          alert("Foi adicionado um novo veículo!");
          window.location.replace("/");
        }, (err) => console.log( err )
      )
    }
  }

  get board(): FormControl { return this.formCreateVehicles.get('board') as FormControl; }
  get chassi(): FormControl { return this.formCreateVehicles.get('chassi') as FormControl; }
  get renavam(): FormControl { return this.formCreateVehicles.get('renavam') as FormControl; }
  get model(): FormControl { return this.formCreateVehicles.get('model') as FormControl; }
  get brand(): FormControl { return this.formCreateVehicles.get('brand') as FormControl; }
  get year(): FormControl { return this.formCreateVehicles.get('year') as FormControl; }

}
