import { Component, ViewEncapsulation, Input } from '@angular/core';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { Search } from '../classes/search';

@Component({
  selector: 'app-search-update',
  templateUrl: './search-update.component.html',
  styleUrls: ['./search-update.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class SearchUpdateComponent {
  searches: Search[] = [];
  @Input() searchElement: string;

  constructor(private pageSubsService: PageSubsService) {}
}
