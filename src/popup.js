const HIDDENCLASSNAME = 'infoPopup--hidden'

export class Popup{
    constructor(container){
        this._init(container)

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

    _init(container){
        const popup = document.createElement('div')
        popup.className = `infoPopup ${HIDDENCLASSNAME}`
        container.insertAdjacentElement('afterBegin', popup)

        this._element = popup
    }

    show(position, data){
        const {top, left} = position
        this._element.style.top = `${ top }px`
        this._element.style.left = `${ left }px`
        this._element.innerHTML = this._content(data)
        this._element.classList.remove(HIDDENCLASSNAME)
    }

    hide(){
        this._element.classList.add(HIDDENCLASSNAME)
    }
}
