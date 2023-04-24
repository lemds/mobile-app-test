import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';
import { TarefaNovaPage } from 'src/app/tarefa-nova/tarefa-nova.page';
import { CommonModule } from '@angular/common';
import { Tarefa } from 'src/app/models/tarefa.model';
import { TarefaAtualizaPage } from '../tarefa-atualiza/tarefa-atualiza.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule],
})
export class HomePage {

  public hoje: number = Date.now();
  public tarefasLista: Array<Tarefa> = [
    
  ];

  constructor(private modalCtrl: ModalController, private tarefaServ: TarefaService) {}

  ngOnInit(){
    this.listar();
  }

  public listar(){
    this.tarefaServ.carregar().then((tarefas)=>{
      this.tarefasLista = tarefas;
    })
  }

  public async adicionar(){
    const modal = await  this.modalCtrl.create({
      component: TarefaNovaPage
    });

    modal.onDidDismiss().then((novaTarefa)=>{
      this.listar();

    });

    return await modal.present();

  }
  public async editar(tarefa: Tarefa){
    const modal = await  this.modalCtrl.create({
      component: TarefaAtualizaPage,
      componentProps:{
        minhaTarefa: tarefa

      }
    });

    modal.onDidDismiss().then((atualizaTarefa)=>{
      this.listar();

    });

    return await modal.present();

  }


  public async deletar(id:string){
    await this.tarefaServ.deletar(id);
    this.listar();
  }
}
