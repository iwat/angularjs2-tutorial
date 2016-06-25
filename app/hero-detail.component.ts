import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
	selector: 'my-hero-detail',
	templateUrl: 'app/hero-detail.component.html',
	styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
	@Input() hero: Hero;
	@Output() close = new EventEmitter();
	error: any;
	navigated = false; // true if navigated here

	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params
			.subscribe(params => {
				if (params.id != null) {
					this.navigated = true;
					this.heroService.getHero(params.id)
						.subscribe(hero => this.hero = hero);
				} else {
					this.navigated = false;
					this.hero = new Hero();
				}
			});
	}

	save() {
		this.heroService.save(this.hero)
			.catch(error => this.error = error)
			.subscribe(hero => {
				this.hero = hero; // saved hero, w/ id if new
				this.goBack(hero);
			});
	}

	goBack(savedHero: Hero = null) {
		this.close.emit(savedHero);
		if (this.navigated) { window.history.back(); }
	}
}
