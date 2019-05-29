<template>
	<div class="add_css" v-if="from_path == 'land_resource'">
		<div>土地所在地址：<input v-model="form_addland.location"></input></div>
		<div>所种农作物：<input v-model="form_addland.crops"></input></div>
		<div>占地面积：<input v-model="form_addland.floor_space"></input></div>
		<div>建筑限高：<input v-model="form_addland.max_height"></input></div>
		<div>租赁年限/月：<input v-model="form_addland.lease_month"></input></div>
		<div>空置面积：<input v-model="form_addland.vacant_area"></input></div>
		<div>备注：<input v-model="form_addland.remark"></input></div>
		<el-button @click="add_source">提交</el-button>
	</div>
	<!-- <div class="add_css" v-if="from_path == 'plant_resource'">
		<div>厂房名称：<input v-model="form_addplant.name"></input></div>
		<div>厂房所在地址：<input v-model="form_addplant.location"></input></div>
		<div>建筑面积：<input v-model="form_addplant.covered_area"></input></div>
		<div>占地面积：<input v-model="form_addplant.floor_space"></input></div>
		<div>有无产证：<input v-model="form_addplant.produce_evidence"></input></div>
		<div>租赁年限/月：<input v-model="form_addplant.lease_month"></input></div>
		<div>空置面积：<input v-model="form_addplant.vacant_area"></input></div>
		<div>备注：<input v-model="form_addplant.remark"></input></div>
		<el-button @click="add_source">提交</el-button>
	</div> -->
	<!-- <div class="add_css" v-if="from_path == 'building_resource'">
		<div>楼宇名称：<input v-model="form_addbuilding.name"></input></div>
		<div>楼宇所在地址：<input v-model="form_addbuilding.location"></input></div>
		<div>层数：<input v-model="form_addbuilding.plies"></input></div>
		<div>建筑面积：<input v-model="form_addbuilding.covered_area"></input></div>
		<div>占地面积：<input v-model="form_addbuilding.floor_space"></input></div>
		<div>有无产证：<input v-model="form_addbuilding.produce_evidence"></input></div>
		<div>租赁年限/月：<input v-model="form_addbuilding.lease_month"></input></div>
		<div>空置面积：<input v-model="form_addbuilding.vacant_area"></input></div>
		<div>备注：<input v-model="form_addbuilding.remark"></input></div>
		<el-button @click="add_source">提交</el-button>
	</div> -->
	<!-- <div class="add_css" v-if="from_path == 'store_resource'">
		<div>商铺名称：<input v-model="form_addstore.name"></input></div>
		<div>商铺所在地址：<input v-model="form_addstore.location"></input></div>
		<div>商铺类型：<input v-model="form_addstore.store_type"></input></div>
		<div>占地面积：<input v-model="form_addstore.floor_space"></input></div>
		<div>有无产证：<input v-model="form_addstore.produce_evidence"></input></div>
		<div>租赁年限/月：<input v-model="form_addstore.lease_month"></input></div>
		<div>空置面积：<input v-model="form_addstore.vacant_area"></input></div>
		<div>备注：<input v-model="form_addstore.remark"></input></div>
		<el-button @click="add_source">提交</el-button>
	</div> -->
</template>

<script>
	export default {
		data() {
			return {
				form_addland: {
					location: '',
					crops: '',
					floor_space: '',
					max_height: '',
					lease_month: "",
					vacant_area: "",
					remark: "",
				},
				form_addplant: {
					name: "",
					location: '',
					floor_space: '',
					covered_area: '',
					produce_evidence: "",
					lease_month: "",
					vacant_area: "",
					remark: "",
				},
				form_addbuilding: {
					name: "",
					location: '',
					plies: "",
					floor_space: '',
					covered_area: '',
					produce_evidence: "",
					lease_month: "",
					vacant_area: "",
					remark: "",
				},
				form_addstore: {
					name: "",
					location: '',
					store_type: "",
					floor_space: '',
					produce_evidence: "",
					lease_month: "",
					vacant_area: "",
					remark: "",
				},
				data: "",
				from_path:localStorage.getItem('from_path')
			}
		},
		methods: {
			add_source() {
				var _this = this
				if(this.from_path == 'land_resource' ){
					var url_add = "http://127.0.0.1:8000/api/create_land_resource/"
					_this.data = {
						location: _this.form_addland.location,
						crops: _this.form_addland.crops,
						floor_space: _this.form_addland.floor_space,
						max_height: _this.form_addland.max_height,
						lease_month: _this.form_addland.lease_month,
						vacant_area: _this.form_addland.vacant_area,
						remark: _this.form_addland.remark,
						user_id: localStorage.getItem("user_id")
					}
				}else if(this.from_path == 'plant_resource'){
					var url_add = "http://127.0.0.1:8000/api/create_plant_resource/"
					_this.data = {
						name: _this.form_addplant.name,
						location: _this.form_addplant.location,
						floor_space: _this.form_addplant.floor_space,
						covered_area: _this.form_addplant.covered_area,
						produce_evidence: _this.form_addplant.produce_evidence,
						lease_month: _this.form_addplant.lease_month,
						vacant_area: _this.form_addplant.vacant_area,
						remark: _this.form_addplant.remark,
						user_id: localStorage.getItem("user_id")
						}
				}else if(this.from_path == 'building_resource'){
					var url_add = "http://127.0.0.1:8000/api/create_building_resource/"
					_this.data = {
						name: _this.form_addbuilding.name,
						plies: _this.form_addbuilding.plies,
						location: _this.form_addbuilding.location,
						floor_space: _this.form_addbuilding.floor_space,
						covered_area: _this.form_addbuilding.covered_area,
						produce_evidence: _this.form_addbuilding.produce_evidence,
						lease_month: _this.form_addbuilding.lease_month,
						vacant_area: _this.form_addbuilding.vacant_area,
						remark: _this.form_addbuilding.remark,
						user_id: localStorage.getItem("user_id")
						}
				}else if(this.from_path == 'store_resource'){
					var url_add = "http://127.0.0.1:8000/api/create_store_resource/"
					_this.data = {
						name: _this.form_addstore.name,
						store_type: _this.form_addstore.store_type,
						location: _this.form_addstore.location,
						floor_space: _this.form_addstore.floor_space,
						produce_evidence: _this.form_addstore.produce_evidence,
						lease_month: _this.form_addstore.lease_month,
						vacant_area: _this.form_addstore.vacant_area,
						remark: _this.form_addstore.remark,
						user_id: localStorage.getItem("user_id")
						}
				}
			
				_this.$axios({
					url: url_add,
					method: "POST",
					data: _this.data
				}).then((res) => {
					_this.$router.push({
						path: '/' + this.from_path
					})
				})

			}
		},
		destroyed() {
			localStorage.removeItem("from_path")
		},

	}
</script>

<style>

</style>
