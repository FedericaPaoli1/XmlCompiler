import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SearchService } from '../providers/search.service';
import { Search } from '../classes/search';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.css']
})
export class SearchesComponent implements OnInit, OnDestroy {
  @Output() updSearch = new EventEmitter<Search>();

  title = 'Searches';
  showForm = false;
  searchSelected: Search = new Search();
  searches: Search[] = [];

  searchesSet: Subscription;

  constructor(private searchService: SearchService) {
  }

  updateSearch(search: Search) {
    this.showForm = true;
    this.searchSelected = search;
  }

  ngOnInit() {
    this.searchesSet = this.searchService.getSearches();
    this.searches = this.searchService.searches;
  }

  ngOnDestroy() {
    this.searchesSet.unsubscribe();
  }

  onDeleteSearch(search: Search) {
    this.searchService.deleteSearch(search);
  }

  onSelectSearch(search: Search) {
    const searchCopy = Object.assign({}, search);
    this.updSearch.emit(searchCopy);
  }

}
