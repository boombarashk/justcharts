export class Graph {
    constructor(opts){
        this._ctx = opts.ctx
        this._points = opts.points
        this.label = opts.label
        this.color = opts.color
        this._pointRadius = opts.pointRadius || 1
        this._lineWeight = opts.lineWeight //fixme
    }

    mathPointsOneGraph(){
        this.sortPoints = this._points.map( coord => coord).sort( (a,b) => a[0]-b[0])
        this.minX = this.sortPoints[0][0]
        this.maxX = this.sortPoints[this.sortPoints.length - 1][0]

        let sortPoints = this._points.map( coord => coord[1]).sort( (a,b) => a-b)
        this.minY = sortPoints[0]
        this.maxY = sortPoints[sortPoints.length - 1]
    }

    drawLine() {
        const sortPointsOnView = this._sortPointsOnView

        this._ctx.lineWidth = this._lineWeight
        this._ctx.strokeStyle = this.color
        this._ctx.beginPath()
        this._ctx.moveTo(sortPointsOnView[0][0], sortPointsOnView[0][1])
        for (let i = 1; i< sortPointsOnView.length; i++) {
            this._ctx.lineTo(sortPointsOnView[i][0], sortPointsOnView[i][1])
        }
        this._ctx.stroke()
    }

    drawPoints() {
        this._ctx.fillStyle = this.color
        this._ctx.strokeStyle = this.color

        this._sortPointsOnView.forEach( point => {
            const [x, y] = point
            this._ctx.beginPath()
            this._ctx.arc(x , y, this._pointRadius, 0, 2 * Math.PI, false)
            this._ctx.fill()
            this._ctx.stroke()
        })
    }

    getPointsOnScaleView(angles) {
        return this.sortPoints.filter( (nomean, index) => {
            const point = this._sortPointsOnView[index]
            return (
            point[0] >= angles.topLeft[0] &&
            point[0] <= angles.topLeft[0] + angles.bottomRight[0] &&
            point[1] >= angles.topLeft[1] &&
            point[1] <= angles.topLeft[1] + angles.bottomRight[1]
            )
        })
    }

    getPointByIndex(index){
        return this.sortPoints[index]
    }

    get sortPointsOnView() {
        const shift = this._lineWeight + this._pointRadius
        return this._sortPointsOnView.map(point => [
            [point[0] - shift, point[0] + shift],
            [point[1] - shift, point[1] + shift],
        ])
    }

    set sortPointsOnView( {getCoord} ) {
        this._sortPointsOnView = this.sortPoints.map(point => getCoord(point))
    }
}
