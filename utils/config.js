//阿里云配置

var fileHost = "https://sakucy.oss-cn-shanghai.aliyuncs.com/";//你的阿里云地址最后面跟上一个/  
var config = {
   //aliyun OSS config
   uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
   AccessKeySecret: 'exUp9LbRGQWVVXusDCTgez5KCS11Qb',        // AccessKeySecret 去你的阿里云上控制台上找
   OSSAccessKeyId: 'LTAI5t8hmN7idVoHB75bkbB2',         // AccessKeyId 去你的阿里云上控制台上找
   timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config