
const express = require('express')
const fs = require("fs")

const app = express()
const port = process.env.PORT || 3000

const validDomain = process.env.VALIDDOMAIN || `localhost:${port}`;
const tabName = process.env.TABNAME || "My Tab";

function renderTemplate(filepath, validDomain, tabName) {
  fs.readFile(__dirname+filepath, "utf8", (err, data) => {
    if(err) {
      if(err)
        console.error(err);
      return false
    }
    let content = data.replace(/{{ValidDomain}}/g, validDomain)
                      .replace(/{{TabName}}/g, tabName);
    let renderedPath = (__dirname+filepath).replace("Template", "Rendered");
    fs.writeFile(renderedPath, content, (err) => {
      if(err)
        console.error(err);
      return false
    })
    return true;
  })
}

renderTemplate("/views/Test_Template.html", validDomain, tabName);
renderTemplate("/views/Configure_Template.html", validDomain, tabName);

app.use(express.static('views'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.sendFile(__dirname + "/views/Test_Rendered.html")
})

app.get('/Configure', (req, res) => {
    res.sendFile(__dirname + "/views/Configure_Rendered.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

