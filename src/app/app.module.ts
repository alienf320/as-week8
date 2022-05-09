import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu'; 
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { RefreshTokenInterceptor } from './services/refresh-token.interceptor';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    // CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
