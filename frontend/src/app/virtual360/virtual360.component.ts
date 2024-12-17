import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-virtual360',
  templateUrl: './virtual360.component.html',
  styleUrls: ['./virtual360.component.css']
})
export class Virtual360Component implements OnInit {
  private route = inject(ActivatedRoute);
  busid: string = "";
  bus: any;
  virtualLook: SafeResourceUrl = ""; // Use SafeResourceUrl type

  constructor(public http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.busid = params["id"];
      console.log("Bus ID:", this.busid);

      const requestBody = { busid: this.busid };

      this.http.post<{ status: boolean; virtualLook: string; bus: any }>(
        "http://localhost:5000/virtualLook", 
        requestBody
      ).subscribe(
        response => {
          if (response.status) {
            this.bus = response.bus;
            this.virtualLook = this.sanitizer.bypassSecurityTrustResourceUrl(this.bus.virtualLook);
            console.log("bus:", this.bus);
            console.log("virtual Look:", this.virtualLook);
          } else {
            console.error("Error:", response);
          }
        },
        error => {
          console.error("HTTP Error:", error);
        }
      );
    });
  }
}
