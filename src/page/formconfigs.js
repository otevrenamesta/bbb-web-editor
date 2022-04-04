const _confs = {
  MDText: [
    {
      "name": "content",
      "component": "dyn-textarea",
      "label": "Obsah. V markdownu",
      "rules": 'required'
    }
  ]
}

export default function manager (url) {
  
  function _getComponent(componentName) {
    const u = `${url}/configs/${componentName}.yaml`
    _confs[componentName] = axios.get(u)
      .then(res => {
        _confs[componentName] = jsyaml.load(res.data)
        return _confs[componentName]
      })
      .catch(_ => _confs[componentName] = null)
    return _confs[componentName]
  }

  return async function getFormconfig(componentName) {
    return (componentName in _confs) 
      ? _confs[componentName]
      : _getComponent(componentName)
  }  
}

export const composition = [
  {
    "name": "class",
    "component": "dyn-input",
    "label": "Classes"
  }
]