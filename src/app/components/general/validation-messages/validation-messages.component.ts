import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ControlMessages } from '../../../util/control-messages';

@Component({
  selector: 'ld-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.css']
})
export class ValidationMessagesComponent {

  @Input() control: FormControl;

  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ControlMessages.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
