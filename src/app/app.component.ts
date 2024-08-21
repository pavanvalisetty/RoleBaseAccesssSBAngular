import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /*ngOnInit(): void {
    localStorage.setItem("isLoggedId","false");
  }*/
  details: any;

  constructor(private authService: AuthService) { }

  title = 'hospitalapp';
  ngOnInit() {
    debugger
    /*this.authService.getTokenLatest().subscribe(
      tokenResponse => {
        const token = tokenResponse.token; // Adjust based on your API response
        this.authService.getDetailsLatest(token).subscribe(
          detailsResponse => {
            this.details = detailsResponse;
            console.log("fetched detals "+JSON.stringify(this.details));
          },
          error => {
            console.error('Error fetching details', error);
          }
        );
      },
      error => {
        console.error('Error fetching token', error);
      }
    );*/
  }



}
