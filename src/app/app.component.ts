import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat App';
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    const token = this.tokenService.GetToken()
    // const token = localStorage.getItem('token')
    if (token) {
      this.router.navigate(['/streams'])
    } else {
      this.router.navigate([''])
    }
  }
}
