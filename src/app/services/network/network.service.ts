import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const AUTH_TOKEN_KEY = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  authorizationToken:string;
  headers:HttpHeaders;
  token: string;
  httpClient: HttpClient;
  constructor(private http: HttpClient) { 
    this.httpClient = http;
    this.headers = new HttpHeaders();
    this.headers.set("Source", "TPA-WebAPP");
    this.headers.set(AUTH_TOKEN_KEY, '');  
   
  }
  get(url: string,success:(any),failure:(any)) {    
    this.token = localStorage.getItem(AUTH_TOKEN_KEY);
    var headers = new HttpHeaders();
      
   
    this.httpClient.get(url, { headers:headers})
      .subscribe(data => {
        success(data);
      }, error => {
        failure(error);
    });    
  }
  post(url:string,data:any,success:(any),failure:(any)) {    
    this.token = localStorage.getItem(AUTH_TOKEN_KEY);
   
    var headers = new HttpHeaders({'Content-Type': 'application/json'});  
   

    this.http.post(url, data, { headers })
      .subscribe(response => {
        success(response);

      }, error => {
          failure(error);
      });
  }

  patch(url: string, data: any, success: (any), failure: (any)) {
    this.token = localStorage.getItem(AUTH_TOKEN_KEY);
    var headers = new HttpHeaders();      
   

    this.http.patch(url, data, { headers })
      .subscribe(data => {
        success(data);
      }, error => {
        failure(error);
      });
  }

  delete(url: string, success: (any), failure: (any)) {
    this.token = localStorage.getItem(AUTH_TOKEN_KEY);
    var headers = new HttpHeaders();      
   

    this.http.delete(url, { headers })
      .subscribe(data => {
        success(data);
      }, error => {
        failure(error);
      });
  }

  put(url: string, data: any, success: (any), failure: (any)) {    
    this.token = localStorage.getItem(AUTH_TOKEN_KEY);
   
    var headers = new HttpHeaders({'Content-Type': 'application/json'});  
   
  
      this.http.put(url, data, { headers })
        .subscribe(response => {
        
          success(response);
  
        }, error => {
            failure(error);
        });

  }
}
