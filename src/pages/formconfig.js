export function newPageConfig (pageOptions) {
  return [
    {
      name: 'path',
      component: 'dyn-input',
      label: "cesta (URL), např. po vyplnění 'strana1' pak bude URL www.muj.web/strana1",
      rules: 'required'
    },
    {
      name: "parent",
      component: "dyn-select",
      options: pageOptions,
      label: 'rodič'
    }
  ]
}