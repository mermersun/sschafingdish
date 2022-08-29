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

// API 根据菜品id查询菜品详情
export let foodsDetail = async function(id) {
	let url = base + 'food/detail'

	uni.showLoading({
		title: '加载中...'
	})
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			id
		}
	})
	uni.hideLoading()
	return result[1].data
}

// API 购物车增加第一个商品
export let foodAdd = async function(picture, name, price, orprice, tagline, count) {
	let url = base + 'food/add'
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			picture,
			name,
			price,
			orprice,
			tagline,
			count
		}
	})
	uni.showToast({
		title: '添加成功',
		icon: "none"
	})
	return result[1].data
}

// API 购物车查询所有菜品
export let foodsShopping = async function() {
	let url = base + 'foods/shopping'

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

// API 查询购物车菜品数量
export let shoppingCount = async function() {
	let url = base + 'shopping/count'
	//发起异步数据请求
	let result = await uni.request({
		url,
	})
	return result[1].data
}

// API 修改购物车菜品数量
export let foodUpdate = async function(name, count) {
	let url = base + 'food/update'
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			name,
			count
		}
	})
	return result[1].data
}

// API 通过ID查询购物车商品
export let ShopByID = async function(id) {
	let url = base + 'shopById'
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			id
		}
	})
	return result[1].data
}


// API 修改购物车商品状态
export let ShopIselect = async function(isselect, id) {
	let url = base + 'shop/isselect'
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			isselect,
			id
		}
	})
	return result[1].data
}

// API 通过购物车商品名字查询详情商品
export let ShopName = async function(name) {
	let url = base + 'shop/name'
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			name
		}
	})
	return result[1].data
}

// API 通过商品名称查询是否存在该商品
export let IsShopName = async function(name) {
	let url = base + 'isshop/name'
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			name
		}
	})
	return result[1].data
}

// API 通过ID删除购物车商品
export let ShopDel = async function(id) {
	let url = base + 'shop/del'
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			id
		}
	})
	return result[1].data
}

// API 登录
export let Login = async function(username, password) {
	let url = base + 'login'
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			username,
			password
		}
	})
	return result[1].data
}

// API 注册
export let Register = async function(username, password, email) {
	let url = base + 'register'
	//发起异步数据请求
	let result = await uni.request({
		url,
		...post,
		data: {
			username,
			password,
			email
		}
	})
	return result[1].data
}
