<template>
	<div>
		<!-- 添加商铺资源 -->
		<!-- style="float: right;width: 100px;height: 50px;background-color: #808080;color: #B3C0D1;border-radius: 10px;border-bottom: 5px;" -->
		<el-button class="add_land"
		 @click="add_land" v-if="role=='村级账户'">新增</el-button>


		<!-- 显示商铺资源 -->
		<div>
			<!-- <el-button type="primary">添加</el-button>
			<el-button type="primary">修改</el-button>
			<el-button type="danger">删除</el-button><input v-model="input" type="text" placeholder="搜索"> -->
		</div>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 80%;margin: 100px auto;" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="商铺地址" width="120" align="center">
				<template slot-scope="scope">{{ scope.row.location }}</template>
			</el-table-column>
			<el-table-column prop="name" label="商铺名称" width="120" align="center">
			</el-table-column>
			<el-table-column prop="floor_space" label="占地面积" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="store_type" label="类型" show-overflow-tooltip align="center">
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

					<!-- 编辑商铺资源页面 -->
					<el-dialog title="商铺信息" :visible.sync="dialogFormVisible">
						<el-form :model="form">
							<el-form-item label="商铺地址" :label-width="formLabelWidth">
								<el-input v-model="form.location" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="商铺名称" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="占地面积" :label-width="formLabelWidth">
								<el-input v-model="form.floor_space" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="类型" :label-width="formLabelWidth">
								<el-select v-model="value1" placeholder="请选择">
									<el-option
									  v-for="item in options1"
									  :key="item.value"
									  :label="item.label"
									  :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="有无产证" :label-width="formLabelWidth">
								<el-select v-model="value" placeholder="请选择">
									<el-option
									  v-for="item in options"
									  :key="item.value"
									  :label="item.label"
									  :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="租赁年限/月" :label-width="formLabelWidth">
								<el-input v-model="form.lease_month" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="空置面积" :label-width="formLabelWidth">
								<el-input v-model="form.vacant_area" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="创建时间" :label-width="formLabelWidth">
								<el-input v-model="form.created_on" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="状态" :label-width="formLabelWidth">
								<el-input v-model="form.state" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="备注" :label-width="formLabelWidth">
								<el-input v-model="form.remark" autocomplete="off"></el-input>
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
				<el-form :model="form">
					<el-form-item label="商铺地址" :label-width="formLabelWidth">
						<el-input v-model="form_addstore.location" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="商铺名称" :label-width="formLabelWidth">
						<el-input v-model="form_addstore.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="占地面积" :label-width="formLabelWidth">
						<el-input v-model="form_addstore.floor_space" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="类型" :label-width="formLabelWidth">
						<el-select v-model="value1" placeholder="请选择"style="float:left">
							<el-option
							  v-for="item in options1"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						</el-select>
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
					<el-form-item label="租赁年限/月" :label-width="formLabelWidth">
						<el-input v-model="form_addstore.lease_month" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="空置面积" :label-width="formLabelWidth">
						<el-input v-model="form_addstore.vacant_area" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="创建时间" :label-width="formLabelWidth">
						<el-input v-model="form_addstore.created_on" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="状态" :label-width="formLabelWidth">
						<el-input v-model="form_addstore.state" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="备注" :label-width="formLabelWidth">
						<el-input v-model="form_addstore.remark" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="id" :label-width="formLabelWidth" style="display: none;">
						<el-input v-model="form_addstore.id" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="add_source">确 定</el-button>
				</div>
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
					produce_evidence: '',
					store_type: '',
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
				options1: [{
					  value: '1',
					  label: '其他'
					}, {
					  value: '2',
					  label: '市场类商铺'
					},{
					  value: '3',
					  label: '社区商铺'
					}, {
					  value: '4',
					  label: '住宅底层商铺'
					},{
					  value: '5',
					  label: '百货商场、购物中心商铺'
					}, {
					  value: '6',
					  label: '商务楼、写字楼商铺'
					},{
					  value: '7',
					  label: '交通设施商铺'
					}, {
					  value: '8',
					  label: '商业街商铺'
					}],
					value1:"",
				formLabelWidth: '120px',
				landsoure: "1",
				data: ""
			}
		},
		methods: {
			add_source(){
				var _this=this;
				var data = {
					name: _this.form_addstore.name,
					store_type: _this.value1,
					location: _this.form_addstore.location,
					floor_space: _this.form_addstore.floor_space,
					produce_evidence: _this.value,
					lease_month: _this.form_addstore.lease_month,
					vacant_area: _this.form_addstore.vacant_area,
					remark: _this.form_addstore.remark,
					user_id: localStorage.getItem("user_id")
				}
				
				_this.$axios({
					url: "http://127.0.0.1:8000/api/create_store_resource/",
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
					this.options.map(item=>{
						if(val==item.label){
							val=item.value;
						}
					})
					var val1=this.value1;
					this.options.map(item=>{
						if(val1==item.label){
							val1=item.value;
						}
					})
					
					this.data = {
						location: this.form.location,
						name: this.form.name,
						floor_space: this.form.floor_space,
						store_type: val1,
						lease_month: this.form.lease_month,
						created_on: this.form.created_on,
						vacant_area: this.form.vacant_area,
						produce_evidence: val,
						remark: this.form.remark,
						state: this.form.state,
						user_id: localStorage.getItem("user_id")
					}
					// console.log(this.data)
					this.$axios({
						method: "PUT",
						url: "http://127.0.0.1:8000/api/update_store_resource/" + this.form.id + "/",
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
					url: "http://127.0.0.1:8000/api/delete_store_resource/" + this.tableData[index].id + "/",
					data: {
						user_id: localStorage.getItem("user_id")
					}
				}).then(res => {
					location.reload()
				})
			},
			//厂房编辑
			handleEdit(index, row) {
				this.value=this.tableData[index].produce_evidence;
				this.value1=this.tableData[index].store_type;
				
				console.log(this.tableData[index]);
				this.form.location = this.tableData[index].location
				this.form.name = this.tableData[index].name
				this.form.floor_space = this.tableData[index].floor_space
				this.form.store_type = this.tableData[index].store_type
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
					url: "http://127.0.0.1:8000/api/get_store_resources/?user_id=" + localStorage.getItem("user_id") + "&" +
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
							lease_month: value.lease_month,
							vacant_area: value.vacant_area,
							store_type: value.store_type,
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
				url: "http://127.0.0.1:8000/api/get_store_resources/?user_id=" + localStorage.getItem("user_id") + "&" +
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
						lease_month: value.lease_month,
						vacant_area: value.vacant_area,
						store_type: value.store_type,
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
		height: 750px;
		width: 600px;
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
</style>
