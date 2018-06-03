import { Component, OnInit } from '@angular/core';

import { CostsService } from '../costs.service';
import { Costs } from '../models/costs';

@Component({
    selector: 'costs',
    templateUrl: './costs.component.html',
    styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {
    costs: Costs = {
        totalSalaryAmount: 0,
        totalTakeHome: 0,
        totalIncomeTax: 0,
        totalNationalInsurance: 0
    };

    constructor(private costsService: CostsService) { }

    ngOnInit() {
        this.getCosts();
    }

    getCosts(): void {
        this.costsService.getCosts()
            .subscribe(costs => {
                this.costs = {
                    totalSalaryAmount: costs['totalSalaryAmount'],
                    totalTakeHome: costs['totalTakeHome'],
                    totalIncomeTax: costs['totalIncomeTax'],
                    totalNationalInsurance: costs['totalNationalInsurance']
                }
            });
    }
}
