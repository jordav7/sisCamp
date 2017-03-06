import { EquipoJugadorDisciplina } from 'app/model/procesos/equipo-jugador-disciplina';
export class EquipoJugador {
  codigoEquipoJugador: number;
  enteJuridico: number;
  codigoEquipo: number;
  equipoNombre: string;
  ligaEquipo: number;
  nombreLiga: string;
  codigoJugador: number;
  cedulaJugador: string;
  nombresJugador: string;
  numeroJugador: number;
  esCapitan: string;
  esJugador: string;
  esDt: string;
  estado: string;
  userCrea: number;
  userMod: number;
  disciplinasEquipoJugador: EquipoJugadorDisciplina[];
}
