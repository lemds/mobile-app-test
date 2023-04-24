import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Tarefa } from '../models/tarefa.model';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-tarefa-atualiza',
  templateUrl: './tarefa-atualiza.page.html',
  styleUrls: ['./tarefa-atualiza.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TarefaAtualizaPage implements OnInit {
  @Input() minhaTarefa: Tarefa ={
    id: '',
    nome: '',
    data: '',
    prioridade: '',
    categoria: '',
  };

  public categorias = ['domestica','pessoal','trabalho'];
  public categoriaSelecionada: string = '';
  public dataSelecionada: string = new Date().toISOString();


  constructor(private tarefaServ: TarefaService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.categoriaSelecionada = this.minhaTarefa.categoria;
    this.dataSelecionada = this.minhaTarefa.data;
  }

  public async dismiss(){
    await this.modalCtrl.dismiss(this.minhaTarefa);
  }

  public selecionarCategoria(indice: number){
    this.categoriaSelecionada = this.categorias[indice];
    
  }

  public async editar(){
    this.minhaTarefa.categoria = this.categoriaSelecionada;
    this.minhaTarefa.data = this.dataSelecionada;
    await this.tarefaServ.editar(this.minhaTarefa);
    this.dismiss();
  }

}
