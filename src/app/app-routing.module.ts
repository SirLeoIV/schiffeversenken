import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpielComponent } from './spiel/spiel.component';
import { AnmeldenComponent } from './anmelden/anmelden.component';


const routes: Routes = [
    { path: '', redirectTo: '/anmelden', pathMatch: 'full' },
    { path: 'anmelden', component: AnmeldenComponent },
    { path: 'koordinaten', component: SpielComponent }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
