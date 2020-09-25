import {Appear} from "./appear";
export const RESETBTNNAME =  "reset"

export class ResetScale extends Appear {
    constructor(container, opts = {}) {
        super(container)

        this._init(opts)
    }

    _init({ handlerClick, top, right }){
        this._element.classList.add('resetScale')
        this._element.style.top = `${top}px`
        this._element.style.right = `${right}px`
        this._element.innerHTML = `<div data-name=${RESETBTNNAME} class="button resetScale-button">Сбросить<br/>масштаб</div>`

        this._element.onclick = () => {
            handlerClick();
            this.hide()
        }
    }
}
