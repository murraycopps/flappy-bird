export default class Bird{
    constructor(){
        this.element = document.createElement('div')
        this.element.classList.add('bird')
        this.element.style.top = '50%'
        this.speed = 0
    }
    move(){
        this.speed += 0.5
        this.element.style.top = this.element.offsetTop + this.speed + 'px'
    }
    jump(){
        this.speed = -10
    }
}