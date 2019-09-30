import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { InputfieldComponent } from './components/inputfield/inputfield.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [{
  path: '',
  component: InputfieldComponent,
  pathMatch:'full'},
  {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InputfieldComponent,
  PageNotFoundComponent]