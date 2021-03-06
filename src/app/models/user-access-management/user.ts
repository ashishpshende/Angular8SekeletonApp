import { BaseModel } from '../core/base-model';
import { Role } from './role';
import { HelperService } from 'src/app/services/helper/helper.service';


export class User  extends BaseModel {
    Email: string;
    UserName:string;
    Password: string;
    ConfirmPassword: string;
    Modules:BaseModel[];
    Roles:Role[];
    Role:Role;
    Account:BaseModel
    Status:BaseModel;
    constructor(requestJSON:JSON)
    {
       super(requestJSON)

   
     
       this.UserName = requestJSON["UserName"];
     
    
       if(requestJSON["Account"])
       {  var AccountJSON = requestJSON["Account"];
            this.Account = new BaseModel(AccountJSON);
       }
       else
       {
        this.Account = new BaseModel(HelperService.EmptyJSON());
       }
    }
}