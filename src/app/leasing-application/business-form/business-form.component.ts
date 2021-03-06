import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LeaseService} from '../../services/lease.service';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css']
})
export class BusinessFormComponent implements OnInit {

  lithuanianRegex = '^(?!\\s)([a-zA-Z0-9ĄČĘĖĮŠŲŪŽąčęėįšųūž\\s]){1,}';
  emailRegex = '^(([^<>()[\\]\\\\.,;:\\s@\\"]+' +
    '(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
  cityRegex = '^(?!\\s)([a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž\\s]){1,}';
  postCodeRegex = '[a-zA-Z0-9\\-]*';
  streetRegex = '^(?!\\s)([a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž0-9\\s\\.\\-]){1,}';
  phoneNumberRegex = '^[0-9]+$';
  onlyNumbersRegex = '^[0-9]+$';
  businessCustomerForm: FormGroup;
  showErrorMessages = false;

  @Input() showElement;

  constructor(public leaseService: LeaseService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.businessCustomerForm = new FormGroup({
      'companyName': new FormControl(null, [Validators.required,
        Validators.pattern(this.lithuanianRegex)]),
      'companyCode': new FormControl(null, [Validators.required,
        Validators.pattern(this.onlyNumbersRegex)]),
      'email': new FormControl(null, [Validators.email,
        Validators.required, Validators.pattern(this.emailRegex)]),
      'phoneNumber': new FormControl(null, [Validators.required,
        Validators.pattern(this.phoneNumberRegex)]),
      'street': new FormControl(null, [Validators.required,
        Validators.pattern(this.streetRegex)]),
      'city': new FormControl(null, [Validators.required,
        Validators.pattern(this.cityRegex)]),
      'postCode': new FormControl(null, [Validators.required,
        Validators.pattern(this.postCodeRegex)]),
      'country': new FormControl(null, [Validators.required,
        Validators.pattern(this.cityRegex)])
    });

  }


  @Output() businessSubmitted = new EventEmitter<Object>();
  @Output() businessBackToSummary = new EventEmitter<Object>();

  submit() {
    if (this.businessCustomerForm.valid) {
      const businessCustomerObject = {
        companyName: this.businessCustomerForm.get('companyName').value,
        companyCode: this.businessCustomerForm.get('companyCode').value,
        email: this.businessCustomerForm.get('email').value,
        phoneNumber: this.businessCustomerForm.get('phoneNumber').value,
        street: this.businessCustomerForm.get('street').value,
        city: this.businessCustomerForm.get('city').value,
        postCode: this.businessCustomerForm.get('postCode').value,
        country: this.businessCustomerForm.get('country').value
      };

      this.leaseService.customerObject = businessCustomerObject;
      this.businessSubmitted.emit(businessCustomerObject);
    } else {
      this.showErrorMessages = true;
    }
  }

  goBackToSummary() {
    this.businessBackToSummary.emit();
  }
}
