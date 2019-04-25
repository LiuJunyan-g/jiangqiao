<template>
  <div class="ordertracking_box">
    <div class="serach">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-1 col-sm-1">K&S订单号：</div>
          <div class="col-md-3 col-sm-3">
            <input class="form-control" type="text" placeholder="订单号">
          </div>

          <div class="col-md-1 col-sm-1">客户：</div>
          <div class="col-md-3 col-sm-3">
            <input class="form-control" type="text" placeholder="客户">
          </div>

          <div class="col-md-1 col-sm-1">供应商：</div>
          <div class="col-md-3 col-sm-4">
            <input class="form-control" type="text" placeholder="供应商">
          </div>
        </div>
        <div class="row">
          <div class="col-md-1 col-sm-1">零件名称：</div>
          <div class="col-md-3 col-sm-3">
            <input class="form-control" type="text" placeholder="零件名称">
          </div>

          <div class="col-md-1 col-sm-1">零件编码：</div>
          <div class="col-md-3 col-sm-3">
            <input class="form-control" type="text" placeholder="零件编码">
          </div>

          <div class="col-md-1 col-sm-1">检验项目：</div>
          <div class="col-md-3 col-sm-3">
            <input class="form-control" type="text" placeholder="检验项目">
          </div>
        </div>
        <div class="row">
          <div class="col-md-1 col-sm-1">检验日期：</div>
          <div class="col-md-3 col-sm-4">
            <input class="form-control" type="date" placeholder="检查时间" required="required">
          </div>
          <div class="col-md-1 col-sm-1">分组依据：</div>
          <div class="col-md-3 col-sm-4">
            <input class="form-control" type="text" placeholder="分组依据" required="required">
          </div>
          <div class="col-md-1 col-sm-1">排行数：</div>
          <div class="col-md-3 col-sm-4">
            <input class="form-control" type="number" placeholder="排行数">
          </div>
        </div>
        <div class="row">
          <div class="col-md-1 col-sm-1"></div>
          <div class="col-md-3 col-sm-4"></div>
          <div class="col-md-1 col-sm-1"></div>
          <div class="col-md-3 col-sm-4"></div>
          <div class="col-md-1 col-sm-1"></div>
          <div class="col-md-3 col-sm-4">
            <button class="btn btn-primary">查询</button>
            <button class="btn btn-default">重置</button>
          </div>
        </div>
      </div>
    </div>
    <div class="space" style="height:30px;background-color:#F0F2F5;"></div>
    <div>
      <div id="myChart" style="width:700px;height:600px"></div>
      <div class="partList">
        <ul>
          <li>180501-10-c</li>
          <li>180501-10-c</li>
          <li>180501-10-c</li>
          <li>180501-10-c</li>
          <li>180501-10-c</li>
        </ul>
      </div>
      <div class="clear"></div>
    </div>
    <div id="newChart" style="width:900px;height:600px"></div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
    this.drawNewLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var data = [
        {
          name: "主体",
          itemStyle: {
            color: "#ad213e"
          },
          children: [
            {
              name: "生锈",
              itemStyle: {
                color: "#794752"
              },
              children: [
                {
                  name: ((9785 / 55484) * 100).toFixed(2) + "%" + "   " + 9785,
                  value: 9785,
                  itemStyle: {
                    color: "black"
                  }
                }
              ]
            },
            {
              name: "脏污",
              itemStyle: {
                color: "#cc3d41"
              },
              children: [
                {
                  name: ((1500 / 55484) * 100).toFixed(2) + "%" + "   " + 1500,
                  value: 2000,
                  itemStyle: {
                    color: "black"
                  }
                }
              ]
            },
            {
              name: "墨斑",
              itemStyle: {
                color: "#b14d57"
              },
              children: [
                {
                  name: ((1500 / 55484) * 100).toFixed(2) + "%" + "   " + 1500,
                  value: 1500,
                  itemStyle: {
                    color: "black"
                  }
                }
              ]
            },
            {
              name: "多料",
              itemStyle: {
                color: "#794752"
              },
              children: [
                {
                  name: ((2500 / 55484) * 100).toFixed(2) + "%" + "   " + 2500,
                  value: 2000,
                  itemStyle: {
                    color: "black"
                  }
                }
              ]
            },
            {
              name: "粉皮",
              itemStyle: {
                color: "#794752"
              },
              children: [
                {
                  name: ((2500 / 55484) * 100).toFixed(2) + "%" + "   " + 2500,
                  value: 2500,
                  itemStyle: {
                    color: "black"
                  }
                }
              ]
            },
            {
              name: "压痕",
              itemStyle: {
                color: "#794752"
              },
              children: [
                {
                  name: ((1500 / 55484) * 100).toFixed(2) + "%" + "   " + 1500,
                  value: 1500,
                  itemStyle: {
                    color: "black"
                  }
                }
              ]
            },
            {
              name: "压痕",
              itemStyle: {
                color: "#794752"
              },
              children: [
                {
                  name: ((1500 / 55484) * 100).toFixed(2) + "%" + "   " + 1500,
                  value: 1500,
                  itemStyle: {
                    color: "black"
                  }
                }
              ]
            },
            {
              name: "磕伤",
              itemStyle: {
                color: "#794752"
              },
              children: [
                {
                  name: ((2000 / 55484) * 100).toFixed(2) + "%" + "   " + 2000,
                  value: 2000,
                  itemStyle: {
                    color: "black"
                  }
                }
              ]
            },
            {
              name: "压伤",
              itemStyle: {
                color: "#794752"
              },
              children: [
                {
                  name: ((2300 / 55484) * 100).toFixed(2) + "%" + "   " + 2300,
                  value: 2300,
                  itemStyle: {
                    color: "black"
                  }
                }
              ]
            },
            {
              name: "沙眼",
              itemStyle: {
                color: "#794752"
              },
              children: [
                {
                  name: ((3000 / 55484) * 100).toFixed(2) + "%" + "   " + 3000,
                  value: 3000,
                  itemStyle: {
                    color: "black"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "外观",
          itemStyle: {
            color: "#a87b64"
          },
          children: [
            {
              name: "外观",
              itemStyle: {
                color: "#c78869"
              },
              children: [
                {
                  name:
                    ((11959 / 55484) * 100).toFixed(2) + "%" + "   " + 11959,
                  value: 11959,
                  itemStyle: {
                    color: "#C78869"
                  }
                }
              ]
            }
          ]
        },
        {
          name: "齿部",
          itemStyle: {
            color: "#e65832"
          },
          children: [
            {
              name: "齿部缺陷",
              itemStyle: {
                color: "#d45a59"
              },
              children: [
                {
                  name: ((3200 / 55484) * 100).toFixed(2) + "%" + "   " + 3200,
                  value: 3200,
                  itemStyle: {
                    color: "#da5c1f"
                  }
                }
              ]
            },
            {
              name: "非齿部缺陷",
              itemStyle: {
                color: "#d45a59"
              },
              children: [
                {
                  name: ((2000 / 55484) * 100).toFixed(2) + "%" + "   " + 2000,
                  value: 2000,
                  itemStyle: {
                    color: "#da5c1f"
                  }
                }
              ]
            },
            {
              name: "其他缺陷",
              itemStyle: {
                color: "#d45a59"
              },
              children: [
                {
                  name:
                    ((11740 / 55484) * 100).toFixed(2) + "%" + "   " + 11740,
                  value: 11740,
                  itemStyle: {
                    color: "#da5c1f"
                  }
                }
              ]
            }
          ]
        }
      ];
      //55484
      myChart.setOption({
        title: {
          // subtext:"Source: https://worldcoffeeresearch.org/work/sensory-lexicon/",
          textStyle: {
            fontSize: 14,
            align: "center"
          },
          subtextStyle: {
            align: "center"
          },
          sublink: "https://worldcoffeeresearch.org/work/sensory-lexicon/"
        },
        series: {
          type: "sunburst",
          highlightPolicy: "ancestor",
          data: data,
          radius: [0, "95%"],
          sort: null,
          levels: [
            {},
            {
              r0: "15%",
              r: "35%",
              itemStyle: {
                borderWidth: 2
              },
              label: {
                rotate: "tangential"
              }
            },
            {
              r0: "35%",
              r: "70%",
              label: {
                align: "right"
              }
            },
            {
              r0: "70%",
              r: "72%",
              label: {
                position: "outside",
                padding: 3,
                silent: false
              },
              itemStyle: {
                borderWidth: 3
              }
            }
          ]
        }
      });
    },
    drawNewLine() {
      // 基于准备好的dom，初始化echarts实例
      let newChart = this.$echarts.init(document.getElementById("newChart"));
      //55484
      newChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: [
            "外表",
            "齿部缺陷",
            "非齿部缺陷",
            "其他缺陷",
            "压伤",
            "生锈",
            "脏污",
            "墨斑",
            "多料",
            "粉皮",
            "沙眼",
            "压痕",
            "磕伤",              
          ]
        },
        series: [
          {
            name: "外表",
            type: "pie",
            //选中样式
            // selectedMode: 'single',
            radius: [0, "20%"],

            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 679, name: "外表" }]
          },
          {
            name: "齿部",
            type: "pie",
            radius: ["20%", "40%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: "齿部缺陷" },
              { value: 310, name: "非齿部缺陷" },
              { value: 4000, name: "其他缺陷" }
            ]
          },
          {
            name: "其他部位",
            type: "pie",
            radius: ["40%", "60%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              {
                value: 335,
                name: "压伤",
                itemStyle: {
                  color: "black"
                }
              },
              { value: 3000, name: "生锈" },
              { value: 234, name: "脏污" },
              { value: 135, name: "墨斑" },
              { value: 200, name: "多料" },
              { value: 251, name: "粉皮" },
              { value: 147, name: "沙眼" },
              { value: 102, name: "压痕" },
              { value: 102, name: "磕伤" }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.space {
  margin-bottom: 20px;
}
.col-md-1 {
  line-height: 34px;
}
.clear {
  clear: both;
}
#myChart {
  width: 900px;
  height: 600px;
  float: left;
}
.ordertracking_box {
  width: 98%;
  margin: 0 auto;
  background-color: white;
  margin-top: 10px;
  min-height: 680px;
  padding: 20px;
  min-width: 950px;
  /* min-width: 990px; */
}
.partList {
  float: left;
}
.table_kind span {
  padding: 15px 20px;
  cursor: pointer;
}
.table_kind {
  height: 50px;
  width: 95%;
  margin: 0 auto;
  border-bottom: 2px solid gray;
  box-sizing: border-box;
  line-height: 50px;
  margin-bottom: 15px;
}
.serach {
  margin-bottom: 20px;
}
.col-md-8 {
  text-align: right;
}
.btn {
  margin-left: 10px;
}
.row > div {
  padding: 0;
}
.row .col-md-1 {
  text-align: right;
  padding-right: 5px;
}
.row {
  margin-bottom: 10px;
}
</style>
