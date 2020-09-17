export class Axe{
    constructor({ ...opts }) {
        this._ctx = opts.ctx
        this.name = opts.name || ''
        this.color = opts.color || 'gray'
        this._coords = opts.coords
        this._isVertical = opts.coords[0][0] === opts.coords[1][0]
        this._gap = 6
    }

    drawAxe(){
        this._ctx.beginPath()
        this._ctx.lineWidth = '1'
        this._ctx.strokeStyle = this.color
        this._ctx.moveTo(this._coords[0][0], this._coords[0][1])
        this._ctx.lineTo(this._coords[1][0], this._coords[1][1])
        this._ctx.stroke()

        this._labelAxe()
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
