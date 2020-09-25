export class Axe{
    constructor({ ...opts }) {
        this._ctx = opts.ctx
        this.name = opts.name || ''
        this.color = opts.color || 'gray'
        this._coords = opts.coords
        this._isVertical = opts.coords[0][0] === opts.coords[1][0]
        this._gap = 6
        this._widthSerif = 4
        this._defaultSerifs = this._isVertical
            ? [ this._coords[0][1],
                Math.round((this._coords[1][1] - this._coords[0][1])/2) + this._coords[0][1],
                this._coords[1][1]]
            : [ this._coords[0][0],
                Math.round((this._coords[1][0] - this._coords[0][0])/2) + this._coords[0][0],
                this._coords[1][0]]
    }

    drawAxe(){
        this._ctx.beginPath()
        this._ctx.lineWidth = '1'
        this._ctx.strokeStyle = this.color
        this._ctx.moveTo(this._coords[0][0], this._coords[0][1])
        this._ctx.lineTo(this._coords[1][0], this._coords[1][1])
        this._ctx.stroke()

        this.drawSerifs()

        this._labelAxe()
    }

    drawSerifs(bindCoords = this._defaultSerifs){
        const X = this._coords[0][0]
        const X0 = X - this._widthSerif;
        const Y0 = this._coords[0][1]
        const Y = Y0 + this._widthSerif;

        this._ctx.strokeStyle = this.color
        this._ctx.beginPath()
        bindCoords
            .map(value => this._isVertical ? [X0, value] : [value, Y0])
            .forEach(point => {
                this._ctx.moveTo(point[0], point[1])
                if (this._isVertical) {
                    this._ctx.lineTo(X, point[1])
                } else {
                    this._ctx.lineTo(point[0], Y)
                }
        })

        this._ctx.stroke()
    }

    _labelAxe() {
        if (this.name.length) {
            let x, y
            if (this._isVertical) {
                x = this._gap
                y = this._coords[0][1] - this._gap - 10 // 10px default font-size
            } else {
                x = this._coords[1][0] + this._gap
                y = this._coords[1][1] + this._gap
            }
            this._ctx.fillText(this.name, x, y)
        }
    }
}
