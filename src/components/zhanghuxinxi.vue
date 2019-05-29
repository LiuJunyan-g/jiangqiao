<template>
	<div id="index">

		<div class="indexRight">
			<h2>新增账户</h2>
			<button id="adduser" @click="add()"> 新增帐户</button>
			<div class="userList">
				<table>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td style="width: 140px">操作</td>
					</tr>
					<tr v-for="(item,i) in list" >
						<td style="height:30px;">{{i+1}}</td>
						<td>{{item.name}}</td>
						<td>{{item.pwd}}</td>
						<td>{{item.role}}</td>
						<td style="width: 100px">
							<span @click="updata(i)">编辑</span>
							<span @click="del(i)">删除</span>
						</td>
					</tr>
				</table>
				<div class="changePage">
	
			<div class="block">
  			<el-pagination
    			layout="prev, pager, next"
   				 :total="num">
 			</el-pagination>
			</div>
				</div>
			</div>
			<div style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 10;background: rgba(0,0,0,0.5);" v-show="isshow">
			<div class="msg" >
				<div>
					<h1>{{msg}}</h1>
					<div class="msgChange">
						<span>
							用户名
						</span>
						<input type="text" v-model="name" />
					</div>
					<div class="msgChange">
						<span>
							密码
						</span>
						<input type="text" v-model="pwd" />
					</div>
					<div class="msgChange">
						<span>
							角色
						</span>
						<input type="text" v-model="role" />
					</div>
					<button @click="enter1()">确定</button>
					<button @click="cencel()">取消</button>
				</div>

			</div>
			</div>
		</div>

	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: "Index",
		data() {
			return {
				isshow: false,
				aaa: 'aaa',
				isadd: true,
				msg: "",
				uid: 0,
				userid: 0,
				name: "",
				pwd: "",
				role: "",
				list: [],
				num:100
			}
		},
		methods: {
			updata(i) {
				this.isshow = true;
				this.msg = "账户编辑";
				this.uid = i;
				this.isadd = false;
				this.userid = this.list[i].id;
				this.name = this.list[i].name;
				this.pwd = this.list[i].pwd;
				this.role = this.list[i].role
			},
			del(i) {
				var _this=this;
				this.userid=this.list[i].id;
				console.log(_this.userid);
				axios.post(
					"http://127.0.0.1:8000/api/delete_user/", {
					"pk":_this.userid
					}).then(function(){
						_this.list.splice(i, 1)
						location.reload()
					})
			},
			add() {
				this.isadd = true;
				this.isshow = true;
				this.msg = "账户添加";
			},
			enter1() {
				this.isshow = false;
				var _this = this;
				if(this.isadd) {
					console.log(_this.name, _this.pwd)
					axios.post(
						"http://127.0.0.1:8000/api/create_user/", {
							"name": _this.name,
							"pwd": _this.pwd,
							"role": _this.role
						}).then(function(data) {
						console.log(data);
						location.reload()
					})
				} else {
					console.log(_this.userid);
					axios.put(
						"http://127.0.0.1:8000/api/update_user/",{
							"pk":_this.userid,
							"name": _this.name,
							"pwd": _this.pwd,
							"role": _this.role
						}).then(function(data) {
						console.log(data);
						location.reload()
					})

				}
			},
			cencel() {
				this.isshow = false;
				this.name = "";
				this.pwd = "";
				this.role = "";
			}		
		},
		mounted() {
			var _this = this;	
			axios.get("http://127.0.0.1:8000/api/get_users/?page=1").then(function(data) {
				_this.list = data.data.data
				console.log(data.data);
				_this.num=data.data.count;
			})
		$(".el-pager li").on("click",function(){
			var pageNum=$(this).html();
			console.log(pageNum)
			axios.get(
				"http://127.0.0.1:8000/api/get_users/?page="+pageNum).then(function(data) {
				_this.list = data.data.data
				console.log(data.data);
			})
	
		})
		}
	}
</script>

<style scoped>
	#index {
		width: 1160px;
		height: 650px;
		margin: 50px auto;
		border: 1px solid #cecece;
	}
	.indexRight {
		width: 1160px;
		height: 100%;
		box-sizing: border-box;
		padding-left: 200px;
		float: right;
		position: relative;
	}
	
	.indexRight h2 {
		text-align: left;
	}
	
	.indexRight #adduser {
		position: absolute;
		top: 50px;
		left: 200px;
		width: 120px;
		height: 32px;
	}
	
	.indexRight .userList {
		margin: 70px 10px;
	}
	
	.indexRight .userList tr:first-child td {
		border: 1px solid #CECECE;
		width: 120px;
		height: 30px;
		padding: 0;
		margin: 0;
	}
	
	.indexRight .userList tr {
		border: 1px solid #CECECE;
		margin-top: 5px
	}
	
	.indexRight .userList td span {
		border: 1px solid #CECECE;
		padding: 2px 10px;
		margin: 0 5px;
		border-radius: 5px;
		background: #C7C7CC;
	}
	
	.indexRight .userList td span:hover {
		background: #FF5053;
	}
	
	.indexRight .msg {
		width: 600px;
		height: 500px;
		background: #FFFFFF;
		border: #f00 1px solid;
		display: block;
		margin: 120px auto;
		border-radius: 20px;
		box-sizing: border-box;
		padding:10px;
	}
	
	.indexRight .msg .msgChange {
		width: 300px;
		height: 40px;
		box-sizing: border-box;
		margin: 10px auto;
		padding: 5px 0;
	}
	.indexRight .changePage{
		position: absolute;
		bottom: 50px;
		right: 350px;
		
	}

</style>