
import { Pipe, PipeTransform } from '@angular/core';
import { HelperService } from '../services/helper/helper.service';


@Pipe({ name: 'localeDate' })
export class LocaleDatePipe implements PipeTransform {

    constructor(private _helper: HelperService) {

    }

    transform(date: Date | string, format: string) {
        return this._helper.getLocalDate(date, format);
    }
}