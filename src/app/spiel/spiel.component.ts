import { Component, OnInit } from '@angular/core';
import { X_KOORDINATEN, Y_KOORDINATE, Koordinatensystem } from '../koordinaten-liste';
import { HttpClient } from '@angular/common/http';
import { HalloWelt } from '../models/HalloWelt';
import { Konfiguration } from '../models/Konfiguration';
import { KonfigurationService } from '../kofiguration.sevice';


@Component({
    selector: 'app-koordinaten',
    templateUrl: './spiel.component.html',
    styleUrls: ['./spiel.component.css']
})

export class SpielComponent implements OnInit {

    x_koordinaten = X_KOORDINATEN;
    y_koordinaten = Y_KOORDINATE;
    konfiguration: Konfiguration;

    farbeButton = 'buttonNeutral';
    statusSpiel: String;

    welt: String = 'test';
    positionen: String = '';
    koordinateEingabe: String;
    versuche = 0;
    striche = 0;
    versucheDurchFuenf = 0;
    warnung: String;


    constructor(
        private http: HttpClient,
        private konfigurationService: KonfigurationService,
    ) { }

    ngOnInit() {
        this.http.get<HalloWelt>('http://localhost:8080/api/HalloWelt').subscribe(
            response => {
                if (response) {
                    this.welt = response.text;
                }
            },
            err => {
                console.error(err);
            }
        );

        this.konfigurationService.getKonfiguration().subscribe(konfiguration => this.konfiguration = konfiguration);
    }

    starteSpiel(): void {

        this.warnung = '';

        if (this.konfiguration.anzahlSchiffeKlein + this.konfiguration.anzahlSchiffeMittel + this.konfiguration.anzahlSchiffeGross == 0) {
            this.konfiguration.anzahlSchiffeKlein = 1;
            this.warnung = 'Es muss mind. ein Schiff platziert werden!';
        }

        this.http.post('http://localhost:8080/api/setKonfiguration', {
            anzahlSchiffeKlein: this.konfiguration.anzahlSchiffeKlein,
            anzahlSchiffeMittel: this.konfiguration.anzahlSchiffeMittel,
            anzahlSchiffeGross: this.konfiguration.anzahlSchiffeGross
        }).subscribe(
            response => {
            }
        );

        this.http.get('http://localhost:8080/api/starteSpiel').subscribe(
            response => {
                this.striche = 0;
                this.versucheDurchFuenf = 0;
                this.statusSpiel = 'Läuft';
                for (let i = 0;  i <= 7; i++) {
                    for (let j = 0; j <= 7; j++) {
                        Koordinatensystem[i][j] = 0;
                    }
                }
            }
        );
    }



    zeigErgebnis(): void {
        let schiffePositionen: string[];
        this.http.get<Array<string>>('http://localhost:8080/api/ergebnis').subscribe(
            response => {
                if (response) {
                    schiffePositionen = response;
                    this.positionen = schiffePositionen.toString();
                    schiffePositionen.forEach(function(position) {
                        let koordinaten: string[];
                        koordinaten = position.split('', 2);
                        // console.log(koordinaten[0]);
                        // console.log(koordinaten[1]);
                        Koordinatensystem[koordinaten[0]][koordinaten[1]] = -1;
                    });
                }
            }
        );

    }

    schuss(x: number, y: number): void {
        this.koordinateEingabe = String(x) + String(y);

        this.http.post<number>('http://localhost:8080/api/PostTest', {eingabe: this.koordinateEingabe}).subscribe(
            response => {
                if (response) {
                    Koordinatensystem[x][y] = response;
                    this.getVersenkteSchiffe();
                }
            }
        );

        this.http.get<number>('http://localhost:8080/api/Versuche').subscribe(
            response => {
                if (response) {
                    this.versuche = response;
                    this.striche = response % 5;
                    this.versucheDurchFuenf = Math.round((response - 2) / 5);
                }
            }
        );

    }

    getVersenkteSchiffe(): void {
        let schiffePositionen: string[];
        this.http.get<Array<string>>('http://localhost:8080/api/versenkteSchiffe').subscribe(
            response => {
                if (response) {
                    schiffePositionen = response;
                    this.positionen = schiffePositionen.toString();
                    schiffePositionen.forEach(function(position) {
                        let koordinaten: string[];
                        koordinaten = position.split('', 2);
                        // console.log(koordinaten[0]);
                        // console.log(koordinaten[1]);
                        Koordinatensystem[koordinaten[0]][koordinaten[1]] = 3;
                    });
                }
            }
        );
        this.http.get<number>('http://localhost:8080/api/getSpielStatus').subscribe(
            response => {
                if (response == 1) {
                    this.statusSpiel = 'Vorbei';
                } else {
                    this.statusSpiel = 'Läuft';
                }
            }
        );
    }

    getFarbe(x: number, y: number): void {
        if (Koordinatensystem[x][y] == 0) {
            this.farbeButton = 'buttonNeutral';
            if (this.statusSpiel == 'Vorbei') {
                this.farbeButton = 'buttonSpielVorbei';
            }
        }
        if (Koordinatensystem[x][y] == 1) {
            this.farbeButton = 'buttonRot';
        } else if (Koordinatensystem[x][y] == 2) {
            this.farbeButton = 'buttonVorbei';
        } else if (Koordinatensystem[x][y] == -1) {
            this.farbeButton = 'buttonSchiff';
        } else if (Koordinatensystem[x][y] == 3) {
            this.farbeButton = 'buttonVersenkt';
        }

    }

}

