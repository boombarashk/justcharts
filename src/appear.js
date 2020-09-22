export const HIDDENCLASSNAME = 'appear--hidden'

export class Appear {
    _element;
    constructor(container){
        this._create(container)
    }

    _create(container) {
        const appearLayer = document.createElement('div')
        appearLayer.className = `appear ${HIDDENCLASSNAME}`
        container.insertAdjacentElement('afterBegin', appearLayer)

        this._element = appearLayer
    }

    show(position) {
        if (position && 'top' in position && 'left' in position) {
            const {top, left} = position
            this._element.style.top = `${top}px`
            this._element.style.left = `${left}px`
        }
        this._element.classList.remove(HIDDENCLASSNAME)
    }

    hide(){
        this._element.classList.add(HIDDENCLASSNAME)
    }
}
