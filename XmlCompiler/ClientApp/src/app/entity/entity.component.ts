import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Entity } from '../classes/entity';
import { Router } from '@angular/router';
import { EntityService } from '../providers/entity.service';
import { Subscription } from 'rxjs';
import { PageSubsService } from '../providers/subscription/page-subs.service';
import { Attribute } from '../classes/attribute';
import { Field } from '../classes/field';

@Component({
  selector: 'tr[app-entity]',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit, OnDestroy {
  @Input('entity-data') entity: Entity;
  @Output() onDeleteEntity = new EventEmitter();
  @Output() onSelectEntity = new EventEmitter();

  attributeSet: Subscription;
  fieldsSet: Subscription;

  constructor(
    private router: Router,
    private entityService: EntityService,
    private pageSubsService: PageSubsService) { }

  ngOnInit() {
    this.attributeSet = this.pageSubsService.attributeValues.subscribe((
      attrib: Attribute[]) => {
      this.entity.attributes = this.entity.attributes.concat(attrib);
    });

    this.fieldsSet = this.pageSubsService.fieldsValues.subscribe((
      field: Field[]) => {
      this.entity.fields = this.entity.fields.concat(field);
    });
  }

  ngOnDestroy() {
    this.attributeSet.unsubscribe();
    this.fieldsSet.unsubscribe();
  }

  deleteEntity() {
    this.onDeleteEntity.emit(this.entity);
    //DELETE 
    this.pageSubsService.deleteEntity(this.entity);
  }

  getEntity() {
    this.onSelectEntity.emit(this.entity);
    //GET 
    this.entityService.updateEntity(this.entity);
  }

  saveEntity() {
    this.router.navigate(['/entities']);
  }

}
