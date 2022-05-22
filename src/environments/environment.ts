// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverURL:"http://192.168.1.14:5000",
  apiURL:"http://192.168.1.14:5000/api/"
};

// export const environment = {
//   production: true,
//   serverURL:"http://ec2-elb-1322835692.ap-south-1.elb.amazonaws.com:8141",
//   apiURL:"http://ec2-elb-1322835692.ap-south-1.elb.amazonaws.com:8141/api/"
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
