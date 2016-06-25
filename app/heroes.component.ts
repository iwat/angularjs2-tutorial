import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Hero }                from './hero';
import { HeroService }         from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
	selector: 'my-heroes',
	templateUrl: 'app/heroes.component.html',
	styleUrls:  ['app/heroes.component.css'],
	directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
	heroes: Hero[];
	selectedHero: Hero;
	addingHero = false;
	error: any;

	constructor(
		private router: Router,
		private heroService: HeroService) { }

	getHeroes() {
		this.heroService.getHeroes()
			.catch(error => this.error = error)
			.subscribe(heroes => this.heroes = heroes);
	}

	addHero() {
		this.addingHero = true;
		this.selectedHero = null;
	}

	close(savedHero: Hero) {
		this.addingHero = false;
		if (savedHero) { this.getHeroes(); }
	}

	delete(hero: Hero, event: any) {
		event.stopPropagation();
		this.heroService.delete(hero)
			.catch(error => this.error = error)
			.subscribe(res => {
				this.heroes = this.heroes.filter(h => h !== hero);
				if (this.selectedHero === hero) { this.selectedHero = null; }
			});
	}

	ngOnInit() {
		this.getHeroes();
	}

	onSelect(hero: Hero) {
		this.selectedHero = hero;
		this.addingHero = false;
	}

	gotoDetail() {
		this.router.navigate(['/hero', this.selectedHero.id]);
	}
}
