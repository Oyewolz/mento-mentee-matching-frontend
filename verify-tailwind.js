const fs = require('fs');
const path = require('path');

// Create a test component to verify Tailwind
const testComponentPath = path.join(__dirname, 'src/app/test-tailwind.component.ts');
const testComponent = `import { Component } from '@angular/core';

@Component({
  selector: 'app-test-tailwind',
  template: \`
    <div class="p-4 m-4 bg-blue-500 text-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold">Tailwind CSS is working!</h2>
      <p class="mt-2">This component is styled with Tailwind CSS classes.</p>
    </div>
  \`,
  standalone: true
})
export class TestTailwindComponent {}
`;

fs.writeFileSync(testComponentPath, testComponent);

console.log('Test component created at src/app/test-tailwind.component.ts');
console.log('Add this component to your app.component.ts to verify Tailwind is working.'); 