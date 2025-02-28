import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fallback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; text-align: center; margin-top: 100px;">
      <h1>Something went wrong!</h1>
      <p>We couldn't load the login page. Here's a basic fallback.</p>
      <div style="margin-top: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 8px; max-width: 400px; margin-left: auto; margin-right: auto;">
        <h2>Login</h2>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Username</label>
          <input type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Password</label>
          <input type="password" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <button style="background-color: #0068c2; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; width: 100%;">
          Sign in
        </button>
      </div>
    </div>
  `
})
export class FallbackComponent {} 