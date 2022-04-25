import { Injectable } from '@angular/core';
import { getDialogMappings } from '@fe-template/shared/dialogs/config/data.config';
import { DialogMapping, DialogType, OpenDialogData, TextAndClass } from '@fe-template/shared/dialogs/config/dialog-types';
import { DialogComponent } from '@fe-template/shared/dialogs/dialog/dialog.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable()
export abstract class DialogService {
  protected dialogData!: OpenDialogData;
  private dialogMappingData: DialogMapping = getDialogMappings();
  protected abstract dialogType: DialogType;

  public constructor(protected modalService: BsModalService) {
  }

  protected openDialog(dialogData: OpenDialogData): BsModalRef<DialogComponent> {
    this.dialogData = dialogData;
    this.modalService.onHidden.subscribe({
      next: (res: string | boolean | any) => {
        if (typeof res === 'string' && res) {
          if (!!dialogData.okButton && (typeof dialogData.okButton === 'object') && ('onClick' in dialogData.okButton)) {
            // @ts-ignore
            return dialogData.okButton.onClick();
          }

          if (typeof dialogData.okButton === 'function') {
            return dialogData.okButton();
          }
        }
      }
    });

    const modalOptions: ModalOptions = {
      id: this.dialogType.valueOf(),
      animated: true,
      ignoreBackdropClick: this.dialogType === DialogType.CONFIRM,
      class: 'modal-lg',
      ...dialogData.modalOptions || {},
      initialState: {
        dialogType: this.dialogType,
        ...dialogData,
        icon: dialogData.icon ?? this.dialogMappingData[this.dialogType].icon,
        title: this.resolveTextAndTitle('title'),
        message: this.resolveTextAndTitle('message'),
        okButton: this.resolveTextAndTitle('okButton', 'btn-primary'),
        cancelButton: this.resolveTextAndTitle('cancelButton', 'btn-link')
      }
    };

    // @ts-ignore
    return this.modalService.show(DialogComponent, modalOptions);
  }

  protected resolveDialogConfig<T extends OpenDialogData>(arg1: unknown, arg2?: unknown, arg3?: unknown): T {
    let dialogConfig: T = {} as T;

    if (typeof arg1 === 'string') {
      dialogConfig.message = arg1 as string;
    }

    if (toString.call(arg1).endsWith('Array]')) {
      dialogConfig.message = (arg1 as Array<string>).join(',<br/>\n');
    }

    if (toString.call(arg1).endsWith('Object]')) {
      dialogConfig = arg1 as T;
    }

    if (typeof arg2 === 'string') {
      dialogConfig.title = arg2 as string;
    }

    if (typeof arg2 === 'function' || arg3) {
      dialogConfig.okButton = arg2 as () => void;
    }

    if (typeof arg2 === 'object') {
      dialogConfig = { ...dialogConfig, ...arg2 as T };
    }

    if (typeof arg3 === 'function') {
      dialogConfig.okButton = arg3 as () => void;
    }

    return dialogConfig;
  }

  private resolveTextAndTitle(key: keyof OpenDialogData, defaultValue = ''): TextAndClass {
    let text = '';
    let _class = '';

    const resolveValue = (data: TextAndClass, key: 'text' | 'class', defaultValue = ''): string => {
      if (data && key in data) {
        return data[key] as string;
      }

      return defaultValue;
    };

    // @ts-ignore
    const valueFromConfig = this.dialogMappingData[this.dialogType][key];

    if (typeof this.dialogData[key] === 'string') {
      text = this.dialogData[key] as string;
      // @ts-ignore
      _class = typeof valueFromConfig === 'string' ? defaultValue : resolveValue(valueFromConfig, 'class', defaultValue);
    } else {
      text = typeof valueFromConfig === 'string' ? valueFromConfig : resolveValue(valueFromConfig, 'text', defaultValue);
      _class = typeof valueFromConfig !== 'string' ? valueFromConfig : defaultValue;
    }

    return {
      text,
      class: _class
    };
  }
}

