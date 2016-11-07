# rainier
<link href="https://github.com/EaVanCN/rainier/raw/master/rainier.css" rel="stylesheet" type="text/css"></link>
##基础
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
####颜色：</br>
使用下面类名会产生相对应表单元素效果：</br>
![](https://github.com/EaVanCN/rainier/raw/master/imgs/form-successanddanger.jpg)</br>
``` html
<input type="text" class="input-text size-nor form-danger" placeholder="测试文本框" />
<input type="text" class="input-text size-nor form-success" placeholder="测试文本框" />
```
###3.表格：</br>
####使用：</br>
我们希望如果您最开始使用table组件的时候，获得的将会是一个与默认表格相似，但会使您感到更漂亮的一个表格。所以，默认情况下我们只是更改了一下边框色彩，并给了部分内补</br>
使用下面类名会产生相对应表单元素效果：</br>
![](https://github.com/EaVanCN/rainier/raw/master/imgs/table.jpg)</br>
如图，我们给出的默认表格就如第一列，默认文字都会居中</br>
如果您希望文字不居中则可以使用类名text-l，text-c，text-r来控制，这三个类名均可运用到整个表，一行或者一个单元格</br>
表格也是有色彩的，您可以使用table-danger，table-success，table-warning来控制表格，一行，或是某个单元格的色彩</br>
如果您希望表格放在容器中，而容器大小始终不变，仅仅是让表格可以出滚动条，那给容器加上类名table-container-overflow可以帮到您</br>
具体示例您可以看下面代码</br>
``` html
<div class="table-container table-container-overflow">
<table class="table table-striped table-hover">
    <caption>表格名称</caption>
    <thead>
        <tr class="text-c">
            <th>表头第一列</th>
            <th>表头第二列</th>
            <th>表头第三列</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>表内容第一行第一列</td>
            <td>表内容第二行第二列</td>
            <td  class="text-l table-danger">表内容第三行第三列</td>
        </tr>
        <tr class="text-c">
            <td>表内容第一行第一列</td>
            <td class="text-c text-bold">表内容第二行第二列</td>
            <td class="table-success">表内容第三行第三列</td>
        </tr>
        <tr>
            <td>表内容第一行第一列</td>
            <td>表内容第二行第二列</td>
            <td class="text-r table-warning">表内容第三行第三列</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>表脚第一列</td>
            <td>表脚第二列</td>
            <td>表脚第三列</td>
        </tr>
    </tfoot>
</table>
</div>
```
##组件
###1.按钮组：</br>
####实例：</br>
按钮组为您提供了一组并在一起的按钮，为div增加.btn-group类，在div中使用按钮即可，里面的按钮也像普通的按钮一样可以进行颜色，尺寸的设置</br>
![](https://github.com/EaVanCN/rainier/raw/master/imgs/button-group.jpg)</br>
```html
    <div class="btn-group">
        <button class="btn btn-sys" type="button">1</button>
        <button class="btn btn-danger btn-nor" type="button">2</button>
        <button class="btn btn-warning btn-nor" type="button">3</button>
    </div>
```
####尺寸：</br>
只要给 .btn-group 加上 .btn-group-*  类，就省得给按钮组的每一个按钮设置尺寸了</br>
![](https://github.com/EaVanCN/rainier/raw/master/imgs/btn-group-size.jpg)</br>
####一组按钮组：</br>
将按钮组包在一个.group-container的div中，使得按钮组形成一组，排在一排
![](https://github.com/EaVanCN/rainier/raw/master/imgs/btn-group-contain.jpg)</br>
##插件
###1.火焰灯插件：</br>
火焰灯插件可以为您的导航栏提供一个很酷的鼠标浮动跟随的效果，我在原有的基础上进行了一下改进，使得该插件支持从cookie中记录当前位置，使得在跳转后不会忘记自己所在的位置</br>
只需在使用中为您的导航ul使用方法lavaLamp（），现在可以设置的参数有移动效果和时间两个。
需要为ul做一下样式上的调整，可以参考：</br>
```css
.lavaLamp li.back {background:#666;width:95px;height: 38px;position:absolute;z-index:5;}
.lavaLamp{position:relative;}
.lavaLi{position: relative;z-index: 6;}
```
比较好的html文档是这样的：
```html
<nav>
    <ul id="nav">
        <li><a href="">rainier</a></li>
        <li><a href="">rainier2</a></li>
        <li><a href="">rainier3</a></li>
        <li><a href="">rainier4</a></li>
        <li><a href="">rainier5</a></li>
        <li><a href="">rainier6</a></li>
    </ul>
```
为使得back不会覆盖li,所以需要对二者都使用position,而我们需要对back进行一点点初始的样式设定，往往最好跟您的首个li相同
