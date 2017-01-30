export class Catalogo {
  codigoCatalogo: number;
  nombre: string;
  estado: string;
  enteJuridico: number;
  tipoCatalogo: number;
  userCrea: number;

  constructor(codigoCatalogo?: number){
    this.codigoCatalogo = codigoCatalogo;
  }
}
