import { Injectable } from '@angular/core';
import * as moment from "moment-timezone";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  getUUID() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  static EmptyJSON() {
    return JSON.parse("{}")
  }
  getEmptyJSON() {
    return JSON.parse("{}")
  }


  static IsStringValueAvailable(value: any) {
    return (value != null && value != undefined && value != "");
  }
  static IsValueAvailable(value: any) {
    return (value != null && value != undefined);
  }
  constructor() { }

  getLocalDate(date: Date | string, format?: string) {

    var localZone = moment.tz.guess();
    if (format) {
      if (moment(date).isValid()) {
        return moment.utc(date).tz(localZone).format(format);
      }
    }
    else {
      if (moment(date).isValid()) {
        return moment.utc(date).tz(localZone);
      }
    }
    return date;
  }
  

}
