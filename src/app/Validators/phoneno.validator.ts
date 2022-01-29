import { FormControl, FormGroup } from "@angular/forms";

export function PhoneNoValidator(c: FormControl) {

  return c.value?.toString().length == 10 ? null : {
    phonelength:true
  };
}

export function PasswordMatch(formCtrlOne, formCtrlTwo) {

    return (fg: FormGroup) => {
        // Select the two form conrols from the form group
        // on which the comparison is to be performed.
        if(!fg.controls){return null;}
        const fieldOne = fg.controls[formCtrlOne];
        const fieldTwo = fg.controls[formCtrlTwo];
        if (fieldOne && fieldTwo) {
            if(fieldOne.value || fieldTwo.value) {
                if (fieldOne.value !== fieldTwo.value) {

                    fieldTwo.setErrors({
                        ...fieldTwo.errors,
                        ...{ 'password_mismatch': true }
                    });
                }
            }

            return null;
        }
        else{
          return null;
        }
    }
}

