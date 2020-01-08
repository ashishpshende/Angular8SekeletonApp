import { HelperService } from 'src/app/services/helper/helper.service';

export class BaseModel {
    public Id:number;
    public Name:String;
    public Description: String;
    public CreatedBy:BaseModel;
    public CreatedOn:string;
    public UpdatedBy:BaseModel
    public UpdatedOn:string;
   
    constructor(requestJSON:JSON)
    {

        
        if(HelperService.IsValueAvailable(requestJSON["Id"])){
          this.Id = (requestJSON["Id"] != null && requestJSON["Id"] != undefined) ? requestJSON["Id"] : 0;
        }else if(HelperService.IsValueAvailable(requestJSON["id"])){
          this.Id = (requestJSON["id"] != null && requestJSON["id"] != undefined) ? requestJSON["id"] : 0;
        }
        
        if(this.Id == undefined || this.Id == null)
        this.Id = 0;
       
      if(HelperService.IsStringValueAvailable(requestJSON["name"])){
        this.Name =  requestJSON["name"];
      }else if(HelperService.IsStringValueAvailable(requestJSON["Name"])){
        this.Name =  requestJSON["Name"];
      }else{
        this.Name ="";
      }
        this.Description = (requestJSON["Description"] != null &&  requestJSON["Description"] != undefined) ? requestJSON["Description"] : "";
        this.CreatedOn = (requestJSON["CreatedOn"] != null &&  requestJSON["CreatedOn"] != undefined) ? requestJSON["UpdatedOn"] : "";
        this.UpdatedOn = (requestJSON["UpdatedOn"] != null &&  requestJSON["UpdatedOn"] != undefined) ? requestJSON["updated_on"] : "";
        this.CreatedBy = (requestJSON["CreatedBy"] != null && requestJSON["CreatedBy"] != undefined) ? new BaseModel(requestJSON["CreatedBy"]) :null ;
        this.UpdatedBy = (requestJSON["UpdatedBy"] != null && requestJSON["UpdatedBy"] != undefined) ? new BaseModel(requestJSON["UpdatedBy"]) : null ;
    }

   static  getDefaultObject() {
       var defaultObject = new BaseModel(JSON);      
        return defaultObject;
    }
 
}