# hexo-imgLink-tool
## 实现功能
**通过这个脚本，本地和博客页都能正常的预览图片，不再需要修改图片的链接。**<br><br>
同时解决typora本地编辑和hexo发布的图片显示问题，不再需要手动修改链接<br>
只需要在typora中写好md语法的样式即可，例如：
```html
![image-20230530052834191](hexo中的图片插入/image-20230530052834191.png)
```
发布的时候会自动拦截并转换成hexo可以识别的格式，比如：

```html
{% asset_img image-20230530052834191.png %}
```

## 你要做的事情
1,在代码里手动改配置好你的文章目录sourceDir 和 新建一个缓存目录 targetDir。<br>
2,把js代码复制到一个js文本中，存放在blog的根目录<br>
3,写好markdown后，运行这个脚本<br>

```javascript
node auto.js
```

静候片刻即可完成,它会自动执行 备份 -> clean -> 图片链接转换 -> generate -> deplay ->还原本地markdown笔记图片链接。 <br>
如遇程序错误，会自动回滚<br>
