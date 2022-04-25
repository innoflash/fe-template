import { Pipe, PipeTransform } from '@angular/core';
import { StringToHtmlPipe } from '@fe-template/shared/pipes/string-to-html.pipe';

@Pipe({
  name: 'stringToHtml'
})
export class DialogStringToHtmlPipe extends StringToHtmlPipe implements PipeTransform {

  public transform(value: string, wrappingTag: string = 'p'): string {
    console.log({ value, wrappingTag });

    return super.transform(value, wrappingTag);
  }
}
