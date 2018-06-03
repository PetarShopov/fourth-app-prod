import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Location } from '@angular/common';

import { User }         from '../models/user';
import { UserService }  from '../user.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: [ './user-details.component.css' ]
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }
}
