import { Message } from 'primeng/primeng';
/**
 * Clase que maneja el despliegue de mensajes desde primeng
 */
export class UtilMessages {
  public static showErrorMessage (summary: string, detail: string): Message[] {
    let messages = [];
    messages.push({severity: 'error', summary: summary, detail: detail});
    return messages;
  }

  public static showWarningMessage (summary: string, detail: string): Message[] {
    let messages = [];
    messages.push({severity: 'warn', summary: summary, detail: detail});
    return messages;
  }
}
