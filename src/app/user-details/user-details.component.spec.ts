import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { UsersComponent } from '../users/users.component';
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

let component: UserDetailsComponent;
let fixture: ComponentFixture<UserDetailsComponent>;
let dataColumns: HTMLElement;

/////// Tests //////

describe('UserDetailsComponent', () => {
    const FakeUsersService = {
        getUser: (id) => {
            if (id === 0) {
                id = 1;
            }
            let searchedUser = USERS.filter((item) => {
                return item.id === id;
            })
            return of(searchedUser[0])
        },
        getUsers: () => {
            return of(USERS)
        }
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserDetailsComponent, UsersComponent, CostsComponent],
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
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance; // UserDetailsComponent test instance
    }));

    it('should display the data of the first user from the list after detectChanges()', () => {
        fixture.detectChanges();
        dataColumns = fixture.nativeElement.querySelectorAll('div');
        expect(dataColumns[0].textContent).toContain('MR. TOM ROBERTS');
        expect(dataColumns[1].textContent).toContain('Birthday: 21/04/1986');
    });
});