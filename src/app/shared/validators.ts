import { FormGroup, FormControl, Validators, Validator, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

export const STRING_ONLY_REGEXP = new RegExp('^[\u0020-\u007e\u00a0-\u00ff\u0100-\u017F]*$');
const NUMERIC = '[0-9]+';
const ALPHABETIC = '[a-zA-Z\u00C0-\u00ff]+';

const SUPER_NUMBER = '^((?!(0)[1-9])[0-9]{0,9})$';
const SUPER_NUMBER_SECOND = '\\d{0,3}(\\.\\d{1,2})?';

const LETTER_SPACE_DASH =
  new RegExp('^[\u0020-\u007e\u00a0-\u00ff\u0100-\u017F_]+([ -][\u0020-\u007e\u00a0-\u00ff\u0100-\u017F_]+)*$');
const PASSWORD_REGEXP = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9!@#$%^&*]{6,}$');
const LETTERS_NUMBERS_SPACES = new RegExp('^[a-zA-Z\d]+( [a-zA-Z\d]+)*$');
const SSN_PATTERN = '^[0-9]{3}[\.\s]?([0-9]){2}[\.\s]?[0-9]{4}$|\d{3}\.\d{2}\.\d{3}\.\d{3}';

// tslint:disable-next-line:max-line-length
const pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regexValidators = {
  // tslint:disable-next-line:max-line-length
  phone: /^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/,
  // tslint:disable-next-line:max-line-length
  intPhone: /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
  email: pureEmail,
  url: '^(https?:\\/\\/)?' + // protocol
    '((([A-Za-z\\d]([A-Za-z\\d-]*[A-Za-z\\d])*)\\.)+[A-Za-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-A-Za-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&A-Za-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-A-Za-z\\d_]*)?$', // https://stackoverflow.com/a/5717133
  money: '^[0-9]+(\.[0-9]{1,2})?$',
  first_name: '^[a-zA-Z | \s]+$',
  last_name: '^[a-zA-Z | \s]+$',
  date: '^\d{1,2}\.\d{1,2}\.\d{4}$',
  integer: '^[0-9]+$',
  temperature: /^[0-9]{1,2}([,.][0-9]{1,2})?$/,
  nibp: /^[0-9]{2,3}\/([0-9]{2,3})?$/,
  hearing: /^[0-9]{1,3}([,.][0-9]{1,2})?\/[0-9]{1,3}([,.][0-9]{1,2})?$/,
  vision: /^[0-9]{1,3}([,.][0-9]{1,2})?\/[0-9]{1,3}([,.][0-9]{1,2})?$/,
  float: /^[0-9]{1,10}([,.][0-9]{1,10})?$/,
  // tslint:disable-next-line:max-line-length
  postcode: /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/,
  noWhitespace: /[^-\s]/
};
const NUMBERS_SPACES = new RegExp('^[\+]?[0-9_]+( [0-9_]+)*$');
const SIMPLE_TEXT_MESSAGE =
  new RegExp('^([\u0020-\u007e\u00a0-\u00ff\u0100-\u017F])[\u0020-\u007e\u00a0-\u00ff\u0100-\u017F., ]*$');

export class FormValidator {

  // tslint:disable-next-line:typedef
  public static phoneNumber(field: FormControl) {
    // @ts-ignore
    return Validators.compose([
      Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern('^[\+]?[0-9_]+( [0-9_]+)*$')
    ])(field);
  }

  // tslint:disable-next-line:typedef
  public static mail(field: FormControl) {
    if (field.value) {
      const domain = field.value.split('.');
      if (domain[domain.length - 1] === 'web') {
        return { incorrectMailFormat: true };
      }
    }
    const EMAIL_REGEXP = new RegExp('^(([^<>()\\[\\]\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\.,;:\\s@"]+)*)|(".+"))' +
      '@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])' +
      '|([^<>()/\\\&?\\-.,;:]+([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

    if (!EMAIL_REGEXP.test(field.value)) {
      return { incorrectMailFormat: true };
    }

    return undefined;
  }
}

// TODO revoe next two exports from this service
export const validateAllFormFields = (formGroup: FormGroup) => {
  Object.keys(formGroup.controls).forEach((field, index) => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    }
  });
};
export const validateAllExceptEmail = (formGroup: FormGroup) => {
  Object.keys(formGroup.controls).forEach((field, index) => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      if (field === 'email') {
        return;
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    }
  });
};

export const uppercasePattern =
  (c: AbstractControl): { [key: string]: any } | null =>
    /[A-Z]/.test(c.value) ? null : { uppercase: { value: true } };

export const lovercasePattern =
  (c: AbstractControl): { [key: string]: any } | null =>
    /[a-z]/.test(c.value) ? null : {
      lovercase: { value: true }
    };

export const numberPattern =
  (c: AbstractControl): { [key: string]: any } | null =>
    /[0-9]/.test(c.value) ? null :
      { number: { value: true } };

export const noWhitespacePattern =
  (c: AbstractControl): { [key: string]: any } | null =>
    /[^-\s]/.test(c.value) ? null :
      { whitespace: { value: true } };


export const validateFormField = (control: FormControl) => {
  control.markAsTouched({ onlySelf: true });
};

export const getValidationRules = (control: AbstractControl) => {
  return control.validator ? control.validator({} as AbstractControl) : {};
};

export const isRequired = (control: AbstractControl) => {
  const validationRules = getValidationRules(control);
  return !!validationRules && !!validationRules.required;
};
