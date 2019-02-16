import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { CountdownComponent } from './countdown/countdown.component';
import { TimerComponent } from './timer/timer.component';
import { DisplayComponent } from './display/display.component';
import { TimerNativeComponent } from './timer-native/timer.component';
import { TimerNoneComponent } from './timer-none/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    CountdownComponent,
    TimerComponent,
    TimerNativeComponent,
    TimerNoneComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
