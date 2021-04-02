import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  name: string = '';
  heroes: Hero[] = [];
  
  constructor(private heroService: HeroService, private messageService: MessageService) { 
  }

  ngOnInit(): void {
    //INFO Obtem a lista de heroes e disponibiliza para ser exibida em tela.
    this.getHeroes()
  }

  //INFO Obtem a lista de heroes.
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  //INFO Salva ou altera hero.
  addHero(name: string): void {
    this.name = name.trim();
    
    if(!this.name) {
       this.messageService.add('É obrigatório infomrar o nome do herói.')
       return;
    }

    let hero = this.heroes.find(hero => this.name == hero.name);
    if(hero) {
      this.messageService.add(`Já existe um herói com este nome: Id=${hero.id}, Name=${hero.name}`);
      return;
    }

    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => { this.getHeroes(), this.name = ""; });  
  }

  //INFO Deleta hero.
  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.delete(hero).subscribe();
  }
}