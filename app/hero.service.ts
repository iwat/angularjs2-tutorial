import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/flatMap';

import { Observable } from 'rxjs/Observable';

import { Hero } from './hero';

@Injectable()
export class HeroService {

	private heroesUrl = 'app/heroes';  // URL to web api

	constructor(private http: Http) { }

	getHeroes() {
		return this.http.get(this.heroesUrl)
			.map(response => response.json().data || [])
			.catch(this.handleError);
	}

	getHero(id: number) {
		return this.getHeroes()
			.filter(hero => hero.id == id)
			.first();
	}

	save(hero: Hero) {
		if (hero.id) {
			return this.put(hero);
		}
		return this.post(hero);
	}

	delete(hero: Hero) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.heroesUrl}/${hero.id}`;

		return this.http.delete(url, headers)
			.catch(this.handleError);
	}

	// Add new Hero
	private post(hero: Hero) {
		let headers = new Headers({
			'Content-Type': 'application/json'});

		return this.http.post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
			.map(response => response.json().data || {})
			.catch(this.handleError);
	}

	// Update existing Hero
	private put(hero: Hero) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.heroesUrl}/${hero.id}`;
		return this.http.put(url, JSON.stringify(hero), {headers: headers})
			.map(response => hero)
			.catch(this.handleError);
	}

	private handleError(error: any, caught) {
		console.error('An error occurred', error, caught);
		return caught;
	}
}
