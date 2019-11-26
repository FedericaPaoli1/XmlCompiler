import { Component, OnInit, Input } from '@angular/core';
import { Entity } from '../classes/entity';
import { EntityService } from '../providers/entity.service';
import { Field } from '../classes/field';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-entity-update-fields',
  templateUrl: './entity-update-fields.component.html',
  styleUrls: ['./entity-update-fields.component.css']
})
export class EntityUpdateFieldsComponent implements OnInit {
  flds: Field[] = [];
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
      if (this.entityCopy.fields.length === 0) {
        this.pageSubsService.setFieldValues(this.flds);
        break;
      }
      isEqual = false;
      for (var y = 0; y < this.entityCopy.fields.length; y++) {
        if (this.entityCopy.fields[y].name === this.flds[j].name) {
          isEqual = true;
          if (this.entityCopy.fields[y].groupId !== this.flds[j].groupId) {
            this.entityCopy.fields[y].groupId = this.flds[j].groupId;
          }
          if (this.entityCopy.fields[y].options !== this.flds[j].options) {
            this.entityCopy.fields[y].options = this.flds[j].options;
          }
        }
      }
      if (!isEqual) {
        newArray.push(this.flds[j]);
        this.pageSubsService.setFieldValues(newArray);
      }
    }
    this.entityService.updateEntity(this.entityCopy);
    this.pageSubsService.addNewEntity(this.entityCopy);
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
