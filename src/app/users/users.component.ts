import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: User[];
    dataSource: MatTableDataSource<User>;
    displayedColumns = ['name', 'takeHome', 'details'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getUsers();;
    }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
                this.dataSource = new MatTableDataSource(users);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort
            });
    }

    details(id: number) {
        this.router.navigateByUrl(`/user/${id}`);
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        this.dataSource.filterPredicate =
            (data: User, filter: string) => 
            {
                return (data.firstName.toLowerCase().indexOf(filter) != -1) || (data.surname.toLowerCase().indexOf(filter) != -1);
            }
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
