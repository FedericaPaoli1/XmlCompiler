import { Attribute } from './attribute';
import { Field } from './field';

export class Entity {
    element: string;
    attributes: Array<Attribute>;
    fields: Array<Field>;

    constructor() {
        this.element = ' ';
        this.attributes = [];
        this.fields = [];
    }
}
