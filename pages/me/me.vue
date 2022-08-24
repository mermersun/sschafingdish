<template>
	<view>
		<view class="top">
			<view>
				<image src="../../static/img/tx.jpg" mode="widthFix"></image>
				<view>
					<!-- <text style="display: block;">这里是昵称</text>
					<text>id：1234567</text> -->
					<text @click="goLogin">登录</text>
					<text>|</text>
					<text @click="goRegister">注册</text>
				</view>
				<image src="../../static/img/set.png" mode="widthFix"></image>
			</view>
			<view>
				<view>
					<text>￥99.95</text>
					<text>我的余额</text>
				</view>
				<view>
					<text>32</text>
					<text>积分</text>
				</view>
				<view>
					<text>10</text>
					<text>优惠券</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view>
				<text>我的订单</text>
				<view>
					<text>全部订单</text>
					<image src="../../static/img/forward.png" mode="widthFix">
				</view>
			</view>
			<view>
				<view>
					<image src="../../static/img/01.png" mode="widthFix">
						<text>待付款</text>
				</view>
				<view>
					<image src="../../static/img/02.png" mode="widthFix">
						<text>待出货</text>
				</view>
				<view>
					<image src="../../static/img/03.png" mode="widthFix">
						<text>待使用</text>
				</view>
				<view>
					<image src="../../static/img/04.png" mode="widthFix">
						<text>已完成</text>
				</view>
			</view>
			<view>
				<text>我的服务</text>
				<view>
					<image src="../../static/img/1.png" mode="widthFix">
						<text>我的余额</text>
						<image src="../../static/img/forward.png" mode="widthFix">
				</view>
				<view>
					<image src="../../static/img/2.png" mode="widthFix">
						<text>我的收藏</text>
						<image src="../../static/img/forward.png" mode="widthFix">
				</view>
				<view>
					<image src="../../static/img/3.png" mode="widthFix">
						<text>优惠券</text>
						<image src="../../static/img/forward.png" mode="widthFix">
				</view>
				<view>
					<image src="../../static/img/4.png" mode="widthFix">
						<text>联系客服</text>
						<image src="../../static/img/forward.png" mode="widthFix">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			//跳转到登录页
			goLogin() {
				uni.navigateTo({
					url: "/pages/userCenter/userCenter?section=login"
				})
			},
			//跳转到注册页
			goRegister() {
				uni.navigateTo({
					url: "/pages/userCenter/userCenter?section=register"
				})
			}
		}
	}
</script>

<style lang="scss">
	.top {
		height: 380rpx;
		background-color: $ss-theme;
		color: $uni-text-color-inverse;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 30rpx;

		&>view:first-child {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 0;

			&>image:first-child {
				width: 160rpx;
				border-radius: $ss-border-radius-circle;
			}

			&>view {
				flex: 1;
				padding: 15rpx;

				&>text {
					padding: 8rpx;
				}
			}

			&>image:last-child {
				width: 55rpx;
			}
		}

		&>view:last-child {
			display: flex;
			justify-content: space-evenly;

			&>view {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 200rpx;
				height: 160rpx;

				&>text:first-child {
					font-size: 1.5em;
				}

				&>text:last-child {
					font-size: $ss-font-size-sm;
				}
			}
		}
	}

	.content {
		height: 640rpx;

		&>view:first-child {
			display: flex;
			justify-content: space-between;
			line-height: 80rpx;
			padding: 0 30rpx;

			&>text {
				font-weight: bold;
				color: #000;
			}

			&>view {
				display: flex;
				align-items: center;

				&>text {
					font-size: $ss-font-size-sm;
					color: $uni-text-color-grey;

				}

				&>image {
					width: 25rpx;
				}
			}

		}

		&>view:nth-child(2) {
			display: flex;

			&>view {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				&>text {
					font-size: $ss-font-size-sm;
				}

				&>image {
					width: 80rpx;
				}
			}
		}

		&>view:last-child {
			&>text {
				font-weight: bold;
				color: #000;
				line-height: 80rpx;
				padding: 0 30rpx;
			}

			&>view {
				line-height: 90rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx;

				&:active {
					background-color: #eee;
				}

				&>image:first-child {
					width: 45rpx;
					margin-right: 20rpx;
				}

				&>text {
					flex: 1;
					color: #000;
				}

				&>image:last-child {
					width: 25rpx;
				}
			}
		}
	}
</style>
