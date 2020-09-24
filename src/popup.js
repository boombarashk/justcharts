import { Appear } from "./appear";

export class Popup extends Appear{
    constructor(container){
        super(container)

        this._init()
        this._content = (data) => {
            if (data.length === 0) return ''

            return data.map(item => {
                const styleColor = item.color ? ` style="color: ${item.color}"` : ''
                const coord = item.points.join(', ')
                return `
                    <div class="infoPopup-label" ${styleColor}>${item.label}</div>
                    <div class="infoPopup-text">${coord}</div>
            `}).join('')
        }
    }

    _init(){
        this._element.classList.add('infoPopup')
    }

    show(position, data){
        this._element.innerHTML = this._content(data)

        super.show(position)
    }
}
