import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; text-align: center; margin-top: 50px;">
      <h1>Test Component Works!</h1>
      <p>If you can see this, routing is functioning correctly.</p>
    </div>
  `
})
export class TestComponent {} 