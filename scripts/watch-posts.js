const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

const POSTS_DIR = path.resolve(__dirname, '../src/assets/posts');
const buildPosts = () => {
  exec('node scripts/build-posts.js', (err, stdout, stderr) => {
    if (err) {
      console.error('生成文章索引失败:', stderr);
    } else {
      console.log(stdout);
    }
  });
};

console.log('👀 正在监听 posts 目录...');
chokidar.watch(POSTS_DIR, { ignoreInitial: true })
  .on('add', buildPosts)
  .on('change', buildPosts)
  .on('unlink', buildPosts);