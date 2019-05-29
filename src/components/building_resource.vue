<template>
	<div>
		<!-- 添加楼宇资源 -->
		<!-- style="float: right;width: 100px;height: 50px;background-color: #808080;color: #B3C0D1;border-radius: 10px;border-bottom: 5px;" -->
		<el-button class="add_land"
		 @click="add_land" v-if="role=='村级账户'">新增</el-button>


		<!-- 显示楼宇资源 -->
		<div>
			<!-- <el-button type="primary">添加</el-button>
			<el-button type="primary">修改</el-button>
			<el-button type="danger">删除</el-button><input v-model="input" type="text" placeholder="搜索"> -->
		</div>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 80%;margin: 100px auto;" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="楼宇地址" width="120" show-overflow-tooltip align="center">
				<template slot-scope="scope">{{ scope.row.location }}</template>
			</el-table-column>
			<el-table-column prop="name" label="楼宇名称" width="120" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="floor_space" label="占地面积" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="plies" label="层数" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="covered_area" label="建筑面积" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="lease_month" label="租赁年限/月" width="110" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="produce_evidence" label="有无产证" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="vacant_area" label="空置面积" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="created_on" label="创建时间" width="180" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="state" label="状态" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="remark" label="备注" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column v-if="show" prop="id" label="id" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column label="操作" width="170" align="center" v-if="role=='村级账户'">
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
						<el-select v-model="value" placeholder="请选择" @change="landsource_change">
							<el-option
							  v-for="item in options"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						</el-select>
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
		
		<div id="add_css" v-show="showAddArea">
			<div class="add_css" >
				<em @click="showAddArea=false">x</em>
				<el-form :model="form">
					<el-form-item label="楼宇地址" :label-width="formLabelWidth">
						<el-input v-model="form_addbuilding.location" autocomplete="off" ></el-input>
					</el-form-item>
					<el-form-item label="楼宇名称" :label-width="formLabelWidth">
						<el-input v-model="form_addbuilding.name" autocomplete="off" ></el-input>
					</el-form-item>
					<el-form-item label="占地面积" :label-width="formLabelWidth">
						<el-input v-model="form_addbuilding.floor_space" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="层数" :label-width="formLabelWidth">
						<el-input v-model="form_addbuilding.plies" autocomplete="off"></el-input>
					</el-form-item>
					
					<el-form-item label="有无产证" :label-width="formLabelWidth">
						<el-select v-model="value" placeholder="请选择"style="float:left">
							<el-option
							  v-for="item in options"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="建筑面积" :label-width="formLabelWidth">
						<el-input v-model="form_addbuilding.covered_area" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="租赁年限/月" :label-width="formLabelWidth">
						<el-input v-model="form_addbuilding.lease_month" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="空置面积" :label-width="formLabelWidth">
						<el-input v-model="form_addbuilding.vacant_area" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="备注" :label-width="formLabelWidth">
						<el-input v-model="form_addbuilding.remark" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="id" :label-width="formLabelWidth" style="display: none;">
						<el-input v-model="form_addbuilding.id" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="add_source">确 定</el-button>
				</div>
				<!-- <div>楼宇名称：<input v-model="form_addbuilding.name"></input></div>
				<div>楼宇所在地址：<input v-model="form_addbuilding.location"></input></div>
				<div>层数：<input v-model="form_addbuilding.plies"></input></div>
				<div>建筑面积：<input v-model="form_addbuilding.covered_area"></input></div>
				<div>占地面积：<input v-model="form_addbuilding.floor_space"></input></div>
				<div>有无产证：<input v-model="form_addbuilding.produce_evidence"></input></div>
				<div>租赁年限/月：<input v-model="form_addbuilding.lease_month"></input></div>
				<div>空置面积：<input v-model="form_addbuilding.vacant_area"></input></div>
				<div>备注：<input v-model="form_addbuilding.remark"></input></div>
				<el-button @click="add_source">提交</el-button> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				showAddArea:false,
				role:localStorage.getItem('role'),
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
				options: [{
					  value: '0',
					  label: '无'
					}, {
					  value: '1',
					  label: '有'
					}],
					value:"",
				formLabelWidth: '120px',
				landsoure: "1",
				data: ""
			}
		},
		methods: {
			add_source(){
				var _this=this;
				console.log(this.form_addbuilding.location)
				var data = {
					name: _this.form_addbuilding.name,
					plies: _this.form_addbuilding.plies,
					location: _this.form_addbuilding.location,
					floor_space: _this.form_addbuilding.floor_space,
					covered_area: _this.form_addbuilding.covered_area,
					produce_evidence: _this.value,
					lease_month: _this.form_addbuilding.lease_month,
					vacant_area: _this.form_addbuilding.vacant_area,
					remark: _this.form_addbuilding.remark,
					user_id: localStorage.getItem("user_id")
				}
				console.log(data)
				_this.$axios({
					url: "http://127.0.0.1:8000/api/create_building_resource/",
					method: "POST",
					data: data
				}).then((res) => {
					this.showAddArea=false;
					// location.reload()
				})
			},
			add_land() {
				this.showAddArea=true;
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
					var val = this.value;
					if(val=="有"){val="1"}
					if(val=="无"){val="0"}
					
					var data = {
						location: this.form.location,
						name: this.form.name,
						floor_space: this.form.floor_space,
						covered_area: this.form.covered_area,
						plies: this.form.plies,
						lease_month: this.form.lease_month,
						created_on: this.form.created_on,
						vacant_area: this.form.vacant_area,
						produce_evidence: val,
						remark: this.form.remark,
						user_id: localStorage.getItem("user_id")
					}
					console.log(data);
					this.$axios({
						method: "PUT",
						url: "http://127.0.0.1:8000/api/update_building_resource/" + this.form.id + "/",
						data: data,
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
					url: "http://127.0.0.1:8000/api/delete_building_resource/" + this.tableData[index].id + "/",
					data: {
						user_id: localStorage.getItem("user_id")
					}
				}).then(res => {
					location.reload()
				})
			},
			//厂房编辑
			handleEdit(index, row) {
				this.value=this.tableData[index].produce_evidence
				
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
				this.page = val
				this.$axios({
					method: "GET",
					url: "http://127.0.0.1:8000/api/get_building_resources/?user_id=" + localStorage.getItem("user_id") + "&" +
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
				url: "http://127.0.0.1:8000/api/get_building_resources/?user_id=" + localStorage.getItem("user_id") + "&" +
					"page=" + _this.page,
			}).then(res => {
				console.log(res.data.count)

				// console.log(localStorage.getItem("user_id"))
				_this.count = res.data.count
				console.log(res.data.data)
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

<style scoped="">
	#add_css{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.4);
		z-index: 100;
	}
	.add_land{
		float: right;
		margin-right: 240px;
		margin-top: -70px;
		width: 120px;
		height: 60px;
		background: rgba(0,255,0,0.3);
		color: #333;
		border-bottom: 5px;
	}
	.add_css{
		height: 600px;
		width: 500px;
		margin: 50px auto;
		background: #FFFFFF;
		box-sizing: border-box;
		padding: 50px;
		position: relative;
	}
	.add_css em{
		position: absolute;
		top: 10px;
		right: 20px;
		font-size: 26px;
		color: red;
		font-style: normal;
		cursor:pointer;
	}
	.el-header li{
		color: #000;
	}
</style>
