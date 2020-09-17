import { CanvasArea } from "./canvasarea";
import { Axe } from "./axe"

const KEYFORMAP = 'scale'

export class Chart{
    constructor(container, opts){
        this.originPoints = opts.points
        this._ctx = opts.canvas || null
        this._colors = {
            chart: '#397dcc',
//            axe: '#091720'
        }
        this._init(container)
        this._drawAxies({ ...opts })

        this._scale = 1
        this._pointR = 2 // radius of circle point
        this._pointD = this._pointR * 2

        this._mathPoints()
        this.drawLegend()
        this.drawLine()
        this.drawPoints()
    }

    _init(container){
        if (!this._ctx) {
            const area = new CanvasArea(container)
            this._ctx = area.ctx
            this._area = area
            this._chartArea = area.chartArea
            this._angles = area.angles
        } // else this._area
    }

    _drawAxies({ axis = ['', ''] }) {
        const [nameAxeX ='', nameAxeY =''] = axis

        const axeX = new Axe({name: nameAxeX, color: this._colors.axe, coords: [
            [this._angles.topLeft[0], this._angles.bottomRight[1]],
            [this._angles.bottomRight[0], this._angles.bottomRight[1]],
            ], ctx: this._ctx
        })
        const axeY = new Axe({name: nameAxeY, color: this._colors.axe, coords: [
            [this._angles.topLeft[0], this._angles.topLeft[1]],
            [this._angles.topLeft[0], this._angles.bottomRight[0]],
            ], ctx: this._ctx
        })
        axeX.drawAxe()
        axeY.drawAxe()
    }

    drawLegend(){
        // 1.а наименование параметра
    }

    _mathPoints(){
        this.points = new Map()

        let data = this.originPoints[0]
// todo try catch
        if (! this._checkSeries(data[0])) {
            data = data.map( (value, index) => [index, value] )
        }

// todo more than 1 graph
        let sortPoints = data.map( coord => coord).sort( (a,b) => a[0]-b[0])
        const buffer = {
            minX: sortPoints[0][0],
            maxX: sortPoints[sortPoints.length - 1][0],
            sortPoints
        }

        sortPoints = data.map( coord => coord[1]).sort( (a,b) => a-b)
        buffer.minY = sortPoints[0]
        buffer.maxY = sortPoints[sortPoints.length - 1]
// 1 - stroke weight
        buffer.stepX = Math.floor((this._chartArea.width - this._pointD - 1) / (buffer.maxX - buffer.minX))
        buffer.stepY = Math.floor((this._chartArea.height - this._pointD - 1) / (buffer.maxY - buffer.minY))

        buffer.data = data.map( point => this._getCoord(point, buffer.stepX, buffer.stepY) )

        buffer.sortPoints = buffer.sortPoints.map( point => this._getCoord(point, buffer.stepX, buffer.stepY) )

        this.points.set( `${KEYFORMAP}${this._scale}`, buffer)
    }

    _getCoord([x, y], stepX, stepY) {
        return [
            Math.floor(x * stepX) + this._pointR + this._angles.topLeft[0] + 1,     // 1 - stroke weight
            this._angles.bottomRight[1] - (Math.floor(y* stepY) - this._pointR - 1)]
    }

    _checkSeries(firstPoint) {
        return firstPoint instanceof Array
    }

    drawLine() {
        const {sortPoints} = this.points.get(`${KEYFORMAP}${this._scale}`)

        this._ctx.strokeStyle = this._colors.chart
        this._ctx.beginPath()
        this._ctx.moveTo(sortPoints[0][0], sortPoints[0][1])
        for (let i = 1; i< sortPoints.length; i++) {
            this._ctx.lineTo(sortPoints[i][0], sortPoints[i][1])
        }
        this._ctx.stroke()
    }

    drawPoints() {
        const {data} = this.points.get(`${KEYFORMAP}${this._scale}`)
        this._ctx.fillStyle = this._colors.chart

        data.forEach( point => {
            const [x, y] = point
            this._ctx.beginPath()
            this._ctx.arc(x , y, this._pointR, 0, 2 * Math.PI, false)
            this._ctx.fill()
            this._ctx.stroke()
        })

    }

    clearChartArea(){
        this._area.clearChartArea()
    }
}
