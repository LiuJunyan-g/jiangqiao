<template>
	<div id="app">
		<el-container>
			<el-header v-if="$route.path=='/zhanghuxinxi'||$route.path=='/land_resource'||$route.path=='/homepage'|| $route.path=='/add_land'|| $route.path=='/plant_resource'|| $route.path=='/building_resource'|| $route.path=='/store_resource'|| $route.path=='/untreated_info'">
				<el-menu :default-active="activeIndex2" class="el-menu-demo center_css" mode="horizontal" @select="handleSelect" disabled=false
				 text-color="#fff" active-text-color="#ffd04b" id="meau">
					<div style="line-height: 0;margin-right: 40px;"><img src="./assets/jiangqiao.jpg" alt="" style="width: 200px;height: 60px;margin-left: -110px;"></div>
					<el-menu-item index="1" style="font-size: 18px;color: #000;">首页</el-menu-item>
					<el-menu-item index="2" style="font-size: 18px;color: #000;">田地资源</el-menu-item>
					<el-menu-item index="3" style="font-size: 18px;color: #000;">厂房资源</el-menu-item>
					<el-menu-item index="4" style="font-size: 18px;color: #000;">楼宇资源</el-menu-item>
					<el-menu-item index="5" style="font-size: 18px;color: #000;">商铺资源</el-menu-item>
					
		
						<el-badge :value="count"  style="background: #6693ce;">
							<el-button size="small" @click="mess1()" style="background: #6693ce;color: #2C3E50;">通知</el-button>
						</el-badge>
			
					
					<div v-if="!is_login">
						{{is_login}}
						<el-button type="primary">登陆</el-button>
					</div>
					<div v-if="is_login" style="width: 100px;" class="userSelect">
						<el-dropdown trigger="click">
						  <span class="el-dropdown-link" style="background: #6693ce;color: #2C3E50;">
							{{username}}<i class="el-icon-caret-bottom el-icon--right"></i>
						  </span>
						  
						  <el-dropdown-menu slot="dropdown">
							  <el-dropdown-item class="clearfix">
							    <span v-if="role=='镇长'||role=='镇级账户'" @click="add_notice">新建通知</span>
							  </el-dropdown-item>
							
							<el-dropdown-item class="clearfix">
							  <span @click="user()" v-if="role=='镇长'">账户管理</span>
							</el-dropdown-item>
							<el-dropdown-item class="clearfix" >
							  <span @click="exit1()">退出</span>
							</el-dropdown-item>
							
						  </el-dropdown-menu>
						</el-dropdown>
					</div>
					
				</el-menu>
			</el-header>
		
			<el-main style="background: #f7f7f7;">
				<router-view/>
			</el-main>
		</el-container>
		<div id="add_css" v-show="showAddArea">
			<div class="add_css" style="width: 50%;box-sizing: border-box;padding: 50px;" >
				
				<el-form :model="form">
				<el-form-item label="标题" :label-width="formLabelWidth" >
					<el-input v-model="form_addland.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="内容" :label-width="formLabelWidth">
					<el-input v-model="form_addland.content" autocomplete="off"></el-input>
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
				activeIndex2: localStorage.getItem("index"),
				is_login:localStorage.getItem("user_id"),
				username:"",
				count:"",
				role:localStorage.getItem('role'),
				isshow: false,
				show: 0,
				form_addland:{
					content: "",
					name: "",
				},
				form: {
					content: "",
					name: "",
				},
				formLabelWidth: '110px',
				landsoure: "1",
				data: ""
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				localStorage.setItem("index", key)
				console.log(key, keyPath);
				if (key == 5) {
					this.$router.push({
						path: '/store_resource'
					})
				}
				if (key == 4) {
					this.$router.push({
						path: '/building_resource'
					})
				}
				if (key == 3) {
					this.$router.push({
						path: '/plant_resource'
					})
				}
				if (key == 2) {
					this.$router.push({
						path: '/land_resource'
					})
				}
				if (key == 1) {
					this.$router.push({
						path: '/homepage'
					})
				}
			},
			add_source(){
				var _this=this;
				var data = {
					name: _this.form_addland.name,
					content: _this.form_addland.content,
					
					user_id: localStorage.getItem("user_id")
				}
				_this.$axios({
					url: "http://127.0.0.1:8000/api/create_notice/",
					method: "POST",
					data: data
				}).then((res) => {
			
					this.showAddArea=false;
					location.reload()
				})
			},
			add_notice() {
				this.showAddArea=true;
			},
			mess1(){
				this.$router.push({
					path: '/untreated_info'
				})
			},
			exit1(){
				console.log("aa")
				window.localStorage.clear();
				this.$router.push('/login')
			},
			user(){
				this.$router.push({
					path: '/zhanghuxinxi'
				})
			}
			
		},
		mounted(){	
			if(localStorage.getItem("user_id")==undefined||localStorage.getItem("user_id")==""){
				this.$router.push("/login")
			}else{
			var name1=localStorage.getItem("username");
			var str="";
			var  rolestyle=localStorage.getItem("role");
			if(rolestyle=="1"){
				str="-镇长"
			}else if(rolestyle=="2"){
				str="-镇级"
			}else if(rolestyle=="3"){
				str="-村级"
			}
			this.username=name1+str;
			}
			var _this = this;
			this.$axios({
				method: "GET",
				url: "http://127.0.0.1:8000/api/get_bell/?user_id=" + localStorage.getItem("user_id"),
			}).then(res => {
				console.log(res.data.count)
				_this.count = res.data.count;
				
				})
			
			
			localStorage.setItem("index", this.$route.path == '/homepage'?"1" : this.$route.path == '/land_resource'?"2":"1")
		}
		
	}
	
</script>

<style>
	*{
		margin:0;
		padding:0;
		}
	
	a {
		text-decoration: none;
	}

	.el-header,
	.el-footer {
		background-color: #6693ce;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}
.el-menu.el-menu--horizontal{
	background:#6693CE;
}
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		/* line-height: 500px; */
		height: 700px;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	
	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	.center_css {
		display: flex;
		justify-content: space-between;
	}
	.userSelect ul{
		position: absolute;
		right: 0;
		top: 15px;
		width: 100px;
		height: 30px;
		overflow: hidden;
	}
	.userSelect ul li{
		width: 100px;
		height: 30px;
		margin-top: 3px;
		list-style: none;
		line-height: 30px;
	}
	.userSelect ul:hover{
		height: 150px;
	}
	.userSelect ul:hover {
		height: 150px;
	}
	

	.userSelect ul>.li1:hover{
		background: rgba(0,0,255,0.6);
		color: #FFFFFF;
	}
	.item {
  margin-top: 0px;
  margin-right: 40px;
}
.el-badge__content.is-fixed{
	top: 10px;
}
	.ho:hover{
		color: #FF0000;
	}
		.msg {
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
	
	.msg .msgChange {
		width: 300px;
		height: 40px;
		box-sizing: border-box;
		margin: 10px auto;
		padding: 5px 0;
	}
	.changePage{
		position: absolute;
		bottom: 50px;
		right: 350px;
		
	}
	.add_css{
		height: 300px;
		width: 400px;
		margin: 100px auto;
		background: #FFFFFF;
	}
		#add_css{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.4);
		z-index: 100;
	}
</style>
