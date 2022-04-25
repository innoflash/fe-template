import { TestBed } from '@angular/core/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { ErrorDialogService } from './error-dialog.service';

describe('ErrorDialogService', () => {
  let service: ErrorDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()]
    });
    service = TestBed.inject(ErrorDialogService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should open a modal', () => {
    const modalService = TestBed.inject(BsModalService);
    spyOn(modalService, 'show');

    service.openErrorDialog('Error something');
    expect(modalService.show).toHaveBeenCalledTimes(1);
  });
});
