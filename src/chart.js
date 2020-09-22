import { CanvasArea } from "./canvasarea";
import { Axe } from "./axe"
import { Graph } from "./graph";
import { Popup } from "./popup";
import { OverflowPopup } from "./overflowpopup";

const COLORS = ['#397dcc', 'orangered']

export class Chart{
    constructor(container, opts){
        this.data = opts.data
        this.originGraphs = []
        this._ctx = opts.canvas || null

        this._init(container)
        this._drawAxis({ ...opts })

        this._scale = false
        this._lineWeight = 1
        this._pointR = 4 // radius of circle point
        this._pointD = this._pointR * 2
        this._padding = 40
        this.render()


        this.watchMouseEvent(container.firstElementChild)
        this.reScale = this.reScale.bind(this)
    }

    _init(container){
        const innerContainer = document.createElement('div')
        container.insertAdjacentElement('afterBegin', innerContainer)

        const area = new CanvasArea(innerContainer, {padding: this._padding})
        this._ctx = area.ctx
        this._area = area
        this._chartArea = area.chartArea
        this._angles = area.angles

        const sizes = area.sizes
        innerContainer.style.width = `${ sizes.width }px`
        innerContainer.style.height = `${ sizes.height }px`

        this._popup = new Popup(innerContainer)
        this._overflow = new OverflowPopup(innerContainer)
    }

    watchMouseEvent(container){
        const containerPosition = container.getBoundingClientRect() //may be this._containerPosition if resize window
        const shiftX = containerPosition.left
        const shiftY = containerPosition.top

        container.addEventListener('mousemove', (ev) => {
            if (this.checkEventOnView(ev, {shiftX, shiftY})) {
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
                    const gap = 10
                    this._popup.show({top: ev.clientY - shiftY + gap, left: ev.clientX - shiftX + gap}, {
                        points:labelsPoint,
                        label: graph.label,
                        color: graph.color,
                    })

                } else {
                    this._popup.hide()
                }
            }
        })

        container.onmouseleave = () => {
            this._popup.hide()
        }

        container.onmousedown = (ev) => {
            if (this.checkEventOnView(ev, {shiftX, shiftY})) {
                this._overflow.show({top: ev.clientY, left: ev.clientX},
                    {shiftX, shiftY},
                    this._area.sizes )
            }
        }
        container.onmouseup = () => {
            this._overflow.hide(this.reScale)
        }
    }

    checkEventOnView({clientX, clientY}, {shiftX, shiftY}){
        const angles = this._angles
        return (
            clientX > (angles.topLeft[0] + shiftX) &&
            clientX < (angles.bottomRight[0] + shiftX) &&
            clientY > (angles.topLeft[1] + shiftY) &&
            clientY < (angles.bottomRight[1] + shiftY)
        )
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

    render() {
        this._area.clearChartArea()

        this._mathPoints()
        this.drawLegend()
        this.drawGraph()
    }
    // NB записать в this.data оригинальные значения при reset scale
    reScale(angles){
        this._scale = true

        new Promise( (resolve) => {
            resolve(this._prepareData( this._getBoundariesForPoints(angles)))
        }).then( (data) => {
            this.data = data
            this.render()
        })
    }
    /**координаты отсечения по осям, revert getCoords:
     * */
    _getBoundariesForPoints(angles){
        const shiftX = this._angles.topLeft[0] + this._pointR + this._lineWeight
        const shiftY = this._angles.topLeft[1] + this._pointR + this._lineWeight
        return {
            minX: ((angles.topLeft[0] > this._angles.topLeft[0] ? angles.topLeft[0] :  this._angles.topLeft[0]) - shiftX) / this._steps.stepX,
            minY: ((angles.topLeft[1] > this._angles.topLeft[1] ? angles.topLeft[1] :  this._angles.topLeft[1]) - shiftY) / this._steps.stepY,
            maxX: ((angles.bottomRight[0] < this._angles.bottomRight[0] ? angles.bottomRight[0] : this._angles.bottomRight[0]) - shiftX) / this._steps.stepX,
            maxY: ((angles.bottomRight[1] < this._angles.bottomRight[1] ? angles.bottomRight[1] : this._angles.bottomRight[1]) - shiftY) / this._steps.stepY
        }
    }

    _prepareData(boundaries){
        return this.graphs.map( graph => {
            const { minX, maxY } = this._anglesCoords
            const {sortPoints, label, color} = graph.graph
            return { label, color, points: sortPoints.filter(point => {
                return (
                    point[0] > boundaries.minX + minX &&
                    point[0] < boundaries.maxX + minX &&
                    point[1] < maxY - boundaries.minY &&
                    point[1] > maxY - boundaries.maxY
                )
            })
            }
        }).filter(item => item.points.length)
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
            if (this._scale) {
                // todo отрезки не сплошная..
            } else {
                item.graph.drawLine()
            }
            item.graph.drawPoints()
        })
    }

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

        this._getStepOnAxis()

        this.setSortedPointsOnView = this.graphs.map(item => {
            item.graph.sortPointsOnView = {getCoord: this._getCoord.bind(this)/*, steps: this._steps*/}
            return item.graph.sortPointsOnView
        })

        if (this._scale === false) {
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

    _getCoord([x, y]) {
        const {stepX, stepY} = this._steps
        const lineW = this._lineWeight
        const { minX, maxY } = this._anglesCoords
        return [
            this._angles.topLeft[0] + Math.floor((x - minX) * stepX) + this._pointR + lineW,
            this._angles.topLeft[1] + Math.floor((maxY - y)* stepY) + this._pointR + lineW
        ]
    }
// check no simple data array
    _checkCoords(firstPoint) {
        return firstPoint instanceof Array
    }

    _getStepOnAxis() {
        const {minX, minY, maxX, maxY} = this._anglesCoords
        this._steps = {
            stepX: (this._chartArea.width - this._pointD - this._lineWeight) / ( maxX - minX) ,
            stepY: (this._chartArea.height - this._pointD - this._lineWeight) / (maxY - minY)
        }
    }

    _chartColor(index) {
        return COLORS[index % COLORS.length]
    }
}
