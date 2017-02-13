export class CabeceraPagina {
  titulo: string;
  descripcion: string;
  nivelesBreadcrumb: string[];

  constructor(titulo?: string, descripcion?: string){
    this.titulo = titulo;
    this.descripcion = descripcion;
  }
}
