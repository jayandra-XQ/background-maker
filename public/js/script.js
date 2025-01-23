$(document).ready(() => {
  const canvas = document.getElementById('patternCanvas');
  canvas.width = 800;
  canvas.height = 600;

  $('#generatePattern').click(() => {
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
      $('#patternType').val('spiral'); // Reset to default pattern
    }
  });

  $('#savePattern').click(() => {
    const dataUrl = canvas.toDataURL('image/png'); // Get canvas as base64 image
    const patternData = {
      image: dataUrl, // Send the base64 string to the backend
      patternType: $('#patternType').val(),
      primaryColor: $('#colorPicker').val(),
      density: parseInt($('#densitySlider').val()),
      size: parseInt($('#sizeSlider').val()),
    };

    // POST request to save the pattern to the backend
    $.ajax({
      url: '/patterns/save', // Update this to match your backend route
      type: 'POST',
      data: JSON.stringify(patternData),
      contentType: 'application/json',
      success: (response) => {
        alert('Pattern saved successfully!');
      },
      error: (err) => {
        console.error('Error saving pattern:', err);
        alert('Failed to save the pattern.');
      },
    });
  });

  function generateSpiral(ctx, canvas, color, density, size) {
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radius = size;
    let angle = 0;

    for (let i = 0; i < density; i++) {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      radius += 5;
      angle += Math.PI / 20;
    }
  }

  function generateGrid(ctx, canvas, color, density, size) {
    const step = size;
    ctx.strokeStyle = color;

    for (let x = 0; x < canvas.width; x += step) {
      for (let y = 0; y < canvas.height; y += step) {
        ctx.strokeRect(x, y, step, step);
      }
    }
  }
});
