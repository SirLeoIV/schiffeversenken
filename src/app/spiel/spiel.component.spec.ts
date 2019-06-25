import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielComponent } from './spiel.component';

describe('SpielComponent', () => {
    let component: SpielComponent;
    let fixture: ComponentFixture<SpielComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SpielComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpielComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
