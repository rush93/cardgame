import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'values'})
export class ValuesPipe implements PipeTransform {
  transform(object: any): any[] {
    if (!object) {
      return [];
    }
    return Object.values(object);
  }
}
