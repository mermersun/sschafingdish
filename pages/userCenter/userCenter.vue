<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item :right-options="options" @click="onClick">

			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '确认',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		methods: {
			onClick(e) {
				//点击选项按钮时触发事件	
				//e = {content,index} ，content（点击内容）、index（下标）、position (位置信息)
			},
			swipeChange(e) {
				//组件打开或关闭时触发	
				// left:左侧 ，right：右侧，none：关闭
			}
		}
	}
</script>

<style>

</style>
