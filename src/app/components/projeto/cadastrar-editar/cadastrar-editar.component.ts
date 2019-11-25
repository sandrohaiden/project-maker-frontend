import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import {
  APP_DATE_FORMATS,
  AppDateAdapter
} from "../../utils/format-datepicker";
import { DateAdapter, MAT_DATE_FORMATS, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProjetoService } from "src/app/services/projeto/projeto.service";
import Projeto from "src/app/models/Projeto";

@Component({
  selector: "app-cadastrar-editar",
  templateUrl: "./cadastrar-editar.component.html",
  styleUrls: ["./cadastrar-editar.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class CadastrarEditarComponent implements OnInit {
  formGroup = new FormGroup({
    nome: new FormControl("", Validators.required),
    valor: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[.\d]+$/)
    ]),
    inicio: new FormControl(null, Validators.required),
    fim: new FormControl(null, Validators.required)
  });

  minDate: Date;

  constructor(private projetoService: ProjetoService, public snack: MatSnackBar,
    private dialogRef: MatDialogRef<CadastrarEditarComponent>, @Inject(MAT_DIALOG_DATA) public data: Projeto,
    private fb: FormBuilder) {}

  ngOnInit() {
    console.log(this.data);
    if(this.data !== null){
      this.formGroup = this.fb.group({
        id: this.fb.control(this.data.id),
        nome: this.fb.control(this.data.nome, [Validators.required]),
        valor: this.fb.control(this.data.valor, [Validators.required]),
        inicio: this.fb.control(this.parseDate(this.data.inicio), [Validators.required]),
        fim: this.fb.control(this.parseDate(this.data.fim), [Validators.required]),
      })
      console.log('fb: ', this.formGroup.value);
      new Date()
    }
  }

  salvar() {
    if(this.data==null){
      this.projetoService
      .post(this.parseProjeto(this.formGroup.value))
      .subscribe((data: Projeto) => {
        this.openSnack('Projeto cadastrado com sucesso!', 'green-snackbar');
        this.dialogRef.close();
      });
      
    } else {
      this.projetoService
      .put(this.parseProjeto(this.formGroup.value))
      .subscribe((data: Projeto) => {
        this.openSnack('Alterações salvas com sucesso!', 'green-snackbar');
        this.dialogRef.close();
      });
    }
  }

  openSnack(message: string, panel: string){
    this.snack.open(message, '',{
      duration: 5000,
      verticalPosition: 'top',
      panelClass: [panel]
    })
  }
  
  // preparo objeto JSON
  parseProjeto(data: any) {
    console.log('data ', data);
    data.inicio = this.formatDate(data.inicio);
    data.fim = this.formatDate(data.fim);
    return data;
  }

  // converto a data para o formato que defini para recebimento na API
  formatDate(date: Date) {
    console.log('formatDate', date);
    let day: string = date.getDate().toString();
    day = +day < 10 ? "0" + day : day;
    let month: string = (date.getMonth() + 1).toString();
    month = +month < 10 ? "0" + month : month;
    let year = date.getFullYear();

    return `${year}-${month}-${day}`
  }

  // Instancio uma data a partir da string recebida da API
  parseDate(date){
    const [year, month, day] = date.split('-');
    return new Date(year, month - 1, day);
  }

  // defino a data mínima para o fim do projeto
  inicioChanged() {
    this.minDate = this.formGroup.controls["inicio"].value;
  }
}
