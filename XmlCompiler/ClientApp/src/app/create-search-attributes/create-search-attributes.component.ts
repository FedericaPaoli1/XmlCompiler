import { Component, Input, OnInit } from '@angular/core';
import { Search } from '../classes/search';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Attribute } from '../classes/attribute';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-create-search-attributes',
  templateUrl: './create-search-attributes.component.html',
  styleUrls: ['./create-search-attributes.component.css']
})
export class CreateSearchAttributesComponent implements OnInit {
  attr: Attribute[] = [];
  form: FormGroup;
  showLabel = [];
  private searchCopy: Search;
  searches: Search[] = [];
  private __search: Search;
  @Input() modal: NgxSmartModalComponent;
  @Input() set search(search: Search) {
    this.__search = search;
    this.searchCopy = Object.assign({}, search);
  }

  get search() {
    return this.__search;
  }

  constructor(private fb: FormBuilder,
    private pageSubsService: PageSubsService) {
    this.form = this.fb.group({
      attributes: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      attributes: this.fb.array([this.attributes])
    });
  }


  saveAttribute() {
    const f = this.form.get('attributes') as FormArray;
    for (let i = 0; i < f.length; i++) {
      var a = new Attribute();
      a.key = f.at(i).get('key').value;
      a.value = f.at(i).get('value').value;
      this.attr.push(a);
    }
    this.pageSubsService.setAttibuteValues(this.attr);
  }


  get attributes(): FormGroup {
    return this.fb.group({
      key: '',
      value: ''
    });
  }

  addNewAttribute() {
    (this.form.get('attributes') as FormArray).push(this.attributes);
  }

  deleteAttribute(index) {
    (this.form.get('attributes') as FormArray).removeAt(index);
  }

  trackFn(index) {
    return index;
  }
}
