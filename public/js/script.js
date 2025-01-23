$(document).ready(() => {
  // Set canvas size
  const canvas = document.getElementById('patternCanvas');
  canvas.width = 800;  // Set canvas width (adjust as needed)
  canvas.height = 600; // Set canvas height (adjust as needed)

  $('#generatePattern').click(() => {
    const canvas = document.getElementById('patternCanvas');
    const ctx = canvas.getContext('2d');
    const patternType = $('#patternType').val();
    const primaryColor = $('#colorPicker').val();
    const density = parseInt($('#densitySlider').val());
    const size = parseInt($('#sizeSlider').val());

    if (!patternType) {
      alert('Please select a pattern type!');
      return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (patternType === 'spiral') {
      generateSpiral(ctx, canvas, primaryColor, density, size);
    } else if (patternType === 'grid') {
      generateGrid(ctx, canvas, primaryColor, density, size);
    } else if (patternType === 'fractal') {
      alert('Fractal pattern generation coming soon!');
      // Optionally, disable the fractal option until it's ready
      $('#patternType').val('spiral'); // Reset to default pattern
    }
  });

  // Function to generate spiral pattern
  function generateSpiral(ctx, canvas, color, density, size) {
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radius = size;
    let angle = 0;

    for (let i = 0; i < density; i++) {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);  // Draw small circle
      ctx.fillStyle = color;
      ctx.fill();

      radius += 5;
      angle += Math.PI / 20;
    }
  }

  // Function to generate grid pattern
  function generateGrid(ctx, canvas, color, density, size) {
    const step = size;
    ctx.strokeStyle = color;

    for (let x = 0; x < canvas.width; x += step) {
      for (let y = 0; y < canvas.height; y += step) {
        ctx.strokeRect(x, y, step, step);
      }
    }
  }

  // Save the generated pattern as an image
  $('#savePattern').click(() => {
    const dataUrl = canvas.toDataURL(); // Get canvas as data URL
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'generated-pattern.png';  // File name for download
    a.click();
  });
});
