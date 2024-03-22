const { i18n } = await import("../i18n")
import flexver from 'flexver/dist/module.js';
const { ref, gqlDataToYaml, useCore, useNavigationStoreRef } = await import('../core')
const { stringify, parse } = await import('yaml')
export { gqlDataToYaml, ref, useCore, useQuery, useMutation, sanitizeData, getProperties, defineAsyncComponent, onMounted, useNavigationStoreRef, elude, getColor, timeAgo } from '../core';
export { i18n } from "../../libs/i18n"
export { CrdObjectListExcludes as coreCrdObjectListExcludes } from './custom.js'
export function getTargetVersion(versions: Array<{name:string}>) {
  if (versions.length==1) return versions[0].name
  const targetVersion = versions.map(v=>v.name).sort(flexver)[0];
  const maxVersion = versions.map(v=>v.name).sort((a,b)=>a<b?1:-1)[0];
  return (targetVersion.length<maxVersion.length)?targetVersion:maxVersion
}
export function usecrdObject(router) {
  const { $q, onErrorHandler, notify, notifySuccess, notifyError, notifyWorking } = useCore();
  const viewer = ref({
      tab: 'meta',
      full: '',
      props: {
        "spec": '',
      }
  });
  const onlyReadProperties = (obj) => Object.keys(obj).filter(k=>['metadata',"spec","status"].includes(k)).reduce((res,k)=>{res[k] = obj[k]; return res},{});
  const onlyWriteProperties = (obj) => Object.keys(obj).filter(k=>["spec"].includes(k)).reduce((res,k)=>{res[k] = obj[k];return res},{});
  const editor = ref({
      tab: 'simple',
      yaml: '',
      obj: ref({}),
      setKey: (key:string, o:object) => {
        if (key!=null) {
          editor.value.obj[key] = o;editor.value.yaml = stringify(editor.value.obj)
        } else {
          Object.keys(o).forEach(key=>{editor.value.obj[key] = o[key]})
          editor.value.yaml = stringify(editor.value.obj)
        }
      },
      ready: false,
      setYaml: (y) => {editor.value.yaml = y;const tmp = parse(y);Object.keys(tmp).forEach(k=>editor.value.obj[k]=tmp[k]);},
      updateFromQuery: (obj: object) => {
        editor.value.ready=false;
        editor.value.obj = onlyWriteProperties(obj);
        editor.value.yaml = stringify(editor.value.obj);
        editor.value.ready=true;
      },
  });
  return {
    $q,
    onlyReadProperties, onlyWriteProperties, editor, viewer, viewerUpdate: (obj) => {
      viewer.value.full=gqlDataToYaml(obj)
      viewer.value.props["spec"]=gqlDataToYaml({"spec": obj["spec"]})
    },
    readProperties: ["spec","status"],
    writeProperties: ["spec"],
    navigation: useNavigationStoreRef(),
    notify, notifySuccess, notifyError, notifyWorking, onErrorHandler,
    toView: (name) => router.push({ name: 'vynilcrdObjectView', params: {name}}),
    toViewReloaded: async (name) => {await router.push({ name: 'vynilcrdObjectView', params: {name}});router.go(0);},
    toEdit: (name) => router.push({ name: 'vynilcrdObjectEdit', params: {name}}),
    toParentView: (group,short,name,namespace) => router.push({ name: `${group}${short}View`, params: {name,namespace}}),
    deleteDone: () => notifySuccess(i18n.global.t('delete.notifyDone')),
    deleteError: (err) => {
      notifyError(i18n.global.t('delete.notifyError'));
      console.log('deletion error',err);
    },
    patchDone: () => {
      notifySuccess(i18n.global.t('edit.notifyDone'));
      router.go(-1);
    },
    patchError: (err) => {
      notifyError(i18n.global.t('edit.notifyError'));
      console.log('mutation error', err)
    },
    actionNew: ()    => router.push({ name: 'vynilcrdObjectCreate'}),
    actionDelete: (deletor:(o:object)=>any, meta:{name:string,namespace?:string}, parent:object) => {
      $q.dialog({
        title: i18n.global.t('delete.title'),
        message: i18n.global.t('delete.message',{short: parent.spec.names.kind, name: meta.name}),
        persistent: true, cancel: true, html: true, ok: {color: 'negative'}
      }).onOk(() => {
        const vers = getTargetVersion(parent.spec.versions)
        notifyWorking(i18n.global.t('delete.notifyWorking'));
        deletor(parent.spec.scope=="Namespaced"?{
          "name": meta.name,
          "namespace": meta.namespace,
          "group": parent.spec.group,
          "version": vers,
          "plural": parent.spec.names.plural,
        }:{
          "name": meta.name,
          "group": parent.spec.group,
          "version": vers,
          "plural": parent.spec.names.plural,
        });
      })
    },
  }
}