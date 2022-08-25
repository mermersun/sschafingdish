<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search-bar">
			<!-- 搜索框 -->
			<uni-search-bar radius="20" placeholder="请输入菜品" clearButton="auto" cancelButton="none"
				@confirm="beginSearch" @clear="clearList" @input="searchList">
			</uni-search-bar>
			<!-- 搜索栏列表 -->
			<view class="search-list">
				<uni-list>
					<uni-list-item v-for="item in foodLikeList" :key="item.id" :title="item.name" link
						:thumb="$URL+item.picture" :to="'/pages/foodDetail/foodDetail?id='+item.id" />
				</uni-list>
			</view>
		</view>
		<!-- 选择栏 -->
		<view class="choose">
			<view>
				<text @click="synthesize" :class="{active:activenum==1}">综合</text>
			</view>
			<view>
				<text @click="sale" :class="{active:activenum==2}">销量</text>
			</view>
			<view>
				<text @click="price" :class="{active:activenum==3}">价格</text>
			</view>
			<view>
				<text @click="fnew" :class="{active:activenum==4}">新品</text>
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
							<text>￥{{item.price|num}}</text>
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
		foodsNew
	} from '@/service/index.js'
	import {
		foodsPrice
	} from '@/service/index.js'
	import {
		foodsSale
	} from '@/service/index.js'
	import {
		foods
	} from '@/service/index.js'
	import {
		foodsLike
	} from '@/service/index.js'
	export default {
		data() {
			return {
				activenum: 1, //激活标签
				foodList: [], //所有菜品
				foodLikeList: [], //查询菜品
			}
		},
		async onLoad() {
			//加载所有菜品
			let res = await foods()
			console.log('所有菜品', res);
			this.foodList = res.data
		},
		filters: {
			num: function(value) {
				if (!isNaN(value)) {
					return ((value + '').indexOf('.') != -1) ? value : value.toFixed(2);
				}
			}
		},
		methods: {
			//失去焦点和点击消除
			clearList() {
				this.foodLikeList = []
			},
			//边输入边响应
			async searchList(data) {
				let res = await foodsLike(data)
				console.log('响应', res);
				this.foodLikeList = res.data
			},
			// 点击确定 通过模糊查询搜索菜品
			async beginSearch(data) {
				if (!data.value.trim()) {
					uni.showModal({
						title: '错误',
						content: '菜品搜索不能为空',
						showCancel: false
					})
					return
				}
				let res = await foodsLike(data.value)
				console.log('通过模糊查询搜索菜品', res);
				if (res.data.length) {
					this.foodLikeList = res.data
				} else {
					uni.showToast({
						duration: 3000,
						icon: 'none',
						title: '没有查询到相关菜品'
					})
				}
			},
			//综合排序
			async synthesize() {
				let res = await foods()
				console.log('综合菜品', res);
				this.foodList = res.data
				this.activenum = 1
			},
			//销量排序
			async sale() {
				let res = await foodsSale()
				console.log('销量排序', res);
				this.foodList = res.data
				this.activenum = 2
			},
			//价格排序
			async price() {
				let res = await foodsPrice()
				console.log('价格排序', res);
				this.foodList = res.data
				this.activenum = 3
			},
			//新品
			async fnew() {
				let res = await foodsNew()
				console.log('新品', res);
				this.foodList = res.data
				this.activenum = 4
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.search-bar {
		position: relative;
		margin: 0 20rpx;

		.search-list {
			z-index: 10;
			position: absolute;
			top: 50px;
			width: 100%;
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
					border-bottom-color: $ss-theme;
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
		height: 1000rpx;

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
