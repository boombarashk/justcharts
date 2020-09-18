import { CanvasArea } from "./canvasarea";
import { Axe } from "./axe"
import { Graph } from "./graph";
import { Popup } from "./popup";

const COLORS = ['#397dcc', 'orangered']

export class Chart{
    constructor(container, opts){
        this.data = opts.data
        this.originGraphs = [] // fixme save scale1 data
        this._ctx = opts.canvas || null

        this._init(container)
        this._drawAxis({ ...opts })

        this._scale = 1
        this._lineWeight = 1
        this._pointR = 4 // radius of circle point
        this._pointD = this._pointR * 2
        this._padding = 40
        this._mathPoints()
        this.drawLegend()
        this.drawGraph()

        this.watchMouseEvent(container)
    }

    _init(container){
        if (!this._ctx) {
            const area = new CanvasArea(container, {padding: this._padding})
            this._ctx = area.ctx
            this._area = area
            this._chartArea = area.chartArea
            this._angles = area.angles
        } // else this._area

        this._popup = new Popup(container)
    }

    watchMouseEvent(container){
        const containerPosition = container.getBoundingClientRect()
        const shiftX = containerPosition.left
        const shiftY = containerPosition.top
        container.onmousemove = (ev) => {
            const angles = this._angles
            if (ev.clientX > (angles.topLeft[0] + shiftX) &&
                ev.clientX < (angles.bottomRight[0] + shiftX) &&
                ev.clientY > (angles.topLeft[1] + shiftY) &&
                ev.clientY < (angles.bottomRight[1] + shiftY))
            {
                const checkResult = this.checkCursorOnPoint({
                    x: ev.clientX - shiftX,
                    y: ev.clientY - shiftY,
                })
                if  (checkResult) {
                    // there may be a loop over indexGraph
                    const graph = this.graphs[ checkResult.indexGraph[0] ].graph
                    const labelsPoint = checkResult.index.map( i => {
                        return graph.getPointByIndex(i)
                    })

                    this._popup.show({top: ev.clientY, left: ev.clientX}, {
                        points:labelsPoint,
                        label: graph.label,
                        color: graph.color,
                    })

                } else {
                    this._popup.hide()
                }
            }
        }

        container.onmouseleave = () => {
            this._popup.hide()
        }
    }

    checkCursorOnPoint( relatedCoords ) {
        const { x, y } = relatedCoords
        let indexes = {
            indexGraph: [],
            index: []
        }

        this.setSortedPointsOnView.forEach( (setPoints, indexGraph) => {
            setPoints.map((chunk, index) => {
                if (x >= chunk[0][0] && x <= chunk[0][1]) {
                    if (y >= chunk[1][0] && y <= chunk[1][1]) {
                        indexes.index.push(index)
                        indexes.indexGraph.push(indexGraph)
                    }
                }
            })
        })
        return indexes.indexGraph.length > 0
            ? indexes
            : null
    }

    _drawAxis({ axis = ['', ''] }) {
        const [nameAxeX ='', nameAxeY =''] = axis
        const axeColor = '#091720'

        const axeX = new Axe({name: nameAxeX, color: axeColor, coords: [
            [this._angles.topLeft[0], this._angles.bottomRight[1]],
            [this._angles.bottomRight[0], this._angles.bottomRight[1]],
            ], ctx: this._ctx
        });
        const axeY = new Axe({name: nameAxeY, color: axeColor, coords: [
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

    drawGraph(){
        this.graphs.forEach(item => {
            item.graph.drawLine()
            item.graph.drawPoints()
        })
    }

// todo argument data on scale
    _mathPoints(){
        let minX, maxX, minY, maxY

        this.graphs = []
        this.data.forEach( (data, index) => {

// todo try catch
            const color = data.color || this._chartColor(index)

            let points = this._checkCoords(data.points[0])
                ? data.points
                : data.points.map( (value, index) => [index, value] )
            const graph = new Graph({
                label: data.label,
                points,
                color,
                ctx: this._ctx,
                pointRadius: this._pointR,
                lineWeight: this._lineWeight
            })
            graph.mathPointsOneGraph()

            if (graph.minX < minX || typeof minX === 'undefined') { minX = graph.minX }
            if (graph.minY < minY || typeof minY === 'undefined') { minY = graph.minY }
            if (graph.maxX > maxX || typeof maxX === 'undefined') { maxX = graph.maxX }
            if (graph.maxY > maxY || typeof maxY === 'undefined') { maxY = graph.maxY }

            this.graphs.push( {graph} )
        })

        this._setAnglesCoords(minX, minY, maxX, maxY)

        const steps = this._getStepOnAxis()

        this.setSortedPointsOnView = this.graphs.map(item => {
            item.graph.sortPointsOnView = {getCoord: this._getCoord.bind(this), steps}
            return item.graph.sortPointsOnView
        })
// fixme math first only
        if (this._scale === 1) {
            this.originGraphs = [...this.graphs]
        }
    }

    _setAnglesCoords(minX, minY, maxX, maxY) {
        this._anglesCoords = {
            minX,
            maxX,
            minY,
            maxY,
        }
    }

    _getCoord([x, y], {stepX, stepY}) {
        const lineW = this._lineWeight
        const { minX, maxY } = this._anglesCoords

        return [
            this._angles.topLeft[0] + Math.floor((minX + x) * stepX) + this._pointR + lineW,
            this._angles.topLeft[1] + Math.floor((maxY - y)* stepY) + this._pointR + lineW
        ]
    }
// check no simple data array
    _checkCoords(firstPoint) {
        return firstPoint instanceof Array
    }

    _getStepOnAxis() {
        const {minX, minY, maxX, maxY} = this._anglesCoords
        return {
            stepX: (this._chartArea.width - this._pointD - this._lineWeight) / ( maxX - minX) ,
            stepY: (this._chartArea.height - this._pointD - this._lineWeight) / (maxY - minY)
        }
    }

    _chartColor(index) {
        return COLORS[index % COLORS.length]

    }

    clearChartArea(){
        this._area.clearChartArea()
    }
}
