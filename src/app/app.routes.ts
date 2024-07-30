import { Routes } from '@angular/router';
import {ApiComponent} from "./_pages/api/api.component";
import {AppComponent} from "./app.component";
import {ContactUSComponent} from "./_pages/contact-us/contact-us.component";

export const routes: Routes = [
  {path:'',component:ApiComponent,pathMatch:'full'},
  {path:'home',component:ApiComponent},
  {path:'contactUS',component:ContactUSComponent}
];
