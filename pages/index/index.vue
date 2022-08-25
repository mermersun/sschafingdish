<template>
	<view>
		<ssGoTop></ssGoTop>
		<!-- 标题 -->
		<text class="title">涮涮餐饮</text>
		<!-- 横向滚动内容 -->
		<view class="top">
			<scroll-view scroll-x="true" class="scroll">
				<view class="scroll-item" v-for="item in foodAllList" :key="item.id">
					<uni-card margin="0">
						<view class="pic">
							<image class="tp" :src="$URL+item.picture" mode="scaleToFill"></image>
						</view>
						<view class="bottom">
							<view>
								<text>{{item.name}}</text>
								<view>
									<text>{{item.min}} - {{item.max}}人</text>
									<text>月销量：{{item.sale}}</text>
								</view>
								<view>
									<text>￥{{item.price}}</text>
									<text>￥{{item.orprice}}</text>
								</view>
							</view>
							<image class="add" src="../../static/img/add.png" mode="widthFix"></image>
						</view>
					</uni-card>
				</view>
			</scroll-view>
		</view>
		<!-- 小tips -->
		<view class="serve">
			<uni-card padding="5px">
				<view class="card">
					<image class="pic" src="../../static/img/index01.png" mode="widthFix"></image>
					<view class="serve_rig">
						<text class="one">堂食点餐</text>

						<text class="two">在线点餐</text>

					</view>
				</view>
			</uni-card>
			<uni-card padding="5px">
				<view class="card">
					<image class="pic" src="../../static/img/index02.png" mode="widthFix"></image>
					<view class="serve_rig">
						<text class="one">打包提走</text>

						<text class="two">节省时间</text>

					</view>
				</view>
			</uni-card>
		</view>
		<!-- 选择栏 -->
		<view class="choose">
			<view>
				<text @click="recommend" :class="{active:activenum==1}">店长推荐</text>
			</view>
			<view>
				<text @click="type1" :class="{active:activenum==2}">美味小吃</text>
			</view>
			<view>
				<text @click="type2" :class="{active:activenum==3}">美味荤菜</text>
			</view>
			<view>
				<text @click="empty" :class="{active:activenum==4}">人气套餐</text>
			</view>
		</view>
		<!-- 内容 -->
		<view class="content">
			<view v-for="item in foodList" :key="item.id">
				<view>
					<image :src="$URL+item.picture" mode=""></image>
				</view>
				<view>
					<view>
						<text>{{item.name}}</text>
						<view>
							<text>￥{{item.price}}</text>
							<text>￥{{item.orprice}}</text>
						</view>
					</view>
					<image src="../../static/img/add.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		foodsType
	} from '@/service/index.js'
	import {
		foodsRecommend
	} from '@/service/index.js'
	import {
		foods
	} from '@/service/index.js'
	export default {
		data() {
			return {
				activenum: 1, //激活标签
				foodAllList: [], //所有菜品
				foodList: [], //筛选菜品
			}
		},
		async onLoad() {
			this.recommend()
			//加载所有菜品
			let res = await foods()
			console.log('所有菜品', res);
			this.foodAllList = res.data
		},
		methods: {
			empty() {
				uni.showToast({
					title: '暂无套餐',
					icon: 'error'
				})
			},
			//店长推荐
			async recommend() {
				let res = await foodsRecommend()
				console.log('店长推荐', res);
				this.foodList = res.data
				this.activenum = 1
			},
			//类型小吃
			async type1() {
				let res = await foodsType('小吃')
				console.log('小吃', res);
				this.foodList = res.data
				this.activenum = 2
			},
			//类型荤菜
			async type2() {
				let res = await foodsType('荤菜')
				console.log('荤菜', res);
				this.foodList = res.data
				this.activenum = 3
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.title {
		display: inline-block;
		font-weight: bold;
		font-size: 20px;
		margin: 50rpx 0 30rpx 30rpx;
	}

	.top {

		.scroll {
			white-space: nowrap;
			/*必须要有，规定段落中的文本不进行换行*/
		}

		.scroll-item {
			display: inline-block;
			width: 90%;
			padding-left: 40rpx;
		}

		.pic {
			text-align: center;
			margin: 30rpx 0;

			.tp {
				width: 450rpx;
				height: 450rpx;
				border-radius: $ss-border-radius-circle;
			}
		}

		.bottom {
			display: flex;
			justify-content: space-between;

			&>view {
				&>text {
					font-weight: bold;
					color: #000;
					font-size: 18px;
				}

				&>view:nth-child(2) {
					&>text {
						font-size: $ss-font-size-sm;
						margin-right: 40rpx;
						color: #999;
					}
				}

				&>view:last-child {
					margin-top: 10rpx;

					&>text:first-child {
						color: $ss-theme;
						font-weight: bold;
						font-size: 22px;
						margin-right: 10rpx;
					}

					&>text:last-child {
						font-size: $ss-font-size-base;
						color: #999;
						text-decoration: line-through;
					}
				}
			}
		}

		.add {
			width: 70rpx;
			margin-top: 60rpx;
			margin-right: 20rpx;
		}
	}

	.serve {
		display: flex;

		& .card {
			display: flex;
			align-items: center;
			justify-content: space-evenly;

			.pic {
				width: 90rpx;
			}

			.serve_rig {
				display: flex;
				flex-direction: column;
				align-items: center;

				.one {
					color: #000;
					font-weight: bold;
				}

				.two {
					font-size: $ss-font-size-sm;
					color: #999;
				}
			}
		}
	}

	.choose {
		display: flex;

		&>view {
			flex: 1;
			text-align: center;
			line-height: 80rpx;

			&>text {
				border-bottom: 2px solid transparent;
				padding-bottom: 8rpx;
				font-size: $ss-font-size-sm;
				color: #000;

				&.active {
					font-size: $ss-font-size-lg;
					font-weight: bold;
				}
			}
		}
	}

	.content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 30rpx;
		overflow-y: scroll;

		&>view {
			margin-bottom: 50rpx;
			width: 320rpx;
			background-color: $ss-bg-color;
			display: flex;
			flex-direction: column;
			border-radius: 20rpx;
			box-shadow: 0 0 15rpx #ddd;
			height: 400rpx;


			&>view:first-child {
				width: 100%;
				text-align: center;
				padding-top: 50rpx;

				&>image {
					height: 200rpx;
					width: 200rpx;
					border-radius: $ss-border-radius-circle;
				}
			}

			&>view:last-child {
				margin: 30rpx 0;
				display: flex;
				align-items: flex-end;
				justify-content: space-around;

				&>image {
					width: 50rpx;
					margin-bottom: 10rpx;
				}

				&>view:first-child {

					&>text {
						font-weight: bold
					}

					&>view {
						&>text:first-child {
							color: $ss-theme;
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
			}
		}
	}
</style>
