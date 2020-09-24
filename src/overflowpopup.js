import { Appear, HIDDENCLASSNAME } from "./appear";
import  throttle from 'lodash.throttle'

export class OverflowPopup extends Appear {
    constructor(container) {
        super(container)
        this._container = container
        this._init()
        this._watchMouseEvent = this._watchMouseEvent.bind(this)
        this._unwatchMouseEvent = this._unwatchMouseEvent.bind(this)
        this._handlerMouseMove = throttle(this._handlerMouseMove.bind(this), 100)
    }

    _init(){
        this._element.classList.add('overflowPopup')
    }

    _watchMouseEvent(){
        this._container.addEventListener('mousemove', this._handlerMouseMove)
    }
    _unwatchMouseEvent(){
        this._container.removeEventListener('mousemove', this._handlerMouseMove)
    }
    _handlerMouseMove(ev) {
        ev.preventDefault()
        const rightBottomAngle = {
            x: ev.clientX - this._shift.shiftX,
            y: ev.clientY - this._shift.shiftY
        }

        if (this._leftTopAngle.x < rightBottomAngle.x) {
            this._element.style.left = `${this._leftTopAngle.x}px`
            this._element.style.width = `${rightBottomAngle.x - this._leftTopAngle.x }px`
        } else {
            this._element.style.left = `${rightBottomAngle.x}px`
            this._element.style.width = `${this._leftTopAngle.x - rightBottomAngle.x}px`
        }
        if (this._leftTopAngle.y < rightBottomAngle.y) {
            this._element.style.top = `${this._leftTopAngle.y}px`
            this._element.style.height = `${rightBottomAngle.y - this._leftTopAngle.y }px`
        } else {
            this._element.style.top = `${rightBottomAngle.y}px`
            this._element.style.height = `${this._leftTopAngle.y - rightBottomAngle.y}px`
        }
    }

    show(position, {shiftX, shiftY}, sizesCanvas){
        this._leftTopAngle = {
            x: position.left - shiftX,
            y: position.top - shiftY
        }
        this._shift = {shiftX, shiftY}

        this._watchMouseEvent()
        this._element.classList.remove(HIDDENCLASSNAME)
    }

    hide(funcRescale){
        if (typeof funcRescale === 'function') {
            const parseIntLeft = parseInt(this._element.style.left)
            const parseIntTop = parseInt(this._element.style.top)
            funcRescale({
                topLeft: [parseIntLeft, parseIntTop],
                bottomRight: [parseInt(this._element.style.width), parseInt(this._element.style.height) ]
            })
        }
        this._element.style.width = '0px'
        this._element.style.height = '0px'
        this._unwatchMouseEvent()
        super.hide()
    }
}
