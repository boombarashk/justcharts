import {Appear} from "./appear";

export class Legend extends Appear{
    constructor(container, opts){
        super(container)
        this._init(opts)
    }

    _init({position}) {
        this._element.classList.add('legend')
        this.show(position)
    }

    content(data){
        this._element.innerHTML = data.map(item => {
            const styleLine = item.color ? ` style="border-color:${item.color}"` : ''
            return `
            <div class="legend-item">
                <div class="legend-item-line" ${styleLine}></div>
                <div class="legend-item-label">${item.label}</div>
            </div>`
        }).join('')
    }
}
