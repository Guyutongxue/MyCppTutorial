function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
window.$docsify = {
    coverpage: true,
    name: '谷雨同学的 C++ 教程',
    loadSidebar: true,
    notFoundPage: '404.html',
    alias: {
        '/.*/_sidebar.md': '/_sidebar.md'
    },
    search: {
        paths: [],
        placeholder: '搜索...',
        noData: '无结果',
    },
    pagination: {
        previousText: '上一节',
        nextText: '下一节',
        crossChapter: true,
        crossChapterText: true,
    },
    copyCode: {
        buttonText: '复制',
        errorText: '错误',
        successText: '已复制'
    },
    noEmoji: true,
    markdown: {
        renderer: {
            // Change code block rendering. Add line-numbers class.
            code: function (code, lang) {

                // For Standard Specification block and IO block.
                if (lang == 'sdsc' | lang == 'io') {
                    return '<pre class="' + lang + '">' + htmlToElement(marked(code)).innerHTML + '</pre>';
                }

                let cc = document.createElement('code');
                cc.textContent = code;
                cc.setAttribute('class', 'language-' + lang);
                return '<pre data-lang="' + lang + '" class="line-numbers">' + cc.outerHTML + '</pre>';
            },
            // Add Standard Specification inline block. The Syntax is `@text@`.
            codespan: function (code) {
                if (code.match(/^@.*@$/) === null) {
                    return '<code>' + code + '</code>';
                } else {
                    return '<code class="sdsc">' + htmlToElement(marked(code.substring(1, code.length - 1))).innerHTML + '</code>';
                }
            }
        }
    },
    /* Do highlighting after page loaded. */
    plugins: [
        function (hook, vm) {
            hook.doneEach(function () {
                Prism.highlightAll();
            })
        },
        function (hook, vm) {
            hook.doneEach(function () {
                // Add OGP meta info
                if (document.querySelector('meta[property="og:title"]') === null) {
                    let meta = document.createElement('meta');
                    meta.setAttribute('property','og:title')
                    document.head.appendChild(meta);
                }
                document.querySelector('meta[property="og:title"]').setAttribute('content', location.hash.split('?')[0]);
                let utterances = document.createElement('script');
                utterances.type = 'text/javascript';
                utterances.async = true;
                utterances.setAttribute('issue-term', 'og:title');
                utterances.setAttribute('label', 'utterances');
                utterances.setAttribute('theme', 'github-light');
                utterances.setAttribute('repo', 'Guyutongxue/MyCppTutorial');
                utterances.crossorigin = 'anonymous';
                utterances.src = 'https://utteranc.es/client.js';
                document.querySelector('.markdown-section').appendChild(utterances);
                let ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 &&
                    ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 &&
                    ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
                    setTimeout(function () {
                        if (document.querySelector('.utterances').clientHeight > 0) {
                            let warning = document.createElement('blockquote');
                            warning.innerHTML = '若您正在使用 iOS 上的 Safari 浏览器，您的评论功能可能被禁用。关闭 <tt style="background:var(--code-inline-background);">设置 > Safari 浏览器 > 阻止跨网站跟踪</tt> 可解决此问题。';
                            document.querySelector('.markdown-section').insertBefore(warning, document.querySelector('.utterances'));
                        }
                    }, 5000);
                }
            })
        }
    ],
    auto2top: true,
    executeScript: true
}
window.onload = function () {
}