// make sure sw is supported
if ('serviceWorker' in navigator) {
    console.log("service worker is present!!!!!")
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw_cached_pages.js').then((res) => {
            console.log("service worker registered!")
        }).catch((err) => {
            console.log("service worker error =>", err)
        })
    })
}