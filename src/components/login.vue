<template>
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
						url: 'http://192.168.20.67:8001/api/login/',
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
						_this.$router.push({
							path: '/homepage'
						})

					})
				}
			}
		}
	}
</script>

<style>
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
</style>
