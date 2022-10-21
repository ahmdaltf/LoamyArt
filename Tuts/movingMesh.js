const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
  duration: 4
}


const sketch = ({width, height}) => {
  const margin = 200
  const points = []
  for(let i=0; i<30; i++){
    const x = random.range(margin, width - margin)
    const y = random.range(margin, height - margin)
    
    points.push(new Points(x, y))
}

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    for(let i=0; i<points.length; i++){
      const pointsLocation = points[i]
      for(let j= i + 1; j<points.length; j++){
        const otherPointsLocation = points[j]

        context.beginPath()
        context.lineWidth = 3 //Thickness of line
        context.moveTo(pointsLocation.position.x, pointsLocation.position.y)
        context.lineTo(otherPointsLocation.position.x, otherPointsLocation.position.y)
        context.strokeStyle = '#b5b5b5' //color of line
        context.stroke()
      }
    }

    points.forEach((point) => {
      point.velocity()		
      point.draw(context)
      point.returnToCanvas(width, height)
   })
  }

}

class Position {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
}

class Points {
  constructor(x, y) {
    this.position = new Position(x, y)
    this.newPosition = new Position(random.range(-1, 1), random.range(-1, 1))
    this.radius = 20
    this.returningPoint = 200
  }

  
  draw(context) {
    context.beginPath()
    context.lineWidth = 5
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
    context.fillStyle = 'black'
    context.fill()
  }
  
  velocity(){
    this.position.x += this.newPosition.x
    this.position.y += this.newPosition.y
  }

  returnToCanvas(width, height){
    if(this.position.x <= this.returningPoint || this.position.x >= width - this.returningPoint){
      this.newPosition.x *= -1
    }
    if(this.position.y <= this.returningPoint || this.position.y >= height - this.returningPoint){
      this.newPosition.y *= -1
    }
  }
}

canvasSketch(sketch, settings)
