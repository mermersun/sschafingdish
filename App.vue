<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 选中页面中所有元素 */
	:not(not){
		box-sizing: border-box;
	}
	/* 对页面进行基础设置 */
	page{
		background-color: $ss-bg-color;
		color: $ss-text-color;
		font-size: $ss-font-size-base;
	}
</style>
