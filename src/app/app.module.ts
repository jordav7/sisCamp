import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';

import { MyDatePickerModule } from 'mydatepicker';


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
import { JugadorComponent } from './content/admin/jugador/jugador.component';
import { ValidationMessagesComponent } from './components/general/validation-messages/validation-messages.component';
import { JugadorEditComponent } from './content/admin/jugador/jugador-edit/jugador-edit.component';
import { DisplayPictureComponent } from './components/general/display-picture/display-picture.component';
import { LoginComponent } from './login/login.component';
import { LoginInputComponent } from './login/login-input/login-input.component';
import { PrincipalComponent } from './principal/principal.component';

import { AuthGuard } from './guards/auth.guard';
import { EditUsuarioComponent } from './content/seguridad/usuario/edit-usuario/edit-usuario.component';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { ArbitroComponent } from './content/admin/arbitro/arbitro.component';
import { ArbitroEditComponent } from './content/admin/arbitro/arbitro-edit/arbitro-edit.component';
import { LigaComponent } from './content/admin/liga/liga.component';
import { EquipoComponent } from './content/procesos/equipo/equipo.component';
import { EquipoEditComponent } from './content/procesos/equipo/equipo-edit/equipo-edit.component';
import { SidebarSubMenuComponent } from './sidebar/sidebar-menu/sidebar-sub-menu/sidebar-sub-menu.component';
import { CampeonatoComponent } from './content/procesos/campeonato/campeonato.component';
import { CampeonatoEditComponent } from './content/procesos/campeonato/campeonato-edit/campeonato-edit.component';
import { MenuComponent } from './content/seguridad/menu/menu.component';
import { EquipoClonComponent } from './content/procesos/equipo/equipo-clon/equipo-clon.component';

const sisCampRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginInputComponent
  },
  {
    path: 'home',
    component: PrincipalComponent,
    canActivate: [AuthGuard],
    children: [
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
        path: 'menu',
        component: MenuComponent
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
      },
      {
        path: 'jugador',
        component: JugadorComponent
      },
      {
        path: 'crearJugador',
        component: JugadorEditComponent
      },
      {
        path: 'editJugador/:enteJuridico/:codigoJugador',
        component: JugadorEditComponent
      },
      {
        path: 'crearUsuario',
        component: EditUsuarioComponent
      },
      {
        path: 'editUsuario/:enteJuridico/:codigoUsuario',
        component: EditUsuarioComponent
      },
      {
        path: 'arbitro',
        component: ArbitroComponent
      },
      {
        path: 'crearArbitro',
        component: ArbitroEditComponent
      },
      {
        path: 'editArbitro/:enteJuridico/:codigoArbitro',
        component: ArbitroEditComponent
      },
      {
        path: 'ligas',
        component: LigaComponent
      },
      {
          path: 'equipos',
          component: EquipoComponent
      },
      {
          path: 'crearEquipo',
          component: EquipoEditComponent
      },
      {
          path: 'editarEquipo/:enteJuridico/:codigoEquipo',
          component: EquipoEditComponent
      },
      {
          path: 'clonEquipo/:enteJuridico/:codigoEquipo',
          component: EquipoClonComponent
      },
      {
          path: 'campeonatos',
          component: CampeonatoComponent
      },
      {
        path: 'crearCampeonato',
        component: CampeonatoEditComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      }
    ]
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
    UsuarioComponent,
    JugadorComponent,
    ValidationMessagesComponent,
    JugadorEditComponent,
    DisplayPictureComponent,
    LoginComponent,
    LoginInputComponent,
    PrincipalComponent,
    EditUsuarioComponent,
    EqualValidatorDirective,
    ArbitroComponent,
    ArbitroEditComponent,
    LigaComponent,
    EquipoComponent,
    EquipoEditComponent,
    SidebarSubMenuComponent,
    CampeonatoComponent,
    CampeonatoEditComponent,
    MenuComponent,
    EquipoClonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(sisCampRoutes,{useHash: true}),
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    GrowlModule,
    FileUploadModule,
    CalendarModule,
    InputMaskModule,
    RadioButtonModule,
    TabViewModule,
    TreeModule,
    MultiSelectModule,
    FieldsetModule,
    MyDatePickerModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
