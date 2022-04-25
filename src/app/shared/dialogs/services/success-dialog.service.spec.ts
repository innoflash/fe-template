import { TestBed } from '@angular/core/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { SuccessDialogService } from './success-dialog.service';

describe('SuccessDialogService', () => {
  let service: SuccessDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()]
    });
    service = TestBed.inject(SuccessDialogService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should open a modal', () => {
    const modalService = TestBed.inject(BsModalService);
    spyOn(modalService, 'show');

    service.openSuccessDialog('Success something');
    expect(modalService.show).toHaveBeenCalledTimes(1);
  });
});
