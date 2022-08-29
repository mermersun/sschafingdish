<template>
	<view>
		<uni-transition :styles="{position: 'absolute',width:'100%'}" mode-class="slide-left"
			:show="curComponent==='login'">
			<Login @showChild="toChild"></Login>
		</uni-transition>

		<uni-transition :styles="{position: 'absolute',width:'100%'}" mode-class="slide-right"
			:show="curComponent==='register'">
			<Register @showChild="toChild"></Register>
		</uni-transition>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curComponent: 'login'
			}
		},
		methods: {
			toChild(data) {
				console.log(data.childName);
				this.curComponent = data.childName
			}
		}
	}
</script>

<style>
</style>
