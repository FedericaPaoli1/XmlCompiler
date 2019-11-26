import { Component, OnInit, Input } from '@angular/core';
import { Search } from '../classes/search';
import { Attribute } from '../classes/attribute';
import { SearchService } from '../providers/search.service';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-search-update-attributes',
  templateUrl: './search-update-attributes.component.html',
  styleUrls: ['./search-update-attributes.component.css']
})
export class SearchUpdateAttributesComponent implements OnInit {
  attr: Attribute[] = [];
  form: FormGroup;
  private searchCopy: Search;
  searches: Search[] = [];

  @Input() modal: NgxSmartModalComponent;
  @Input() searchElement: string;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private pageSubsService: PageSubsService) {

    this.form = this.fb.group({
      attributes: this.fb.array([this.attributes])
    });
  }

  get attributes(): FormGroup {
    return this.fb.group({
      key: '',
      value: ''
    });
  }

  ngOnInit() {
    this.searches = this.searchService.searches;
    for (var k = 0; k < this.searches.length; k++) {
      if (this.searches[k].element === this.searchElement) {
        this.searchCopy = this.searches[k];
      }
    }
  }

  saveSearch() {
    var isEqual = false;
    var newArray = new Array<Attribute>();
    const f = this.form.get('attributes') as FormArray;
    for (var i = 0; i < f.length; i++) {
      var a = new Attribute();
      a.key = f.at(i).get('key').value;
      a.value = f.at(i).get('value').value;
      this.attr.push(a);
    }

    for (var j = 0; j < this.attr.length; j++) {
      if (this.searchCopy.attributes.length === 0) {
        this.pageSubsService.setAttibuteValues(this.attr);
        break;
      }
      isEqual = false;
      for (var y = 0; y < this.searchCopy.attributes.length; y++) {
        if (this.searchCopy.attributes[y].key === this.attr[j].key) {
          isEqual = true;
          if (this.searchCopy.attributes[y].value !== this.attr[j].value) {
            this.searchCopy.attributes[y].value = this.attr[j].value;
          }
        }
      }
      if (!isEqual) {
        newArray.push(this.attr[j]);
        this.pageSubsService.setAttibuteValues(newArray);
      }
    }
    this.searchService.updateSearch(this.searchCopy);
    this.pageSubsService.addNewSearch(this.searchCopy);
  }

  changeAttribute() {
    (this.form.get('attributes') as FormArray).push(this.attributes);
  }

  deleteChange(index: number) {
    const f = (this.form.get('attributes') as FormArray);
    f.removeAt(index);
    if (f.length === 0) {
      this.changeAttribute();
    }
  }
}

