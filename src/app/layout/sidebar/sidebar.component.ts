import { Component } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private sharedService: SharedService){}
  viewSidebar(value: boolean) {
    this.sharedService.toggleSidebar(value);
  }

}
