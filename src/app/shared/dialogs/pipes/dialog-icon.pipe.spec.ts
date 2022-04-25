import { DialogIconPipe } from './dialog-icon.pipe';

describe('DialogIconPipe', () => {
  let pipe: DialogIconPipe;

  beforeEach(() => pipe = new DialogIconPipe());

  it('create an instance', () => expect(pipe).toBeTruthy());

  it('should return the image url as is if a link is user', () => {
    expect(pipe.transform('http://icon.png')).toBe('http://icon.png');
  });

  it('should resolve an image source from the storage if an icon name is passed', () => {
    expect(pipe.transform('icon.png')).toBe('/assets/images/dialogs/icon.png');
  });
});
