import { Injectable } from '@angular/core';
import { Entity } from '../classes/entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EntityService {
    entities: Entity[] = [];

    constructor(private httpService: HttpClient) {
    }

    getEntities() {
        this.entities = [];
        return this.httpService.get('https://localhost:5001/getEntities').subscribe((entity: any) => {
            entity.forEach(e => {
                this.entities.push(e);
            });
        });
    }

    deleteEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index >= 0) {
            this.entities.splice(index, 1);
        }
    }

    updateEntity(entity: Entity) {
        const idx = this.entities.findIndex((v) => v.element === entity.element);
        if (idx !== -1) {
            this.entities[idx] = entity;
        }
    }

    createEntity(entity: Entity) {
        this.entities.splice(0, 0, entity);
    }
}
