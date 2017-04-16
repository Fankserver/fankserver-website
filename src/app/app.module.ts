import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {AuthService} from './auth.service';
import {MdButtonModule, MdIconModule, MdIconRegistry, MdInputModule, MdSnackBarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    tokenGetter: () => localStorage.getItem('id_token'),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdSnackBarModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-DE'},
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(mdIconRegistry: MdIconRegistry, ds: DomSanitizer) {
    mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    mdIconRegistry.addSvgIcon('rsi', ds.bypassSecurityTrustResourceUrl('./assets/roberts_space_industries.svg'));
  }
}
