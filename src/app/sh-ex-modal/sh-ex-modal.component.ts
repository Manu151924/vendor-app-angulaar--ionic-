import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sh-ex-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>SH/EX Details - Vehicle {{ selectedVehicle }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list *ngIf="shExDetails.length; else noData">
        <ion-item *ngFor="let item of shExDetails">
          <ion-label>
            <h2>Waybill: {{ item.waybill }}</h2>
            <p>Consignor: {{ item.consignor }}</p>
            <p>Booked: {{ item.booked }}, Manifested: {{ item.manifested }}, Received: {{ item.received }}</p>
            <p>Status: {{ item.status }}</p>
            <small>Pickup Date: {{ item.pickupDate }}</small>
          </ion-label>
        </ion-item>
      </ion-list>

      <ng-template #noData>
        <ion-text color="medium" class="ion-text-center">
          <p>No SH/EX details found.</p>
        </ion-text>
      </ng-template>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ShExModalComponent {
  @Input() shExDetails: any[] = [];
  @Input() selectedVehicle: string = '';

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
