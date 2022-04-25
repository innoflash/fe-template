import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToHtml'
})
export class StringToHtmlPipe implements PipeTransform {

  /**
   * This converts a string into an HTML string wrapped in the tag you specify.
   * The default is the p tag.
   *
   * @param {string} value
   * @param {string} wrappingTag
   * @returns {string}
   */
  public transform(value: string, wrappingTag: string = 'p'): string {
    if (value.startsWith('<')) {
      return value;
    }

    return `<${ wrappingTag }>${ value }</${wrappingTag}>`;
  }

}
