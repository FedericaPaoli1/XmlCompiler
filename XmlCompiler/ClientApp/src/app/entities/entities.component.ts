import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Entity } from '../classes/entity';
import { Subscription } from 'rxjs';
import { EntityService } from '../providers/entity.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit, OnDestroy {
  @Output() updEntity = new EventEmitter<Entity>();

  title = 'Entities';
  showForm = false;
  entitySelected: Entity = new Entity();
  entities: Entity[] = [];

  entitiesSet: Subscription;

  constructor(private entityService: EntityService) {
  }

  updateEntity(entity: Entity) {
    this.showForm = true;
    this.entitySelected = entity;
  }

  ngOnInit() {
    this.entitiesSet = this.entityService.getEntities();
    this.entities = this.entityService.entities;
  }

  ngOnDestroy() {
    this.entitiesSet.unsubscribe();
  }

  onDeleteEntity(entity: Entity) {
    this.entityService.deleteEntity(entity);
  }

  onSelectEntity(entity: Entity) {
    const entityCopy = Object.assign({}, entity);
    this.updEntity.emit(entityCopy);
  }

}

