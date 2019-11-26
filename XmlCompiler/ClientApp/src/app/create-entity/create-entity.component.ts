import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Entity } from '../classes/entity';
import { EntityService } from '../providers/entity.service';
import { Router } from '@angular/router';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { Subscription } from 'rxjs';
import { Attribute } from '../classes/attribute';
import { Field } from '../classes/field';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.css']
})
export class CreateEntityComponent implements OnInit, OnDestroy {
  private entityCopy: Entity;
  entities: Entity[] = [];
  private __entity: Entity;

  entityForm: FormGroup;
  submitted = false;

  attributeSet: Subscription;
  fieldsSet: Subscription;

  @Input() set entity(entity: Entity) {
    this. __entity = entity;
    this.entityCopy = Object.assign({}, entity);
  }

  get entity() {
    return this.__entity;
  }

  @ViewChild('eForm') myEForm;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private entityService: EntityService,
    private pageSubsService: PageSubsService) {
   }

   private handleChange(element: string, e: Event) {
    this.entity.element = element;
   }

  ngOnInit() {
    this.entityForm = this.fb.group({
      element: new FormControl('', [Validators.required])
    });
    this.entity = new Entity();
    this.attributeSet = this.pageSubsService.attributeValues.subscribe(( attrib: Attribute[]) => {
      this.entity.attributes = attrib;
     });
     this.fieldsSet = this.pageSubsService.fieldsValues.subscribe(( field: Field[]) => {
      this.entity.fields = field;
     });
  }

  ngOnDestroy() {
    this.attributeSet.unsubscribe();
    this.fieldsSet.unsubscribe();
  }

  get f() { return this.entityForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.entityForm.invalid) {
     return;
    }
    this.myEForm.resetForm();
    this.submitted = false;
   }

  saveEntity() {
    this.entityService.createEntity(this.entity);
    this.pageSubsService.addNewEntity(this.entity);
    this.router.navigate(['/entities']);
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
     this.pageSubsService.addNewEntity(this.entity);
  }

  resetForm(form) {
    if (this.entity.element === '') {
      this.entity = new Entity();
    } else {
      this.entity = this.entityCopy;
    }
  }
}

