import { Injectable } from '@angular/core';
import { Search } from '../classes/search';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
    searches: Search[] = [];

    constructor(private httpService: HttpClient) {
    }

    getSearches() {
        this.searches = [];
        return this.httpService.get('https://localhost:5001/getSearches').subscribe((search: any) => {
            search.forEach(s => {
                this.searches.push(s);
            });
        });
    }

    deleteSearch(search) {
        const index = this.searches.indexOf(search, 0);
        if (index >= 0) {
            this.searches.splice(index, 1);
        }
    }

    updateSearch(search: Search) {
        const idx = this.searches.findIndex((v) => v.element === search.element);
        if (idx !== -1) {
            this.searches[idx] = search;
        }
    }

    createSearch(search: Search) {
        this.searches.splice(0, 0, search);
    }
}
