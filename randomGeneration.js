const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const palette = random.pick(palettes)

const createGrid = () => {
  const points = []
  const count = 30

  for (let i = 0; i<count; i++){
    for (let j = 0; j<count; j++){
      const u = count <=1 ? 0.5 : i/(count - 1)
      const v = count <=1 ? 0.5 :j/(count - 1)
      points.push({
        color: random.pick(palette),
        radius: Math.max(0.02, random.gaussian() * 0.02),
        position: [u,v]
      })
    }
  }
  return points
}

const points = createGrid().filter(() => Math.random()>0.5)
const margin = 500

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach((data) => {
      const {
        position,
        radius,
        color
      } = data

      const [u,v] = position

      const x = lerp(margin, width-margin, u)
      const y = lerp(margin, height-margin, v)

      context.beginPath()
      context.arc(x, y, radius*width, 0, Math.PI * 2)
      // context.lineWidth = 8
      // context.strokeStyle = 'blue'
      // context.stroke()
      context.fillStyle = color
      context.fill()
    })
  };
};

canvasSketch(sketch, settings);
