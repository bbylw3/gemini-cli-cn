document.addEventListener('DOMContentLoaded', () => {
    const contentElement = document.getElementById('content');
    const navElement = document.querySelector('nav');
    const backToTopButton = document.getElementById('back-to-top');
    const loadingIndicator = document.getElementById('loading-indicator');
    let headings = []; // 存储所有标题元素
    let navLinks = []; // 存储所有导航链接元素
    let isScrolling = false; // 防抖标志

    // 检查 marked 是否已加载
    if (typeof marked === 'undefined') {
        console.error('marked.js 未加载');
        showError('Markdown 渲染库加载失败，请刷新页面重试。');
        return;
    }

    // 错误显示函数
    function showError(message) {
        contentElement.innerHTML = `
            <div class="error-message">
                <h2>⚠️ 加载错误</h2>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-button">重试</button>
            </div>
        `;
        if (loadingIndicator) loadingIndicator.style.display = 'none';
    }

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 回到顶部按钮逻辑和滚动高亮逻辑（优化性能）
    const handleScroll = debounce(() => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        
        // 回到顶部按钮显示/隐藏
        if (scrollTop > 100) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }

        // 滚动高亮逻辑
        highlightActiveNavLink();
    }, 16); // 约60fps

    window.addEventListener('scroll', handleScroll, { passive: true });

    function highlightActiveNavLink() {
        if (headings.length === 0 || navLinks.length === 0) {
            return; // 确保元素已加载
        }

        let index = headings.length;
        const scrollOffset = window.scrollY + 150; // 增加偏移量以更好地触发高亮
        
        // 找到当前视口中的标题
        while (--index && headings[index].offsetTop > scrollOffset);

        // 移除所有导航链接的 active 类
        navLinks.forEach(link => link.classList.remove('active'));

        // 为对应的导航链接添加 active 类
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    // 平滑回到顶部
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 为代码块添加复制按钮的函数（改进版）
    function addCopyButtons() {
        const codeBlocks = contentElement.querySelectorAll('pre');
        codeBlocks.forEach((block, index) => {
            // 避免重复添加按钮
            if (block.querySelector('.copy-button')) return;
            
            // 创建复制按钮
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '📋 复制';
            copyButton.setAttribute('aria-label', '复制代码');
            
            // 添加点击事件处理程序
            copyButton.addEventListener('click', async () => {
                const code = block.querySelector('code');
                if (!code) return;
                
                const textToCopy = code.innerText;
                
                try {
                    // 优先使用现代 Clipboard API
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(textToCopy);
                    } else {
                        // 降级方案
                        const textArea = document.createElement('textarea');
                        textArea.value = textToCopy;
                        textArea.style.position = 'fixed';
                        textArea.style.left = '-999999px';
                        textArea.style.top = '-999999px';
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        document.execCommand('copy');
                        textArea.remove();
                    }
                    
                    // 复制成功反馈
                    const originalHTML = copyButton.innerHTML;
                    copyButton.innerHTML = '✅ 已复制';
                    copyButton.disabled = true;
                    setTimeout(() => {
                        copyButton.innerHTML = originalHTML;
                        copyButton.disabled = false;
                    }, 2000);
                } catch (err) {
                    console.error('复制失败:', err);
                    copyButton.innerHTML = '❌ 复制失败';
                    setTimeout(() => {
                        copyButton.innerHTML = '📋 复制';
                    }, 2000);
                }
            });
            
            // 将按钮添加到代码块
            block.style.position = 'relative';
            block.appendChild(copyButton);
        });
    }

    // 为标题添加锚点链接的函数（改进版）
    function addAnchorLinks() {
        const headers = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headers.forEach(header => {
            // 避免重复添加锚点链接
            if (header.querySelector('.anchor-link')) return;
            
            // 确保标题有 id
            if (!header.id) {
                const title = header.textContent.trim();
                header.id = title.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\u4e00-\u9fa5-]+/g, '') // 支持中文字符
                    .replace(/^-+|-+$/g, ''); // 移除首尾的连字符
            }
            
            // 创建锚点链接
            const anchorLink = document.createElement('a');
            anchorLink.className = 'anchor-link';
            anchorLink.href = `#${header.id}`;
            anchorLink.innerHTML = '🔗';
            anchorLink.title = '复制链接到此标题';
            anchorLink.setAttribute('aria-label', '复制标题链接');
            
            // 添加点击事件处理程序
            anchorLink.addEventListener('click', async (e) => {
                e.preventDefault();
                const url = `${window.location.origin}${window.location.pathname}#${header.id}`;
                
                try {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(url);
                    } else {
                        // 降级方案
                        const textArea = document.createElement('textarea');
                        textArea.value = url;
                        textArea.style.position = 'fixed';
                        textArea.style.left = '-999999px';
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        textArea.remove();
                    }
                    
                    // 复制成功反馈
                    const originalHTML = anchorLink.innerHTML;
                    anchorLink.innerHTML = '✅';
                    setTimeout(() => {
                        anchorLink.innerHTML = originalHTML;
                    }, 2000);
                } catch (err) {
                    console.error('复制链接失败:', err);
                    anchorLink.innerHTML = '❌';
                    setTimeout(() => {
                        anchorLink.innerHTML = '🔗';
                    }, 2000);
                }
            });
            
            // 将锚点链接添加到标题
            header.appendChild(anchorLink);
        });
    }

    // 加载和渲染 Markdown 内容
    async function loadContent() {
        try {
            const response = await fetch('gemini_tutorial.md');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const text = await response.text();
            
            // 配置 marked 选项
            marked.setOptions({
                highlight: function(code, lang) {
                    // 简单的语法高亮（可以后续集成更强大的高亮库）
                    return `<code class="language-${lang || 'text'}">${code}</code>`;
                },
                breaks: true,
                gfm: true
            });
            
            const htmlContent = marked.parse(text);
            
            // 隐藏加载指示器
            if (loadingIndicator) loadingIndicator.style.display = 'none';
            
            contentElement.innerHTML = htmlContent;

            // 生成导航
            generateNavigation();
            
            // 添加功能增强
            addCopyButtons();
            addAnchorLinks();
            
            // 处理 URL 中的锚点
            handleUrlHash();
            
        } catch (error) {
            console.error('加载 Markdown 文件时出错:', error);
            if (loadingIndicator) loadingIndicator.style.display = 'none';
            
            let errorMessage = '教程内容加载失败。';
            if (error.name === 'TypeError') {
                errorMessage = '网络连接错误，请检查网络连接后重试。';
            } else if (error.message.includes('404')) {
                errorMessage = '教程文件未找到，请联系管理员。';
            } else if (error.message.includes('HTTP')) {
                errorMessage = `服务器错误：${error.message}`;
            }
            
            showError(errorMessage);
        }
    }

    // 生成导航菜单
    function generateNavigation() {
        headings = contentElement.querySelectorAll('h1, h2, h3');
        navLinks = []; // 重置导航链接数组
        navElement.innerHTML = ''; // 清空现有导航
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.substring(1));
            const title = heading.textContent.trim();
            const id = title.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\u4e00-\u9fa5-]+/g, '')
                .replace(/^-+|-+$/g, '');
            heading.id = id;

            if (level <= 2) { // 只为 h1 和 h2 创建主导航
                const link = document.createElement('a');
                link.href = `#${id}`;
                link.textContent = title;
                link.className = level === 1 ? 'nav-h1' : 'nav-h2';
                
                // 添加平滑滚动
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.getElementById(id);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // 更新 URL 但不触发页面跳转
                        history.pushState(null, null, `#${id}`);
                    }
                });
                
                navElement.appendChild(link);
                navLinks.push(link);
            }
        });
    }

    // 处理 URL 中的锚点
    function handleUrlHash() {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }

    // 启动应用
    loadContent();
});