import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogComponent } from '@fe-template/shared/dialogs/dialog/dialog.component';
import { ConfirmDialogService } from '@fe-template/shared/dialogs/services/confirm-dialog.service';
import { SavedDataInterface } from '@fe-template/shared/interfaces/saved-data.interface';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

import { SavedDataGuard } from './saved-data.guard';

describe('SavedDataGuard', () => {
  let guard: SavedDataGuard;
  let withoutInterfaceFixture: ComponentFixture<SavedDataGuardWithoutInterfaceTestComponent>;
  let withoutInterfaceComponent: SavedDataGuardWithoutInterfaceTestComponent;
  let fixture: ComponentFixture<SavedDataGuardWithInterfaceTestComponent>;
  let component: SavedDataGuardWithInterfaceTestComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SavedDataGuardWithoutInterfaceTestComponent, SavedDataGuardWithInterfaceTestComponent],
      imports: [
        ModalModule.forRoot(),
        ReactiveFormsModule
      ]
    }).compileComponents()
      .then(() => {
        guard = TestBed.inject(SavedDataGuard);
        withoutInterfaceFixture = TestBed.createComponent(SavedDataGuardWithoutInterfaceTestComponent);
        fixture = TestBed.createComponent(SavedDataGuardWithInterfaceTestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        withoutInterfaceFixture.detectChanges();
      });
  }));

  it('should be created', () => expect(guard).toBeTruthy());

  it('should throw error if component does not implement SavedDataInterface', () => {
    withoutInterfaceComponent = withoutInterfaceFixture.componentInstance;

    try {
      // @ts-ignore
      expect(guard.canDeactivate(withoutInterfaceComponent)).toThrowError('');
    } catch (e) {
      expect(e.message).toBe(`SavedDataGuardWithoutInterfaceTestComponent did not implement the SavedDataInterface.
      Implement the interface to make the SavedDataGuard to work.`);
    }
  });

  it('should navigate away if form is not touched', () => {
    // @ts-ignore
    guard.canDeactivate(component).subscribe({
      next: res => expect(res).toBe(true)
    });
  });

  it('should navigate away if form is valid', () => {
    component.testFormGroup.patchValue({ testInput: 'testInput' });
    fixture.detectChanges();

    guard.canDeactivate(component).subscribe({
      next: res => expect(res).toBe(true)
    });
  });

  it('should stay on page if form is dirty', () => {
    component.testFormGroup.markAsDirty({ onlySelf: true });

    const confirmDialogService = TestBed.inject(ConfirmDialogService);
    spyOn(confirmDialogService, 'openConfirmDialog').and.returnValue({} as BsModalRef<DialogComponent>);
    guard.canDeactivate(component).subscribe({
      next: res => expect(res).toBe(false)
    });
  });
});

@Component({
  template: ''
})
export class SavedDataGuardWithoutInterfaceTestComponent {}

@Component({
  template: ''
})
export class SavedDataGuardWithInterfaceTestComponent implements SavedDataInterface {
  public testFormGroup!: FormGroup;

  public constructor(private fb: FormBuilder) {
    this.testFormGroup = this.fb.group({
      testInput: ['', Validators.required]
    });
  }

  public getPageForm(): FormGroup {
    return this.testFormGroup;
  }
}
