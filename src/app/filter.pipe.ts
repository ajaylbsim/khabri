import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})



export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, keyName: string, ddd: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(it => {
      if (it[keyName].toLowerCase().includes(searchText)) {
        return it[keyName].toLowerCase().includes(searchText);
      } else {
        return it[ddd].toString().toLowerCase().includes(searchText);

      }
    });
  }
}
