/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define("RoseDiagram", ["d3"], factory);
	else if(typeof exports === 'object')
		exports["RoseDiagram"] = factory(require("d3"));
	else
		root["RoseDiagram"] = factory(root["d3"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_d3__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/RoseDiagram.ts":
/*!****************************!*\
  !*** ./src/RoseDiagram.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RoseDiagram = exports.DefaultRoseDiagramParameters = void 0;\nconst d3 = __webpack_require__(/*! d3 */ \"d3\");\nexports.DefaultRoseDiagramParameters = {\n    width: 400,\n    height: 400,\n    draw: {\n        labels: false,\n        circles: true,\n        binBorder: true,\n        cardinals: true\n    },\n    margin: {\n        top: 0,\n        right: 2,\n        bottom: 0,\n        left: 2\n    },\n    is360: false,\n    innerR: 5,\n    deltaAngle: 10,\n    fillColor: '#ff0000',\n    lineColor: '#000000',\n    gradTickSpacing: 7,\n    colourHover: 'purple'\n};\nclass RoseDiagram {\n    constructor(element, data, params = exports.DefaultRoseDiagramParameters) {\n        this.element_ = undefined;\n        this.data_ = [];\n        this.params = exports.DefaultRoseDiagramParameters;\n        this.element_ = element;\n        this.data_ = data;\n        Object.assign(this.params, params);\n        if (data && data.length > 0) {\n            this.update();\n        }\n    }\n    set width(w) {\n        this.params.width = w;\n        this.update();\n    }\n    set height(w) {\n        this.params.height = w;\n        this.update();\n    }\n    set data(d) {\n        this.data_ = d;\n        this.update();\n    }\n    get data() {\n        return this.data_;\n    }\n    set is360(b) {\n        this.params.is360 = b;\n        this.update();\n    }\n    set binBorder(b) {\n        this.params.draw.binBorder = b;\n        this.update();\n    }\n    set labels(b) {\n        this.params.draw.labels = b;\n        this.update();\n    }\n    set cardinals(b) {\n        this.params.draw.cardinals = b;\n        this.update();\n    }\n    set circles(b) {\n        this.params.draw.circles = b;\n        this.update();\n    }\n    set fillColor(b) {\n        this.params.fillColor = b;\n        this.update();\n    }\n    set lineColor(b) {\n        this.params.lineColor = b;\n        this.update();\n    }\n    set binAngle(b) {\n        this.params.deltaAngle = b;\n        this.update();\n    }\n    set innerRadius(b) {\n        this.params.innerR = b;\n        this.update();\n    }\n    update() {\n        const data = this.data_.map(d => {\n            while (d < 0) {\n                d += 360;\n            }\n            while (d > 360) {\n                d -= 360;\n            }\n            return d;\n        });\n        // Check if the data are in [0,180] or [0,360]\n        let isBetween0and360 = this.params.is360;\n        let min = Number.POSITIVE_INFINITY;\n        let max = Number.NEGATIVE_INFINITY;\n        data.forEach(d => {\n            if (d > max)\n                max = d;\n            if (d < min)\n                min = d;\n        });\n        // Force\n        if (max > 180) {\n            isBetween0and360 = true;\n        }\n        let width = this.params.width;\n        let height = this.params.height;\n        const svg = d3\n            .select(`#${this.element_}`)\n            .html(null) // clear the element\n            .append('svg')\n            .attr('width', width)\n            .attr('height', height);\n        let g = svg.append('g')\n            .attr('transform', `translate(${width / 2}, ${height / 2})`);\n        width = width - 30;\n        height = height - 30;\n        const chartWidth = width - this.params.margin.left - this.params.margin.right;\n        const chartHeight = height - this.params.margin.top - this.params.margin.bottom;\n        const outerR = Math.min(chartWidth, chartHeight) / 2;\n        let angle = d3\n            .scaleLinear()\n            .domain([0, 12])\n            .range([0, 2 * Math.PI]);\n        let radius = d3.scaleLinear().range([this.params.innerR, outerR]);\n        let y = d3.scaleLinear().range([this.params.innerR, outerR]);\n        // Binning...\n        let dataRose = binSerieFromAngle(data, this.params.deltaAngle, isBetween0and360);\n        let children = undefined;\n        if (isBetween0and360 === false) {\n            let dataRoseSym = dataRose.map((d, i) => {\n                return {\n                    startAngle: d.startAngle + Math.PI,\n                    endAngle: d.endAngle + Math.PI,\n                    freq: d.freq,\n                };\n            });\n            children = dataRose.concat(dataRoseSym);\n        }\n        else {\n            children = dataRose;\n        }\n        // Range and domain of the frequence for rose diagram\n        let freq = d3\n            .scaleLinear()\n            .domain([0, d3.max(dataRose, (d) => d.freq)])\n            .range([this.params.innerR, outerR]);\n        radius.domain([0, d3.max(dataRose, (d) => undefined),]);\n        // Plot the arc for each datum 0-360 degrees\n        const gg = g.append('g')\n            .selectAll('path')\n            .data(children)\n            .join('path')\n            .attr('d', d3.arc()\n            .innerRadius((d) => freq(d.freq))\n            .outerRadius(this.params.innerR)\n            .padAngle(0.01)\n            .padRadius(20));\n        if (this.params.draw.binBorder) {\n            gg.attr('stroke', this.params.lineColor);\n        }\n        gg.style('fill', this.params.fillColor).join('path');\n        // Add outer black circle\n        g.append('circle')\n            .attr('cx', 0)\n            .attr('cy', 0)\n            .attr('r', outerR)\n            .attr('stroke', 'black')\n            .style('fill', 'none');\n        // Add inner black circle\n        g.append('circle')\n            .attr('cx', 0)\n            .attr('cy', 0)\n            .attr('r', this.params.innerR)\n            .attr('stroke', 'black')\n            .style('fill', 'none');\n        // ------------------------------------------------------------\n        if (this.params.draw.cardinals) {\n            // scale of 4 cardinal points\n            let labelHead = ['N', 'E', 'S', 'W'];\n            let x = d3\n                .scaleBand()\n                .domain(labelHead)\n                .range([0, 2 * Math.PI])\n                .align(0);\n            // Add label cardinal heading NESW\n            let label = g\n                .append('g')\n                .selectAll('g')\n                .data(labelHead)\n                .enter()\n                .append('g')\n                .attr('text-anchor', 'middle')\n                .attr('transform', (d) => {\n                return ('rotate(' +\n                    ((x(d) * 180) / Math.PI - 90) +\n                    ')translate(' +\n                    (outerR + 10) +\n                    ',0)');\n            })\n                .attr('font-family', 'Aldrich'); //Aldrich\n            // put upright cardinal points\n            label\n                .append('text')\n                .attr('transform', (d) => {\n                return (x(d) * 180) / Math.PI - 90 === 90\n                    ? 'rotate(-90)translate(0,0)'\n                    : 'rotate(' + ((x(d) * 180) / Math.PI - 90) + ')translate(0,5)';\n            })\n                .text((d) => d)\n                .attr(\"font-weight\", 700)\n                .style('font-size', 14);\n        }\n        // ------------------------------------------------------------\n        // Add radius line\n        g.selectAll('.axis')\n            .data(d3.range(angle.domain()[1]))\n            .enter()\n            .append('g')\n            .attr('class', 'axis')\n            .attr('stroke-width', 0.5)\n            .attr('transform', (d) => {\n            return 'rotate(' + (angle(d) * 180) / Math.PI + ')';\n        })\n            .style('opacity', 1)\n            .call(d3.axisLeft(freq).tickSizeOuter(0).scale(radius.copy().range([-this.params.innerR, -outerR])));\n        // Add circular tick with frequency values\n        let yAxis = g.append('g').attr('text-anchor', 'middle');\n        var yTick = yAxis\n            .selectAll('g')\n            .data(freq.ticks(this.params.gradTickSpacing).slice(1))\n            .enter()\n            .append('g');\n        if (this.params.draw.circles) {\n            yTick\n                .append('circle')\n                .attr('fill', 'none')\n                .attr('stroke', 'gray')\n                .style('opacity', 0.2)\n                .attr('r', freq);\n        }\n        if (this.params.draw.labels) {\n            yTick\n                .append('text')\n                .attr('y', (d) => -freq(d))\n                .attr('dy', '-0.25em')\n                .attr('x', function () {\n                return -15;\n            })\n                .text(freq.tickFormat(5, 's'))\n                .style('font-size', 12);\n        }\n    }\n}\nexports.RoseDiagram = RoseDiagram;\n/**\n *\n * @param {*} serie the array of data\n * @param {*} angle of a bin (in degrees)\n * @returns\n */\nfunction binSerieFromAngle(serie, angle, isBetween0and360) {\n    const nbBins = Math.round(180 / angle);\n    const binned = new Array(nbBins);\n    const MAX_RAD = isBetween0and360 ? Math.PI * 2 : Math.PI;\n    const MAX_DEG = isBetween0and360 ? 360 : 180;\n    for (let i = 0; i <= nbBins; ++i) {\n        binned[i] = {\n            startAngle: (i * MAX_RAD) / nbBins,\n            endAngle: ((i + 1) * MAX_RAD) / nbBins,\n            freq: 0\n        };\n    }\n    const step = MAX_DEG / (nbBins - 1);\n    serie.forEach(v => {\n        const id = Math.round(v / step);\n        binned[id].freq++;\n    });\n    return binned;\n}\n\n\n//# sourceURL=webpack://RoseDiagram/./src/RoseDiagram.ts?");

/***/ }),

/***/ "d3":
/*!*********************!*\
  !*** external "d3" ***!
  \*********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_d3__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/RoseDiagram.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});