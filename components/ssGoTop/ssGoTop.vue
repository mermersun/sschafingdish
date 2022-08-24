<template>
	<view class="go-top" @click="go">
		<!-- 使用uni-ui组件库中的组件 -->
		<uni-icons type="arrow-up" size="30" color="#666"></uni-icons>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			//回到顶部
			go() {
				uni.pageScrollTo({
					scrollTop:0,
					duration:300
				})
			}
		},
	}
</script>

<style lang="scss">
	.go-top {
		position: fixed;
		right: 15rpx;
		bottom: 150rpx;
		border: 1px solid $ss-border-color;
		border-radius: $ss-border-radius-circle;
		background-color: #fff;
		opacity: $ss-opacity-disabled + 0.4;
		&:active {
			opacity: 1;
		}
	}
</style>
