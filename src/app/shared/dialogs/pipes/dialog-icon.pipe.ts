import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dialogIcon'
})
export class DialogIconPipe implements PipeTransform {

  public transform(icon: string): string {
    if (icon.startsWith('http')) {
      return icon;
    }

    return `/assets/images/dialogs/${ icon }`;
  }
}
