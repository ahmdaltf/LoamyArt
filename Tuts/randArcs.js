const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const palette = ["#03045e","#023e8a","#0077b6","#0096c7","#00b4d8",
"#48cae4","#90e0ef","#ade8f4","#caf0f8"]

const gridGeneration = () => {
	const points = []
	const count = 30
	
	for(let i = 0; i < count; i++){
		for(let j = 0; j < count; j++){
			const u = i/(count-1)
			const v = j/(count-1)
			const randomCorners = random.pick([ 0, 0.5, 1, 1.5 ]);
      const startingPoint = Math.PI * randomCorners;
      const endingPoint = startingPoint + Math.PI * 1.5;

      points.push({
        position: [u, v],
        color: random.pick(palette),
        startingPoint,
        endingPoint,
      })
		}
	}
	return points
}

const points = gridGeneration()
const margin = 400

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

	points.forEach((data) => {
			const {position,
			color,
			startingPoint,
			endingPoint} = data
			
			const [u,v] = position
			
			const x = lerp(margin,width-margin, u)
      const y = lerp(margin,height-margin, v)

			context.beginPath()
      context.arc(x, y, 20, startingPoint , endingPoint)
      context.fillStyle = color
      context.lineTo(x, y)
      context.fill()
		})
  }
};

canvasSketch(sketch, settings);