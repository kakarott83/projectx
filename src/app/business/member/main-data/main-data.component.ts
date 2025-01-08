import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-data',
  imports: [MaterialModule],
  templateUrl: './main-data.component.html',
  styleUrl: './main-data.component.scss'
})
export class MainDataComponent {

  mainDataForm!: FormGroup

  constructor(private fb: FormBuilder) {

    this.mainDataForm = fb.group({
      birthday: [new Date()],
      age: [{ value: 26, disabled: true }],
      street: ['Waldweg'],
      housenumber: ['5a'],
      zip: ['80689'],
      city: ['München'],
    })



  }

  

}
