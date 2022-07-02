import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICarInfo } from '../../interfaces/car-info.interface';

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
  showRegistrationOptions = false;
  options: ICarInfo[] = [
    { id: 1, imageUrl: '../../../assets/image/BMW-X3.png', registration: 'AT 1505 BM', make: 'BMW', model: 'X3' },
    { id: 2, imageUrl: '', registration: 'KA 1234 KA', make: 'Toyota', model: 'Prius' }
  ]

  @ViewChild('optionsDiv') optionsDiv!: ElementRef;

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.optionsDiv.nativeElement.contains(event.target)) {
      this.showRegistrationOptions = false
    }
  }

  form: FormGroup = new FormGroup({
    logName: new FormControl('Log Name'),
    from: new FormControl(''),
    to: new FormControl(''),
    departureTime: new FormControl(''),
    arrivalTime: new FormControl(''),
    driverName: new FormControl('Driver name'),
    registration: new FormControl('Registration'),
    make: new FormControl('Make'),
    model: new FormControl('Model'),
  })


  onSubmit() {
    if (!this.showDriverNameEl) {
      this.form.value.driverName = 'self'
    }
    console.log(this.form.value)
  }

  select(option: ICarInfo) {
    const newForm = { ...this.form.value, registration: option.registration, make: option.make, model: option.model }
    this.form.setValue(newForm)
  }
}
