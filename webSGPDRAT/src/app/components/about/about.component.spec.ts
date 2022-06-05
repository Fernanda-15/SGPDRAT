import { AboutComponent } from './about.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AboutComponent', () => {

    let component:AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [AboutComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('crear componente', () => {
        expect(component).toBeTruthy();
    });

    
});