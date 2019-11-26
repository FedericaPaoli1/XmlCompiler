import { Component, OnInit, Input } from '@angular/core';
import { Entity } from '../classes/entity';
import { Attribute } from '../classes/attribute';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-create-entity-attributes',
  templateUrl: './create-entity-attributes.component.html',
  styleUrls: ['./create-entity-attributes.component.css']
})
export class CreateEntityAttributesComponent implements OnInit {
  attr: Attribute[] = [];
  form: FormGroup;
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
