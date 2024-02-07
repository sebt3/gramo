import {chartSizeOptions,chartMarginOptions} from "../../libs/core"
export function getSizeOptions(defaultWidth:number,defaultHeight:number,options?:chartSizeOptions) {
  return {
    width: options!=undefined&&options.width!==undefined?options.width:defaultWidth,
    height: options!=undefined&&options.height!==undefined?options.height:defaultHeight
  }
}
export function getMarginOptions(defaultMargin:number,defaultMarginLegend:number,options?:chartMarginOptions) {
  return {
    margin: options!=undefined&&options.margin!==undefined?options.margin:defaultMargin,
    marginLegend: options!=undefined&&options.marginLegend!==undefined?options.marginLegend:defaultMarginLegend
  }
}


export const arcDirection = d => (d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 1 : -1;
export function onlyUnique(value, index, array) {return array.indexOf(value) === index;}
export const entryKey = d => d.data.name;
export function lightenColor (col:string, lightenBy:number=10) {
    const usePound = col[0] == "#";
    if (usePound)col = col.slice(1);
    const num = parseInt(col,16);
    let r = (num >> 16) + lightenBy;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + lightenBy;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    let g = (num & 0x0000FF) + lightenBy;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}
export function darkenColor(col:string, darkenBy:number=10) {
    return lightenColor(col, -darkenBy);
}
export default lightenColor

let count = 0;
export function uid(name) {
  return new Id("O-" + (name == null ? "" : name + "-") + ++count);
}

function Id(id) {
  this.id = id;
  this.href = new URL(`#${id}`, location) + "";
}

Id.prototype.toString = function() {
  return "url(" + this.href + ")";
};