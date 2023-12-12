const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const videosDir = path.join(__dirname, 'videos');
const screenshotDir = path.join(__dirname, 'videos', 'screenshot');

// 创建screenshot目录（如果不存在）
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

// 获取videos目录下的所有文件
fs.readdirSync(videosDir).forEach((file) => {
  const videoPath = path.join(videosDir, file);
  const screenshotPath = path.join(screenshotDir, `${path.parse(file).name}.jpg`);

  // 使用ffmpeg命令行工具获取视频的第0.5s截图
  const command = `ffmpeg -ss 00:00:00.5 -i "${videoPath}" -vframes 1 "${screenshotPath}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`截图失败: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`截图失败: ${stderr}`);
      return;
    }
    console.log(`成功截图: ${screenshotPath}`);
  });
});