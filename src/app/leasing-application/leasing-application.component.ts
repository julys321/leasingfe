import {Component, Input, OnInit} from '@angular/core';
import {VehicleService} from '../services/vehicle.service';
import {LeaseService} from '../services/lease.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ErrorModuleComponent} from './error-module/error-module.component';

@Component({
  selector: 'app-leasing-application',
  templateUrl: './leasing-application.component.html',
  styleUrls: ['./leasing-application.component.css']
})
export class LeasingApplicationComponent implements OnInit {

  modalRef: BsModalRef;
  showForm = true;
  showSummary = false;
  showCustomerForm = false;
  showConfirmationPage = false;
  changeScrollValue = true;
  constructor(public vehicleService: VehicleService, public leaseService: LeaseService, public modalService: BsModalService) { }

  ngOnInit() {
    
    window.scrollTo(0, 0);
  }

  onGoToSummary() {
    this.showForm = false;
    this.showSummary = true;
    this.vehicleService.changeScrollValue = false;
  }

  onGoBackToForm1() {
    this.showSummary = false;
    this.showForm = true;
  }

  onGoNextToForm2() {
    this.showSummary = false;
    this.showCustomerForm = true;
  }

  onSubmitted() {

    this.leaseService.submitLease().then((data) => {
      this.showCustomerForm = false;
      this.showConfirmationPage = true;
      this.leaseService.response = data;
    }, (error) => {
      this.modalRef = this.modalService.show(ErrorModuleComponent);
      console.log(error.message);
    });

  }

  onBackToSummary() {
    this.showCustomerForm = false;
    this.showSummary = true;
  }

}
