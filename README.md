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
在代码里手动改配置好你的文章目录sourceDir 和 新建一个缓存目录 targetDir即可。<br>
在这个脚本中，我把清理，生成，发布都写好了，你只需要专注markdown的编写，写好markdown后，运行这个脚本<br>

```javascript
node auto.js
```

静候片刻即可完成。
