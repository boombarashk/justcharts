import { Appear } from "./appear";

export class Popup extends Appear{
    constructor(container){
        super(container)

        this._init()
        this._content = (data) => {
            if (!data.points) return ''

            const coord = data.points.map( coord => coord.join(', ')).join('<br/>')
            const styleColor = data.color ? ` style="color: ${data.color}"` : ''
            return `
                <div class="infoPopup-label" ${styleColor}>${data.label}</div>
                <div class="infoPopup-text">${coord}</div>
            `
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
