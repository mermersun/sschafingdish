// 对所有的服务器数据API及访问技术进行二次封装

//服务器端数据API所在的基础URL
export let base = 'http://localhost:5000/'
export let URL = 'http://localhost:7000/'

//POST请求公用选项对象
let post = {
	method: 'POST',
	header: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}

// API 点餐列表-综合
export let foods = async function() {
	let url = base + 'foods'

	uni.showLoading({
		title: '加载中...'
	})
	//发起异步数据请求
	let result = await uni.request({
		url,
	})
	uni.hideLoading()
	return result[1].data
}

// API 点餐列表-综合（分页）
export let foodsFy = async function(page) {
	let url = base + 'foods/fy'

	uni.showLoading({
		title: '加载中...'
	})
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			page
		}
	})
	uni.hideLoading()
	return result[1].data
}

// API 搜索列表
export let foodsLike = async function(name) {
	let url = base + 'foods/like'

	uni.showLoading({
		title: '加载中...'
	})
	//发起异步数据请求
	let result = await uni.request({
		url,
		data: {
			name
		}
	})
	uni.hideLoading()
	return result[1].data
}

// API 销量排序
export let foodsSale = async function() {
	let url = base + 'foods/sale'

	uni.showLoading({
		title: '加载中...'
	})
	//发起异步数据请求
	let result = await uni.request({
		url
	})
	uni.hideLoading()
	return result[1].data
}

// API 价格排序
export let foodsPrice = async function() {
	let url = base + 'foods/price'

	uni.showLoading({
		title: '加载中...'
	})
	//发起异步数据请求
	let result = await uni.request({
		url
	})
	uni.hideLoading()
	return result[1].data
}

// API 新品
export let foodsNew = async function() {
	let url = base + 'foods/new'

	uni.showLoading({
		title: '加载中...'
	})
	//发起异步数据请求
	let result = await uni.request({
		url
	})
	uni.hideLoading()
	return result[1].data
}

// API 推荐
export let foodsRecommend = async function() {
	let url = base + 'foods/recommend'

	uni.showLoading({
		title: '加载中...'
	})
	//发起异步数据请求
	let result = await uni.request({
		url
	})
	uni.hideLoading()
	return result[1].data
}

// API 类型
export let foodsType = async function(type) {
	let url = base + 'foods/type'

	uni.showLoading({
		title: '加载中...'
	})
	//发起异步数据请求
	let result = await uni.request({
		url,
		data: {
			type
		}
	})
	uni.hideLoading()
	return result[1].data
}
