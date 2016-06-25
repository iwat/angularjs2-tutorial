import { provideRouter, RouterConfig } from '@angular/router';

import { DashboardComponent }  from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent }     from './heroes.component';

export const routes: RouterConfig = [
	{ path: '',         component: DashboardComponent, terminal: true },
	{ path: 'hero/:id', component: HeroDetailComponent },
	{ path: 'heroes',   component: HeroesComponent },
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
