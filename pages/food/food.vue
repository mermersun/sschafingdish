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
				<text @click="choosesynthesize" :class="{active:activenum==1}">综合</text>
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
		<!-- 没有更多数据了 -->
		<uni-load-more :status="isLoading ? 'loading' : (hasMore ? 'more' : 'noMore')" />
	</view>
</template>

<script>
	import {
		foodsFy
	} from '@/service/index.js'
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
				foodList: [], //分页加载菜品
				foodLikeList: [], //查询菜品
				page: 0, //当前加载到哪一页了
				isLoading: false, //当前是否正在加载下一页数据
				hasMore: true, //还有更多数据可供加载吗
			}
		},
		onLoad() {
			//加载所有菜品
			this.synthesize()
		},
		onReachBottom() {
			this.synthesize()
		},
		async onPullDownRefresh() { //生命周期方法：页面顶部下拉刷新
			//console.log('用户在页面顶部下拉刷新了');
			//刷新：丢弃当前已经查询的所有数据，重新加载第1页
			this.page = 0 //当前加载到第0页了
			this.foodList = [] //清除之前已经加载的所有数据
			this.hasMore = true //当前还有更多数据可供加载
			await this.synthesize() //开始加载下一页数据——调用情形③
			//等到新数据加载完成，隐藏掉页面顶部“加载中”动画
			uni.stopPullDownRefresh()
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
			async choosesynthesize() {
				let res = await foods()
				console.log('综合排序', res);
				this.foodList = res.data
			},
			//分页加载菜品
			async synthesize() {
				this.activenum = 1
				if (!this.hasMore || this.isLoading) {
					return //如果“没有更多数据”或者“当前正在加载中”，就不要继续加载了
				}
				// //开始加载下一页数据
				this.isLoading = true //开始加载....
				let page = this.page + 1 //此处没有使用this.page++；无需修改this.page
				let res = await foodsFy(page)
				console.log('分页加载菜品', res);
				if (res.data.result.length > 0) { //只要此次查询到了数据，就应该保存下来
					this.foodList = [...this.foodList, ...res.data.result] //在已经加载的数据尾部追加新拿到的数据
				}
				if (res.data.page < res.data.pageCount) { //当前页号还小于总页数
					this.hasMore = true //还有更多数据可供加载
					this.page = res.data.page
				} else { //当前页号已经大于或等于总页数
					this.hasMore = false //没有更多数据了
					this.page = res.data.page
				}
				this.isLoading = false //加载完毕
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
		padding: 30rpx 30rpx 0 30rpx;

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
