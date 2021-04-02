import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location, 
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  //INFO Busca detalhes do hero com base no Id.
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  //INFO Altera hero com base no Id.
  update(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  //INFO Volta a página anterior.
  goBack(): void {
    this.location.back();
  }
}