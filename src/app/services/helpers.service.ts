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

  calcAge(date: string) {
    const start = moment(new Date(date));
    const today = moment(new Date())
    return today.diff(start, 'years')
  }


}
