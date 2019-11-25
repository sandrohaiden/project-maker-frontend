import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { ListarComponent } from './components/projeto/listar/listar.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastrarEditarComponent } from './components/projeto/cadastrar-editar/cadastrar-editar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeletarComponent } from './components/projeto/deletar/deletar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    CadastrarEditarComponent,
    DeletarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    CadastrarEditarComponent,
    DeletarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
