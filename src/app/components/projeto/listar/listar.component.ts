import { Component, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import Projeto from 'src/app/models/Projeto';
import { CadastrarEditarComponent } from '../cadastrar-editar/cadastrar-editar.component';
import { DeletarComponent } from '../deletar/deletar.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  projetos: Projeto[] = [];
  displayedColumns: string[] = ['nome', 'valor', 'inicio', 'fim', 'actions'];
  dataSource: any;
  projeto: Projeto = null;
  nome: string = '';

  constructor(private projetoService: ProjetoService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getProjetos();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CadastrarEditarComponent, {
      width: '500px',
      data: this.projeto
    });

    dialogRef.afterClosed().subscribe(result => {
      this.projeto = null;
      this.getProjetos();
    });
  }

  openDialogDeletar(): void {
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '500px',
      data: this.projeto
    });

    dialogRef.afterClosed().subscribe(result => {
      this.projeto = null;
      this.getProjetos();
    });
  }

  compararDatas(date){
    const [year, month, day] = date.split('-');
    return new Date(year, parseInt(month) - 1, day).getTime() > new Date().getTime();
  }

  getProjetos(){
    this.projetoService.getAll()
      .subscribe((data: Projeto[]) => {
        this.projetos = data;
        console.log(this.projetos);
        this.dataSource = new MatTableDataSource(this.projetos);
      })
  }

  selecionarProjeto(projeto: Projeto){
    this.projeto = projeto;
    this.openDialog();
  }

  deletarProjeto(projeto: Projeto){
    this.projeto = projeto;
    this.openDialogDeletar();
  }

  // transformo a string da data em uma outra mais comum
  buetify(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day.padStart(2,'0')}/${month.padStart(2,'0')}/${year}`
  }

  findByNome(){
    console.log('nome', this.nome)
    this.projetoService.findByNome(this.nome)
    .subscribe((data: Projeto[]) => {
      this.projetos = data;
      console.log(this.projetos);
      this.dataSource = new MatTableDataSource(this.projetos);
    })
  }

}
