import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Entity } from '../classes/entity';
import { PageSubsService } from '../providers/subscription/page-subs.service';

@Component({
  selector: 'app-entity-update',
  templateUrl: './entity-update.component.html',
  styleUrls: ['./entity-update.component.css'],
  encapsulation: ViewEncapsulation.Native
})

export class EntityUpdateComponent {
  entities: Entity[] = [];
  @Input() entityElement: string;

  constructor(private pageSubsService: PageSubsService) {}
}
