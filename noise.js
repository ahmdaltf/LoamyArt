const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
  duration: 10
};

const palette = random.pick(palettes)
const text = ['◠', '◡', '◝', '◜', '◞', '◟']

const createGrid = () => {
  let count = 25
  let points = []
  for(let i=0;i<count;i++){
    for(let j=0;j<count;j++){
      let u = count <=1 ? 0.5 : i/(count-1)
      let v = count <=1 ? 0.5 : j/(count-1)
      const radius = Math.max(0.02, random.gaussian() * 0.1)
      points.push({
        position: [u,v],
        radius,
        color: random.pick(palette),
        charSet: random.pick(text)
      })
    }
  }
  return points
}
const points = createGrid()
const margin = 200

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "black"
    context.fillRect(0, 0, width, height)

    points.forEach((data) => {
      const {
        position,
        color,
        radius,
        charSet
      } = data

      const [u,v] = position

      const x = lerp(margin, width-margin, u)
      const y = lerp(margin, height-margin, v)
      
      const randNoise = random.noise2D(u + frame * 15, v + frame * 15, 0.001, 1)
      const rotation = randNoise * (Math.PI/3) * 0.1
      
      context.save()
      context.beginPath()
      context.fillStyle = "white"
      context.translate(x,y)
      context.rotate(randNoise)
      context.font = `${(0.05 * width) + 50}px "Arial"`
      context.fillText("⸅",0,0) //⸅
      context.restore()
    })
  };
};

canvasSketch(sketch, settings);
