import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  showInputs = {
    shLogName: false,
    shDriverName: false
  }
  showDriverNameEl = false;

  form: FormGroup = new FormGroup({
    logName: new FormControl('Log Name'),
    from: new FormControl(''),
    to: new FormControl(''),
    departureTime: new FormControl(''),
    arrivalTime: new FormControl(''),
    driverName: new FormControl('Driver name'),
    make: new FormControl('Make'),
    model: new FormControl('Model'),
  })


  onSubmit() {
    if (!this.showDriverNameEl) {
      this.form.value.driverName = 'self'
    }
    console.log(this.form.value)
  }
}
