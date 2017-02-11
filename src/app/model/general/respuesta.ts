export class Respuesta{
  codigo: string;
  mensaje: string;

  constructor(codigo?: string, mensaje?: string){
    this.codigo = codigo;
    this.mensaje = mensaje;
  }
}
