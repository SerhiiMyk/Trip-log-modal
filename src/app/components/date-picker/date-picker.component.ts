import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDatepicker } from '../../interfaces/datepicker.interface';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, AfterViewInit {

  @Input() datepicker!: IDatepicker

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  daysOnMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  date: Date = new Date
  currentMonth: number = this.date.getMonth()
  currentDay: number = this.date.getDate()


  form: FormGroup = new FormGroup({
    hours: new FormControl(''),
    minutes: new FormControl(''),
    dayPart: new FormControl(''),
    year: new FormControl(this.date.getFullYear()),
    month: new FormControl(this.currentMonth),
    day: new FormControl(this.currentDay),
  })

  @Output() emit: EventEmitter<IDatepicker> = new EventEmitter<IDatepicker>()

  ngOnInit() {
    if (this.datepicker) {
      this.form.setValue(this.datepicker)
    }
  }

  ngAfterViewInit() {
    let dayArrEl = document.querySelectorAll('.day')
    dayArrEl[this.currentDay - 1].classList.add('check')
  }


  onSubmit() {
    this.emit.emit({ ...this.form.value })
  }

  changeMonth(direction: string) {
    let index = this.months.indexOf(this.form.value.month)
    if (direction === 'next') {
      if (this.currentMonth === 11) {
        this.form.controls['year'].setValue(this.form.value.year + 1)
        this.currentMonth = 0
        this.form.controls['month'].setValue(this.currentMonth)
      } else {
        this.currentMonth += 1
        this.form.controls['month'].setValue(this.currentMonth)
      }
    } else {
      if (this.currentMonth === 0) {
        if (this.form.value.year !== 2022) {
          this.form.controls['year'].setValue(this.form.value.year - 1)
          this.currentMonth = 11
          this.form.controls['month'].setValue(this.currentMonth)
        }
      } else {
        this.currentMonth -= 1
        this.form.controls['month'].setValue(this.currentMonth)
      }
    }
  }

  setDay(day: number) {
    this.form.controls['day'].setValue(day)
    let dayArrEl = document.querySelectorAll('.day')
    dayArrEl.forEach(el => {
      el.classList.remove('check')
    })
    dayArrEl[day - 1].classList.add('check')
  }
}
