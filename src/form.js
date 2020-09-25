import {Chart} from "./chart";

const ERRORNODATA = '<p>Невозможно отобразить данные</p>'

export class DataForm {
    constructor(form, container){
        this._form = form
        this._container = container
        this._create()
    }

    _create() {
        this._form.innerHTML = `
        <div class="option-field">
            <label>Размер холста:</label>
            <input type="number" name="width" value="600" class="option-field-input" max="1000" min="200"/>
            <input type="number" name="height" value="400" class="option-field-input" max="1000" min="200"/>
        </div>
        <div class="option-field">
            <label>Наименования осей:</label>
            <input type="text" name="nameAxeX" placeholder="Горизонталь" class="option-field-input"/>
            <input type="text" name="nameAxeY" placeholder="Вертикаль" class="option-field-input"/>
        </div>`

        this._btnDraw = this._createButton({
            value: 'Нарисовать',
            handlerClick: () => {
                const data = this._prepareData( this._form );
                if (!data[0] || data[0].points.length === 1) {
                    this._container.innerHTML = ERRORNODATA
                } else
                try {
                    this._chart = new Chart(this._container, {
                        width: +this._form.width.value,
                        height: +this._form.height.value,
                        axis: [this._form.nameAxeX.value, this._form.nameAxeY.value],
                        data
                    })
                } catch (e) {
                    if (this._chart) { this._chart.destroy() }
                    this._container.innerHTML = ERRORNODATA
                    console.log(e)
                }
            },
            className: 'button--indented'
        })
        this._btnAdd = this._createButton({
            value: 'Добавить данные',
            handlerClick: () => {
                this.createFieldSet(true)
            }
        })

        this.createFieldSet()
    }
    _createButton({handlerClick, value, insertPosition = 'beforeEnd', className = ''}) {
        const divBtn = document.createElement("div")
        divBtn.className = 'button ' + className
        divBtn.innerHTML = value
        divBtn.onclick = handlerClick
        if (insertPosition) { this._form.insertAdjacentElement(insertPosition, divBtn) }
        return divBtn
    }

    createFieldSet(withBtnRemove = false){
        const id = this._makeId()
        const html = `
        <div class="option-field">
            <label for="label-${id}">Наименование параметра:</label>
            <input id="label-${id}" name="label" type="text" class="option-field-input">
        </div>
        <div class="option-field">
            <label for="points-${id}">Массив точек:</label>
            <input id="points-${id}" name="points" type="text" placeholder="(x1,y1), (x2,y2) или [x1,y1], [x2,y2]" class="option-field-input">
        </div>
        `

        this._btnDraw.insertAdjacentHTML('beforeBegin', html)

        if (withBtnRemove) {
            const divBox = document.getElementById(`label-${id}`).parentNode
            const btnRemove = this._createButton({
                value: '&times;',
                insertPosition: null,
                className: 'button-remove',
                handlerClick: () => {
                    divBox.nextElementSibling.remove()
                    divBox.remove()
                }
            })
            divBox.insertAdjacentElement('afterBegin', btnRemove)
        }
    }

    _makeId(length = 3, onlyNumber = true) {
        let result           = '';
        let characters       = `0123456789${onlyNumber ? '': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'}`;
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return onlyNumber ? +result : result;
    }

    _prepareData(form){
        const DEFAULTSIZE = 400
        const fixMinMax = (field) => {
            if (+field.value > +field.max || +field.value < +field.min) {
                field.value = DEFAULTSIZE
            }
            return field.value
        }
        fixMinMax(form.width)
        fixMinMax(form.height)

        return Array.from(form.querySelectorAll('[name^=points]')).map((pointsField, index) => {
            const id = pointsField.id.substr(7)
            let label = document.getElementById(`label-${id}`).value
            if (label.trim().length === 0) {
                label = `Param ${index + 1}`
            }
            const key = { '(': '[', ')': ']'}
            const pointsValue = pointsField.value
                .replace(/[\(\)\s]/g, (char) => key[char] || '')
                .match(/(\-?\d+(\.\d+)?,\-?\d+(\.\d+)?)(?=\])/g)

            if (pointsValue) {
                const points = pointsValue.map(paar => {
                        let coord = paar.split(',')
                        return [+coord[0], +coord[1]]
                    }
                )
                return {label, points}
            }
            return null
        })
    }
}
