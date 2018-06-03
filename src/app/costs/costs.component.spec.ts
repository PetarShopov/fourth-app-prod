import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CostsComponent } from './costs.component';
import { CostsService } from '../costs.service';
import { APP_BASE_HREF } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

let component: CostsComponent;
let fixture: ComponentFixture<CostsComponent>;
let header: HTMLElement;
let data: HTMLElement;

/////// Tests //////

describe('CostsComponent', () => {

    beforeEach(() => {
        const FakeCostsService = {
            getCosts: () => {
                let costs = {
                    totalSalaryAmount: 10,
                    totalTakeHome: 10,
                    totalIncomeTax: 10,
                    totalNationalInsurance: 10
                }
                return of(costs)
            }
        };
        TestBed.configureTestingModule({
            declarations: [CostsComponent],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: CostsService, useValue: FakeCostsService }
            ],
            imports: [
                HttpClientModule,
                MatCardModule]
        });
        fixture = TestBed.createComponent(CostsComponent);
        component = fixture.componentInstance;
        header = fixture.nativeElement.querySelector('#header');
        data = fixture.nativeElement.querySelector('mat-card-content');
    });

    it('header should be Total Amount', () => {
        expect(header.textContent).toEqual('Total Amount');
    });

    it('should display data from the fake survice after detectChanges()', () => {
        fixture.detectChanges();
        expect(data.textContent).toContain("Salaries: 10 Take Homes: 10 Income Taxes: 10 National Insurances: 10 ");
    });
});
