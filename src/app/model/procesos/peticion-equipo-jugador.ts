import { Jugador } from 'app/model/admin/jugador';
import { EquipoJugador } from 'app/model/procesos/equipo-jugador';
import { Respuesta } from 'app/model/general/respuesta';

export class PeticionEquipoJugador {
  jugador: Jugador;
  equipoJugador: EquipoJugador;
  respuesta?: Respuesta;
}
