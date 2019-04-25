<template>
	<div class="add_css">
		<div>土地所在地址：<input v-model="form_add.location"></input></div>
		<div>所种农作物：<input v-model="form_add.crops"></input></div>
		<div>占地面积：<input v-model="form_add.floor_space"></input></div>
		<div>建筑限高：<input v-model="form_add.max_height"></input></div>
		<div>租赁年限/月：<input v-model="form_add.lease_month"></input></div>
		<div>空置面积：<input v-model="form_add.vacant_area"></input></div>
		<div>备注：<input v-model="form_add.remark"></input></div>
		<el-button @click="add_landsource">提交</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form_add: {
					location: '',
					crops: '',
					floor_space: '',
					max_height: '',
					lease_month: "",
					vacant_area: "",
					remark: "",
					state: ""
				        },
				data: ""
			}
		},
		methods: {
			add_landsource() {
				var _this = this
				_this.data = {
					location: _this.form_add.location,
					crops: _this.form_add.crops,
					floor_space: _this.form_add.floor_space,
					max_height: _this.form_add.max_height,
					lease_month: _this.form_add.lease_month,
					vacant_area: _this.form_add.vacant_area,
					remark: _this.form_add.remark,
					user_id: localStorage.getItem("user_id")
				}
				_this.$axios({
					url: "http://192.168.20.67:8001/api/create_land_resource/",
					method: "POST",
					data: _this.data
				}).then((res) => {
					_this.$router.push({
						path: '/land_resource'
					})
				})

			}
		}
	}
</script>

<style>

</style>
