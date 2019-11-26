import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Entity } from '../classes/entity';
import { Router } from '@angular/router';
import { Search } from '../classes/search';

@Component({
  selector: 'app-creating-choices',
  templateUrl: './creating-choices.component.html',
  styleUrls: ['./creating-choices.component.css']
})
export class CreatingChoicesComponent implements OnInit {
  @Input('entity') entity: Entity;
  @Input('search') search: Search;
  @Output() creating = new EventEmitter();
  constructor(private route: Router) { }

  ngOnInit() {
  }

  createSearch() {
    this.route.navigate(['', 'create-search']);
    this.creating.emit(this.search);
  }

  createEntity() {
    this.route.navigate(['', 'create-entity']);
    this.creating.emit(this.entity);
  }

}
