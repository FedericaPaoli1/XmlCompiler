import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Field } from '../classes/field';
import { Entity } from '../classes/entity';
import { Router } from '@angular/router';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-create-entity-fields',
  templateUrl: './create-entity-fields.component.html',
  styleUrls: ['./create-entity-fields.component.css']
})
export class CreateEntityFieldsComponent implements OnInit {
  field: Field[] = [];
  showLabel = [];
  private entityCopy: Entity;
  entities: Entity[] = [];
  private __entity: Entity;

  @Input() modal: NgxSmartModalComponent;
  @Input() set entity(entity: Entity) {
    this.__entity = entity;
    this.entityCopy = Object.assign({}, entity);
  }

  get entity() {
    return this.__entity;
  }

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pageSubsService: PageSubsService) { }

  ngOnInit() {
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
      isMandatory: false,
    });
  }

  addField() {
    (this.form.get('fields') as FormArray).push(this.fields);
  }

  deleteField(index) {
    (this.form.get('fields') as FormArray).removeAt(index);
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

  saveField() {
    const fa = this.form.get('fields') as FormArray;
    for (let i = 0; i < fa.length; i++) {
      var f = new Field();
      f.name = fa.at(i).get('name').value;
      f.groupId = fa.at(i).get('groupId').value;
      var opts = fa.at(i).get('options').value;
      f.options = Object.keys(opts[0]).map(key => opts[0][key]);
      this.field.push(f);
    }
    this.pageSubsService.setFieldValues(this.field);
  }
}

