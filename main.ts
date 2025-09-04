import { WebWorkerEngine } from '@embedpdf/engines/worker';
 
const worker = new Worker(new URL('./webworker.ts', import.meta.url), { 
  type: 'module' 
});
const engine = new WebWorkerEngine(worker);
 
// Initialize the engine
await engine.initialize().toPromise();
 
// Open a document and render its first page
const document = await engine
  .openDocumentUrl({ id: 'demo', url: '/demo.pdf' })
  .toPromise();
 
const imageBlob = await engine
  .renderPage(document, document.pages[0])
  .toPromise();
 
// You can now display the image
const imageUrl = URL.createObjectURL(imageBlob);
document.getElementById('my-image').src = imageUrl;