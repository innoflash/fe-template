import { ModalOptions } from 'ngx-bootstrap/modal';

export enum DialogType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  CONFIRM = 'confirm'
}

export type TextAndClass = {
  text?: string;
  class?: string;
};

export type DialogButtonConfig = {
  text?: string;
  color?: string, //TODO assign color changes.
  onClick?: VoidFunction
};

export type DialogConfig = {
  icon?: string;
  message?: string | TextAndClass;
  title?: string | TextAndClass;
  okButton?: string | DialogButtonConfig | VoidFunction;
  cancelButton?: string | DialogButtonConfig | VoidFunction;
  dialogType: DialogType;
};


export type OpenDialogData = Omit<DialogConfig, 'dialogType'> & {
  modalOptions?: ModalOptions
};

export type ConfirmDialogConfig = OpenDialogData;
export type SuccessDialogConfig = Omit<OpenDialogData, 'cancelButton'>;
export type ErrorDialogConfig = Omit<OpenDialogData, 'cancelButton'>;
export type WarningDialogConfig = Omit<OpenDialogData, 'cancelButton'>;

export type DialogMapping = Record<DialogType, {
  icon: string,
  title: string | TextAndClass;
  message: string | TextAndClass;
  okButton: string | DialogButtonConfig;
  cancelButton?: string | DialogButtonConfig;
}>;
