import { JsonPipe, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-agm',
  standalone: true,
  imports: [GoogleMapsModule, NgStyle, NgIf, JsonPipe],
  templateUrl: './agm.component.html',
  styleUrl: './agm.component.scss'
})
export class AgmComponent {
  // center?: google.maps.LatLngLiteral;
  center?: any;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  position!: google.maps.LatLngLiteral;
  zoomLevel: number = 16;

  mapStyles: { [klass: string]: any; } = {};
  constructor() {
    if (navigator.geolocation) {
      this.getCurrentPosition();
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        this.center = undefined;
        setTimeout(() => {
          this.zoomLevel = 16;
          this.center = { lat: position.coords.latitude, lng: position.coords.longitude }
          this.position = this.center;
        }, 0);
      }
    }, (error) => console.log(error));
  }

  move(event?: google.maps.MapMouseEvent) {
    if (event?.latLng) {
      this.position = event.latLng?.toJSON();
    }
  }
}
