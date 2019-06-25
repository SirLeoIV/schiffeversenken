import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpielerModel } from '../models/Spieler';

@Component({
    selector: 'app-rechts',
    templateUrl: './rechts.component.html',
    styleUrls: ['./rechts.component.css']
})
export class RechtsComponent implements OnInit {

    spieler: SpielerModel;
    static text: string = "!!";

    constructor(
        private http: HttpClient,
    ) { }

    ngOnInit() {
        this.http.get<SpielerModel>('http://localhost:8080/api/getSpieler').subscribe(
            response => {
                if (response) {
                    this.spieler = response;
                }
            }
        )
    }
}
