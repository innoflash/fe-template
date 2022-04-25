import { StringToHtmlPipe } from '@fe-template/shared/pipes/string-to-html.pipe';

describe('StringToHtmlPipe', () => {
  let pipe: StringToHtmlPipe;

  beforeEach(() => pipe = new StringToHtmlPipe());

  it('create an instance', () => expect(pipe).toBeTruthy());

  it('should make a paragraph from a simple string', () => {
    expect(pipe.transform('test')).toBe('<p>test</p>');
  });

  it('should add custom tag to a string', () => {
    expect(pipe.transform('test', 'h1')).toBe('<h1>test</h1>');
  });

  it('should not transform an html string', () => {
    expect(pipe.transform('<h2>test</h2>')).toBe('<h2>test</h2>');
  });
});
