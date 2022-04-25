import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DialogType } from '@fe-template/shared/dialogs/config/dialog-types';
import { DialogComponent } from '@fe-template/shared/dialogs/dialog/dialog.component';
import { DialogIconPipe } from '@fe-template/shared/dialogs/pipes/dialog-icon.pipe';
import { DialogStringToHtmlPipe } from '@fe-template/shared/dialogs/pipes/dialog-string-to-html.pipe';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent, DialogIconPipe, DialogStringToHtmlPipe],
      imports: [ModalModule.forRoot()],
      providers: [BsModalRef]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        component.icon = 'confirm.png';
        component.dialogType = DialogType.CONFIRM;
        component.title = {
          text: 'Are you sure?',
          class: 'text-warn'
        };
        component.message = {
          text: 'The message',
          class: ''
        };
        component.okButton = {
          text: 'Yes!',
          class: 'btn-primary'
        };
        component.cancelButton = {
          text: 'Cancel',
          class: 'btn-link'
        };
        debugElement = fixture.debugElement;

        fixture.detectChanges();
      });
  }));

  it('should create', () => expect(component).toBeTruthy());

  describe('DialogComponent icon test', () => {
    let dialogIconPipe: DialogIconPipe;
    let imgTag: DebugElement;

    beforeEach(() => {
      dialogIconPipe = new DialogIconPipe();
      imgTag = debugElement.query(By.css('img'));
    });

    it('should show confirm dialog icon', () => {
      expect(imgTag).toBeTruthy();
      expect(imgTag.nativeElement.src.endsWith(dialogIconPipe.transform('confirm.png'))).toBeTrue();
    });

    it('should show success dialog icon', () => {
      component.icon = 'success.png';
      fixture.detectChanges();

      expect(imgTag).toBeTruthy();
      expect(imgTag.nativeElement.src.endsWith(dialogIconPipe.transform('success.png'))).toBeTrue();
    });

    it('should show error dialog icon', () => {
      component.icon = 'error.png';
      fixture.detectChanges();

      expect(imgTag).toBeTruthy();
      expect(imgTag.nativeElement.src.endsWith(dialogIconPipe.transform('error.png'))).toBeTrue();
    });

    it('should show warning dialog icon', () => {
      component.icon = 'warning.png';
      fixture.detectChanges();

      expect(imgTag).toBeTruthy();
      expect(imgTag.nativeElement.src.endsWith(dialogIconPipe.transform('warning.png'))).toBeTrue();
    });

    it('should show an icon from url', () => {
      component.icon = 'http://test.icon.png';
      fixture.detectChanges();

      expect(imgTag).toBeTruthy();
      expect(imgTag.nativeElement.src.startsWith('http://test.icon.png')).toBe(true);
    });
  });

  describe('DialogComponent title test', () => {
    //let dialogStringToHtmlPipe: DialogStringToHtmlPipe;
    let titleTag: DebugElement;

    beforeEach(() => {
      //dialogStringToHtmlPipe = new DialogStringToHtmlPipe();
      titleTag = debugElement.query(By.css('.dialog-title'));
    });

    it('should show title as an h1', () => {
      expect(titleTag.nativeElement.outerHTML).toContain('Are you sure?');
    });

    it('should show title with a set class name', () => {
      expect(titleTag.nativeElement.classList.contains('text-warn')).toBeTrue();

      component.title.class = 'text-primary';
      fixture.detectChanges();

      expect(titleTag.nativeElement.classList.contains('text-primary')).toBeTrue();
    });

    it('should render html to the title', () => {
      component.title.text = '<p>First Paragraph</p></p>Last paragraph</p>';
      fixture.detectChanges();

      expect(titleTag.nativeElement.innerHTML).toContain('First Paragraph');
      pending('To fix the piping');
    });
  });

  describe('DialogComponent message test', () => {
    //let dialogStringToHtmlPipe: DialogStringToHtmlPipe;
    let messageTag: DebugElement;

    beforeEach(() => {
      //dialogStringToHtmlPipe = new DialogStringToHtmlPipe();
      messageTag = debugElement.query(By.css('.dialog-message'));
    });

    it('should show message as an h1', () => {
      expect(messageTag.nativeElement.outerHTML).toContain('The message');
    });

    it('should show message with a set class name', () => {
      expect(messageTag.nativeElement.classList.contains('text-warn')).toBeFalse();

      component.message.class = 'text-primary';
      fixture.detectChanges();

      expect(messageTag.nativeElement.classList.contains('text-primary')).toBeTrue();
    });

    it('should render html to the message', () => {
      component.message.text = '<p>First Paragraph</p></p>Last paragraph</p>';
      fixture.detectChanges();

      expect(messageTag.nativeElement.innerHTML).toContain('First Paragraph');
      pending('To fix the piping');
    });
  });

  describe('DialogComponent okButton test', () => {
    let okButton: DebugElement;

    beforeEach(() => okButton = debugElement.query(By.css('.btn-ok')));

    it('should render the okButton', () => expect(okButton).toBeTruthy());

    it('should show button can change button classes', () => {
      expect(okButton.nativeElement.classList.contains('btn-primary')).toBeTrue();

      component.okButton.class = 'btn-secondary';
      fixture.detectChanges();
      expect(okButton.nativeElement.classList.contains('btn-secondary')).toBeTrue();

      component.okButton.class = 'btn-danger';
      fixture.detectChanges();
      expect(okButton.nativeElement.classList.contains('btn-danger')).toBeTrue();
    });

    it('should show button can have set text', () => {
      expect(okButton.nativeElement.innerHTML.trim()).toBe('Yes!');

      component.okButton.text = 'Please leave page!';
      fixture.detectChanges();
      expect(okButton.nativeElement.innerHTML.trim()).toBe('Please leave page!');
    });

    it('should be clicked and call onOkayClicked', () => {
      spyOn(component, 'onOkayClicked');

      okButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.onOkayClicked).toHaveBeenCalled();
      expect(component.onOkayClicked).toHaveBeenCalledTimes(1);
    });
  });

  describe('DialogComponent cancelButton test', () => {
    let cancelBtn: DebugElement;

    beforeEach(() => cancelBtn = debugElement.query(By.css('.btn-cancel')));

    it('should show cancel button if dialog is a confirm dialog', () => expect(cancelBtn).toBeTruthy());

    it('should not show cancel button if not a confirm dialog', () => {
      component.dialogType = DialogType.SUCCESS;
      spyOnProperty(component, 'showCancelButton', 'get').and.returnValue(false);
      fixture.detectChanges();

      pending('To check why button has  a value');
      expect(cancelBtn).toBeFalsy();
    });

    it('should have cancel button change text', () => {
      expect(cancelBtn.nativeElement.innerHTML.trim()).toBe('Cancel');

      component.cancelButton.text = 'Stay on page';
      fixture.detectChanges();

      expect(cancelBtn.nativeElement.innerHTML.trim()).toBe('Stay on page');
    });

    it('should close modal when clicked', () => {
      const bsModalRef = TestBed.inject(BsModalRef);
      spyOn(bsModalRef, 'hide');

      cancelBtn.nativeElement.click();
      fixture.detectChanges();

      expect(bsModalRef.hide).toHaveBeenCalled();
      expect(bsModalRef.hide).toHaveBeenCalledTimes(1);
    });
  });

  describe('DialogComponent ts file test', () => {
    it('should show cancelBtn', () => expect(component.showCancelButton).toBeTrue());

    it('should not show cancelBtn', () => {
      component.dialogType = DialogType.SUCCESS;

      expect(component.showCancelButton).toBeFalse();
    });

    it('should hide the modal when onOkayClicked is called', () => {
      const bsModalRef = TestBed.inject(BsModalRef);
      const modalService = TestBed.inject(BsModalService);
      spyOn(bsModalRef, 'hide');
      spyOn(modalService, 'setDismissReason');

      component.onOkayClicked();

      expect(modalService.setDismissReason).toHaveBeenCalledOnceWith('ok-clicked');
      expect(bsModalRef.hide).toHaveBeenCalledTimes(1);
    });
  });
});
