const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const { lerp } = require('canvas-sketch-util/math')
import {Pane}  from 'tweakpane'
const palettes = require('nice-color-palettes')


const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
  duration: 15
}

const params = {
  rows: 5,
  cols: 2,
}

const palette = ['#03071e', '#370617', '#6a040f', '#9d0208', '#d00000', '#dc2f02', '#e85d04', '#f48c06', '#faa307', '#fbb539']


const timeFunc = () => 
  {setInterval(function() {if(params.cols != 50) {params.cols +=1}}, 400)}

const myTimeout = setTimeout(timeFunc, 5000);

const sketch = () => {
  
  
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    const countX = params.rows
    const countY = params.cols

    const createGrid = () => {
      const points = []
      for(let i = 0; i<countX; i++){
        for(let j = 0; j<countY; j++){
          const u = i/(countX-1)
          const v = j/(countY-1)
          points.push({
            position: [u, v],
            color: random.pick(palette)
          })
        }
      }
      return points
    }
    
    const points = createGrid()
    const margin = 400
    points.forEach((data) => {
      const {
        position,
        color
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
      context.lineWidth = random.range(10, 30)
      // context.lineWidth = 15
      context.moveTo(0 , 0)
      context.lineTo(0 + 100 , 0)
      context.strokeStyle = color
      context.stroke()
      context.restore()
    })
  };
};

const tweakFunc = () => {
  const pane = new Pane()
  let folder = pane.addFolder({title: 'Grid'})
  folder.addInput(params, 'rows', {min: 2, max:100, step:1} )
  folder.addInput(params, 'cols', {min: 2, max:100, step:1} )
}

tweakFunc()
canvasSketch(sketch, settings);
