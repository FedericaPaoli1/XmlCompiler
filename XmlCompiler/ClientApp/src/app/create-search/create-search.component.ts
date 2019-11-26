import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../classes/search';
import { SearchService } from '../providers/search.service';
import { Subscription } from 'rxjs';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { Attribute } from '../classes/attribute';
import { Field } from '../classes/field';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-search',
  templateUrl: './create-search.component.html',
  styleUrls: ['./create-search.component.css']
})
export class CreateSearchComponent implements OnInit, OnDestroy {
  private searchCopy: Search;
  searches: Search[] = [];
  private __search: Search;


  searchForm: FormGroup;
  submitted = false;

  attributeSet: Subscription;
  fieldsSet: Subscription;

  @Input() set search(search: Search) {
    this. __search = search;
    this.searchCopy = Object.assign({}, search);
  }

  get search() {
    return this.__search;
  }

  @ViewChild('sForm') mySForm;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private searchService: SearchService,
      private pageSubsService: PageSubsService) {
       }

      private handleChange(element: string, e: Event) {
        this.search.element = element;
    }

  ngOnInit() {
    this.searchForm = this.fb.group({
      element: new FormControl('', [Validators.required])
    });
     this.search = new Search();
     this.attributeSet = this.pageSubsService.attributeValues.subscribe(( attrib: Attribute[]) => {
      this.search.attributes = attrib;
     });
     this.fieldsSet = this.pageSubsService.fieldsValues.subscribe(( field: Field[]) => {
      this.search.fields = field;
     });
  }

  ngOnDestroy() {
    this.attributeSet.unsubscribe();
    this.fieldsSet.unsubscribe();
  }

  get f() { return this.searchForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
     return;
    }
    this.mySForm.resetForm();
    this.submitted = false;
  }

  saveSearch() {
    this.searchService.createSearch(this.search);
    this.pageSubsService.addNewSearch(this.search);
    this.router.navigate(['/searches']);
  }

  saveAttributes() {
    // set attributes to array
    this.saveAndContinue();
  }

  saveFields() {
    // set fields to array
    this.saveAndContinue();
  }

  saveAndContinue() {
     this.pageSubsService.addNewSearch(this.search);
  }


  resetForm(form) {
    if (this.search.element === '') {
      this.search = new Search();
    } else {
      this.search = this.searchCopy;
    }
  }
}
