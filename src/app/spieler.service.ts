import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Spieler, SPIELER } from './spieler';

@Injectable({
    providedIn: 'root'
})
export class SpielerService {

    getSpieler(): Observable<Spieler>{
        return of(SPIELER);
    }


}

