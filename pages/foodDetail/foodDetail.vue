<template>
	<view v-if="foodDetail">
		<!-- 顶部 -->
		<uni-card is-full padding="0" spacing="0" :border="false">
			<!-- 详情图 -->
			<view class="swiper" v-if="this.pictureList">
				<swiper indicator-dots indicator-active-color="#f0931f">
					<swiper-item>
						<image :src="$URL+this.pictureList[0]" mode="aspectFill"></image>
					</swiper-item>
					<swiper-item>
						<image :src="$URL+this.pictureList[1]" mode="aspectFill"></image>
					</swiper-item>
					<swiper-item>
						<image :src="$URL+this.pictureList[2]" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 标题文字部分 -->
			<view class="title">
				<view>
					<text>{{foodDetail.name}}</text>
					<view class="tag-view">
						<uni-tag type="warning" :inverted="true" :circle="true" text="HOT" size="mini" />
					</view>
				</view>
				<view>
					<text>{{foodDetail.tagline}}</text>
				</view>
				<view>
					<view>
						<text>￥{{foodDetail.price|num}}</text>
						<text>￥{{foodDetail.orprice}}</text>
					</view>
					<text>库存:{{foodDetail.stock}}件</text>
				</view>
			</view>
		</uni-card>
		<!-- 中间 -->
		<view class="middle">
			<uni-list>
				<uni-list-item link title="满50减10 满100减25"></uni-list-item>
				<uni-list-item link note="-请选择-"></uni-list-item>
			</uni-list>
		</view>
		<!-- 详情 -->
		<view class="cover">
			<view class="detail">—— ·商品详情· ——</view>
			<view class="detail-bottom">
				<uni-card is-full>
					<image class="pic" :src="$URL+foodDetail.picture_bot" mode="aspectFill"></image>
				</uni-card>
			</view>
		</view>
		<!-- 底部 -->
		<view class="goods-carts">
			<uni-goods-nav @click="onClick" :options="options" :fill="true" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		ShopName
	} from '@/service/index.js'
	import {
		shoppingCount
	} from '@/service/index.js'
	import {
		foodAdd
	} from '@/service/index.js'
	import {
		foodsDetail
	} from '@/service/index.js'
	export default {
		data() {
			return {
				pictureList: [],
				foodDetail: {}, //菜品详情
				//底部导航栏
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0,
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
				customButtonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
						color: '#fff'
					}
				],
			}
		},
		onLoad(data) {
			console.log('上一个页面传过来的参数', data);
			// let fid = data.id
			let fname = data.name
			if (!fname) {
				uni.switchTab({
					url: '/pages/index/index'
				})
				return
			}
			this.loadFoodDetailName(fname)
			this.shoppingcount()
		},
		filters: {
			num: function(value) {
				if (!isNaN(value)) {
					return ((value + '').indexOf('.') != -1) ? value : value.toFixed(2);
				}
			}
		},
		methods: {
			//点击加入购物车
			async buttonClick(e) {
				// console.log(e)
				this.options[2].info++
				let res = await foodAdd(this.foodDetail.picture, this.foodDetail.name, this.foodDetail.price, this
					.foodDetail.orprice, this.foodDetail.tagline, 1)
				console.log('点击加入购物车', res);
			},
			//点击购物车图标
			onClick(e) {
				uni.switchTab({
					url: '/pages/shopping/shopping'
				})
			},
			//查询购物车菜品数量
			async shoppingcount() {
				let res = await shoppingCount()
				console.log('查询购物车菜品数量', res);
				this.options[2].info = res.data[0].totle
			},
			//根据菜品id查询菜品详情
			// async loadFoodDetail(id) {
			// 	let res = await foodsDetail(id)
			// 	console.log('根据菜品id查询菜品详情', res);
			// 	this.foodDetail = res.data[0]
			// 	uni.setNavigationBarTitle({
			// 		title: res.data[0].name
			// 	})
			// },
			// 根据名字查询菜品详情
			async loadFoodDetailName(name) {
				let res = await ShopName(name)
				console.log('根据名字查询菜品详情', res);
				this.foodDetail = res.data[0]
				this.pictureList = res.data[0].picture_top.split(',')
				uni.setNavigationBarTitle({
					title: res.data[0].name
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		text-align: center;
		height: 660rpx;

		&>swiper {
			height: 100%;

			& image {
				// margin-top: 20rpx;
				height: 580rpx;
				width: 100%;
				// border-radius: $ss-border-radius-circle;
			}
		}

	}

	.title {
		padding: 0 15px 10px 15px;

		&>view:first-child {
			display: flex;

			&>text {
				font-weight: bold;
				color: #000;
				margin-right: 20rpx;
				padding-top: 5rpx;
			}
		}

		&>view:nth-child(2) {
			font-size: $ss-font-size-sm;
			color: #999;
		}

		&>view:last-child {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;

			&>view {
				&>text:first-child {
					color: $ss-theme;
					font-size: 20px;
					font-weight: bold;
					margin-right: 20rpx;
				}

				&>text:last-child {
					color: #999;
					font-size: $ss-font-size-sm;
					text-decoration: line-through;
				}
			}

			&>text {
				color: #999;
				font-size: $ss-font-size-sm;
			}
		}
	}

	.middle {
		margin: 20rpx 0;
	}

	.cover {
		padding-bottom: 60px;

		.detail {
			text-align: center;
			color: #000;
			font-size: $ss-font-size-sm;
			font-weight: bold;
			margin-bottom: 20rpx;
		}

		.detail-bottom {

			.pic {
				height: 500px;
				width: 100%;
				margin-bottom: -6px;
			}
		}
	}

	.example-body {
		padding: 0;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>
