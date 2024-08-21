window.addEventListener('load', function () {
    console.log('Page loaded');
});
setTimeout(() => {
    console.log(window.location.pathname);
    if (window.location.pathname !== '/profile/personal') {
        window.__TAURI_INVOKE__('inject_js_with_delay', { path: '../src/page/login/hack.js', id: 'login' })
            .then(() => console.log('Rust function called successfully!'))
            .catch((error) => console.error('Failed to call Rust function:', error));
    }
}, 100);

if (window.location.pathname === '/profile/personal') {
    setTimeout(() => {
        alert('User is on the login page');
        const url = document.querySelectorAll('.c-avatar-img')[0].getAttribute('src');
        const urlObj = new URL(url);
        // 设置新的查询参数
        urlObj.search = 'x-oss-process=image/format,png/resize,h_100';

        window.__TAURI_INVOKE__('save_image', { url: urlObj.toString() })
            .then(() => {
                console.log('Image saved successfully!');
                window.__TAURI_INVOKE__('post_message', {
                    title: 'ccw',
                    id: 'main',
                    content: 'reload'
                });
            })
            .catch((error) => console.error('Failed to call Rust function:', error));
    }, 1000);
}

console.log('Hello from Tauri!');

window.open = function (url, name, specs) {
    invoke('create_and_inject_js', {
        label: name,
        identifier: name,
        url: url,
        path: '',
        name: name
    }).catch((error) => {
        console.error('Failed to create window:', error);
        Window.focusWindow(id);
    });
    return null; // window.open usually returns a reference to the window, but Tauri doesn't support this.
};
