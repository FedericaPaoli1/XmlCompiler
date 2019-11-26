import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CreateSearchComponent } from './create-search/create-search.component';
import { EntityComponent } from './entity/entity.component';
import { EntitiesComponent } from './entities/entities.component';
import { CreatingChoicesComponent } from './creating-choices/creating-choices.component';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { SearchesComponent } from './searches/searches.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './providers/search.service';
import { SearchUpdateAttributesComponent } from './search-update-attributes/search-update-attributes.component';
import { SearchUpdateComponent } from './search-update/search-update.component';
import { SearchUpdateFieldsComponent } from './search-update-fields/search-update-fields.component';
import { CreateSearchAttributesComponent } from './create-search-attributes/create-search-attributes.component';
import { CreateSearchFieldsComponent } from './create-search-fields/create-search-fields.component';
import { CreateEntityAttributesComponent } from './create-entity-attributes/create-entity-attributes.component';
import { EntityService } from './providers/entity.service';
import { CreateEntityFieldsComponent } from './create-entity-fields/create-entity-fields.component';
import { EntityUpdateComponent } from './entity-update/entity-update.component';
import { EntityUpdateAttributesComponent } from './entity-update-attributes/entity-update-attributes.component';
import { EntityUpdateFieldsComponent } from './entity-update-fields/entity-update-fields.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CreateSearchComponent,
    EntityComponent,
    EntitiesComponent,
    CreatingChoicesComponent,
    CreateEntityComponent,
    SearchesComponent,
    SearchComponent,
    SearchUpdateAttributesComponent,
    SearchUpdateComponent,
    SearchUpdateFieldsComponent,
    CreateSearchAttributesComponent,
    CreateSearchFieldsComponent,
    CreateEntityAttributesComponent,
    CreateEntityFieldsComponent,
    EntityUpdateComponent,
    EntityUpdateAttributesComponent,
    EntityUpdateFieldsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
    NgxSmartModalModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'entities', component: EntitiesComponent },
      { path: 'searches', component: SearchesComponent },
      { path: 'creating-choices', component: CreatingChoicesComponent },
      { path: 'create-search', component: CreateSearchComponent },
      { path: 'create-entity', component: CreateEntityComponent },
    ])
  ],
  providers: [SearchService, EntityService, NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
