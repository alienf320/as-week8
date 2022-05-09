import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class PasswordValidators {
  
  static securityLevel(control: AbstractControl): ValidationErrors | null {
    
    const rgxNumber = new RegExp('[0-9]')
    const rgxUppercase = new RegExp('[A-Z]')
    const rgxLowercase = new RegExp('[a-z]')

    if( !rgxNumber.test(control.value))  {
      return {'noNumbers': true};
    }

    if( !rgxUppercase.test(control.value))  {
      return {'noUppercase': true};
    }
    
    if( !rgxLowercase.test(control.value))  {
      return {'noLowercase': true};
    }
      
    return null;
  }

  static matchPasswords(){
    
    return (formGroup: FormGroup) => {  
      const control = formGroup.get('password');  
      const matchingControl = formGroup.get('passwordConfirmation');  
  
      if (control?.value !== matchingControl?.value) {  
        matchingControl?.setErrors({mustMatch: true})
        return {mustMatch: true}
      } else {  
        return false;
      }
  
    }; 
  }  
}