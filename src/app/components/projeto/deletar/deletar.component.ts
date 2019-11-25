import { Component, OnInit, Inject } from '@angular/core';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Projeto from 'src/app/models/Projeto';

@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.component.html',
  styleUrls: ['./deletar.component.css']
})
export class DeletarComponent implements OnInit {

  constructor(private projetoService: ProjetoService, public snack: MatSnackBar,
    private dialogRef: MatDialogRef<DeletarComponent>, @Inject(MAT_DIALOG_DATA) public data: Projeto) { }

  ngOnInit() {
  }

  excluir() {
    this.projetoService
    .delete(this.data)
    .subscribe(() => {
      this.openSnack('Projeto excluido com sucesso!', 'green-snackbar');
      this.dialogRef.close();
    }); 
  }

  openSnack(message: string, panel: string){
    this.snack.open(message, '',{
      duration: 5000,
      verticalPosition: 'top',
      panelClass: [panel]
    })
  }

}
