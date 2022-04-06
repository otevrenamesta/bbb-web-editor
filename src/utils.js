
export function createItem (path, name, type) {
  return {
    loading: false,
    loaded: false,
    path, name, type,
    children: []
  }
}

export async function loadfolder (self, path, folderInfo) {
  folderInfo.loading = true
  const u = self.cfg.webdata_url + '/' + self.website + '/pages' + path
  const contentReq = await axios.get(u)
  contentReq.data.sort((a,b) => a.name.localeCompare(b.name)).map(i => {
    if (i.type == 'directory') {
      const item = createItem(path, i.name, i.type)
      folderInfo.children.push(item)
    } else {
      const item = createItem(path, i.name, i.type)
      folderInfo.children.push(item)
    }
  })
  folderInfo.loaded = true
  folderInfo.loading = false
}
export function unloadFolder (self, f) {
  f.children.length = 0
  f.loaded = false
}

const tus = import('https://cdn.jsdelivr.net/npm/tus-js-client@2.3.1/dist/tus.js')
export async function upload (filename, content, token, self) {
  await tus
  
  const file = new File([content], 'sample.txt', {
    lastModified: new Date(),
    type: "text/plain"
  })
  return new Promise((resolve, reject) => {
    var options = {
      endpoint: self.cfg.uploadApi,
      metadata: {
        filename,
        Bearer: token
      },
      uploadSize: file.size,
      onError (error) {
        reject(error)
      },
      onSuccess () {
        resolve()
      }
    }
    
    var upload = new window.tus.Upload(file, options)
    upload.start()
  })
}


