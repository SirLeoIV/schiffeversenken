
import { Component, OnInit, Input } from '@angular/core';
import { Spieler } from '../spieler';
import { HttpClient } from '@angular/common/http';
import { SpielerService } from '../spieler.service';


@Component({
    selector: 'app-anmelden',
    templateUrl: './anmelden.component.html',
    styleUrls: ['./anmelden.component.css']
})


export class AnmeldenComponent implements OnInit {


    spieler: Spieler;
    spielerNeu: Spieler = {

        titel: "",
        name: "",
        avatar: ""

    };


    getSpielerName() : string {
        return this.spielerNeu.name;
    }


    constructor(
        private spielerService: SpielerService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.spielerService.getSpieler().subscribe(spieler => this.spieler = spieler);
    }

    anmelden(titel: string, name: string, avatar: string): void{

        this.spieler.titel = titel;
        this.spieler.name = name;
        this.spieler.avatar = avatar;

        this.http.post('http://localhost:8080/api/anmelden', {'titel': titel, 'name': name, 'avatar': avatar}).subscribe(
            response => { }, err => {console.log(err);}
        )
    }
}
