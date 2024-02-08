export function showErrorPage(error?: Error) {
    if (error) {
        const msg = `${error.message} \n ${error.stack}`;
        document.getElementById("error-box-msg")!.innerText = msg;
    } else {
        document.getElementById("error-box-msg")!.innerText = "";
    }

    document.getElementById("error-box")!.style.display = "";
}

export function hideErrorPage() {
    document.getElementById("error-box")!.style.display = "none";
}
