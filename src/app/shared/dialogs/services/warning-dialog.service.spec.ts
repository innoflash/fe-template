import { TestBed } from '@angular/core/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { WarningDialogService } from './warning-dialog.service';

describe('WarningDialogService', () => {
  let service: WarningDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()]
    });
    service = TestBed.inject(WarningDialogService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should open a modal', () => {
    const modalService = TestBed.inject(BsModalService);
    spyOn(modalService, 'show');

    service.openWarningDialog('Warn something');
    expect(modalService.show).toHaveBeenCalledTimes(1);
  });

});
