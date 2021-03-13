import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  
  constructor(private heroService: HeroService, private messageService: MessageService) { 
  }

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  addHero(name: string): void {
    name = name.trim();
    if(!name) {
       this.messageService.add('É obrigatório infomrar o nome do herói.')
       return;
    }

    let hero = this.heroes.find(hero => name == hero.name);
    if(hero) {
      this.messageService.add(`Já existe um herói com este nome: Id=${hero.id}, Name=${hero.name}`);
      return;
    }

    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => { this.heroes.push(hero) });
  }

  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.delete(hero).subscribe();
  }

}