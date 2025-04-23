document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('./ws.js', { 
          scope: './', 
          updateViaCache: 'none' 
        });
        
        console.log('✅ SW registered. Scope:', registration.scope);
        registration.update();

        // Track SW updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            console.log(`SW state: ${newWorker.state}`);
          });
        });

      } catch (error) {
        console.error('❌ SW registration failed:', error);
        if (error.message.includes('404')) {
          alert('Service worker file (ws.js) not found!');
        }
      }
    };

    setTimeout(registerSW, 500); // Prevent race conditions
  }
});