# wordcount
wordcount 是一个统计输入字符(汉字、length)数量的组件。一个汉字两个字符
## 初始化组件

     S.use('node,deb/wordcount/index',function(S,Node,WordCount){
    	var wordcount = new WordCount({
            maxSize: 10
		});
		wordcount.bind({
            input: S.one('#textarea'),
            output: S.one('#text-tip'),
            type: "length"
        },{
        	countdown: '还能输入{over}/10字',  
        	countover: '已经超出{over}个字'
    	});
    });

## Class
 * WordCount  
 
  > WordCount(config)
 
  Parameters: config {Object} --- 配置项
  
## Configs
 *  maxSize  
  {Number} --- 默认30. 最多可以输入的数量   
 * type   
  {String} --- 默认“han”. 长度类型 可选值【han(中文长度)、byte(字符长度)、length(忽略中英文直接取lenght)】  
 * trim  
  {Boolean} --- 默认false. 是否忽略空格
 
## Attributes
  无

## Methods
 * bind() --- 绑定事件,需要实例化类调用
 
 > bind(bundleCfg,tempCfg)
 
 Parameters：
  * bundleCfg {Object} 绑定节点配置  
     * input  {Node} --- 统计内容的Node节点
     * output {Node} --- 统计结果反馈Node节点
  * tempCfg {Object} 计数文案显示模板
     * countdown ---  还剩余字符提示template
     * countover --- 超出提示template
 
 
 * hanCount() --- 计算汉字长度
 * byteCount() --- 计算字符长度
 * count() --- 更具配置计算长度

## Events
 * valuechange --- 值改变时触发
 