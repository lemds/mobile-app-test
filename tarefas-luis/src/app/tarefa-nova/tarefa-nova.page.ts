import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

import { TarefaService } from 'src/app/services/tarefa.service';
import { Tarefa } from 'src/app/models/tarefa.model';

@Component({
  selector: 'app-tarefa-nova',
  templateUrl: './tarefa-nova.page.html',
  styleUrls: ['./tarefa-nova.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TarefaNovaPage implements OnInit {

  public categorias = ['domestica','pessoal','trabalho'];
  public categoriaSelecionada: string = '';
  public dataSelecionada: string = new Date().toISOString();

  public minhaTarefa: Tarefa ={
    id:'',
    nome:'',
    data:'',
    categoria:'',
    prioridade:''
  };

  constructor(private modalCtrl: ModalController,private tarefaServ: TarefaService) { }

  ngOnInit() {
  }

  public async adicionar(){
    let uid: any = Date.now();
    uid = uid.toString(16);

    this.minhaTarefa.id = uid;

    this.minhaTarefa.categoria = this.categoriaSelecionada;
    this.minhaTarefa.data = this.dataSelecionada;

    if(this.minhaTarefa.nome && this.minhaTarefa.prioridade && this.minhaTarefa.data){
      this.tarefaServ.adicionar(this.minhaTarefa);
    }

    this.dismiss();

  }

  public async dismiss(){
    await this.modalCtrl.dismiss(this.minhaTarefa);
  }

  public selecionarCategoria(indice: number){
    this.categoriaSelecionada = this.categorias[indice];
    
  }

}
