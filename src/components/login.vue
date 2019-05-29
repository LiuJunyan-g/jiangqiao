<!-- <template>
	<div class="login_page">
		<img src="../assets/img5.jpg" alt="">
		<div>
			<div class="login_input">账号：<input v-model="username" type="text" style="margin: 3px;"></div>
			<div class="login_input">密码：<input v-model="pwd" type="text" ></div>
			<el-button type="primary"  @click="login" class="button_login">登陆</el-button>
			<br>
			<br>
			没有账号？
			<router-link to="/regist">
				<a>注册</a>
			</router-link>
		</div>
	</div>
</template> -->
<template>
	<div class="loginArea">

			<div class="loginLeft">
				<h2>江桥镇土地资源管理系统</h2>
				<div class="user">
					<label>用户名：</label>
					<input type="text"  class="noborder" v-model="username"/>
				</div>
				<div class="psw">
					<label>密码：</label>
					<input type="password"  class="noborder" v-model="pwd"/>
				</div>
				
				<div class="yanzheng">
					<input type="text" name="" id="" value="" />
					<span></span>
				</div>
				
				<div class="">
					<el-checkbox v-model="checked">我已阅读用户须知并遵守保密纪录</el-checkbox>
				</div>
				<el-button type="primary" class="loginit" @click="login">登录</el-button>
				<p>说明：系统用户由管理员同意分配</p>
			</div>
			<div class="loginRight">
				<img src="../assets/login.jpg" />
			</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				pwd: ""
			}
		},
		methods: {
			login() {
				var _this = this;
				if (_this.username == "" || _this.pwd == "") {
					_this.$message({
						message: '为空',
						type: 'warning'
					});
				} else {
					_this.$axios({
						method: "POST",
						url: 'http://127.0.0.1:8000/api/login/',
						data: {
							name: _this.username,
							pwd: _this.pwd
						}
					}).then((res) => {
						console.log(res)
						// 存localStorage
						// 取localStorage.getItem("user_id")
						localStorage.setItem("user_id", res.data.data.id)
						localStorage.setItem("role", res.data.data.role)
						localStorage.setItem("username", res.data.data.name)
						_this.$router.push({
							path: '/homepage'
						})

					})
				}
			}
		},
		mounted(){
			console.log(localStorage.getItem("role"),"aa")
		
		}
	}
</script>

<!-- <style>
	img {

		width: 1000px;
		height: 500px;
	}

	.login_page {
		/* 弹性 */
		display: flex;
		/* 横向 */
		justify-content: space-around;
		/* 纵向 */
		align-items: center;
	}
	.login_input{
		margin-bottom: 10px;
		/* border: 2px solid #B3C0D1; */
		border-radius: 5px;
	}
	.button_login{
		width: 100px;
		height: 30px;
		line-height: 8px;
	}
</style> -->
<style scoped>
	.loginArea{
		width: 900px;
		height: 600px;
		margin: 50px auto;
		border: 1px solid #CECECE;
	}
	.loginLeft{
		width: 400px;
		height: 600px;
		float: left;
	}
	.loginLeft h2{
		margin: 50px 0;
	}
	.loginLeft .user,.loginLeft .psw{
		border: 1px solid #CECECE;
		width: 300px;
		height: 40px;
		box-sizing: border-box;
		padding: 5px 10px;
		margin: 20px auto;
	}
	.loginLeft .noborder{
		border: none;
		outline: none;
		height: 30px;
	} 
	.loginLeft .yanzheng {
		width:300px ;
		height: 50px;
		margin: 20px auto;
		
	}
	.loginLeft .yanzheng input {
		widows: 180px;
		height: 40px;
		border: 1px solid #CECECE;
		border-radius:12px ;
		float: left;
		outline: none;
	}
	.loginLeft .yanzheng span{
		width: 100px;
		height: 40px ;
		display: inline-block;
		font-size: 20px;
		font-size: 40px;
		border: 1px solid #CECECE ;
		border-radius:8px ;
	}
	.loginLeft .loginit{
		width: 300px;
		margin: 20px auto;
	}
	.loginRight{
		width: 500px;
		height: 600px;
		float: left;
	}
	.loginRight img{
		width: 500px;
		height: 600px;
	}
</style>