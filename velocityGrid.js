const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const { lerp } = require('canvas-sketch-util/math')

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
  duration: 10
}


const createGrid = () => {
  const points = []
  const countX = 10
  const countY = 15
  for(let i = 0; i<countX; i++){
    for(let j = 0; j<countY; j++){
      const u = i/(countX-1)
      const v = j/(countY-1)
      points.push({
        position: [u, v],
      })
    }
  }
  return points
}

const points = createGrid()
const margin = 400

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const {
        position,
      } = data

      const [u, v] = position
      let x = lerp(margin, width-margin, u)
      let y = lerp(margin, height-margin, v)

      const randNoise = random.noise2D(x + frame * 15, y + frame * 15, 0.001)
      const angle = randNoise * Math.PI * 0.1

      context.save()
      context.translate(x, y)
      context.beginPath()
      context.rotate(angle)
      // context.lineWidth = random.range(10, 30)
      context.lineWidth = 15
      context.moveTo(0 , 0)
      context.lineTo(0 + 100 , 0)
      context.strokeStyle = 'white'
      context.stroke()
      context.restore()
    })
  };
};

canvasSketch(sketch, settings);
