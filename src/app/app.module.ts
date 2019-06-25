import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpielComponent } from './spiel/spiel.component';
import { AnmeldenComponent } from './anmelden/anmelden.component';
import { KonfigurationComponent } from './konfiguration/konfiguration.component';
import { RechtsComponent } from './rechts/rechts.component';
import { ObenComponent } from './oben/oben.component';

@NgModule({
    declarations: [
        AppComponent,
        SpielComponent,
        AnmeldenComponent,
        KonfigurationComponent,
        RechtsComponent,
        ObenComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }


