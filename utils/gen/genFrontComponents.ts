import HB from 'handlebars';
import * as fs from 'fs';
import path from 'path';
import {k8sObject, HashMap} from './types.js'
import {getTargetVersion,minimizeFirstLetter,capitalizeFirstLetter} from './utils.js'

import {templateComponentLib} from './tmplFrontComponentLib.js'
import {templateComponentNew} from './tmplFrontComponentNew.js'
import {templateComponentEdit} from './tmplFrontComponentEdit.js'
import {templateComponentView} from './tmplFrontComponentView.js'
import {templateComponentTable} from './tmplFrontComponentTable.js'
import {templateComponentAllTable} from './tmplFrontComponentAllTable.js'

export function generateFrontComponents(directory: string, short:string, apiGroup:string, objects: HashMap<HashMap<k8sObject>>, filePrefix:string) {
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory, { recursive: true });
    }
    Object.entries(objects).forEach(([name, versions]) => {
        const targetVersion = getTargetVersion(versions);
        if (versions[targetVersion].crd == undefined) return;
        const namespaced = versions[targetVersion].crd?.spec.scope == 'Namespaced';
        const cfg = {
            name: name,
            apiGroup: apiGroup,
            version: targetVersion,
            spec: versions[targetVersion].spec,
            mini: minimizeFirstLetter(short),
            miniName: minimizeFirstLetter(name),
            short: capitalizeFirstLetter(short),
            plural: versions[targetVersion].crd?.spec.names.plural,
            haveStatus: versions[targetVersion].status != undefined,
            status: versions[targetVersion].status,
            namespaced: namespaced
        };
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}.ts`), templateComponentLib(cfg));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}New.vue`), templateComponentNew(cfg));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}Edit.vue`), templateComponentEdit(cfg));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}View.vue`), templateComponentView(cfg));
        fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}Table.vue`), templateComponentTable(cfg));
        if (namespaced)
            fs.writeFileSync(path.resolve(directory,`${filePrefix}${name}AllTable.vue`), templateComponentAllTable(cfg));
    });

}
