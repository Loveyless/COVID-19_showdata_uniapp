<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url:""
			};
		},
		onLoad(data) {
			this.url = data.url
		}
	}
</script>

<style lang="less">

</style>
