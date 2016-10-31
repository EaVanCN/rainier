# rainier
<link href="https://github.com/EaVanCN/rainier/raw/master/rainier.css" rel="stylesheet" type="text/css"></link>
###1.按钮样式：</br>
####颜色：</br>
使用下面类名会产生相对应按钮效果：</br>
![](https://github.com/EaVanCN/rainier/raw/master/imgs/btn_color.jpg)</br>
``` html
<button class="btn">Button</button>
<button class="btn btn-default">Button</button>
<button class="btn btn-original">Button</button>
<button class="btn btn-success">Button</button>
<button class="btn btn-warnning">Button</button>
<button class="btn btn-danger">Button</button>
```
为了适配现在系统的风格，增加了本色灰色，鼠标悬浮变成蓝色的按钮</br>
![](https://github.com/EaVanCN/rainier/raw/master/imgs/btn_sys.jpg)</br>
``` html
<button class="btn btn-sys btn-nor">btn-nor</button>
```
####大小：</br>
使用下面类名会产生相对应按钮效果：</br>
![](https://github.com/EaVanCN/rainier/raw/master/imgs/btn_size.jpg)</br>
``` html
<button class="btn btn-original btn-big">btn-big</button>
<button class="btn btn-original btn-nor">btn-nor</button>
<button class="btn btn-original btn-sml">btn-sml</button>
```
####不可用状态：</br>
![](https://github.com/EaVanCN/rainier/raw/master/imgs/btn_disable.jpg)</br>
使用下面类名会产生相对应按钮效果：</br>
``` html
<button class="btn btn-original btn-nor" disabled="disable">不可用</button>
<button class="btn btn-default btn-nor" disabled="disable">不可用</button>
```
###2.表单元素：</br>
####使用：</br>
分别对text password textarea运用下面的类名，会对表单元素进行简单修饰</br>
运用input-text、textarea指示当前是何种表单元素
``` html
<input type="text" class="input-text size-nor" placeholder="测试文本框" />
<textarea class="textarea size-nor" cols="70" class="textarea"></textarea>
```
####大小：</br>
使用下面类名会产生相对应表单元素效果：</br>
![](https://github.com/EaVanCN/rainier/raw/master/imgs/text-size.jpg)</br>
``` html
<input type="text" class="input-text size-sml" placeholder="测试文本框" />
<input type="text" class="input-text size-nor" placeholder="测试文本框" />
<input type="text" class="input-text size-big" placeholder="测试文本框" />
```
