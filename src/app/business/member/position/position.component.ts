import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-position',
  imports: [MaterialModule],
  templateUrl: './position.component.html',
  styleUrl: './position.component.scss'
})
export class PositionComponent {

    positionForm!: FormGroup;
    teamList = ['FOMO','BOCH','BODAT'];
  
    constructor(private fb: FormBuilder) {
  
      this.positionForm = fb.group({
        team: ['FOMO'],
        position: ['Business Consultant'],
        entryDate: [new Date()],
        currSalary: [5800.05],
      })
  
  
  
    }

}
