import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Attribute } from 'src/app/classes/attribute';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Search } from 'src/app/classes/search';
import { Field } from 'src/app/classes/field';
import { Entity } from 'src/app/classes/entity';

@Injectable({
  providedIn: 'root'
})

export class PageSubsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  attributeValues = new Subject<Attribute[]>();
  fieldsValues = new Subject<Field[]>();

  constructor(private httpService: HttpClient) { }

  setAttibuteValues(val: Attribute[]) {
    this.attributeValues.next(val);
  }

  setFieldValues(val: Field[]) {
    this.fieldsValues.next(val);
  }

  addNewSearch(search: Search) {
    return this.httpService.post('https://localhost:5001/create-search', search, this.httpOptions)
      .subscribe();
  }

  addNewEntity(entity: Entity) {
    return this.httpService.post('https://localhost:5001/create-entity', entity, this.httpOptions)
      .subscribe();
  }

  deleteSearch(search: Search) {
    return this.httpService.delete('https://localhost:5001/searches?element=' + search.element, this.httpOptions)
      .subscribe();
  }

  deleteEntity(entity: Entity) {
    return this.httpService.delete('https://localhost:5001/entities?element=' + entity.element, this.httpOptions)
      .subscribe();
  }
}
