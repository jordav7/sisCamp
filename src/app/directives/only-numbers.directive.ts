import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[lde-only-numbers]'
})
export class OnlyNumbers {

  @Input() allowNumbers: boolean;
  regexStr:string = '^[0-9]*$';

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    let e = <KeyboardEvent> event;
    if (this.allowNumbers
      && ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
          // Allow: Ctrl+C
          (e.keyCode == 67 && e.ctrlKey === true) ||
          // Allow: Ctrl+X
          (e.keyCode == 88 && e.ctrlKey === true) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39))) {
      return;
    }
    let key = String.fromCharCode(e.keyCode);
    let regEx = new RegExp(this.regexStr);
    if (regEx.test(key)) {
      return;
    } else {
      e.preventDefault();
    }
  }
}
