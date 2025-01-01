import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);
  
      // Wenn eines der Felder nicht existiert, Validator nicht anwenden
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
  
      // Überprüfen, ob die Werte übereinstimmen
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null); // Fehler zurücksetzen, falls Werte übereinstimmen
      }
  
      return null; // Rückgabe ist immer null, da die Fehler direkt in den Controls gesetzt werden
    };
  }