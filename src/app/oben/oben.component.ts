import { Component, OnInit } from '@angular/core';
import { Spieler } from '../spieler';
import { SpielerService } from '../spieler.service';

@Component({
    selector: 'app-oben',
    templateUrl: './oben.component.html',
    styleUrls: ['./oben.component.css']
})
export class ObenComponent implements OnInit {

    title = 'Schiffe-Versenken';
    spieler: Spieler;

    constructor(
        private spielerService: SpielerService
    ) { }

    ngOnInit() {
        this.spielerService.getSpieler().subscribe(spieler => this.spieler = spieler);
    }

}
