import { Directive, forwardRef, HostListener, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[input-number]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumberDirective),
    multi: true
  }]
})
export class InputNumberDirective implements ControlValueAccessor {
  viewVal = '';
  propagateChange = (_: any) => {};

  constructor() {
  }

  writeValue(val: any) {
    this.viewVal = val;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  @HostBinding('value')
  get value() {
    return this.viewVal;
  }

  @HostListener('input', ['$event.target.value'])
  inputChange(val: string) {
    this.propagateChange(parseInt(val, 10));
  }

}
