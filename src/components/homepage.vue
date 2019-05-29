<template>
	<div class="bing" id="main" style="width: 100%; height: 90%;border-box;padding: 20px;">

	</div>
</template>


<script type="text/javascript">
	import * as echarts from 'echarts';
	var echart = require('echarts');
	export default{
		name:"homepage",
		data(){
			return{data:""}
		},
		mounted(){
		var echarts1= document.getElementById('main');	
	

		this.$axios({
			method: "GET",
			url: "http://127.0.0.1:8000/api/home_page/?user_id=" + localStorage.getItem("user_id"),
		}).then(res => {
			console.log(res.data.builderJson.charts)
			
			var waterMarkText = 'ECHARTS';
			
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.width = canvas.height = 100;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.globalAlpha = 0.08;
			ctx.font = '20px Microsoft Yahei';
			ctx.translate(50, 50);
			ctx.rotate(-Math.PI / 4);
			ctx.fillText(waterMarkText, 0, 0);
			
			var option = {
			    backgroundColor: {
			        type: 'pattern',
			        image: canvas,
			        repeat: 'repeat'
			    },
			    tooltip: {},
			    title: [{
			        text: '田地种植种类面积统计图',
					subtext: '总计 ' + res.data.builderJson.all,
			        x: '30%',
					
			        textAlign: 'center'
			    }, {
			        text: '江桥镇各类已通过审批资源条数',
					subtext: '总计 ' + Object.keys(res.data.downloadJson).reduce(function (all, key) {
					return all + res.data.downloadJson[key];
					}, 0),
			        x: '75%',
					y: '-1.1%',
			        textAlign: 'center'
			    }, {
			        text: '主题下载',
					subtext: '总计 ' + Object.keys(res.data.themeJson).reduce(function (all, key) {
						return all + res.data.themeJson[key];
					}, 0),
			        x: '75%',
			        y: '47%',
			        textAlign: 'center'
			    }],
			    grid: [{
			        top: 50,
			        width: '50%',
			        bottom: '45%',
			        left: 50,
			        containLabel: true
			    }, {
			        top: '55%',
			        width: '50%',
			        bottom: 0,
			        left: 40,
			        containLabel: true
			    }],
			    xAxis: [{
			        type: 'value',
			        splitLine: {
			            show: false
			        }
			    }, {
			        type: 'value',
			        gridIndex: 1,
			        splitLine: {
			            show: false
			        }
			    }],
			    yAxis: [{
			        type: 'category',
			        data: Object.keys(res.data.builderJson.charts),
			        axisLabel: {
			            interval: 0,
			            rotate: 30
			        },
			        splitLine: {
			            show: false
			        }
			    }, {
			        gridIndex: 1,
			        type: 'category',
			        data: Object.keys(res.data.builderJson.components),
			        axisLabel: {
			            interval: 0,
			            rotate: 30
			        },
			        splitLine: {
			            show: false
			        }
			    }],
			    series: [{
			        type: 'bar',
			        stack: 'chart',
			        z: 3,
			        label: {
			            normal: {
			                position: 'right',
			                show: true
			            }
			        },
			        data: Object.keys(res.data.builderJson.charts).map(function (key) {
			            return res.data.builderJson.charts[key];
			        })
			    }, {
			        type: 'bar',
			        stack: 'chart',
			        silent: true,
			        itemStyle: {
			            normal: {
			                color: '#eee'
			            }
			        },
			        data: Object.keys(res.data.builderJson.charts).map(function (key) {
			            return res.data.builderJson.all;
			        })
			    }, {
			        type: 'bar',
			        stack: 'component',
			        xAxisIndex: 1,
			        yAxisIndex: 1,
			        z: 3,
			        label: {
			            normal: {
			                position: 'right',
			                show: true
			            }
			        },
			        data: Object.keys(res.data.builderJson.components).map(function (key) {
			            return res.data.builderJson.components[key];
			        })
			    }, {
			        type: 'bar',
			        stack: 'component',
			        silent: true,
			        xAxisIndex: 1,
			        yAxisIndex: 1,
			        itemStyle: {
			            normal: {
			                color: '#eee'
			            }
			        },
			        data: Object.keys(res.data.builderJson.components).map(function (key) {
			            return res.data.builderJson.all;
			        })
			    }, {
			        type: 'pie',
			        radius: [0, '30%'],
			        center: ['75%', '25%'],
			        data: Object.keys(res.data.downloadJson).map(function (key) {
			            return {
			                name: key.replace('.js', ''),
			                value: res.data.downloadJson[key]
			            }
			        })
			    }, {
			        type: 'pie',
			        radius: [0, '30%'],
			        center: ['75%', '75%'],
			        data: Object.keys(res.data.themeJson).map(function (key) {
			            return {
			                name: key.replace('.js', ''),
			                value: res.data.themeJson[key]
			            }
			        })
			    }]
			}			
					echart.init(echarts1).setOption(option);
			})




		}
	}
	  
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
