import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }
  user: any

  ngOnInit() {
    this.user = this.tokenService.GetPayload().username
  }

  logout() {
    this.tokenService.DeleteToken()
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  goHome() {
    this.router.navigate(['/streams'])
  }

}
