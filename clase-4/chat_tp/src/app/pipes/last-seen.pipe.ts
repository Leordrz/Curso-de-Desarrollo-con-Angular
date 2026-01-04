import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastSeen',
  standalone: true
})
export class LastSeenPipe implements PipeTransform {
  transform(online: boolean, lastSeenLabel: string): string {
    return online ? 'En línea' : `Última Conexión: ${lastSeenLabel}`;
  }
}
