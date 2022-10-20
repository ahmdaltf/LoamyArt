const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const palette = random.pick(palettes)

const createGrid = () => {
  let count = 25
  let points = []
  for(let i=0;i<count;i++){
    for(let j=0;j<count;j++){
      let u = count <=1 ? 0.5 : i/(count-1)
      let v = count <=1 ? 0.5 : j/(count-1)
      const radius = Math.max(0.02, random.gaussian() * 0.01)
      points.push({
        position: [u,v],
        radius,
        rotation: random.noise3D(u,v, 100),
        color: random.pick(palette),
      })
    }
  }
  return points
}
const points = createGrid()
const margin = 400

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#fefefe'
    context.fillRect(0, 0, width, height)

    points.forEach((data) => {
      const {
        position,
        color,
        radius,
        rotation
      } = data

      const [u,v] = position

      const x = lerp(margin, width-margin, u)
      const y = lerp(margin, height-margin, v)
      
      context.save()
      context.beginPath()
      context.arc(x, y, radius*width, 0, Math.PI*2)
      // context.rect(x, y, radius*width, radius*height)
      context.fillStyle = color
      context.translate(x,y)
      context.rotate(rotation)
      context.font = `${radius * width}px "Arial"`
      context.fillText('🙾',0,0)
      context.restore()
    })
  };
};

canvasSketch(sketch, settings);
