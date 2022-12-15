export default class Pipe {
    constructor() {
        this.gap = 200
        this.gapStart = Math.random() * (window.innerHeight - this.gap)

        this.topElement = document.createElement('div')
        this.topElement.classList.add('pipe')
        this.topElement.style.height = this.gapStart + 'px'
        this.topElement.style.left = window.innerWidth + 'px'

        this.bottomElement = document.createElement('div')
        this.bottomElement.classList.add('pipe')
        this.bottomElement.style.height = window.innerHeight - this.gapStart - this.gap + 'px'
        this.bottomElement.style.top = this.gapStart + this.gap + 'px'
        this.bottomElement.style.left = window.innerWidth + 'px'

        this.scored

    }

    move(speed) {
        this.topElement.style.left = this.topElement.offsetLeft - speed + 'px'
        this.bottomElement.style.left = this.bottomElement.offsetLeft - speed + 'px'
    }

    isColliding(bird) {
        const birdRect = bird.element.getBoundingClientRect()
        const topPipeRect = this.topElement.getBoundingClientRect()
        const bottomPipeRect = this.bottomElement.getBoundingClientRect()

        //if bird is within the x range of the pipe
        if (this.isBetween(bird)) {
            //if bird is within the y range of the top pipe
            if (birdRect.top < topPipeRect.bottom || birdRect.bottom > bottomPipeRect.top) {
                return true
            }
        }
        return false
    }

    isBetween(bird) {
        const birdRect = bird.element.getBoundingClientRect()
        const topPipeRect = this.topElement.getBoundingClientRect()

        //if bird is within the x range of the pipe
        return birdRect.left < topPipeRect.right && birdRect.right > topPipeRect.left
    }


}
