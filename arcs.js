const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 2048, 2048 ],
  // animate: true,
  // fps: 60
};


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    let cx = width * 0.5
    let cy = height * 0.5
    let w = width * 0.01
    let h = height * 0.07

    let x,y;

    let radius = width * 0.3
    let num = 24
    for(let i = 0; i<num ;i++){
    const slice = math.degToRad(360/num)
    const angle = slice * i

    x = cx + radius * Math.sin(angle)
    y = cy + radius * Math.cos(angle)

    context.save()
    context.translate(x, y)
    context.rotate(-angle)
    context.scale(random.range(0.5, 3), 1)
    

    context.beginPath()
    context.lineWidth = random.range(10, 30)
    context.arc(0, 0,radius*random.range(0.6, 1.7) , slice*-0.3,slice*0.3)
    context.strokeStyle = 'white'
    context.stroke()
    context.restore()

    context.save()
    context.translate(cx, cy)
    context.rotate(-angle)

    context.lineWidth = random.range(20, 30)
    context.beginPath()
    context.rect(radius * random.range(0.2, 0.7), radius * random.range(0.2, 0.7), random.range(1, 24), random.range(1, 24))
    context.fillStyle = 'white'
    context.fill()
    context.restore()

    }

    // context.beginPath()
    // context.arc(100, 100, 20, 0, Math.PI * 2)
    // context.fillStyle = 'white'
    // context.fill()
  };
};

canvasSketch(sketch, settings);
