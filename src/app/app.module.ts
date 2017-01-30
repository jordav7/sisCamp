import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';
import { HomeComponent } from './home/home.component';
import { TipoCatalogoComponent } from './content/admin/tipo-catalogo/tipo-catalogo.component';
import { CatalogoComponent } from './content/admin/catalogo/catalogo.component';
import { UbicacionGeograficaComponent } from './content/admin/ubicacion-geografica/ubicacion-geografica.component';
import { RolesComponent } from './content/seguridad/roles/roles.component';
import { EnteComponent } from './content/seguridad/ente/ente.component';
import { ParametroComponent } from './content/seguridad/parametro/parametro.component';
import { UsuarioComponent } from './content/seguridad/usuario/usuario.component';

const sisCampRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'ubicacionGeografica',
    component: UbicacionGeograficaComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'ente',
    component: EnteComponent
  },
  {
    path: 'parametro',
    component: ParametroComponent
  },
  {
    path: 'usuario',
    component: UsuarioComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    SidebarMenuComponent,
    HomeComponent,
    TipoCatalogoComponent,
    CatalogoComponent,
    UbicacionGeograficaComponent,
    RolesComponent,
    EnteComponent,
    EnteComponent,
    ParametroComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(sisCampRoutes,{useHash: true}),
    DataTableModule,
    SharedModule,
    DialogModule,
    GrowlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
