// Credit Rohan Menon <rohanmenon.com>

// Taken from https://stackoverflow.com/questions/11071314/
// Triggers when all the batch-loaded images have finished loading
Promise.all(Array.from(document.querySelectorAll('.batch-load'))
.filter(elem => {
    // Use the browser level api for lazy loading
    // Don't try to load all images at the same time. Only the ones
    // marked eager. This is also to prevent conflicting
    // actions while slideshows try to lazy load
    return !elem.complete && elem.getAttribute("loading") == "eager"
}).map(elem => new Promise(resolve => {
    elem.onload = img.onerror = resolve;
}))).then(() => {
    setImageOpacity(1)   // Makes the images visible
});

// If it's taken 2.5s and the images haven't finished loading, 
// just show whatever we have
setTimeout(function() {
    setImageOpacity(1)   // Makes the images visible
}, 1750);

function setImageOpacity(opacity) {
    document.querySelectorAll('.batch-load').forEach(function(elem) {
        // Any content inside a .image-container should only display as
        // soon as the image loads
        Array.from(elem.parentNode.childNodes).filter(elem => {
            /// filter out text nodes
            return elem.nodeType === 1
        }).forEach(elem => {
            console.log(elem)
            elem.style.opacity=opacity;
        })

        elem.parentNode.style.backgroundColor = "transparent";
        elem.parentNode.style.animation = "fadeOut 1s";
    });
}
