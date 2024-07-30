import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideToastr, ToastrModule, ToastrService} from "ngx-toastr";

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes),ToastrService,ToastrModule,provideToastr(),HttpClientModule,provideHttpClient(withFetch()), provideAnimationsAsync()]
};
