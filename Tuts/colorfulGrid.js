const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const palette = random.pick(palettes)

const gridGeneration = () => {
	const points = []
	const count = 30
	
	for(let i = 0; i < count; i++){
		for(let j = 0; j < count; j++){
			const u = i/(count-1)
			const v = j/(count-1)
			points.push({
				color: random.pick(palette),
				position: [u,v]
			})
		}		
	}
	return points
}

const points = gridGeneration()

const margins = 400

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

	  points.forEach((data) => {
			const {
			position,
			color} = data

			const [u, v] = position
			const x = lerp(margins, width-margins, u)
			const y = lerp(margins, height-margins, v)

			context.beginPath()
			context.rect(x, y, 40, 40) //rect method takes 4 arguments (x co-ordinate, y co-ordinate, width of rectange, height of rectangle)
			context.fillStyle = color
			context.fill()
		})

  }
};

canvasSketch(sketch, settings);