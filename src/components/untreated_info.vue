<template>
	<div>
		<div class="info" @click='main_info($event)'>
			<el-button type="info" v-if="role=='镇长'||role=='镇级账户'">待审批</el-button>
			<el-button type="info" v-if="role=='镇长'||role=='镇级账户'">审批通过</el-button>
			<el-button type="info" v-if="role=='镇长'||role=='镇级账户'">审批拒绝</el-button>
			<el-button type="info">通知</el-button>
		</div>
		<div @click='main_info($event)' v-if='sp_button'>
			<el-button type="info" plain style='margin-left: -50%;'>土地审批</el-button>
			<el-button type="warning" plain>厂房审批</el-button>
			<el-button type="danger" plain>楼宇审批</el-button>
			<el-button type="success" plain>商铺审批</el-button>
		</div>
		<div class="info_main">
			<template v-if="message_button!='4'">
				<el-table :data="tableData1" height="500" border style="width: 100%" @cell-mouse-enter="cell_mouse_enter" slot="reference"
				 v-if="resource_id== 1">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="土地所在地址" width="120" show-overflow-tooltip align="center">
						<template slot-scope="scope">{{ scope.row.location }}</template>
					</el-table-column>
					<el-table-column prop="crops" label="所种农作物" width="120" align="center">
					</el-table-column>
					<el-table-column prop="floor_space" label="占地面积" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="max_height" label="建筑限高" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="lease_month" label="租赁年限/月" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="vacant_area" label="空置面积" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="created_on" label="创建时间" width="180" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="state" label="状态" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="remark" label="备注" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column v-if="show" prop="id" label="id" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column label="操作" v-if='AG_RE' align="center">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row,$event)" type="text" size="small">同意</el-button>
							<el-button @click="handleClick(scope.row,$event)" type="text" size="small">拒绝</el-button>
						</template>
					</el-table-column>
				</el-table>
				
				<el-table :data="tableData1" height="500" border style="width: 100%" @cell-mouse-enter="cell_mouse_enter" slot="reference"
				 v-if="resource_id== 2">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="厂房地址" width="120" align="center">
						<template slot-scope="scope">{{ scope.row.location }}</template>
					</el-table-column>
					<el-table-column prop="name" label="厂房名称" width="120" align="center">
					</el-table-column>
					<el-table-column prop="floor_space" label="占地面积" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="produce_evidence" label="有无产证" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="covered_area" label="建筑面积" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="lease_month" label="租赁年限/月" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="vacant_area" label="空置面积" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="created_on" label="创建时间" width="180" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="state" label="状态" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="remark" label="备注" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column v-if="show" prop="id" label="id" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column label="操作" v-if='AG_RE' align="center">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row,$event)" type="text" size="small">同意</el-button>
							<el-button @click="handleClick(scope.row,$event)" type="text" size="small">拒绝</el-button>
						</template>
					</el-table-column>
				</el-table>
				
				<el-table :data="tableData1" height="500" border style="width: 100%" @cell-mouse-enter="cell_mouse_enter" slot="reference"
				 v-if="resource_id== 3">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="楼宇地址" width="120" align="center">
						<template slot-scope="scope">{{ scope.row.location }}</template>
					</el-table-column>
					<el-table-column prop="name" label="楼宇名称" width="120" align="center">
					</el-table-column>
					<el-table-column prop="floor_space" label="占地面积" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="plies" label="层数" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="produce_evidence" label="有无产证" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="covered_area" label="建筑面积" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="lease_month" label="租赁年限/月" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="vacant_area" label="空置面积" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="created_on" label="创建时间" width="180" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="state" label="状态" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="remark" label="备注" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column v-if="show" prop="id" label="id" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column label="操作" v-if='AG_RE' align="center">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row,$event)" type="text" size="small">同意</el-button>
							<el-button @click="handleClick(scope.row,$event)" type="text" size="small">拒绝</el-button>
						</template>
					</el-table-column>
				</el-table>
				
				
				<el-table :data="tableData1" height="500" border style="width: 100%" @cell-mouse-enter="cell_mouse_enter" slot="reference"
				 v-if="resource_id== 4">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="商铺地址" width="120" align="center">
						<template slot-scope="scope">{{ scope.row.location }}</template>
					</el-table-column>
					<el-table-column prop="name" label="商铺名称" width="120" align="center">
					</el-table-column>
					<el-table-column prop="floor_space" label="占地面积" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="store_type" label="商铺类型" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="produce_evidence" label="有无产证" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="lease_month" label="租赁年限/月" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="vacant_area" label="空置面积" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="created_on" label="创建时间" width="180" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="state" label="状态" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column prop="remark" label="备注" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column v-if="show" prop="id" label="id" show-overflow-tooltip align="center">
					</el-table-column>
					<el-table-column label="操作" v-if='AG_RE' align="center">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row,$event)" type="text" size="small">同意</el-button>
							<el-button @click="handleClick(scope.row,$event)" type="text" size="small">拒绝</el-button>
						</template>
					</el-table-column>
				</el-table>
			
			</template>
			
			<template v-if="message_button=='4'|| default_button =='通知'">
				<el-table :data="tableData1" height="500" border style="width: 100%" @cell-mouse-enter="cell_mouse_enter" slot="reference">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="标题" width="170" align="center" show-overflow-tooltip>
						<template slot-scope="scope" >
						<span v-if="scope.row.is_read=='1'"> </span>
						<span v-if="scope.row.is_read=='0'" style="color: red;font-style: oblique;">new&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ scope.row.name}}
						</template>
					</el-table-column>
					
					
					
					<el-table-column  prop="content" label="主要内容" width="800" show-overflow-tooltip align="center">
					</el-table-column>

					<!-- <el-table-column v-if="!scope.row.is_read"  prop="" label="主要内容" show-overflow-tooltip>
					</el-table-column>
					 -->
					<el-table-column prop="created_on" label="通知时间"  width="180" align="center">
					</el-table-column>
					<el-table-column v-if="show" prop="id" label="id" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row,$event)" type="text" size="small">已读</el-button>
							<el-button @click="handleClick(scope.row,$event)" type="text" size="small" v-if="role=='镇长'||role=='镇级账户'">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>

		</div>
		<el-pagination background layout="prev, pager, next" :page-size=7 :total="count" @current-change="handleCurrentChange">
		</el-pagination>
	</div>



</template>

<script>
	export default {
		data() {
			return {
				role:localStorage.getItem('role'),
				default_button: '通知',
				message_button: '4',
				resource_id: 1,
				sp_button: '',
				AG_RE: '1',
				sp_type: 1,
				sp: '',
				count: 1,
				show: 0,
				tableData1: [],
				page: '',
			}

		},
		methods: {
			
			//点击同意或者拒绝
			handleClick(row, e) {
				console.log(row, e.target.innerHTML)
				//判断是通知还是审批
				if (e.target.innerHTML == '同意' || e.target.innerHTML == '已读') {
					var pk = 1
				} else if (e.target.innerHTML == '拒绝' || e.target.innerHTML == '删除') {
					var pk = 2
				}
				//将通知和审批的url替换
				// console.log(pk)
				if (e.target.innerHTML == '已读' || e.target.innerHTML == '删除') {
					var url_me = 'http://127.0.0.1:8000/api/get_notice_detail/' + row.id + '/'
					var data_me = {
						"me_notice": pk
					}
					var get_url = 'http://127.0.0.1:8000/api/get_bell/?&user_id=' + localStorage.getItem("user_id")

				} else {
					var url_me = 'http://127.0.0.1:8000/api/update_approval/' + row.id + '/'
					var data_me = {
						'resource_state': pk

					}
					var get_url = 'http://127.0.0.1:8000/api/get_approval_list/?resource_state=' + this.sp + '&user_id=' +
						localStorage.getItem("user_id")

				}
				var me1 = e.target.innerHTML
				//开始操作
				this.$axios({
					method: "POST",
					url: url_me,
					data: data_me
				}).then(res => {
					this.$message({
						message: '处理成功',
						type: 'warning'
					});
					//操作以后重新加载数据
					var user = localStorage.getItem('user_id')
					this.$axios({
						url: get_url,
						method: 'GET',
					}).then(res => {
						console.log(me1)
						if (me1 == '删除' || me1 == '已读') {
							this.count = res.data.notice_count
							// location.reload()
							this.tableData1 = res.data.data.map((value, index) => {
								
								return {
									name: value.name,
									content: value.content,
									created_on: value.created_on,
									is_read:value.is_read,
									id: value.id,
								}
								
							})

						} else {
							this.count = res.data.count
							// console.log(res)
							this.tableData1 = res.data.data.map((value, index) => {
								return {
									location: value.location,
									name:value.name,
									plies: value.plies,
									store_type: value.store_type,
									produce_evidence: value.produce_evidence,
									crops: value.crops,
									floor_space: value.floor_space,
									covered_area: value.covered_area,
									max_height: value.max_height,
									lease_month: value.lease_month,
									vacant_area: value.vacant_area,
									remark: value.remark,
									created_on: value.created_on,
									state: value.state,
									id: value.id,
								}
							})
						}

					})

				})

			},
			cell_mouse_enter(row) {
				// this.$message(row.address);
				// console.log(row.address);
			},
			//页码改变
			handleCurrentChange(val) {
				if (this.message_button == '4') {
					this.$axios({
						method: "GET",
						url: 'http://127.0.0.1:8000/api/get_bell/?&user_id=' + localStorage.getItem("user_id") + "&page=" + val,
					}).then(res => {
						console.log(res.data.notice_count)

						// console.log(localStorage.getItem("user_id"))
						this.count = res.data.notice_count

						this.tableData1 = res.data.data.map((value, index) => {
							return {
								name: value.name,
								content: value.content,
								created_on: value.created_on,
								is_read: value.is_read,
								id: value.id,
							}
						})

					})
				} else {
					this.$axios({
						method: "GET",
						url: 'http://127.0.0.1:8000/api/get_approval_list/?resource_state=' + this.sp + '&user_id=' + localStorage.getItem(
							"user_id") + "&page=" + val + '&resource_id=' + this.resource_id,
					}).then(res => {
						console.log(res.data.count)

						// console.log(localStorage.getItem("user_id"))
						this.count = res.data.count

						this.tableData1 = res.data.data.map((value, index) => {
							return {
								location: value.location,
								name:value.name,
								store_type: value.store_type,
								produce_evidence: value.produce_evidence,
								covered_area: value.covered_area,
								plice: value.plies,
								crops: value.crops,
								floor_space: value.floor_space,
								max_height: value.max_height,
								lease_month: value.lease_month,
								vacant_area: value.vacant_area,
								remark: value.remark,
								created_on: value.created_on,
								state: value.state,
								id: value.id,
								
							}
						})

					})
				}

			},
			//点击审批 数据
			main_info(e) {

				this.default_button = e.target.innerHTML
				var resou = ['土地审批', '厂房审批', '楼宇审批', '商铺审批']
				if (this.default_button != '通知') {
					this.message_button = '1'
					if (this.default_button == '土地审批' || this.default_button == '楼宇审批' || this.default_button == '厂房审批' || this.default_button ==
						'商铺审批') {
						resou.map((value, index) => {
							if (this.default_button == value) {
								this.resource_id = index + 1
							}

						})
						// console.log(resource_id_list)
						// this.resource_id = resource_id_list[0]
						console.log(this.resource_id)
					} else {
						this.resource_id = 1
						if (this.default_button == '待审批') {
							this.sp = 0
							this.AG_RE = '1'
							this.sp_button = '1'
						} else if (this.default_button == '审批通过') {
							this.sp = 1
							this.AG_RE = ''
							this.sp_button = '1'
						} else if (this.default_button == '审批拒绝') {
							this.AG_RE = ''
							this.sp = 2
							this.sp_button = '1'
						}
					}
					console.log(this.resource_id)
					//判断需要显示的资源
					var user = localStorage.getItem('user_id')
					if (this.resource_id == 1) {
						var url_a = 'http://127.0.0.1:8000/api/get_approval_list/?resource_state=' + this.sp + '&user_id=' + user

					} else {
						var url_a = 'http://127.0.0.1:8000/api/get_approval_list/?resource_state=' + this.sp + '&user_id=' + user +
							'&resource_id=' + this.resource_id
					}
					//get方法获取数据


					this.$axios({
						url: url_a,
						method: 'GET',
					}).then(res => {
						this.count = res.data.count
						console.log(res.data.data)
						// if(res.data.data.length = 0){
						// 	this.tableData1=[]
						// }else{

						this.tableData1 = res.data.data.map((value, index) => {
							return {
								location: value.location,
								name:value.name,
								plies: value.plies,
								store_type: value.store_type,
								produce_evidence: value.produce_evidence,
								covered_area: value.covered_area,
								crops: value.crops,
								floor_space: value.floor_space,
								max_height: value.max_height,
								lease_month: value.lease_month,
								vacant_area: value.vacant_area,
								remark: value.remark,
								created_on: value.created_on,
								state: value.state,
								id: value.id,
							}
						})


					})
				} else {
					this.message_button = '4'
					this.$axios({
						url: 'http://127.0.0.1:8000/api/get_bell/?&user_id=' + localStorage.getItem("user_id"),
						method: 'GET',
					}).then(res => {
						this.count = res.data.notice_count
						
						this.tableData1 = res.data.data.map((value, index) => {
							return {
								name: value.name,
								content: value.content,
								is_read: value.is_read,
								created_on: value.created_on,
								id: value.id,
							}
						})
					})
				}

			},

		},
		created() {
			console.log(this.role)
			this.$axios({
				url: 'http://127.0.0.1:8000/api/get_bell/?&user_id=' + localStorage.getItem("user_id"),
				method: 'GET',
			}).then(res => {
				this.count = res.data.notice_count
				// console.log(res.data.data[1].is_read)
				this.tableData1 = res.data.data.map((value, index) => {
					return {
						name: value.name,
						content: value.content,
						created_on: value.created_on,
						is_read: value.is_read,
						id: value.id,
					}
				})
			})
		}
	}
</script>

<style>
	.info {
		/* background-color: #B3C0D1; */
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.info_main {

		width: 80%;
		height: 500px;
		margin-left: 10%;
		margin-top: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}

	.item {
		margin-top: 10px;
		margin-right: 40px;
	}

	.tb_head {

		border: 1px solid red;

	}

	.el-table_1_column_3>.cell {
		/* overflow-x: scroll!important; */
		white-space: nowrap !important;
	}

	.el-table--scrollable-y .el-table__body-wrapper {
		overflow-y: hidden;
	}
</style>
