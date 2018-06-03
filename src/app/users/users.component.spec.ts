import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { CostsComponent } from '../costs/costs.component';
import { APP_BASE_HREF } from '@angular/common';
import { UserService } from '../user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatCardModule, MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { USERS } from '../mock-users'

let component: UsersComponent;
let fixture: ComponentFixture<UsersComponent>;
let firstColumn: HTMLElement;
let dataColumns: HTMLElement;

/////// Tests //////

describe('UsersComponent', () => {
    const FakeUsersService = {
        getUsers: () => {
            return of(USERS)
        }
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsersComponent, UserDetailsComponent, CostsComponent],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: UserService, useValue: FakeUsersService }
            ],
            imports: [BrowserModule,
                HttpClientModule,
                AppRoutingModule,
                MatButtonModule,
                MatTableModule,
                MatFormFieldModule,
                MatPaginatorModule,
                MatInputModule,
                BrowserAnimationsModule,
                MatCardModule,
                MatIconModule]
        });
        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance; // UsersComponent test instance
    }));

    it('should display the name of the first column after detectChanges()', () => {
        fixture.detectChanges();
        firstColumn = fixture.nativeElement.querySelector('th');
        expect(firstColumn.textContent).toContain('Name');
    });

    it('should display the data of the first user from the list after detectChanges()', () => {
        fixture.detectChanges();
        dataColumns = fixture.nativeElement.querySelectorAll('td');
        expect(dataColumns[0].textContent).toContain('Tom Roberts');
        expect(dataColumns[1].textContent).toContain('42,000');
        expect(dataColumns[2].textContent).toContain('Show');
    });
});