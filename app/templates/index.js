/**
 * @fileoverview 文件描述，请修改
 * @module deb/<%= widgetName %>/index
 * @autor <%= author %>
 **/
KISSY.add("deb/<%= widgetName %>/index",function (S,Base,Node) {

	"use strict";

	/**
	 * 组件描述
	 * @class <%= className %>
	 *
	 *    var cfg = {
	 *      arg1:"",//视频id
	 *      arg2:"" //视频地址
	 *    }
	 *    new <%= className %>(cfg);
	 *
	 * @constructor
	 * @extends S.Base
	 */
	function <%= className %>(cfg) {
		if (this instanceof <%= className %>) {
			<%= className %>.superclass.constructor.call(this, cfg); // 父类构造器
			this.init(cfg);
		} else {
			return new <%= className %>(cfg);
		}
	}

	//Attribute 配置
	<%= className %>.ATTRS = {
		/**
		 * description
		 * @attribute a
		 * @type Node
		 * @default null
		 */
		a: {
			setter: function(){},
			getter: function(){},
			value: 1
		}
	};

	S.extend(<%= className %>, S.Base, {
	
		init: function(cfg) {
			// 请在这里开始你的代码
			console.log("<%= widgetName %> init");
		},
		/**
		 * 渲染
		 * @method render
		 * @param node {Node} 渲染容器节点
		 */
		render:function(node){
		},
		
		destory: function(){

		}
	});

	return <%= className %>;

}, {
	requires: ['base','node']
});