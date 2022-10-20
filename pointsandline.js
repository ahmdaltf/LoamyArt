const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
  duration: 15
}

const sketch = ({ context, width, height }) => {

  const margin = 50
  const points = []
  for(let i=0; i<30; i++){
    const x = random.range(margin, width - margin)
    const y = random.range(margin, height - margin)
    
    points.push(new Points(x, y))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    for(let i=0; i<points.length; i++){
      const pointsLocation = points[i]
      for(let j= i + 1; j<points.length; j++){
        const otherPointsLocation = points[j]

        context.beginPath()
        context.lineWidth = 3
        context.moveTo(pointsLocation.position.x, pointsLocation.position.y)
        context.lineTo(otherPointsLocation.position.x, otherPointsLocation.position.y)
        context.strokeStyle = '#e0e0e0'
        context.stroke()
      }
    }

    points.forEach((point) => {
      point.update()
      point.draw(context)
      point.bounce(width, height)
    })
  }
}

class Agents {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
}

class Points {
  constructor(x, y) {
    this.position = new Agents(x, y)
    this.velocity = new Agents(random.range(-1, 1), random.range(-1, 1))
    this.radius = 20
  }

  bounce(width, height){
    if(this.position.x <= 200 || this.position.x >= width - 200){
      this.velocity.x *= -1
    }
    if(this.position.y <= 200 || this.position.y >= height- 200){
      this.velocity.y *= -1
    }
  }

  update(){
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw(context) {
    context.beginPath()
    context.lineWidth = 5
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
    context.fillStyle = 'black'
    // context.stroke()
    context.fill()
  }
}

canvasSketch(sketch, settings)
