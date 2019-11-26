import { Component, OnInit, Input } from '@angular/core';
import { Entity } from '../classes/entity';
import { EntityService } from '../providers/entity.service';
import { Attribute } from '../classes/attribute';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-entity-update-attributes',
  templateUrl: './entity-update-attributes.component.html',
  styleUrls: ['./entity-update-attributes.component.css']
})
export class EntityUpdateAttributesComponent implements OnInit {
  attr: Attribute[] = [];
  form: FormGroup;
  private entityCopy: Entity;
  entities: Entity[] = [];

  @Input() modal: NgxSmartModalComponent;
  @Input() entityElement: string;

  constructor(
    private fb: FormBuilder,
    private entityService: EntityService,
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
    this.entities = this.entityService.entities;
    for (var k = 0; k < this.entities.length; k++) {
      if (this.entities[k].element === this.entityElement) {
        this.entityCopy = this.entities[k];
      }
    }
  }

  saveEntity() {
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
      if (this.entityCopy.attributes.length === 0) {
        this.pageSubsService.setAttibuteValues(this.attr);
        break;
      }
      isEqual = false;
      for (var y = 0; y < this.entityCopy.attributes.length; y++) {
        if (this.entityCopy.attributes[y].key === this.attr[j].key) {
          isEqual = true;
          if (this.entityCopy.attributes[y].value !== this.attr[j].value) {
            this.entityCopy.attributes[y].value = this.attr[j].value;
          }
        }
      }
      if (!isEqual) {
        newArray.push(this.attr[j]);
        this.pageSubsService.setAttibuteValues(newArray);
      }
    }
    this.entityService.updateEntity(this.entityCopy);
    this.pageSubsService.addNewEntity(this.entityCopy);
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
