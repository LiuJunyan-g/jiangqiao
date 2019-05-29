<template>
	<div>
		<el-button class="add_land"
		 @click="add_land" v-if="role=='村级账户'">新增</el-button>
		<!-- 显示土地资源 -->
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 80%;margin: 100px auto;" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="土地所在地址" show-overflow-tooltip width="120" align="center">
				<template slot-scope="scope">{{ scope.row.location }}</template>
			</el-table-column>
			<el-table-column prop="crops" label="所种农作物" width="120" align="center">
			</el-table-column>
			<el-table-column prop="floor_space" label="占地面积" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="max_height" label="建筑限高" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="lease_month" label="租赁年限/月" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="vacant_area" label="空置面积" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="created_on" label="创建时间" width="180" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="state" label="状态" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="remark" label="备注" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column v-if="show" prop="id" label="id" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column label="操作" align="center" v-if="role=='村级账户'">



				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true">编辑</el-button>

					<!-- 编辑土地资源页面 -->
					<el-dialog title="土地信息" :visible.sync="dialogFormVisible">
						<el-form :model="form">
							<el-form-item label="土地所在地址" :label-width="formLabelWidth">
								<el-input v-model="form.location" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="所种农作物" :label-width="formLabelWidth">
								<el-select v-model="value" placeholder="请选择" @change="landsource_change">
									<el-option
									  v-for="item in options"
									  :key="item.value"
									  :label="item.label"
									  :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="占地面积" :label-width="formLabelWidth">
								<el-input v-model="form.floor_space" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="建筑限高" :label-width="formLabelWidth">
								<el-input v-model="form.max_height" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="租赁年限/月" :label-width="formLabelWidth">
								<el-input v-model="form.lease_month" autocomplete="off" @change="landsource_change"></el-input>
							</el-form-item>
							<el-form-item label="空置面积" :label-width="formLabelWidth">
								<el-input v-model="form.vacant_area" autocomplete="off" @change="landsource_change"></el-input>
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
			<div class="add_css" style="width: 50%;box-sizing: border-box;padding: 50px;" >
				
				<el-form :model="form">
				<el-form-item label="土地所在地址" :label-width="formLabelWidth" >
					<el-input v-model="form_addland.location" autocomplete="off"></el-input>
				</el-form-item>
				<!-- <div>土地所在地址：<input v-model="form_addland.location"></input></div> -->
				<el-form-item label="所种农作物" :label-width="formLabelWidth">
					<el-select v-model="value" placeholder="请选择" style="float: left;">
						<el-option
						  v-for="item in options"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="建筑限高" :label-width="formLabelWidth">
					<el-input v-model="form_addland.max_height" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="占地面积" :label-width="formLabelWidth">
					<el-input v-model="form_addland.floor_space" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="租赁年限/月" :label-width="formLabelWidth">
					<el-input v-model="form_addland.lease_month" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="空置面积" :label-width="formLabelWidth">
					<el-input v-model="form_addland.vacant_area" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" :label-width="formLabelWidth">
					<el-input v-model="form_addland.remark" autocomplete="off"></el-input>
				</el-form-item>
				
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="showAddArea = false">取 消</el-button>
					<el-button type="primary" @click="add_source">确 定</el-button>
				</div>
				<!-- <el-button @click="add_source">提交</el-button> -->
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
				form_addland: {
					location: '',
					
					floor_space: '',
					max_height: '',
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
					crops: '',
					floor_space: '',
					max_height: '',
					lease_month: "",
					vacant_area: "",
					id: "",
					remark: "",
					created_on: "",
					state: ""
				},
				options: [{
					  value: '0',
					  label: '待种植'
					}, {
					  value: '1',
					  label: '辣椒'
					}, {
					  value: '2',
					  label: '白菜'
					}, {
					  value: '3',
					  label: '棉花'
					}, {
					  value: '4',
					  label: '西瓜'
					},{
					  value: '5',
					  label: '芹菜'
					}],
					value: '',
      
				formLabelWidth: '110px',
				landsoure: "1",
				data: ""
			}
		},
		methods: {
			add_source(){
				var _this=this;
				var data = {
					location: _this.form_addland.location,
					crops: _this.value,
					floor_space: _this.form_addland.floor_space,
					max_height: _this.form_addland.max_height,
					lease_month: _this.form_addland.lease_month,
					vacant_area: _this.form_addland.vacant_area,
					remark: _this.form_addland.remark,
					user_id: localStorage.getItem("user_id")
				}
				_this.$axios({
					url: "http://127.0.0.1:8000/api/create_land_resource/",
					method: "POST",
					data: data
				}).then((res) => {

					this.showAddArea=false;
					location.reload()
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
					var val=this.value;
					if(val=="待种植"){val="0"}
					if(val=="辣椒"){val="1"}
					if(val=="白菜"){val="2"}
					if(val=="棉花"){val="3"}
					if(val=="西瓜"){val="4"}
					if(val=="芹菜"){val="5"}
					
					this.data = {
						location: this.form.location,
						crops: val,
						floor_space: this.form.floor_space,
						max_height: this.form.max_height,
						lease_month: this.form.lease_month,
						created_on: this.form.created_on,
						vacant_area: this.form.vacant_area,
						remark: this.form.remark,
						state: this.form.state,
						user_id: localStorage.getItem("user_id")
					}
					// console.log(this.data)
					this.$axios({
						method: "PUT",
						url: "http://127.0.0.1:8000/api/update_land_resource/" + this.form.id + "/",
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
			//删除指定土地
			handleDelete(index) {
				console.log(this.tableData[index].id);
				this.$axios({
					method: "DELETE",
					url: "http://127.0.0.1:8000/api/delete_land_resource/" + this.tableData[index].id + "/",
					data: {
						user_id: localStorage.getItem("user_id")
					}
				}).then(res => {
					location.reload()
				})
			},
			//土地编辑
			handleEdit(index, row) {
				this.value=this.tableData[index].crops;
				console.log(this.tableData[index]);
				this.form.location = this.tableData[index].location
				this.form.crops = this.tableData[index].crops
				this.form.floor_space = this.tableData[index].floor_space
				this.form.max_height = this.tableData[index].max_height
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
					url: "http://127.0.0.1:8000/api/get_land_resources/?user_id=" + localStorage.getItem("user_id") + "&" +
						"page=" + _this.page,
				}).then(res => {
					console.log(res.data.count)

					// console.log(localStorage.getItem("user_id"))
					_this.count = res.data.count

					_this.tableData = res.data.data.map((value, index) => {
						return {
							location: value.location,
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


		//页面刷新时候加载页面数据
		created() {
			var _this = this;
			this.$axios({
				method: "GET",
				url: "http://127.0.0.1:8000/api/get_land_resources/?user_id=" + localStorage.getItem("user_id") + "&" +
					"page=" + _this.page,
			}).then(res => {
				console.log(res.data.count)

				// console.log(localStorage.getItem("user_id"))
				_this.count = res.data.count
				
				_this.tableData = res.data.data.map((value, index) => {
					return {
						location: value.location,
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
		width: 400px;
		margin: 100px auto;
		background: #FFFFFF;
	}
</style>
