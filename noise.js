const canvasSketch = require('canvas-sketch')
const { lerp, degToRad } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: false,
  duration: 20
};

const palette = ["#f8f9fa","#e9ecef","#dee2e6","#ced4da","#adb5bd","#6c757d","#495057","#343a40","#212529"]
const text = ['◠', '◡', '◝', '◜', '◞', '◟']

const createLines = () => {
  let lineX = 50
  let lineY = 40
  let linePoints = []
  for(let i=0;i<lineX;i++){
    for(let j=0;j<lineY;j++){
      let u = lineX <=1 ? 0.5 : i/(lineX-1)
      let v = lineY <=1 ? 0.5 : j/(lineY-1)
      linePoints.push({
        position: [u,v],
        color: random.pick(palette),
        charSet: random.pick(text)
      })
    }
  }
  return linePoints
}
const linePoints = createLines()
const createGrid = () => {
  let gridX = 50
  let gridY = 25
  let gridPoints = []
  for(let i=0;i<gridX;i++){
    for(let j=0;j<gridY;j++){
      let u = gridX <=1 ? 0.5 : i/(gridX-1)
      let v = gridY <=1 ? 0.5 : j/(gridY-1)
      gridPoints.push({
        position: [u,v],
        color: random.pick(palette),
        charSet: random.pick(text)
      })
    }
  }
  return gridPoints
}

const gridPoints = createGrid()
const margin = 50

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    linePoints.forEach((data) => {
      const {
        position,
        color,
        radius,
        charSet
      } = data

      const [u,v] = position

      const x = lerp(0, width-margin, u)
      const y = lerp(margin, height-margin, v)
      
      // const randNoise = random.noise2D(x + frame * 50 , y + frame * 50, 0.01)
      // const rotation = randNoise * Math.PI * 0.1

      context.save()
      context.beginPath()
      context.lineWidth = 10
      context.translate(x,y)
      context.moveTo(x, y)
      context.lineTo(x+200, y)
      context.strokeStyle = 'white'
      context.stroke()
      context.restore()
    })
    
    gridPoints.forEach((data) => {
      const {
        position,
        color,
        charSet
      } = data

      const [u,v] = position

      const x = lerp(margin, width-margin, u)
      const y = lerp(margin, height-margin, v)
      
      // const randNoise = random.noise2D(x + frame * 50 , y + frame * 50, 0.01)
      // const rotation = randNoise * Math.PI * 0.1

      context.save()
      context.beginPath()
      context.translate(x,y)
      if(Math.random() > 0.7){
      context.fillStyle = 'white'
      context.arc(x, y, 25, 0, 360)
      context.fill()
      }
      context.restore()
    })
  };
};

canvasSketch(sketch, settings);
