import { Component } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})
export class HorizontalComponent {
  sidebarVisible: boolean = false;

  
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.sidebarState$.subscribe(state => {
      this.sidebarVisible = state;
    });
  }
}
