import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { App } from './app';
import { ItemComponent } from './item/item';
import { Produto } from './produto/produto';
import { MockApiInterceptor } from './mock-api.interceptor';

@NgModule({
  declarations: [App, Produto],
  imports: [BrowserModule, HttpClientModule, ItemComponent],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true },
  ],
  bootstrap: [App],
})
export class AppModule {}
