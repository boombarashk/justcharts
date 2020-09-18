/* container - элемент, в котором будет отрисована область
 * opts - объект, может содержать следующие поля:
 * height - высота canvas
 * width - ширина canvas
 * padding - отступы до осей (области отрисовки)
 *
 * angles
* */
const contextId = '2d'

let areasLength = 0

export class CanvasArea {
//    #areasLength = 0

    constructor(container, opts = {}) {
        this._canvas = this._createCanvas(container, opts)
        this._context =  this._canvas.getContext(contextId);
    }

    _iterator(){
        return areasLength ++
    }

    _createCanvas (container, { width=400, height=400, padding = 40 }){
        const canv = document.createElement('canvas');
        canv.id = `chart_area_${areasLength}`;
        canv.width = width
        this._width = width
        canv.height = height
        this._height = height
        container.insertAdjacentElement('afterBegin', canv)
        canv.style.backgroundColor="white"
        this._iterator()

        this._initAngles(padding)

        return canv
    }

    _initAngles(padding){
        let paddingTopLeftX = padding,
            paddingTopLeftY = padding,
            paddingBottomRightX = padding,
            paddingBottomRightY = padding
        this.angles = {
            topLeft: [paddingTopLeftX, paddingTopLeftY],
            bottomRight: [ this._width - paddingBottomRightX , this._height - paddingBottomRightY]
        }
    }

    get ctx () {
        return this._context
    }

    get sizes () {
        return {
            width: this._width,
            height: this._height
        }
    }

    get chartArea() {
        return {
            width: this.angles.bottomRight[0] - this.angles.topLeft[0],
            height: this.angles.bottomRight[1] - this.angles.topLeft[1]
        }
    }

    clearChartArea() {
        this.ctx.clearRect(
            this.angles.topLeft[0], // x
            this.angles.topLeft[1], // y
            this.chartArea.width,   // width
            this.chartArea.height,  // height
            )
    }
}
