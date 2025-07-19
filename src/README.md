# Vercel 部署常见问题与解决方案

## 1. 常见失败原因
- **依赖或构建脚本问题**：如 `gray-matter`、`chokidar` 等依赖未声明，或 Node 脚本在 Vercel 构建环境下无法运行。
- **路径/文件系统问题**：Vercel 构建环境只允许在特定目录写入，不能在源码目录（如 src/components/lib）写入新文件。
- **环境变量/权限问题**：依赖环境变量未配置，或构建命令不正确。

## 2. 解决建议
- **依赖声明完整**：所有用到的包都要在 `package.json` 的 `dependencies` 或 `devDependencies` 中声明。
- **构建脚本兼容 Vercel**：
  - `package.json` 的 `build` 脚本应为：
    ```json
    "build": "vite build"
    ```
  - 本地开发时运行 `npm run build-posts`，并将生成的 `posts.generated.json` 提交到 git。
- **避免写入源码目录**：构建时不要动态写入 `src/components/lib/posts.generated.json`，而是本地预生成并提交。
- **确保 posts 目录和 Markdown 文件已提交**。

## 3. 推荐修复方案
1. 本地运行：
   ```bash
   npm install
   npm run build-posts
   git add src/components/lib/posts.generated.json
   git commit -m "chore: generate posts index for vercel"
   git push
   ```
2. 确保 `package.json` 里 `build` 脚本为：
   ```json
   "build": "vite build"
   ```
3. 删除 Vercel 上的 `dev:watch`、`watch-posts.js` 等 Node 相关脚本（仅本地开发用）。

## 4. 查看 Vercel 日志
- 在 Vercel 控制台点开“Details”，查看具体报错信息（如找不到模块、权限问题、路径错误等），如有疑问可将日志内容贴给开发同事或 AI 协助定位。