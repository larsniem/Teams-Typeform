import { app, pages } from '@microsoft/teams-js'

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("url");
    input.addEventListener("change", onURLChanged);
    console.log("Typeform config loaded.");

    initTeams();
    console.log("Teams initialized.");
})

let url;
let registered = false;
function initTeams() {
    app.initialize();
    app.notifySuccess();
}

function onURLChanged() {
    let validDomain = ".typeform.com";
    let url = new URL(document.getElementById("url").value);
    let status = document.getElementById("status");
    status.className = "";
    status.innerHTML = "";

    if(!url.host.endsWith(validDomain)) {
        status.className = "error"
        let msg = `"${url}" does not match "${validDomain}"`
        status.innerText = msg;
        console.error(msg);
        return
    }

    if(!registered) {
        pages.config.registerOnSaveHandler((saveEvent) => {
            pages.config.setConfig({
                entityID: "Evaluation",
                contentUrl: url.toString(),
                suggestedTabName: "Evaluation",
                websiteUrl: url.toString(),
            })
            saveEvent.notifySuccess();
        })
        registered = true
    }

    pages.config.setValidityState(true);

    status.className = "success"
    let msg = `Everything seems OK. Press "Save" to continue.`
    status.innerText = msg;
    console.info(msg)
}