import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS, XHRBackend }             from '@angular/http';
import { bootstrap }                              from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS }                       from '@angular/router-deprecated';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';

import { AppComponent }        from './app.component';
import { InMemoryDataService } from './in-memory-data.service';

/*
bootstrap(AppComponent, [ HTTP_PROVIDERS ]);
 */
bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	ROUTER_PROVIDERS,
	{ provide: LocationStrategy, useClass: HashLocationStrategy },
	{ provide: XHRBackend, useClass: InMemoryBackendService },
	{ provide: SEED_DATA, useClass: InMemoryDataService }
]);
