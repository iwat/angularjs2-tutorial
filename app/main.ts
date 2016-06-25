import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS, XHRBackend }             from '@angular/http';
import { bootstrap }                              from '@angular/platform-browser-dynamic';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';

import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AppComponent }         from './app.component';
import { InMemoryDataService }  from './in-memory-data.service';

bootstrap(AppComponent, [
	APP_ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	{ provide: LocationStrategy, useClass: HashLocationStrategy },
	{ provide: XHRBackend, useClass: InMemoryBackendService },
	{ provide: SEED_DATA, useClass: InMemoryDataService }
])
.catch(err => console.error(err));
