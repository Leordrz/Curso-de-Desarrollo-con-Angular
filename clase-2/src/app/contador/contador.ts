import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contador',
  imports: [],
  templateUrl: './contador.html',
  styleUrl: './contador.css',
})
export class Contador {
  public counter = signal(0);

  cambiarDeValorA5() {
    this.counter.set(5);
  }

  incrementar() {
    this.counter.update((current_value) => current_value + 1);
  }

  decrementar() {
    this.counter.update((current_value) => current_value - 1);
  }

}
