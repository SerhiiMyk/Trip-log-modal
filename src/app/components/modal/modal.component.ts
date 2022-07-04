import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICarInfo } from '../../interfaces/car-info.interface';
import { IDatepicker } from '../../interfaces/datepicker.interface';

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
  showDepartureDatepicker = false
  showArriveDatepicker = false

  arrivalDateStr = '--/--/----|--:--'
  departureDateStr = '--/--/----|--:--'
  durationStr = '0 h 0 m'

  departureDatepicker!: IDatepicker
  arriveDatepicker!: IDatepicker

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
    departureTime: new FormControl({}),
    arrivalTime: new FormControl({}),
    durationMinutes: new FormControl(0),
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

  onEmit(date: IDatepicker, type: string) {

    const dateStr = `${ date.day }/${ date.month }/${ date.year }|${ date.hours }:${ date.minutes }${ date.dayPart }`
    if (type === 'arrive') {
      this.arriveDatepicker = date
      this.arrivalDateStr = dateStr
      this.form.controls['arrivalTime'].setValue(date)
      this.showArriveDatepicker = false
    } else {
      this.departureDatepicker = date
      this.departureDateStr = dateStr
      this.form.controls['departureTime'].setValue(date)
      this.showDepartureDatepicker = false
    }
    this.generateDuration()
  }

  generateDuration() {
    let form = this.form.value
    let durationMinutes = 0
    if (form.departureTime.dayPart === 'pm') {
      form.departureTime.hours = +form.departureTime.hours + 12
      form.departureTime.dayPart = ''
    }
    if (form.arrivalTime.dayPart === 'pm') {
      form.arrivalTime.hours = +form.arrivalTime.hours + 12
      form.arrivalTime.dayPart = ''
    }
    if (form.departureTime.year && form.arrivalTime.year) {
      durationMinutes = (form.arrivalTime.day - form.departureTime.day) * 24 * 60
        + (form.arrivalTime.hours - form.departureTime.hours) * 60
        + (form.arrivalTime.minutes - form.departureTime.minutes)
      this.form.controls['durationMinutes'].setValue(durationMinutes)
      if (durationMinutes > 24 * 60) {
        this.durationStr = `${ Math.round(durationMinutes / 24 * 60) } h ${ durationMinutes % (24 * 60) } m`
      }
      this.durationStr = `${ Math.round(durationMinutes / 60) } h ${ durationMinutes % 60 } m`
    }
  }
}
