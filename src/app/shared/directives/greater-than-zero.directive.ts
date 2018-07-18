import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appGreaterThanZero]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: GreaterThanZeroDirective, multi: true }
  ]
})
export class GreaterThanZeroDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value <= 0 ? {greaterThanZero: false} : null;
  }

}
