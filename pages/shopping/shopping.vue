<template>
	<view>
		<view class="top"></view>
		<view class="content">
			<view v-for="i in 9">
				<label class="radio">
					<radio style="transform:scale(0.8)" color="#f0931f" value="r1" checked="true" />
				</label>
				<image src="../../static/img/hg.png" mode="widthFix"></image>
				<view>
					<text>美味铁锅饭</text>
					<text>补身 滋养多多</text>
					<view>
						<text>￥25.2</text>
						<text>￥30.5</text>
					</view>
				</view>
				<view>
					<image src="../../static/img/reduce.png" mode="widthFix"></image>
					<text>1</text>
					<image src="../../static/img/add2.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="bottom">
			<label class="radio">
				<radio style="transform:scale(0.8)" color="#f0931f" value="r1" checked="true" />
			</label>
			<text>全选</text>
			<text>合计:</text>
			<text>￥128.5</text>
			<view>
				<text>去结算</text>
				<image src="../../static/img/right.png" mode="widthFix"></image>
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

		}
	}
</script>

<style lang="scss">
	.top {
		// position: fixed;
		// top: 50rpx;
		height: 100rpx;
		background-color: #f0931f;
		border-radius: 0 0 80rpx 80rpx;
	}

	.content {
		position: absolute;
		top: 50rpx;
		left: 25rpx;
		width: 700rpx;
		box-shadow: 0 0 15rpx #ddd;
		background-color: #fff;
		border-radius: 20rpx;
		height: 980rpx;
		overflow-y: scroll;

		& image {
			width: 130rpx;
			margin: 0 20rpx;
		}

		&>view {
			display: flex;
			align-items: center;
			padding: 30rpx;


			&>view:nth-child(3) {
				display: flex;
				flex-direction: column;
				margin: 0 30rpx;

				&>text:first-child {
					font-weight: bold;
				}

				&>text:nth-child(2) {
					font-size: $ss-font-size-sm;
					color: #999;
				}

				&>view {
					&>text:first-child {
						color: #f0931f;
						font-size: $ss-font-size-base;
						font-weight: bold;
						margin-right: 10rpx;
					}

					&>text:last-child {
						font-size: $ss-font-size-sm;
						color: #999;
						text-decoration: line-through;
					}
				}
			}

			&>view:last-child {
				display: flex;
				align-items: center;
				margin-left: 30rpx;
				margin-top: 60rpx;

				&>image {
					width: 38rpx;
				}
			}
		}


	}

	.bottom {
		position: fixed;
		bottom: 100rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 0 15rpx #ddd;
		background-color: #fff;
		padding: 10rpx 20rpx;
		width: 100%;

		&>text:nth-child(2) {
			color: #999;
			font-size: $ss-font-size-sm;
		}

		&>text:nth-child(3) {
			color: #000;
			font-size: $ss-font-size-sm;
			font-weight: bold;
			margin-left: 40rpx;

		}

		&>text:nth-child(4) {
			color: $ss-theme;
			font-size: $ss-font-size-base;
			font-weight: bold;
			flex: 1;

		}

		&>view {
			display: flex;
			background-color: $ss-theme;
			border-radius: 40rpx;
			align-items: center;
			margin-left: 210rpx;
			padding: 15rpx 20rpx;

			&>text {
				color: #fff;
				font-size: $ss-font-size-sm;
			}

			&>image {
				width: 30rpx;
			}
		}
	}
</style>
