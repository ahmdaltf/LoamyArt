const canvasSketch = require('canvas-sketch');
const { lerp, linspace } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  animate: true,
  duration: 4,
  dimensions: [ 2048, 2048 ]
};

const palette = ["#03045e","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","#90e0ef","#ade8f4","#caf0f8"]

const sketch = () => {
  const lines = linspace(20, true).map(x => {
    return linspace(20, true).map(y => {
      return [
        x, y
      ];
    });
  });
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const margin = 0.1 * width;
    lines.forEach(line => {
      context.beginPath();
      line.forEach(position => {
        let [ u, v ] = position;

        v += 0.1 * loopNoise(u, v, playhead);
        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, width - margin, v);
        context.lineTo(x, y);
      });
      context.lineWidth = 0.02 * width;
      context.strokeStyle = 'white';
      context.stroke();
    })
  };

  function loopNoise (x, y, t, scale = 1) {
    const duration = scale;
    const current = t * scale;
    return ((duration - current) * random.noise3D(x, y, current) + current * random.noise3D(x, y, current - duration)) / duration;
  }
};

canvasSketch(sketch, settings);