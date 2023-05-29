//author：肖佳嘉
//Email：xiaojiajia.sz@foxmail.com

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 源目录和目标目录的路径
const sourceDir = 'E:/blog/blog/source/_posts';
const targetDir = 'E:/blog/blog/source/cache2';

// 复制源目录到目标目录
function copyDirectory(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

// 替换md文件中的内容
function replaceContent(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      replaceContent(filePath);
    } else if (path.extname(filePath) === '.md') {
      let content = fs.readFileSync(filePath, 'utf-8');
      const regex = /!\[image-\d+\]\((.*?)\/([^\/]+\.png)\)/g;
      content = content.replace(regex, '{% asset_img $2 %}');
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  });
}

// 执行Hexo clean命令
function clean() {
  execSync('hexo clean', { stdio: 'inherit' });
  console.log('clean ... done');
}

// 执行Hexo g命令
function generate() {
  execSync('hexo g', { stdio: 'inherit' });
  console.log('generate ... done');
}

// 执行Hexo deplay命令
function deploy() {
  execSync('hexo d', { stdio: 'inherit' });
  console.log('dyplay ... done');
}

//删除缓存用
function deleteFolderContents(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(function(file) {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // 递归删除子文件夹及其内容
                deleteFolderContents(curPath);
                // 删除空文件夹
                fs.rmdirSync(curPath);
            } else {
                // 删除文件
                fs.unlinkSync(curPath);
            }
        });

        console.log('缓存文件夹内容已成功清理');
    }
}


// 执行脚本
function runScript() {
	console.log('程序开始执行...');
  // 复制 A 目录到 B 目录
  copyDirectory(sourceDir, targetDir);

  // 替换指定目录 A 中的 md 文件内容
  replaceContent(sourceDir);
  
  //清理
  clean()
  //生成
  generate();
  console.log('完成生成');
  //发布
  console.log('发布中');
  deploy()
  console.log('发布完成');
  
  // 复制 B 目录到 A 目录
  console.log('正在完成最后的工作');
  copyDirectory(targetDir, sourceDir);
  //删除缓存
  deleteFolderContents(targetDir);
  console.log('程序结束');
}

runScript();
