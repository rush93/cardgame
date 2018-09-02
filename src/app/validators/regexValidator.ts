import { ValidatorFn, AbstractControl } from '@angular/forms';

export function regexValidator(nameRe: RegExp = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿA-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸ0-9 ]{0,29}$/g)
  : ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    nameRe.exec(control.value);
    if (forbidden) {
      return null;
    } else {
      return {'regex': {value: control.value}};
    }
  };
}
