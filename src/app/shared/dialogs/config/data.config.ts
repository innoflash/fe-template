import { DialogMapping, DialogType } from '@fe-template/shared/dialogs/config/dialog-types';

export const getDialogMappings = (): DialogMapping => ({
  [DialogType.SUCCESS]: {
    icon: 'success.png',
    title: 'Success!',
    message: '',
    okButton: 'Okay!'
  },
  [DialogType.ERROR]: {
    icon: 'error.png',
    title: 'Error!',
    message: {
      class: 'text-accent'
    },
    okButton: 'Okay!'
  },
  [DialogType.WARNING]: {
    icon: 'warning.png',
    title: {
      text: 'Warning!',
      class: 'text-warn'
    },
    message: {
      class: undefined
    },
    okButton: 'Okay!'
  },
  [DialogType.CONFIRM]: {
    icon: 'confirm.png',
    title: {
      text: 'Are you sure?',
      class: 'text-warn'
    },
    message: '',
    okButton: 'Yes!',
    cancelButton: {
      text: 'Cancel'
    }
  }
});
