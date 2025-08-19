document.addEventListener('DOMContentLoaded', function() {
    // 获取所有侧边栏链接
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    // 获取所有内容区域
    const sections = document.querySelectorAll('main .content > section');
    // 获取顶部导航链接
    const navLinks = document.querySelectorAll('.nav-links a');
    // 获取搜索元素
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    // 为侧边栏链接添加点击事件监听器
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有链接的活动状态
            sidebarLinks.forEach(link => link.classList.remove('active'));
            
            // 为当前点击的链接添加活动状态
            this.classList.add('active');
        });
    });
    
    // 为顶部导航链接添加点击事件监听器
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有链接的活动状态
            navLinks.forEach(link => link.classList.remove('active'));
            
            // 为当前点击的链接添加活动状态
            this.classList.add('active');
        });
    });
    
    // 监听滚动事件，实现滚动时自动更新活动链接
    window.addEventListener('scroll', function() {
        let current = '';
        
        // 遍历所有部分，找到当前视口中的部分
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        // 更新侧边栏活动链接
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // 更新顶部导航活动链接
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 为导航栏链接添加平滑滚动效果
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 为侧边栏链接添加平滑滚动效果
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 为Gemini元素添加悬停效果
    const geminiElements = document.querySelectorAll('.gemini-element');
    geminiElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // 添加打印功能
    const printButton = document.querySelector('.btn[onclick="window.print()"]');
    if (printButton) {
        printButton.addEventListener('click', function() {
            // 可以在这里添加打印前的特殊处理
            console.log('准备打印教程...');
        });
    }
    
    // 搜索功能实现
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            alert('请输入搜索关键词');
            return;
        }
        
        // 移除之前的高亮
        removeSearchHighlights();
        
        // 在所有内容中搜索
        const contentElements = document.querySelectorAll('.content p, .content li, .content h2, .content h3');
        let foundCount = 0;
        
        contentElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                // 高亮匹配的文本
                highlightText(element, searchTerm);
                foundCount++;
                
                // 如果这是第一个匹配项，滚动到该位置
                if (foundCount === 1) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        if (foundCount === 0) {
            alert('未找到匹配的内容');
        } else {
            console.log(`找到 ${foundCount} 个匹配项`);
        }
    }
    
    // 高亮文本函数
    function highlightText(element, searchTerm) {
        const innerHTML = element.innerHTML;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlightedHTML = innerHTML.replace(regex, '<span class="search-highlight">$1</span>');
        element.innerHTML = highlightedHTML;
    }
    
    // 移除高亮函数
    function removeSearchHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(span => {
            const parent = span.parentNode;
            parent.replaceChild(document.createTextNode(span.textContent), span);
            parent.normalize();
        });
    }
    
    // 为搜索按钮添加点击事件
    searchButton.addEventListener('click', performSearch);
    
    // 为搜索输入框添加回车键事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 添加页面加载动画
    window.addEventListener('load', function() {
        // 为所有卡片添加淡入动画
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // 为所有提示框添加淡入动画
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach((alert, index) => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(20px)';
            alert.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                alert.style.opacity = '1';
                alert.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
    
    // 添加滚动时的视差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.header');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // 添加代码块复制功能
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        // 创建复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = '复制';
        copyButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 8px;
            background-color: #4285F4;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            z-index: 10;
        `;
        
        // 添加点击事件
        copyButton.addEventListener('click', function() {
            const code = block.querySelector('code');
            if (code) {
                navigator.clipboard.writeText(code.textContent).then(() => {
                    copyButton.textContent = '已复制';
                    setTimeout(() => {
                        copyButton.textContent = '复制';
                    }, 2000);
                });
            }
        });
        
        // 添加到代码块
        block.style.position = 'relative';
        block.appendChild(copyButton);
    });
    
    // 添加页面可见性变化处理
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面隐藏时暂停动画
            document.body.style.animationPlayState = 'paused';
        } else {
            // 页面可见时恢复动画
            document.body.style.animationPlayState = 'running';
        }
    });
});