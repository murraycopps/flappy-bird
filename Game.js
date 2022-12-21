import Bird from './Bird.js'
import Pipe from './Pipe.js'

const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);



export default class Game {
    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add('game')
        this.Bird = new Bird()
        this.element.appendChild(this.Bird.element)
        this.Pipes = []
        this.speed = 6
        this.score = 0
        this.timeUntilNextPipe = 0

        this.scoreDisplay = document.createElement('div')
        this.scoreDisplay.classList.add('score')
        this.scoreDisplay.innerText = 'Score: 0'
        this.element.appendChild(this.scoreDisplay)

        this.speedDisplay = document.createElement('div')
        this.speedDisplay.classList.add('speed')
        this.speedDisplay.innerText = 'Speed: 0'
        this.element.appendChild(this.speedDisplay)

        document.body.appendChild(this.element)

        this.start()



        document.addEventListener('keydown', (e) => {
            // if (e.key === ' ') {
                this.Bird.jump()
            // }
        })
    }

    start() {
        const interval = setInterval(() => {
            this.timeUntilNextPipe--

            this.Pipes.forEach(pipe => {
                pipe.move(this.speed)
            })

            this.Bird.move(this.speed)

            if (this.timeUntilNextPipe <= 0) {

                const gap = 300 + Math.random() * 100
                this.timeUntilNextPipe = (1.5 * gap / this.speed) + 20

                this.Pipes.push(new Pipe())
                this.element.appendChild(this.Pipes[this.Pipes.length - 1].topElement)
                this.element.appendChild(this.Pipes[this.Pipes.length - 1].bottomElement)
            }

            this.Pipes.filter(pipe => pipe.topElement.offsetLeft < -100).forEach(pipe => {
                this.element.removeChild(pipe.topElement)
                this.element.removeChild(pipe.bottomElement)
            })

            if (this.Pipes.some(pipe => pipe.isColliding(this.Bird))) {
                clearInterval(interval)
                this.gameOver()
            }

            this.Pipes.filter(pipe => pipe.isBetween(this.Bird) && !pipe.scored).forEach(pipe => {
                pipe.scored = true
                this.score++
                this.scoreDisplay.innerText = 'Score: ' + this.score
            })

            //if the bird is more then 400vh out of bounds
          if (this.Bird.element.offsetTop > viewportHeight * 4 || this.Bird.element.offsetTop < -viewportHeight * 4) {
  clearInterval(interval);
  this.gameOver();
}


            this.speedDisplay.innerText = 'Speed: ' + this.speed.toFixed(2)

            this.speed += 0.01
        }
            , 1000 / 60)
    }
    gameOver() {
        this.restartButton = document.createElement('button')
        this.restartButton.classList.add('restart')
        this.restartButton.innerText = 'Restart'

        this.element.appendChild(this.restartButton)

        this.restartButton.addEventListener('click', () => {
            console.log(this)
            this.element.removeChild(this.restartButton)
            this.score = 0
            this.speed = 6
            this.timeUntilNextPipe = 0
            this.Pipes.forEach(pipe => {
                if (!this.element.contains(pipe.topElement)) return
                this.element.removeChild(pipe.topElement)
                this.element.removeChild(pipe.bottomElement)
            })
            this.Pipes = []
            this.Bird.element.style.top = '50%'
            this.Bird.speed = 0
            this.scoreDisplay.innerText = 'Score: 0'
            this.speedDisplay.innerText = 'Speed: 0'
            this.start()
            this.restartButton = null
        }, { once: true })

    }

}