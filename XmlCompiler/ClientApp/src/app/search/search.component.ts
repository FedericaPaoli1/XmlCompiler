import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SearchService } from '../providers/search.service';
import { Search } from '../classes/search';
import { Router } from '@angular/router';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { Subscription } from 'rxjs';
import { Attribute } from '../classes/attribute';
import { Field } from '../classes/field';

@Component({
  selector: 'tr[app-search]',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input('search-data') search: Search;
  @Output() onDeleteSearch = new EventEmitter();
  @Output() onSelectSearch = new EventEmitter();

  attributeSet: Subscription;
  fieldsSet: Subscription;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private pageSubsService: PageSubsService) { }

  ngOnInit() {
    this.attributeSet = this.pageSubsService.attributeValues.subscribe((
      attrib: Attribute[]) => {
        this.search.attributes = this.search.attributes.concat(attrib);
      });

    this.fieldsSet = this.pageSubsService.fieldsValues.subscribe((
      field: Field[]) => {
        this.search.fields = this.search.fields.concat(field);
      });
  }

  ngOnDestroy() {
    this.attributeSet.unsubscribe();
    this.fieldsSet.unsubscribe();
  }

  deleteSearch() {
   this.onDeleteSearch.emit(this.search);
   //DELETE 
   this.pageSubsService.deleteSearch(this.search);
  }

  getSearch() {
   this.onSelectSearch.emit(this.search);
    //GET 
    this.searchService.updateSearch(this.search);
  }

  saveSearch() {
    this.router.navigate(['/searches']);
  }

}
