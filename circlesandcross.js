const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 600, 600 ],
  animate: false,
  fps: 10
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    
    let boxWidth = 80
    let boxHeight = boxWidth
    for (let i=0; i<4; i++){
      for(let j=0; j<4; j++){
        let x = 100 + (boxWidth + 20) * i
        let y = 100 + (boxHeight + 20) * j
        context.strokeStyle= 'white'
        context.lineWidth = 2
        context.beginPath()
        context.rect(x, y, boxWidth, boxHeight)
        context.stroke()
        context.strokeStyle= 'white'
        context.lineWidth = 5

        if(Math.random() < 0.5){
        // context.strokeStyle= 'white'
        context.beginPath()
        context.arc(x + 40, y + 40, 10, 0 , 360)
        context.stroke()
       } else {
        context.beginPath()
        context.strokeStyle = '#525151'
        context.moveTo(x + 30, y + 30)
        context.lineTo(x + 50,  y + 50)

        context.moveTo(x + 50, y + 30)
        context.lineTo(x + 30,  y + 50)
        context.stroke()
        
       }
      //else if (Math.random() > 0.7){
      //   context.beginPath()
      //   context.lineWidth = 14
      //   context.rect(x + 8, y + 8, boxWidth - 16, boxHeight - 16)
      //   context.stroke()
      // }
      }
      
    }
  };
};

canvasSketch(sketch, settings);
