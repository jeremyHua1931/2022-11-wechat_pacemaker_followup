# 微信小程序迭代记录_完整版

> Author：孔维辰&华章昭
>
> Group Repository： https://gitee.com/cbz44_44/pacemaker_backstage/tree/wechat/ 

## 1. 简介

#### 1.1 小程序信息		

微信小程序名称为起搏器随访系统, 主要功能是辅助病人在日常生活中上传个人最新身体状况记录以便负责医师远程随访。

#### 1.2 微信小程序构成

​           小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。一个小程序主体部分由三个文件组成，必须放在项目的根目录.

详细结构如下: 

```
├── components (公共组件目录)
│   ├── @anima (动画组件)
│   └── ...
├── images（图片资源)
│   └── icon
├── pages（主包目录）
│   └── home (app.json 设置的入口页)
│       ├── home.wxml —— 页面逻辑
│       ├── home.js   —— 页面配置
│       ├── home.json —— 页面结构
│       └── home.wxss —— 页面样式
├── style（公用样式目录）
├── subpackages（分包目录）
│   │── news
|   └── store
├── utils（公共模块，工具类）
│   ├── config.js（项目配置）
│   └── local.config.js (本地配置，git忽略)
├── app.js              —— 小程序唯一实例化文件，初始化文件,调用App()函数，注册一个小程序
├── app.json            —— 小程序全局配置, 决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。
├── app.wxss            —— 小程序全局样式，作用于每一个页面
├── sitemap.json        —— 用来配置小程序及其页面是否允许被微信索引
├── project.config.json —— 开发者工具的个性化配置，导入该项目，开发者工具就自动会帮你恢复到当时你开发项目时的个性化配置
└── README.md           —— 项目说明文件
```

其中小程序页面的构成是由.wxml、.wxss、.js、.json四种类型构成(下文将简称为四类文件)。其开发方式跟传统网页开发是十分类似的。

* .wxml模板文件对应为传统网页开发的.html文件，是一个页面(组件)的骨架。只不过它里面采用的语法跟传统的HTML语法有些差异, 比如标签的名称是微信自己在底层封装的组件。
* .wxss样式文件则对应CSS样式文件，具有大部分CSS的特性(比如css3的某些伪类特性就没有，但常见的css3属性倒是可以用)，除此之外还在此基础上做了新的扩展。
* js一直都是作为跟页面交互角色，在小程序开发中也不例外。在js中，可以使用微信提供的API。如常见的Page(构造器)和Component，还有微信给出的一些特定权限的API.   json则是配置文件，一般是页面或者组件内那一级的配置文件。

​	小程序使用的组件主要为ColorUI

## 2. 功能页面设计

#### 2.1 起搏器随访记录(pages/home)

​		主要以时间为线展示不同的记录, 每条记录按时间排序, tag为未审核\审核(医生是否审核)和健康\异常, 医生未审核前可以删除或者重新编辑自己的上传记录, 一旦医生已经审核完某条记录, 则该记录不可更改或删除，具体数据项同网页端。

#### 2.2 新建随访记录(pages/addNew)

​	 主要新建新的上传记录, 数据项同网页端。

#### 2.3 个人信息(pages/user)

​	主要展示个人注册信息、记录分类(总记录\正常记录\异常记录）、负责医师以及小程序系统问题反馈等。

## 3. 小程序整体架构

![image-20221030222642517](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302226588.png)

​     	 （架构图的介绍直接看图说应该就能明白，不再重复描述）

## 4.详细说明

#### 4.1 用户注册与档案信息绑定

​	主要展示用户登陆时、未绑定病情档案时、绑定病情档案时的状态

![image-20221030223526868](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302235942.png)

#### 4.2 随访记录列表与详细信息

​		主要展示随访记录列表（按时间排序）、单条记录的详细信息、新建上传记录的信息

![image-20221030223818884](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302238962.png)

#### 4.3 添加新纪录

新纪录分为随访信息表和附加信息表，每个表各一张图片，选择图片成功后点击上传即可

![image-20221111184513293](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora/202211111845372.png)

#### 4.4 记录修改

记录修改直接进行图片相关操作，然后点击重新上传即可， 示例图见  第7部分

#### 4.5 个人信息页面展示

显示总记录数、待审核、待修改次数，示例图见 第7部分



## 5. 程序部署

​		小程序部署在微信服务器上，后端与网页端接口相同。

​		通过将服务器域名添加为可信域名，从微信服务器与后端服务器交换数据，主要步骤如下：

#### 5.1准备工作

1. 购买云服务器

    用于部署后端服务

2. 购买域名 

    小程序进行前后端通信时，若不适用腾讯提供的云函数，则必须要使用域名，购买后要求备案通过才能使用域名，然后在服务器商平台进行DNS解析。

3. 申请/购买ca证书

​	   微信小程序的接口要求是https，云服务器自带的ca证书没有与域名绑定，因此需要购买ca证书，并将其与上一步的域名绑定。

#### 5.2后端部署及配置

1. 云服务器部署SSL证书

2. 将后端部署到服务器，然后再添加绑定https证书并进行相关设置（主机名填写域名）。

#### 5.3发布微信小程序

通过微信开发平台将开发完成的小程序发布为正式版，同时设置相关通信api，由于微信小程序的请求url的格式不能出现ip和端口，并且要求https协议，将小程序的代码的所有请求的url改为https+域名的形式。

#### 5.4微信小程序官方配置

小程序要求程序中使用到所有外部链接(https)必须将域名提前配置到微信平台，配置具有https协议的request，socket等域名。

## 6.部分代码分析

#### 6.1 微信信息获取代码

​			首先调用`wx.getUserProfile()`获取微信的用户基本信息（昵称，简介，用户图像`url`链接等），同时调用`wx.login()`获取`login:code`限时安全码，然后调用Get请求`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID(小程序主体id)}&secret=${SECRET(小程序秘钥)}&js_code=${login:code(限时安全码)}`即可获取`openid`，即辨识每一个微信用户（所有微信用户有且仅有一个`openid`，且互不相同）,同时类似的，获取用户授权获得手机号码， 然后传给后端，后端检测是否已注册以及根据手机号码判断是否已有档案在医生处注册。

![image-20221030225626340](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302256398.png)

#### 6.2 特殊代码展示·

* request请求代码格式

    ![](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302300501.png)

* 阿里云组件

    ​	主要图片格式base64组件与一些签名加密组件：base64.js，config.js, crypto.js,  sha1.js,  hmac.js

    ![image-20221030230952710](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302309752.png)

    ![image-20221030230659811](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302306873.png)

    ![image-20221030230925551](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302309598.png)

* 图片操作函数代码

    ![image-20221030231140666](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302311727.png)

![image-20221030231111671](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302311717.png)

## 7. 部分整体代码展示

![image-20221030231416904](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302314993.png)

* 随访记录表前端代码

![image-20221030231508020](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302315107.png)

* 图片处理操作示例

    ![image-20221030231619073](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302316165.png)

![image-20221030231711419](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302317516.png)

![image-20221030231741677](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora%2F202210302317764.png)



## 8. 截图展示

![image-20221111182525301](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora/202211111825346.png)

![image-20221111182558549](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora/202211111825592.png)

![image-20221111182614532](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora/202211111826583.png)

![image-20221111182633862](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora/202211111826921.png)

![image-20221111182655125](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora/202211111826169.png)

![image-20221111182711676](https://typora-1303953674.cos.ap-nanjing.myqcloud.com/typora/202211111827724.png)