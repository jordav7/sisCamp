import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { SisCampProperties } from 'app/propiedades';

declare var $: any;

@Component({
  selector: 'ld-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private idle: Idle, private keepalive: Keepalive, private router: Router) {
    idle.setIdle(SisCampProperties.TIEMPO_SESION);
    idle.setTimeout(5);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      console.log('No longer idle');
    });

    idle.onTimeout.subscribe(() => {
      console.log('Time out');
      localStorage.removeItem('currentUser');
      this.router.navigate(['login'], {queryParams: {qL: 'back'}});
    });

    idle.onIdleStart.subscribe(() => {
      console.log('idle start');
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      console.log('La sesion va a cerrar en ' + countdown + ' seg');
    });

    keepalive.interval(20);
    keepalive.onPing.subscribe(() => {
      console.log('Ultima fecha de ping ' + new Date());
    });

    this.reset();
  }

  reset() {
    this.idle.watch();
  }

  ngOnInit() {
    if($.AdminLTE.layout){
      $.AdminLTE.layout.fix();
    }
  }

}
