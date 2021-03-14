import { Directive, ElementRef, Host, Input, OnDestroy, OnInit, Renderer2, SkipSelf } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';
import { isRequired } from '@fe-template/shared/validators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Automatically append suffix asterisk to required formControl fields
 * @description
 * Tracks the `FornCotrol` name via the `[formControlName]` bound to the directive.
 * The name corresponds to a key in the parent `ControlContainer`.
 * Also works with `[formControl]` direct binding
 * @export
 * @class FormRequiredDirective
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive({
  selector: '[appFormRequired]'
})
export class FormRequiredDirective implements OnInit, OnDestroy {

  @Input('appFormRequired') controlName: string | undefined;
  @Input('formControlName') formControlName: string | undefined;
  @Input('formControl') formControl: FormControl | undefined;
  @Input('labelDepth') labelDepth = 1;

  private nativeEl;
  private labelNode;
  private $destroy: Subject<any> = new Subject<any>();
  private suffix = this.renderer.createText(' *');

  /**
   * Creates an instance of FormRequiredDirective.
   * @param {ElementRef} el
   * @param {Renderer2} renderer
   * @param {ControlContainer} parent
   * @memberof FormRequiredDirective
   */
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Host() @SkipSelf() private parent: ControlContainer
  ) {
    this.nativeEl = this.el.nativeElement;
  }

  /**
   * On initialisation of the component, resolve the label node and add meta if required
   * @memberof FormRequiredDirective
   */
  // tslint:disable-next-line:typedef
  ngOnInit() {
    if (this.control) {
      this.labelNode = this.resolveLabelNode(this.nativeEl.parentNode, this.labelDepth);
      this.resolveSuffix();
      this.control.statusChanges.pipe(takeUntil(this.$destroy)).subscribe(change => {
        this.resolveSuffix();
      });
    }
  }

  /**
   * @memberof FormRequiredDirective
   */
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.$destroy.next();
  }

  /**
   * @readonly
   * @memberof FormRequiredDirective
   */
  // tslint:disable-next-line:typedef
  get control() {
    return this.formControl ? this.formControl : this.parent.control.get(this.controlName ? this.controlName : this.formControlName);
  }

  /**
   * Search the surrounding nodes for a label node to attach meta information to
   * @private
   * @param {*} parentNode
   * @param {number} [depth=1]
   * @returns
   * @memberof FormRequiredDirective
   */
  private resolveLabelNode(parentNode, depth = 1) {
    depth--; // decrement how deep we are looking into parentNode
    for (const key in parentNode.children) {
      if (parentNode.children[key].nodeName === 'LABEL') {
        return parentNode.children[key];
      }
    }
    if (depth > 0) {
      return this.resolveLabelNode(parentNode.parentNode, depth);
    }
    return null;
  }

  /**
   * Resolve the presense of a * suffix
   * @private
   * @memberof FormRequiredDirective
   */
  private resolveSuffix() {
    if (this.labelNode) {
      if (isRequired(this.control)) {
        this.renderer.setAttribute(this.labelNode, 'required', 'true');
        this.renderer.appendChild(this.labelNode, this.suffix);
      } else {
        this.renderer.setAttribute(this.labelNode, 'required', 'false');
        this.renderer.removeChild(this.labelNode, this.suffix);
      }
    }
  }

}
