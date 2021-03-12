import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { HeroesService } from '../heroes.service';

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
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroesService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
}