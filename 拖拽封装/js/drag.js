(function(w){
	w.$ ={};
	$.drag =function drag(node,flag,value,node2){
		// node:拖拽元素
		// flag:是否限制吸附范围
		// value:吸附范围
		// node2:碰撞元素
				var limit = true;
				var adsorption = 0;
				var startPoint = {x:0,y:0}
				var mousePoint ={x:0,y:0}
				
				node.onmousedown = function(ev){
					ev = ev||event;
					//鼠标点击的时候获取块和鼠标当前的位置
					var mouseDownPoint = {x:0,y:0}
					startPoint.x = this.offsetLeft;
					startPoint.y = this.offsetTop;
					mouseDownPoint.x = ev.clientX;
					mouseDownPoint.y = ev.clientY;
					
					//兼容IE8以下，为node设置全局捕获，把mouseDown中
					//所有点击的方法重新定向到node身上
					//从源头上解决IE8以下浏览器的默认行为
					if(this.setCapture){
						this.setCapture();
					}
					
					document.onmousemove = function(ev){
						ev = ev ||event;
						//鼠标移动的时候获取鼠标实时的位置
						var mouseMovePoint = {x:0,y:0}
						mouseMovePoint.x = ev.clientX;
						mouseMovePoint.y = ev.clientY;
						
						//获取鼠标实时的位置与一开始鼠标的位置之差
						var dis = {x:0,y:0}
						dis.x = mouseMovePoint.x-mouseDownPoint.x;
						dis.y = mouseMovePoint.y-mouseDownPoint.y;
						
						var L = startPoint.x+dis.x;
						var T = startPoint.y+dis.y;
						
						//判断块最终的位置，局限块运动的范围为页面大小
						limit = flag===false?false:true;
						if(limit){
							if(value){
								adsorption = value;
							}
							if(L<adsorption){
									L=0;
								}else if(L>(document.documentElement.clientWidth-node.offsetWidth-adsorption)){
									L=(document.documentElement.clientWidth-node.offsetWidth);
								}
								if(T<adsorption){
									T=0;
								}else if(T>(document.documentElement.clientHeight-node.offsetHeight-adsorption)){
									T=(document.documentElement.clientHeight-node.offsetHeight);
								}
						}
						
						
						if(node2){
							//检测碰撞
							var L1 = node.offsetLeft;
							var T1 = node.offsetTop;
							var R1 = node.offsetLeft + node.offsetWidth;
							var B1 = node.offsetTop + node.offsetHeight;
							
							var L2 = node2.offsetLeft;
							var T2 = node2.offsetTop;
							var R2 = node2.offsetLeft + node2.offsetWidth;
							var B2 = node2.offsetTop + node2.offsetHeight;
							
							//先判断碰不到的条件，比较好找
							if(R1<L2||B1<T2||L1>R2||T1>B2){
								node2.src = "img/aaa.jpg";
							}else{
								node2.src = "img/bbb.jpg";
							}
						}
						
						//块应该移动的位置=块一开始的位置+鼠标鼠标实时的位置与一开始鼠标的位置之差的距离+单位
						node.style.left = L +"px";
						node.style.top = T+"px";
					}
					//鼠标移开时，清楚鼠标移动和自身的事件
					document.onmouseup = function(){
						document.onmousemove = document.onmouseup = null;
						//释放node的全局捕获
						if(document.releaseCapture){
							document.releaseCapture();
						}
					}
					
					//触发以后在阻止默认行为
					return false;
				}
			}
})(window)