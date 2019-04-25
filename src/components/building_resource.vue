<template>
	<div>
		<!-- 添加楼宇资源 -->
		<!-- style="float: right;width: 100px;height: 50px;background-color: #808080;color: #B3C0D1;border-radius: 10px;border-bottom: 5px;" -->
		<el-button style="float: right;width: 120px;height: 50px;background-color: #808080;color: #B3C0D1;border-radius: 10px;border-bottom: 5px;"
		 @click="add_land">新增</el-button>


		<!-- 显示楼宇资源 -->
		<div>
			<!-- <el-button type="primary">添加</el-button>
			<el-button type="primary">修改</el-button>
			<el-button type="danger">删除</el-button><input v-model="input" type="text" placeholder="搜索"> -->
		</div>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="楼宇地址" width="120">
				<template slot-scope="scope">{{ scope.row.location }}</template>
			</el-table-column>
			<el-table-column prop="name" label="楼宇名称" width="120">
			</el-table-column>
			<el-table-column prop="floor_space" label="占地面积" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="plies" label="层数" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="covered_area" label="建筑面积" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="lease_month" label="租赁年限/月" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="produce_evidence" label="有无产证" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="vacant_area" label="空置面积" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="created_on" label="创建时间" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="state" label="状态" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="remark" label="备注" show-overflow-tooltip>
			</el-table-column>
			<el-table-column v-if="show" prop="id" label="id" show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="操作">



				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true">编辑</el-button>

					<!-- 编辑楼宇资源页面 -->
					<el-dialog title="楼宇信息" :visible.sync="dialogFormVisible">
						<el-form :model="form">
							<el-form-item label="楼宇地址" :label-width="formLabelWidth">
								<el-input v-model="form.location" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="厂房名称" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="占地面积" :label-width="formLabelWidth">
								<el-input v-model="form.floor_space" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="层数" :label-width="formLabelWidth">
								<el-input v-model="form.plies" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="有无产证" :label-width="formLabelWidth">
								<el-input v-model="form.produce_evidence" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="建筑面积" :label-width="formLabelWidth">
								<el-input v-model="form.covered_area" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="租赁年限/月" :label-width="formLabelWidth">
								<el-input v-model="form.lease_month" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="空置面积" :label-width="formLabelWidth">
								<el-input v-model="form.vacant_area" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="创建时间" :label-width="formLabelWidth">
								<el-input v-model="form.created_on" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="状态" :label-width="formLabelWidth">
								<el-input v-model="form.state" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="备注" :label-width="formLabelWidth">
								<el-input v-model="form.remark" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="id" :label-width="formLabelWidth" style="display: none;">
								<el-input v-model="form.id" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="change_landsoureinfo">确 定</el-button>
						</div>
					</el-dialog>




					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" slot="reference">删除</el-button>




				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px">
			<!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
			<!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
		</div>
		<el-pagination background layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				show: 0,
				input: "",
				tableData: [],
				count: 0,
				multipleSelection: [],
				page: "1",
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
					location: '',
					name: '',
					floor_space: '',
					plies: '',
					produce_evidence: '',
					covered_area: '',
					lease_month: "",
					vacant_area: "",
					id: "",
					remark: "",
					created_on: "",
					state: ""
				},
				formLabelWidth: '120px',
				landsoure: "1",
				data: ""
			}
		},
		methods: {
			add_land() {
				this.$router.push({
					path: '/add_land'
				})
			},
			//判断编辑页面表单变化依据
			landsource_change() {
				this.landsoure = "2"
			},
			//表单数据发生改变以后点击确定发生事件函数
			change_landsoureinfo() {
				if (this.landsoure == "1") {
					location.reload()
				} else {
					this.data = {
						location: this.form.location,
						name: this.form.name,
						floor_space: this.form.floor_space,
						covered_area: this.form.covered_area,
						plies: this.form.plies,
						lease_month: this.form.lease_month,
						created_on: this.form.created_on,
						vacant_area: this.form.vacant_area,
						produce_evidence: this.form.produce_evidence,
						remark: this.form.remark,
						state: this.form.state,
						user_id: localStorage.getItem("user_id")
					}
					// console.log(this.data)
					this.$axios({
						method: "PUT",
						url: "http://192.168.20.67:8001/api/update_building_resource/" + this.form.id + "/",
						data: this.data,
					}).then(res => {
						location.reload()
					})
				}
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//删除指定厂房
			handleDelete(index) {
				console.log(this.tableData[index].id);
				this.$axios({
					method: "DELETE",
					url: "http://192.168.20.67:8001/api/delete_building_resource/" + this.tableData[index].id + "/",
					data: {
						user_id: localStorage.getItem("user_id")
					}
				}).then(res => {
					location.reload()
				})
			},
			//厂房编辑
			handleEdit(index, row) {
				console.log(this.tableData[index]);
				this.form.location = this.tableData[index].location
				this.form.name = this.tableData[index].name
				this.form.floor_space = this.tableData[index].floor_space
				this.form.covered_area = this.tableData[index].covered_area
				this.form.plies = this.tableData[index].plies
				this.form.produce_evidence = this.tableData[index].produce_evidence
				this.form.lease_month = this.tableData[index].lease_month
				this.form.vacant_area = this.tableData[index].vacant_area
				this.form.remark = this.tableData[index].remark
				this.form.created_on = this.tableData[index].created_on
				this.form.state = this.tableData[index].state
				this.form.id = this.tableData[index].id


			},

			//点击页码刷新数据
			handleCurrentChange(val) {
				var _this = this;
				this.page =  val
				this.$axios({
					method: "GET",
					url: "http://192.168.20.67:8001/api/get_building_resources/?user_id=" + localStorage.getItem("user_id") + "&" +
						"page=" + _this.page,
				}).then(res => {
					console.log(res.data.count)
				
					// console.log(localStorage.getItem("user_id"))
					_this.count = res.data.count
				
					_this.tableData = res.data.data.map((value, index) => {
						return {
							location: value.location,
							name: value.name,
							floor_space: value.floor_space,
							covered_area: value.covered_area,
							lease_month: value.lease_month,
							vacant_area: value.vacant_area,
							plies: value.plies,
							produce_evidence: value.produce_evidence,
							remark: value.remark,
							created_on: value.created_on,
							state: value.state,
							id: value.id,
						}
					})
				
				})
			}
		},


		//页面刷新时候加载页面数据
		created() {
			var _this = this;
			this.$axios({
				method: "GET",
				url: "http://192.168.20.67:8001/api/get_building_resources/?user_id=" + localStorage.getItem("user_id") + "&" +
					"page=" + _this.page,
			}).then(res => {
				console.log(res.data.count)

				// console.log(localStorage.getItem("user_id"))
				_this.count = res.data.count

				_this.tableData = res.data.data.map((value, index) => {
					return {
						location: value.location,
						name: value.name,
						floor_space: value.floor_space,
						covered_area: value.covered_area,
						lease_month: value.lease_month,
						vacant_area: value.vacant_area,
						plies: value.plies,
						produce_evidence: value.produce_evidence,
						remark: value.remark,
						created_on: value.created_on,
						state: value.state,
						id: value.id,
					}
				})

			})
		}
	}
</script>

<style>
</style>
