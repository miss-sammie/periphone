console.log("Starting carrier bag...");
import { frequencyToLetter, initializeTextOverlay, postText, initBabbler } from './sheSpeaks.js'
import { initHydra, reloadActiveSource, reloadPatch, resizeHydraPatch } from './hydra.js';
import { Buffer } from './buffers.js';
import { Controls } from './controls.js';
import { loadLibrary, mediaLibrary, getCollection } from './media.js';
import { Sidebar } from './sidebar.js';

console.log("Imports completed");

// Initialize buffers
Buffer.initBuffers(2, 0);
console.log("Buffers initialized");

window.Buffer = Buffer;
window.Controls = Controls;
window.reloadPatch = reloadPatch;

// Initialize sidebar
//const sidebar = new Sidebar();
//window.sidebar = sidebar;

console.log("About to load library...");
await loadLibrary()
    .then(async () => {
        console.log("Library loaded:", mediaLibrary);
        
        // Then set collections if they exist
        try {
            if (getCollection('Videos')?.items.length > 0) {
                await Buffer.buffers[0].setCollection('Videos');
                await Buffer.buffers[1].setCollection('Videos');
            }
        } catch (error) {
            console.warn('Failed to set initial collections:', error);
        }
        
        // Initialize controls
        Controls.init();
        Controls.initializeMIDI();

        const hydra = initHydra();
        reloadPatch(1);

        // Initialize babbler with popup mode
        initBabbler('popup');


        // Update sidebar with loaded data
        //sidebar.update();
    })
    .catch(error => {
        console.error("Error in main:", error);
    });









