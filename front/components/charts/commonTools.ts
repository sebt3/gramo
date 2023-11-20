export const arcDirection = d => (d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 1 : -1;
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