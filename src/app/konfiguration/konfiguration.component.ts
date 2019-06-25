
import { Component, OnInit } from '@angular/core';
import { Konfiguration } from '../models/Konfiguration';
import { KonfigurationService } from '../kofiguration.sevice';

import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-konfiguration',
    templateUrl: './konfiguration.component.html',
    styleUrls: ['./konfiguration.component.css']
})
export class KonfigurationComponent implements OnInit {

    konfiguration: Konfiguration;

    constructor(
        private konfigurationService: KonfigurationService,
        private http: HttpClient
    ) { }

    ngOnInit() {

        this.konfigurationService.getKonfiguration().subscribe(konfiguration => this.konfiguration = konfiguration);

        this.http.get<Konfiguration>('http://localhost:8080/api/getKonfiguration').subscribe(
            response => {
                if (response) {
                    this.konfiguration.anzahlSchiffeKlein = response.anzahlSchiffeKlein;
                    this.konfiguration.anzahlSchiffeMittel = response.anzahlSchiffeMittel;
                    this.konfiguration.anzahlSchiffeGross = response.anzahlSchiffeGross;
                }
            }
        )
    }

}
