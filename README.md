# Gemini-CLI 终极使用教程

一个现代化的、响应式的 Gemini-CLI 教程展示网站，提供完整的从入门到精通的学习指南。

## 🌟 特性

### 📚 内容特性
- **完整教程**: 涵盖 Gemini-CLI 从安装到高级功能的全面指南
- **中文支持**: 完全中文化的界面和内容
- **结构化内容**: 清晰的章节划分和层次结构

### 🎨 用户体验
- **响应式设计**: 完美适配桌面、平板和手机设备
- **平滑滚动**: 所有导航和跳转都使用平滑滚动效果
- **智能导航**: 自动生成目录，支持滚动高亮当前章节
- **一键复制**: 代码块和章节链接都支持一键复制
- **加载动画**: 优雅的加载指示器

### ⚡ 性能优化
- **防抖处理**: 优化滚动事件性能
- **被动监听**: 提升页面响应速度
- **异步加载**: 高效的内容加载机制
- **错误处理**: 完善的错误捕获和用户友好的错误提示

### 🎯 可访问性
- **语义化 HTML**: 使用正确的 HTML5 语义标签
- **ARIA 支持**: 完整的屏幕阅读器支持
- **键盘导航**: 支持键盘操作
- **SEO 优化**: 完善的 meta 标签和结构化数据

## 🚀 快速开始

### 在线预览
直接在浏览器中打开 `index.html` 文件即可查看教程。

### 本地开发服务器

#### 使用 Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 使用 Node.js
```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
http-server -p 8000
```

#### 使用 PHP
```bash
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 📁 项目结构

```
gemini-cli-tutorial/
├── index.html              # 主页面
├── style.css              # 样式文件
├── script.js              # JavaScript 功能
├── gemini_tutorial.md     # Markdown 教程内容
└── README.md              # 项目说明文档
```

## 🛠️ 技术栈

- **HTML5**: 语义化标记
- **CSS3**: 现代样式和动画
- **JavaScript (ES6+)**: 交互功能
- **Marked.js**: Markdown 渲染
- **响应式设计**: 移动端优先

## 📱 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器

## 🎨 主要功能

### 1. 动态导航
- 自动从 Markdown 内容生成导航菜单
- 支持 H1 和 H2 级别的标题导航
- 滚动时自动高亮当前章节

### 2. 代码复制功能
- 所有代码块都有复制按钮
- 支持现代 Clipboard API 和降级方案
- 复制成功有视觉反馈

### 3. 锚点链接
- 每个标题都有可复制的锚点链接
- 支持直接分享特定章节
- URL 锚点自动跳转

### 4. 响应式布局
- 移动端优化的导航
- 自适应的代码块和表格
- 触摸友好的交互元素

### 5. 加载和错误处理
- 优雅的加载动画
- 友好的错误提示
- 重试机制

## 🔧 自定义配置

### 修改主题色
在 `style.css` 中修改 CSS 变量：
```css
:root {
    --primary-color: #ff9900;    /* 主色调 */
    --bg-color: #1a1a1a;        /* 背景色 */
    --text-color: #fff;         /* 文字色 */
}
```

### 更换教程内容
替换 `gemini_tutorial.md` 文件内容，支持标准 Markdown 语法：
- 标题 (H1-H6)
- 代码块
- 表格
- 列表
- 链接和图片

### 调整导航层级
在 `script.js` 中修改导航生成逻辑：
```javascript
if (level <= 2) { // 修改这里的数字来改变导航层级
    // 导航生成逻辑
}
```

## 📝 内容编写指南

### Markdown 格式要求
1. **标题结构**: 使用 H1 作为主要章节，H2 作为子章节
2. **代码块**: 使用三个反引号包围，支持语言标识
3. **表格**: 使用标准 Markdown 表格语法
4. **链接**: 支持内部锚点链接和外部链接

### 示例结构
```markdown
# 第一章：基础知识

## 1.1 安装指南

### 环境要求
内容...

```bash
npm install -g @google/gemini-cli
```

## 1.2 快速开始
内容...
```

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Marked.js](https://marked.js.org/) - Markdown 解析器
- [Google Gemini](https://ai.google.dev/) - AI 技术支持
- 所有贡献者和用户的反馈

## 📞 联系方式

如果您有任何问题或建议，请通过以下方式联系：

- 提交 [Issue](../../issues)
- 发起 [Discussion](../../discussions)

---

⭐ 如果这个项目对您有帮助，请给它一个星标！