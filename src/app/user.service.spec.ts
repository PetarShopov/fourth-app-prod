import { of } from 'rxjs';
import { UserService } from './user.service';
import { User } from './models/user';

import { USERS } from './mock-users'

describe('UserService', () => {
    let userService: UserService;
    beforeEach(() => {
        const fakeHttpClient = {
            get: (url) => {
                if(url === 'api/users'){
                    return of(USERS)
                } else {
                    let id = +(url.slice(10))
                    for (const user of USERS) {
                        if(user.id === id){
                            return of(user)
                        }
                    }
                    
                }
                
            }
        };
        userService = new UserService(<any>fakeHttpClient);
    })

    it('getUsers method from user service should fetch all users', () => {
        userService.getUsers().subscribe(data => {
            expect(data.length).toBe(30);
        });
    });
    it('getUser method from user service should fetch the specific user', () => {
        userService.getUser(2).subscribe(data => {
            expect(data.firstName).toBe('Louis');
        });
    });
});
