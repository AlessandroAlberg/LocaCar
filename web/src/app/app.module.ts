import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { VeiculoDetalheComponent } from './veiculo-detalhe/veiculo-detalhe.component';
import { VeiculoNovoComponent } from './veiculo-novo/veiculo-novo.component';
import { VeiculoEditarComponent } from './veiculo-editar/veiculo-editar.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    VeiculosComponent,
    VeiculoDetalheComponent,
    VeiculoNovoComponent,
    VeiculoEditarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
