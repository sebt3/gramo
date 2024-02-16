import {capitalizeFirstLetter,minimizeFirstLetter, getByPath} from './utils.js'
import {excludedWriteNames} from './config.js'
import HB from 'handlebars';
import * as fs from 'fs';
import path from 'path';

////////////////////////////////////
/// Configure Handlebars
//
HB.registerHelper('defined', v => v!=null&&v!=undefined);
HB.registerHelper('not', v => !v);
HB.registerHelper('eq', (left,right) => left == right);
HB.registerHelper('ne', (left,right) => left != right);
HB.registerHelper('and', (left,right) => left && right);
HB.registerHelper('or', (left,right) => left || right);
HB.registerHelper('json2path', (str) => str.split('.').filter(v=>v!='').join('/'));
HB.registerHelper('length', (v1) => v1.length);
HB.registerHelper('contain', (v1,v2) => (Array.isArray(v1)||typeof v1 === 'string') && v1.includes(v2));
HB.registerHelper('containShort', (v1,v2) => Array.isArray(v1) && v1.map(i=>i['short']).includes(v2));
HB.registerHelper('startWith', (v1,v2) => (typeof v1 === 'string') && v1.startsWith(v2));
HB.registerHelper('isDelete', (grp)=>(grp=='Delete'));
HB.registerHelper('isJsonObject', (grp,lst)=>(lst[grp]=='JSONObject'));
HB.registerHelper('isCustomTyped', (grp,name)=>(grp=='k8s' && name=='Namespace'));
HB.registerHelper('isNamespace', (grp,name)=>(grp=='k8s' && name=='Namespace'));
HB.registerHelper('haveQueries', (objects)=>(objects.filter(o=>!o['namespaced']).length>0));
HB.registerHelper('getByPath', (obj, path)=>new HB.SafeString(getByPath(obj, path)))
HB.registerHelper('capitalizeFirstLetter', (str)=>new HB.SafeString(capitalizeFirstLetter(str)))
HB.registerHelper('lower', (str)=>new HB.SafeString(str.toLowerCase()))
HB.registerHelper('minimizeFirstLetter', (str)=>new HB.SafeString(minimizeFirstLetter(str)))
HB.registerHelper('toJson', v => new HB.SafeString(JSON.stringify(v, null,2)));
HB.registerHelper('toJsonKeys', v => new HB.SafeString(JSON.stringify(Object.keys(v), null,2)));

HB.registerHelper('getGQLType', (name,obj)=>new HB.SafeString(Object.entries(obj).filter(([n])=>name==n).map(([_,v])=>v)[0] as string))
HB.registerHelper('genParameterQuery', (obj)=>new HB.SafeString(
    Object.entries(obj['gqlDefs'])
        .filter(([name,])=>!excludedWriteNames.includes(name)).concat([['metadata', 'metadataMore']])
        .map(([name,value])=> `${name}: ${value}`).join(', ')
));
const unsure = 'gen.';
export const loadCompile = (shouldDelete:boolean, file:string) => {
    const tmpl = HB.compile(fs.readFileSync(file).toLocaleString(), {noEscape: true, preventIndent: true})
    return (dirname:string, filename:string,  cfg) => {
        if (fs.existsSync(path.resolve(dirname, filename)) && fs.readFileSync(path.resolve(dirname, filename)).toLocaleString().includes('noGramoGenerator')) {
            if (shouldDelete) {if (fs.existsSync(path.resolve(dirname, `${unsure}${filename}`)))fs.unlink(path.resolve(dirname, `${unsure}${filename}`), (e)=> e && console.error(e))}
            else fs.writeFileSync(path.resolve(dirname, `${unsure}${filename}`), tmpl(cfg));
        } else {
            if (shouldDelete) {if (fs.existsSync(path.resolve(dirname, filename)))fs.unlink(path.resolve(dirname, filename), (e)=> e && console.error(e))}
            else fs.writeFileSync(path.resolve(dirname, filename), tmpl(cfg));
        }
    }
}
export const loadPartial = (name: string, file:string) => {
    HB.registerPartial(name, fs.readFileSync(file).toLocaleString());
}