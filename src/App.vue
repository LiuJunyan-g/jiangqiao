<template>
	<div id="app">
		<el-container>
			<el-header v-if="$route.path=='/zhanghuxinxi'||$route.path=='/land_resource'||$route.path=='/homepage'|| $route.path=='/add_land'|| $route.path=='/plant_resource'|| $route.path=='/building_resource'|| $route.path=='/store_resource'">
				<el-menu :default-active="activeIndex2" class="el-menu-demo center_css" mode="horizontal" @select="handleSelect"
				 background-color="#B3C0D1" text-color="#fff" active-text-color="#ffd04b" id="meau">
					<div style="line-height: 0;margin-right: 180px;"><img src="./assets/logo.png" alt="" style="width: 50px;height: 60px;"></div>
					<el-menu-item index="1">首页</el-menu-item>
					<el-menu-item index="2">田地资源</el-menu-item>
					<el-menu-item index="3">厂房资源</el-menu-item>
					<el-menu-item index="4">楼宇资源</el-menu-item>
					<el-menu-item index="5">商铺资源</el-menu-item>
					<div style="margin-left: 280px;"></div>
					<el-dropdown trigger="click">
						<span class="el-dropdown-link">
							<span class="el-icon-bell" style="font-size:20px;color: #00FF00;"></span>通知<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item class="clearfix">
								评论
								<el-badge class="mark" :value="12" />
							</el-dropdown-item>
							<el-dropdown-item class="clearfix">
								回复
								<el-badge class="mark" :value="3" />
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<div v-if="!is_login">
						{{is_login}}
						<el-button type="primary">登陆</el-button><el-button type="primary">注册</el-button>
					</div>
					<div v-if="is_login">
						刘军阳
					</div>
				</el-menu>
			</el-header>
		<!-- 	<el-header v-if="$route.path=='/zhanghuxinxi'||$route.path=='/tudiziyuan'||$route.path=='/homepage'">
				<el-menu :default-active="activeIndex2" class="el-menu-demo center_css" mode="horizontal" @select="handleSelect"
				 background-color="#B3C0D1" text-color="#fff" active-text-color="#ffd04b" id="meau">
					<div style="line-height: 0;margin-right: 180px;"><img src="./assets/logo.png" alt="" style="width: 50px;height: 60px;"></div>
					<el-menu-item index="1"><a href="zhuye.html">首页</a></el-menu-item>
					<el-menu-item index="2"><a href="#" target="_blank">田地资源</a></el-menu-item>
					<el-menu-item index="3"><a href="#" target="_blank">厂房资源</a></el-menu-item>
					<el-menu-item index="4"><a href="register.html" target="_blank">楼宇资源</a></el-menu-item>
					<el-menu-item index="5"><a href="register.html" target="_blank">商铺资源</a></el-menu-item>
					<div style="margin-left: 280px;">通知</div>
				</el-menu>
			</el-header> -->
			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				activeIndex2: localStorage.getItem("index"),
				is_login:localStorage.getItem("user_id")
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
			}
		},
		created() {
			localStorage.setItem("index", this.$route.path == '/homepage'?"1" : this.$route.path == '/land_resource'?"2":"1")
		}
	}
</script>

<style>
	a {
		text-decoration: none;
	}

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
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

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		/* line-height: 500px; */
		height: 500px;
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
</style>
