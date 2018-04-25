import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms'; //NG_ holds all the validation directives

@Directive({
  selector: '[appNoSpecialChars]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoSpecialCharsDirective, multi: true}]
})
export class NoSpecialCharsDirective implements Validator{

  constructor() { }
  //function executed on form validation
  //returns null for valid response
  validate(c: FormControl): ValidationErrors{
    const hasSpecialChars = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(c.value);
    const message = {
      'hasSpecialChars': {
        'message': 'No Special Characters Allowed'
      }
    };
    return hasSpecialChars ? message : null;
  }
}
