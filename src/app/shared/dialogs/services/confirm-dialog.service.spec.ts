import { TestBed } from '@angular/core/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { ConfirmDialogService } from './confirm-dialog.service';

describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot()
      ]
    });
    service = TestBed.inject(ConfirmDialogService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should open a modal', () => {
    const modalService = TestBed.inject(BsModalService);
    spyOn(modalService, 'show');

    service.openConfirmDialog('Confirm something');
    expect(modalService.show).toHaveBeenCalledTimes(1);
  });
});
