import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Konfiguration, KONFIGURATION } from './models/Konfiguration'

@Injectable({
    providedIn: 'root'
})
export class KonfigurationService{

    getKonfiguration(): Observable<Konfiguration>{
        return of(KONFIGURATION);
    }

}
