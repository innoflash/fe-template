/**
 * Scrolls to provided element.
 *
 * @param {Element} el
 */
export const scrollTo = (el: Element): void => {
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

/**
 *  scroll to first Error On The Page
 */
export const scrollToError = (): void => {
  // tslint:disable-next-line: max-line-length
  const elem = document.querySelector(
    `input.invalid,
        textarea.invalid,
        select.invalid,
        input.ng-invalid,
        textarea.ng-invalid,
        select.ng-invalid,
        .form-control.ng-invalid
        ngx-intl-tel-input.ng-invalid,
        .ng-select.ng-invalid,
        .has-errors`
  );
  if (elem) {
    scrollTo(elem);
  }
};

/**
 *  scroll to provided CSS selector
 *  @param {string} selector
 */
export const scrollToSelector = (selector: string): void => {
  const elem = document.querySelector(selector);
  if (elem) {
    scrollTo(elem);
  }
};
