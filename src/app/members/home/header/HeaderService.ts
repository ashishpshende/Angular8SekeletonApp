import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HelperService } from 'src/app/services/helper/helper.service';
import { User } from 'src/app/models/user-access-management/user';



@Injectable()
export class HeaderService {
  public loggedInUser = new BehaviorSubject(new User(HelperService.EmptyJSON()));
  public TerminalList = new BehaviorSubject(new Array());
 
  constructor() { }

  setUser(param:User) {
    this.loggedInUser.next(param);
  }
 
  

}

  
