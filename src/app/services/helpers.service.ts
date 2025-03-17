import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private currencyPipe: CurrencyPipe) { }

  formatDisplayAmount(amount?: number) {
    if(amount) {
      const value = amount;
      const numericValue = parseFloat(
        value.toString().replace(',', '.')
      )
      const formatted = this.currencyPipe.transform(
        numericValue,
        'EUR',
        'symbol',
        '1.2-2',
        'de-DE'
      )
      return formatted
    }
    return null
  }

  formatDbAmount(amount?: string): number {
    if(amount) {
      const cleanValue = amount
        .replace('€', '')        // Währungszeichen entfernen
        .replace(/\s/g, '')      // Leerzeichen entfernen
        .replace('.', '')        // Tausenderpunkte entfernen
        .replace(',', '.');      // Komma durch Punkt ersetzen

      const floatValue = parseFloat(cleanValue)

      return floatValue;
    }

    return 0

  }

  calcAge(birthday: string | Date | undefined): number 
  {
      if (!birthday) return 0;
          
      const birth = new Date(birthday);
      const today = new Date();
          
      let age = today.getFullYear() - birth.getFullYear();
      if (
          today.getMonth() < birth.getMonth() ||
          (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
          ) {
          age--;
          }
          
          return age;
  }
}
