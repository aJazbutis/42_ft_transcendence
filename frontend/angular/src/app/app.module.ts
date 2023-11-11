import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { Socket } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/auth.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MfaComponent } from './auth/mfa/mfa.component';
import { FormsModule } from '@angular/forms';
import { HOST_IP } from './Constants';


@Injectable()
export class UserSocket extends Socket {
  constructor() {
    super({ url: `${HOST_IP}/profile`, options: { withCredentials: true } })
  }
}

@Injectable()
export class GameSocket extends Socket {
  constructor() {
    super({ url: `${HOST_IP}/game`, options: { withCredentials: true } })
  }
}

@Injectable()
export class ChatSocket extends Socket {
  constructor() {
    super({ url: `${HOST_IP}/chat`, options: { withCredentials: true } })
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MfaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [GameSocket, ChatSocket, UserSocket],
  bootstrap: [AppComponent]
})
export class AppModule { }
