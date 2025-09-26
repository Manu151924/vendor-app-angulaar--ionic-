import { Component, inject } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Required for *ngFor, *ngIf
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { SfxModalComponent } from '../sfx-modal/sfx-modal.component';
import { ZeroPickupModalComponent } from '../zero-pickup-modal/zero-pickup-modal.component';
import { NotManifestedModalComponent } from '../not-maintained-modal/not-maintained-modal.component';
import { DraftWaybillsModalComponent } from '../draft-waybill-modal/draft-waybill-modal.component';
import { ShExModalComponent } from '../sh-ex-modal/sh-ex-modal.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    SfxModalComponent ,
    ZeroPickupModalComponent,
    NotManifestedModalComponent,
    DraftWaybillsModalComponent,
    ShExModalComponent
  ],
})
export class BookingPage {
  public pieChartLabels: string[] = ['Edited', 'Booked'];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    datasets: [{
      data: [30, 70],
      backgroundColor: ['#ff9800', '#26a69a']
    }]
  };
  public pieChartType: ChartType = 'pie';
  public selectedVehicle = '';
  public shExDetails: any[] = [];
  public assignedSfxData: any[] = [];
  public zeroPickupData: any[] = [];
  public notManifestedData: any[] = [];
  public draftWaybillsData: any[] = [];

  // Sample trip status data
  public sortedTripStatus = [
    { vehicleNo: '5555', manifestedWaybills: 16, unloadedWaybills: 17, manifestedPackages: 300, unloadedPackages: 296, shortExcess: 4 },
    { vehicleNo: '4321', manifestedWaybills: 17, unloadedWaybills: 17, manifestedPackages: 222, unloadedPackages: 200, shortExcess: 0 },
    { vehicleNo: '7733', manifestedWaybills: 22, unloadedWaybills: 22, manifestedPackages: 122, unloadedPackages: 130, shortExcess: 1 },
    { vehicleNo: '1287', manifestedWaybills: 30, unloadedWaybills: 24, manifestedPackages: 90, unloadedPackages: 80, shortExcess: 6 },
    { vehicleNo: '8873', manifestedWaybills: 20, unloadedWaybills: 20, manifestedPackages: 108, unloadedPackages: 108, shortExcess: 0 }
  ];

  // Sample absent vehicles data
  public absentVehicles = [
    { vehicleNo: '1654' },
    { vehicleNo: '1218' }
  ];

  private modalController = inject(ModalController);

  constructor() {
    console.log('BookingPage initialized'); // Debug log
  }

  async openSfxModal() {
    console.log('Opening SFX Modal');
    this.assignedSfxData = this.getAssignedSfxData();
    const modal = await this.modalController.create({
      component: SfxModalComponent,
      componentProps: { assignedSfxData: this.assignedSfxData },
      cssClass: 'sfx-modal'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openZeroPickupModal() {
    console.log('Opening ZERO PICKUP Modal');
    this.zeroPickupData = this.getZeroPickupData();
    const modal = await this.modalController.create({
      component: ZeroPickupModalComponent,
      componentProps: { zeroPickupData: this.zeroPickupData },
      cssClass: 'zero-pickup-modal'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openNotManifestedModal() {
    console.log('Opening NOT MANIFESTED Modal');
    this.notManifestedData = this.getNotManifestedData();
    const modal = await this.modalController.create({
      component: NotManifestedModalComponent,
      componentProps: { notManifestedData: this.notManifestedData },
      cssClass: 'not-manifested-modal'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openDraftWaybillsModal() {
    console.log('Opening DRAFT WAYBILLS Modal');
    this.draftWaybillsData = this.getDraftWaybillsData();
    const modal = await this.modalController.create({
      component: DraftWaybillsModalComponent,
      componentProps: { draftWaybillsData: this.draftWaybillsData },
      cssClass: 'draft-waybills-modal'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openShExModal(vehicleNo: string) {
    console.log('Opening SH/EX Modal for', vehicleNo);
    this.selectedVehicle = vehicleNo;
    this.shExDetails = this.getShExDetails(vehicleNo);
    const modal = await this.modalController.create({
      component: ShExModalComponent,
      componentProps: { shExDetails: this.shExDetails, selectedVehicle: this.selectedVehicle },
      cssClass: 'sh-ex-modal'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  closeSfxModal() { this.modalController.dismiss(); }
  closeZeroPickupModal() { this.modalController.dismiss(); }
  closeNotManifestedModal() { this.modalController.dismiss(); }
  closeDraftWaybillsModal() { this.modalController.dismiss(); }
  closeShExModal() { this.modalController.dismiss(); }

  getAssignedSfxData(): any[] {
    return [
      { code: 'SFX0001234333', consignor: 'S.K. Electrical Pvt. Ltd.', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX0004567437', consignor: 'Gama Solutions Pvt. Ltd.', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX00027254783', consignor: 'Samsung India Pvt. Ltd.', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX000263409877', consignor: 'Khurana Garments', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX0001234222', consignor: 'Unknown', lastPickupDate: '07-JUL-2025' }
    ];
  }

  getZeroPickupData(): any[] {
    return [
      { code: 'SFX00027254783', consignor: 'Samsung India Pvt. Ltd.', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX000263409877', consignor: 'Khurana Garments', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX0001234333', consignor: 'S.K. Electrical Pvt. Ltd.', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX0004567437', consignor: 'Gama Solutions Pvt. Ltd.', lastPickupDate: '07-JUL-2025' }
    ];
  }

  getNotManifestedData(): any[] {
    return [
      { waybill: '4083 3650 7803', booked: 100, manifested: 80, remaining: 20, consignor: 'S.K. Electrical Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '2279 7354 3382', booked: 100, manifested: 75, remaining: 25, consignor: 'Gama Solutions Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '1300 6454 7775', booked: 100, manifested: 75, remaining: 25, consignor: 'Samsung India Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '2000 9390 2222', booked: 100, manifested: 75, remaining: 25, consignor: 'Khurana Garments', pickupDate: '07-JUL-2025' },
      { waybill: '2100 AAAA 4565', booked: 100, manifested: 75, remaining: 25, consignor: 'Unknown', pickupDate: '07-JUL-2025' }
    ];
  }

  getDraftWaybillsData(): any[] {
    return [
      { waybill: '4083 3650 7803', consignor: 'S.K. Electrical Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '2279 7354 3382', consignor: 'Gama Solutions Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '1300 6454 7775', consignor: 'Samsung India Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '2000 9390 2222', consignor: 'Khurana Garments', pickupDate: '07-JUL-2025' },
      { waybill: '2100 AAAA 4565', consignor: 'Unknown', pickupDate: '07-JUL-2025' }
    ];
  }

  getShExDetails(vehicleNo: string): any[] {
    if (vehicleNo === '5555') {
      return [
        { waybill: '1000 7474 8855', booked: 100, manifested: 100, received: 99, consignor: 'S.K. Electrical Pvt. Ltd.', pickupDate: '08-JUL-2025', status: 'Short' },
        { waybill: '1000 2020 2353', booked: 100, manifested: 100, received: 101, consignor: 'Sadashiv Electronics', pickupDate: '08-JUL-2025', status: 'Excess' },
        { waybill: '2000 9292 6754', booked: 100, manifested: 0, received: 2, consignor: 'J.S. Camicals', pickupDate: '08-JUL-2025', status: 'Excess' },
        { waybill: '2000 9633 9825', booked: 100, manifested: 100, received: 0, consignor: 'Samsung India Pvt. Ltd.', pickupDate: '08-JUL-2025', status: 'Short' }
      ];
    }
    return [];
  }

  getHeatMapColor(value: number, reverse = false): string {
    if (reverse) {
      if (value <= 33) return 'success';
      if (value <= 66) return 'warning';
      return 'danger';
    } else {
      if (value <= 33) return 'danger';
      if (value <= 66) return 'warning';
      return 'success';
    }
  }
}