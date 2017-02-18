export class RolMenu {
  enteJuridico: number;
  codigoMenu: number;
  menu: string;
  codigoRol: number;
  acceso: string;
  estado: string;
  userCrea: number;
  userMod: number;

  constructor(enteJuridico: number,
    codigoMenu: number,
    menu: string,
    codigoRol: number,
    acceso: string,
    estado: string,
    userCrea: number,
    userMod: number) {
    this.enteJuridico = enteJuridico;
    this.codigoMenu = codigoMenu;
    this.menu = menu;
    this.codigoRol = codigoRol;
    this.acceso = acceso;
    this.estado = estado;
    this.userCrea = userCrea;
    this.userMod = userMod;
  }
}
