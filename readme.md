# 起搏器随访系统-微信小程序客户端

> e-mail: JeremyHua@foxmail.com <JeremyHua,CytmoKong>
> Address: Software Design Course, 2019cs, WuHan University
>
> Component ： ColorUI
>

# version 1.0

* 新建项目, 添加readme文件;
* 添加ColorUI组件库(已测试), 其中/example_ColorUI 文件夹为示例文件夹, 可单独运行作为参考；
* 完成三大页面布局，简单美化，主要部件示例完成（由于真机调试，删去/Example_ColorUI 示例程序，web：https://github.com/weilanwl/ColorUI/tree/master/demo）；

```
# 页面结构，
pages-
	 -- home   : 显示最近的若干条上传记录(动态加载），并且使用颜色标签显示记录状态，点开后查看单条记录的信息（子页面），不可修改
	 -- addNew : 使用“+”图标，负责新建上传记录
	 -- user   ：显示个人基本信息，上传记录及记录状态，目前负责医师信息（弹窗即可），以及微信小程序版本信息
	 
# 下一步工作
work-
	--个人信息认证与注册
	--信息查询
	--信息提交（其中涉及到将图片上传到阿里云，并将凭证返回后端数据库）
	 
```

