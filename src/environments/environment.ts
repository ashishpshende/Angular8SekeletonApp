// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const Domain = {
  protocol:"http",
  ip:"192.168.0.5",
  port:"59007",
  // name:"https://localhost:44384",
    // name:"http://192.168.0.5:59007",
    // name:"http://192.168.0.106:10001",
    name:"http://14.102.76.170:10001",
}
export const environment = {
  production: false,

      
        apiURL: Domain.name + '/api/v1',  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
