import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
  transform(value: any[], search: string, key: string): string[] {
    if (!value) {
      return [];
    }
    return value.filter(v => {
      return v.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
