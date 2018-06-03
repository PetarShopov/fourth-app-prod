import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './models/user';
import { Costs } from './models/costs';
import { USERS } from './mock-users';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const users: User[] = USERS;
        let costs: Costs = new Costs();
        let totalSalaryAmount = 0;
        let totalTakeHome = 0;
        let totalIncomeTax = 0;
        let totalNationalInsurance = 0;
        users.forEach((item) => {
            if (item.salary) {
                totalSalaryAmount += +item.salary;
            }
            if (item.takeHome) {
                totalTakeHome += +item.takeHome;
            }
            if (item.incomeTax) {
                totalIncomeTax += +item.incomeTax;
            }
            if (item.nationalInsurance) {
                totalNationalInsurance += +item.nationalInsurance;
            }
        })
        costs.totalSalaryAmount = +totalSalaryAmount.toFixed(2);
        costs.totalTakeHome = +totalTakeHome.toFixed(2);
        costs.totalIncomeTax = +totalIncomeTax.toFixed(2);
        costs.totalNationalInsurance = +totalNationalInsurance.toFixed(2);
        return { users, costs };
    }
}
