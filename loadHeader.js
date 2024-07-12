document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;

    // index.html以外のページのみ適応
    if (!currentPath.endsWith('index.html')) {
        fetch("loadHeader.html")
            .then(response => response.text())
            .then(data => {
                document.querySelector("header").innerHTML = data;
            });

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'loadHeader.css';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
});
