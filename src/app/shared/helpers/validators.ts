import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Checks if passwords are a match.
 *
 * @param {string} password The password to be matched.
 * @param {string} confirmPassword The password to match
 * @returns {ValidatorFn} The validating rule.
 */
export const passwordsMatchValidator = (password = 'password', confirmPassword = 'confirmPassword'): ValidatorFn => {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    if (formGroup.get(password)?.value === formGroup.get(confirmPassword)?.value) {
      return null;
    }

    return { passwordsMismatch: true };
  };
};

/**
 * Marks the form group controls as marked so validation classes can be added.
 *
 * @param {FormGroup | FormArray} formGroup
 */
export const validateAllFormFields = (formGroup: FormGroup | FormArray): void => {
  Object.keys(formGroup.controls).forEach((field, index) => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      validateFormField(control);
    } else if (control instanceof FormGroup || control instanceof FormArray) {
      validateAllFormFields(control);
    }
  });
};

/**
 * Marks touched on a single form control.
 *
 * @param {FormControl} control
 */
export const validateFormField = (control: FormControl): void => {
  control.markAsTouched({ onlySelf: true });
};

export const getValidationRules = (control: AbstractControl): ValidationErrors | null => {
  return control.validator ? control.validator({} as AbstractControl) : {};
};

export const isRequired = (control: AbstractControl): boolean => {
  const validationRules = getValidationRules(control);

  return !!validationRules && !!validationRules.required;
};
