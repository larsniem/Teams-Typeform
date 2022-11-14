const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 80

const debug = (process.env.NODE_ENV ?? "") == "DEV";

const statics = path.resolve(__dirname, debug ? "src" : "dist");

app.get('/health', (req, res) => {
  res.status(200).send()
})

loginfo = () => console.log(`Server is listening on port ${port}.`);

// serving statics
if(debug){
  const vite = require('vite')
  const fs = require('fs')

  vite.createServer({
    server: { middlewareMode: true },
    appType: "custom",
  }).then(async (vite) => {
    app.use(vite.middlewares);

    app.use('*' , async (req, res, next) => {
      try {
        const url = req.baseUrl;
        let docPath = path.join(statics, url);
        if(url == '' || url.endsWith("/"))
          docPath += url.endsWith("/") ? "" : "/" + "index.html";

        if(!fs.existsSync(docPath)) {
          res.status(404);
          res.type('txt');
          res.send(`"${url}" Not found`);
          return;
        }
        
        const extension = path.extname(docPath).toLowerCase().replace(".", "");
        if(debug && extension == "html") {
          let doc = fs.readFileSync(docPath, "utf-8");
          doc = await vite.transformIndexHtml(url, doc);
          res.status(200).set({ "Content-Type": `text/${extension}` }).end(doc);
          return;
        } 
    
        res.sendFile(docPath);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    })

    app.listen(port, loginfo)
  })
} else {
  app.use(express.static(statics));
  app.listen(port, loginfo)
}
  

