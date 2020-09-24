import { CanvasArea } from "./canvasarea";
import { Axe } from "./axe"
import { Graph } from "./graph";
import { Popup } from "./popup";
import { OverflowPopup } from "./overflowpopup";
import { ResetScale, RESETBTNNAME } from "./resetscale";
import {Legend} from "./legend";

const COLORS = ['#397dcc', 'orangered', '#ac54cc', '#00cc3b', 'black', 'yellow' , '#A30E00', '#67cc95']

export class Chart{
    constructor(container, opts){
        this.data = opts.data
        this._ctx = opts.canvas || null
        this._scale = false
        this._lineWeight = 1
        this._pointR = 3 // radius of circle point
        this._pointD = this._pointR * 2
        this._padding = 40

        this._init(container)
        this._drawAxis(opts)

        this.render()

        this.watchEvents(container.firstElementChild)

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

        this._legend = new Legend(innerContainer, {
            position: {
                left: area.angles.topLeft[0],
                top: area.angles.bottomRight[1]
            }
        })
        this._popup = new Popup(innerContainer)
        this._overflow = new OverflowPopup(innerContainer)
        this._resetScale = new ResetScale(innerContainer, {
            top: this._padding + 10,
            right: this._padding + 10,
            handlerClick: () => {
                this._scale = false
                this._area.clearChartArea()
                this.render()
            }
        })
    }

    _getContainerPosition(container) {
        const containerPosition = container.getBoundingClientRect()
        return {
            shiftX: containerPosition.left,
            shiftY: containerPosition.top,
        }
    }

    watchEvents(container){
        let {shiftX, shiftY} = this._getContainerPosition(container)

        window.addEventListener('resize', () => {
            const position = this._getContainerPosition(container)
            shiftX = position.shiftX
            shiftY = position.shiftY
        })

        container.addEventListener('mousemove', (ev) => {
            if (this._scale === false && this.checkEventOnView(ev, {shiftX, shiftY})) {
                const checkResult = this.checkCursorOnPoint({
                    x: ev.clientX - shiftX,
                    y: ev.clientY - shiftY,
                })
                if  (checkResult) {
                    const labelsData = checkResult.index.map( (value, i) => {
                        const graph = this.graphs[ checkResult.indexGraph[i] ].graph
                        return {
                            label: graph.label,
                            color: graph.color,
                            points: graph.getPointByIndex(value)
                        }
                    })
                    const gap = 10
                    this._popup.show(
                        {top: ev.clientY - shiftY + gap, left: ev.clientX - shiftX + gap},
                        labelsData
                    )
                } else {
                    this._popup.hide()
                }
            }
        })

        container.onmouseleave = () => {
            this._popup.hide()
        }

        const checkTargetNoResetBtn = target => target.dataset.name !== RESETBTNNAME

        container.onmousedown = (ev) => {
            ev.preventDefault()
            const starttimestamp= Date.now()
            //const timeout = 500
            //setTimeout(() => {
                if (checkTargetNoResetBtn(ev.target)) {
                    if (this.checkEventOnView(ev, {shiftX, shiftY})) {
                        this._overflow.show({top: ev.clientY, left: ev.clientX},
                            {shiftX, shiftY},
                            this._area.sizes)
                    }
                }
            //}, timeout)
        }
        container.onmouseup = (ev) => {
            if (checkTargetNoResetBtn(ev.target)) {
                this._timestamp = Date.now()
                this._overflow.hide(this.reScale)
            }
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
        this._mathPoints()
        this.drawLegend()
        this.drawGraph()
    }

    reScale(angles){
        this._scale = true
        this._resetScale.show()

        let cropX0 = angles.topLeft[0]
        if (cropX0 <= this._angles.topLeft[0]) {
            cropX0 += this._angles.topLeft[0] + 1 // line width
        }
        const cropY0 = angles.topLeft[1]
        let cropWidth = angles.bottomRight[0]
        if (cropWidth + cropX0 > this._angles.bottomRight[0]) {
            cropWidth -= cropWidth + cropX0 - this._angles.bottomRight[0]
        }
        let cropHeight = angles.bottomRight[1]
        if (cropHeight + cropY0 >= this._angles.bottomRight[1]) {
            cropHeight -= cropHeight + cropY0 - this._angles.bottomRight[1] + 1 // line width
        }

        this._legend.content(this._getPointsOnScaleView(angles))

        // buffer - temp canvas for copy
        const {width, height} = this._chartArea
        const buffer = new CanvasArea(document.getElementById('root'), {
            width,
            height,
            padding: 0,
            position: 'beforeEnd'
        })
        buffer.ctx.drawImage(this._area.canvas ,
            cropX0,
            cropY0,
            cropWidth,
            cropHeight,
            0, 0, width, height
        )
        this._area.clearChartArea()
        this._ctx.drawImage(buffer.canvas, this._angles.topLeft[0],this._angles.topLeft[1], width, height)
        buffer.destroy()
    }

    _getPointsOnScaleView(angles) {
        const data = this.graphs.map( item => {
            const {label, color} = item.graph
            return {
                label, color, points: item.graph.getPointsOnScaleView(angles)
            }
        }).filter( graph => graph.points.length > 0 )
        return data
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
        this._axis = {axeX, axeY}
    }

    drawLegend(data = this.graphs){
        this._legend.content(
            data.map(item => {
                const {label, color} = item.graph
                return {label, color}
            })
        )
    }

    drawGraph(){
        this.graphs.forEach(item => {
            item.graph.drawLine()
            item.graph.drawPoints()
        })
    }

    _mathPoints(data = this.data, boundaries){
        let minX, maxX, minY, maxY

        this.graphs = []
        data.forEach( (data, index) => {

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

        this._anglesCoords = { minX, maxX, minY, maxY }

        this._getStepOnAxis()

        this.setSortedPointsOnView = this.graphs.map(item => {
            item.graph.sortPointsOnView = {getCoord: this._getCoord.bind(this)}
            return item.graph.sortPointsOnView
        })

        //this.originGraphs = [...this.graphs]
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
