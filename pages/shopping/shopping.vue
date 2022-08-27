<template>
	<view>
		<!-- 固定的头部 -->
		<view class="top"></view>
		<!-- 购物车内容部分 -->
		<view class="content">
			<view v-for="(item,index) in shoppingList">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="options" @click="onClick(item.id)">
						<view class="middle">
							<label>
								<checkbox @click="changes(index)" color="#f0931f"
									:checked="Boolean(shoppingList[index].isselect)" />
							</label>
							<image @click="goDetail(item.name)" :src="$URL+item.picture" mode="aspectFill">
							</image>
							<view @click="goDetail(item.name)">
								<text>{{item.name}}</text>
								<text>{{item.tagline}}</text>
								<view>
									<text>￥{{item.price|num}}</text>
									<text>￥{{item.orprice}}</text>
								</view>
							</view>
							<view>
								<image @click="reduce(item.id,item.name,item.count,index)"
									src="../../static/img/reduce.png" mode="widthFix">
								</image>
								<text>{{item.count}}</text>
								<image @click="add(item.id,item.name,item.count,index)" src="../../static/img/add2.png"
									mode="widthFix">
								</image>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
		<!-- 固定的底部 -->
		<view class="bottom">
			<checkbox-group>
				<label>
					<checkbox @click="allselect" color="#f0931f" :checked="Boolean(isallselect)" />
				</label>
			</checkbox-group>
			<text>全选</text>
			<text>合计:</text>
			<text>￥{{total.toFixed(2)}}</text>
			<view>
				<text>去结算</text>
				<image src="../../static/img/right.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ShopDel
	} from '@/service/index.js'
	import {
		ShopIselect
	} from '@/service/index.js'
	import {
		ShopByID
	} from '@/service/index.js'
	import {
		shopCount
	} from '@/service/index.js'
	import {
		foodUpdate
	} from '@/service/index.js'
	import {
		foodsShopping
	} from '@/service/index.js'
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#f01826'
					}
				}],
				isselect: false,
				isallselect: 0,
				shoppingList: [], //购物车所有菜品列表
			}
		},
		onLoad() {
			this.loadAll()
		},
		onShow() {
			this.loadAll()
			this.isallselect = 0
		},
		filters: {
			num: function(value) {
				if (!isNaN(value)) {
					return ((value + '').indexOf('.') != -1) ? value : value.toFixed(2);
				}
			}
		},
		methods: {
			async onClick(id) {
				//点击选项按钮时触发事件,通过ID删除购物车商品
				//e = {content,index} ，content（点击内容）、index（下标）、position (位置信息)
				let res = await ShopDel(id)
				console.log('通过ID删除购物车商品', res);
				this.loadAll()
				uni.showToast({
					title: '删除成功',
					icon: "none"
				})
			},
			//点击跳转到详情页
			goDetail(name) {
				uni.navigateTo({
					url: '/pages/foodDetail/foodDetail?name=' + name
				})
			},
			//点击加加
			async add(id, name, count, index) {
				count += 1
				let res = await foodUpdate(name, count)
				console.log('点击加加', res);
				let result = await ShopByID(id)
				this.shoppingList[index].count = result.data[0].count
			},
			//点击减减
			async reduce(id, name, count, index) {
				if (count > 1) {
					count -= 1
					let res = await foodUpdate(name, count)
					console.log('点击减减', res);
					let result = await ShopByID(id)
					this.shoppingList[index].count = result.data[0].count
				}
			},
			//查询购物车所有菜品
			async loadAll() {
				let res = await foodsShopping()
				console.log('查询购物车所有菜品', res);
				this.shoppingList = res.data
			},
			//修改购物车状态
			//单选
			changes(index) {
				if (this.shoppingList[index].isselect == 0) {
					this.shoppingList[index].isselect = 1
					const result = this.shoppingList.every((item) => {
						return item.isselect == 1
					})
					if (result) {
						this.isallselect = 1
					}
				} else {
					this.shoppingList[index].isselect = 0
					this.isallselect = 0
				}
				console.log(this.isallselect);
			},
			//全选
			async allselect() {
				this.isallselect = !this.isallselect
				if (this.isallselect == 1) {
					this.shoppingList.forEach(item => {
						item.isselect = 1
					})
				} else {
					this.shoppingList.forEach(item => {
						item.isselect = 0
					})
				}
			},
		},
		computed: {
			total() {
				if (this.shoppingList) {
					return this.shoppingList.reduce((sum, value) =>
						sum + (value.price * value.count * value.isselect), 0)
				}
			},
		},
	}
</script>

<style lang="scss">
	uni-page-body {
		font-size: 16px
	}

	::v-deep .uni-swipe_button[data-v-41bc30c0] {
		height: 130rpx;
	}

	::v-deep [data-v-24f06b86] .uni-swipe_button[data-v-41bc30c0] {
		// height: 120rpx;
	}

	.top {
		height: 100rpx;
		background-color: #f0931f;
		border-radius: 0 0 80rpx 80rpx;
	}

	.content {
		overflow-y: scroll;
		height: 980rpx;
		width: 700rpx;
		position: absolute;
		left: 26rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 15rpx #ddd;
		top: 30rpx;
		background-color: #fff;
		padding: 30rpx;

		&>view {
			height: 150rpx;
			margin: 20rpx 0;
			border-bottom: 1px solid #ccc;

			.middle {
				display: flex;
				align-items: center;



				&>image {
					margin-left: 10rpx;
					width: 150rpx;
					height: 120rpx;
					border-radius: $ss-border-radius-circle;
				}

				&>view:nth-child(3) {
					display: flex;
					flex-direction: column;
					margin: 0 30rpx;
					width: 350rpx;

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
					flex: 1;
					margin-top: 70rpx;

					& image {
						width: 38rpx;
						margin: 0 10rpx;
					}
				}
			}
		}
	}

	.bottom {
		position: absolute;
		bottom: 0px;
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

		&>view:last-child {
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

	.select {
		width: 55rpx;

		::v-deep .uni-data-checklist .checklist-group .checklist-box .checkbox__inner[data-v-84d5d996] {
			width: 20px;
			height: 20px;
			border-radius: $ss-border-radius-circle;
		}

		::v-deep .uni-data-checklist .checklist-group .checklist-box .checkbox__inner .checkbox__inner-icon[data-v-84d5d996] {
			top: 1px;
			left: 5px;
			height: 12px;
			width: 7px;
		}
	}

	::v-deep uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
		border-color: $ss-theme;
	}

	::v-deep uni-checkbox .uni-checkbox-input {
		border-radius: $ss-border-radius-circle;
	}
</style>
