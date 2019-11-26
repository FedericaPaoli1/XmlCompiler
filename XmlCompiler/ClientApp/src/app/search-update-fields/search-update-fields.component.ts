import { Component, OnInit, Input } from '@angular/core';
import { Search } from '../classes/search';
import { SearchService } from '../providers/search.service';
import { Field } from '../classes/field';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-search-update-fields',
  templateUrl: './search-update-fields.component.html',
  styleUrls: ['./search-update-fields.component.css']
})

export class SearchUpdateFieldsComponent implements OnInit {
  flds: Field[] = [];
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
      fields: this.fb.array([this.fields])
    });
  }


  get fields(): FormGroup {
    return this.fb.group({
      name: '',
      groupId: '',
      options: this.fb.array([this.options])
    });
  }

  get options(): FormGroup {
    return this.fb.group({
      isReadOnly: false,
      isVisible: false,
      isMandatory: false
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
    var newArray = new Array<Field>();
    const f = this.form.get('fields') as FormArray;
    for (var i = 0; i < f.length; i++) {
      var fi = new Field();
      fi.name = f.at(i).get('name').value;
      fi.groupId = f.at(i).get('groupId').value;
      var opts = f.at(i).get('options').value;
      fi.options = Object.keys(opts[0]).map(key => opts[0][key]);
      this.flds.push(fi);
    }

    for (var j = 0; j < this.flds.length; j++) {
      if (this.searchCopy.fields.length === 0) {
        this.pageSubsService.setFieldValues(this.flds);
        break;
      }
      isEqual = false;
      for (var y = 0; y < this.searchCopy.fields.length; y++) {
        if (this.searchCopy.fields[y].name === this.flds[j].name) {
          isEqual = true;
          if (this.searchCopy.fields[y].groupId !== this.flds[j].groupId) {
            this.searchCopy.fields[y].groupId = this.flds[j].groupId;
          }
          if (this.searchCopy.fields[y].options !== this.flds[j].options) {
            this.searchCopy.fields[y].options = this.flds[j].options;
          }
        }
      }
      if (!isEqual) {
        newArray.push(this.flds[j]);
        this.pageSubsService.setFieldValues(newArray);
      }
    }
    this.searchService.updateSearch(this.searchCopy);
    this.pageSubsService.addNewSearch(this.searchCopy);
  }

  changeField() {
    (this.form.get('fields') as FormArray).push(this.fields);
  }

  deleteChange(index) {
    const f = (this.form.get('fields') as FormArray);
    f.removeAt(index);
    if (f.length === 0) {
      this.changeField();
    }
  }

  changeReadOnly(e) {
    this.form.patchValue({
      options: [{
        isReadOnly: true
      }]
    });
  }

  changeVisible(e) {
    this.form.patchValue({
      options: [{
        isVisible: true
      }]
    });
  }

  changeMandatory(e) {
    this.form.patchValue({
      options: [{
        isMandatory: true
      }]
    });
  }

}
