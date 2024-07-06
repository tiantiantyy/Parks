<template>
  <div >
    <div class="mybox">
      <el-autocomplete
        v-model.trim="input"
        :fetch-suggestions="getSuggestions"
        placeholder="请输入内容"
        class="input-with-select"
        popper-class="myautocomplete">
        <template slot="prepend">
          <el-select v-model="select" placeholder="请选择">
            <el-option label="按名称" value="1"></el-option>
            <el-option label="按省份" value="2"></el-option>
          </el-select>
        </template>
        <template slot="append">
          <el-button icon="el-icon-search" @click="searchInfo(input)"></el-button>
          <el-button @click="queryInfo">重置</el-button>
        </template>
        <template slot-scope="{ item }">
          <div class="name" @click="mysearch(item)">{{ item }}</div>
      </template>
      </el-autocomplete>
    </div>
    
    <el-table
      :data="tableData"
      height="370"
      style="width: 100%">
      <el-table-column
        prop="ID"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="NAME"
        label="公园名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="PROVINCE"
        label="省份"
        width="100">
      </el-table-column>
      <el-table-column
        prop="ADDRESS"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="AREA"
        label="公园面积">
        <template slot-scope="scope">{{ formatArea(scope.row.AREA) }}</template>
      </el-table-column>
      <el-table-column
        prop="AREA"
        label="更多">
        <template slot-scope="scope">
          <el-button @click="QueryPark(scope.row.NAME)" type="text">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        tableData:[],
        input:'',//搜索框输入内容
        select: '1',//搜索框类型选项,默认为1,"按名称"
        suggestions: [] // 存储建议数据
      }
    },
    watch: {
      select() {
      // 当 select 发生变化时调用 clearInput 方法
      this.clearInput();
    }
  },
    mounted(){
      this.queryInfo()
      this.$bus.$on('update-tabledata', this.updateTableData);
    },
    beforeDestroy() {
        // 组件销毁前移除事件监听器
        this.$bus.$off('update-tabledata');

    },
    methods:{
      searchInfo(NAME){
        //清除图层的信号
        this.$bus.$emit('clearJson');

        console.log(this.select)
        if(this.select=='1'){
          this.QueryPark(NAME)

        }
        else if(this.select=='2'){

          this.queryProvince(NAME)
          this.$bus.$emit('LoadProvince',NAME)
            }
        else{
          alert("请选择搜索类型")
        }
      },
      //调后端数据
      queryInfo () {

        this.$bus.$emit('clearJson'); //清除图层的信号
        this.clearInput();//清除搜索
        this.$bus.$emit('resetMapCenter');//重置地图视图

        axios.get('http://localhost:3000/api/user/query').then((response) => {
            this.tableData = response.data;
        })
      },
      // 当接收到 update-table-data 事件时调用该方法
      updateTableData(selectTableData) {
        console.log("表格变化了")
        // 更新 tableData 的值为 selectTableData
        this.tableData = selectTableData;
      },

    //将面积数据获取后添加单位
      formatArea(area) {
          return area + ' km2';
        },
    QueryPark(NAME){
     NAME =NAME.trim(); //去除输入框的空格
    // console.log("RA发送信号",NAME)
    this.$bus.$emit('QueryPark', NAME);
       },
    clearInput(){
      // console.log("clearInput被调用了")
        this.input=''
      },
      //按省份查询后端数据
      queryProvince (NAME) {
        let self=this
          // console.log("queryProvince",NAME)

        axios.get('http://localhost:3000/api/user/ProvinceSelect', {
                params: {
                    parameter: NAME
                }
            })
            .then(function (response) {
              self.tableData = response.data;
              console.log(self.tableData)

            })
      },

      //存储建议数据
   getSuggestions(queryString, cb) {
      if (queryString) {
        axios.get('http://localhost:3000/api/user/query', {
          params: {
            query: queryString,
            type: this.select
          }
        })
        .then((response) => {
           // 获取后端返回的建议数据，并过滤
      this.suggestions = response.data.map(item => item.NAME).filter(this.createFilter(queryString));
          // this.suggestions = response.data.map(item => item.NAME);
          console.log(this.suggestions);
          
          cb(this.suggestions); // 调用回调函数并传递建议数据
        //   //延迟搜索
        //   clearTimeout(this.timeout);
        // this.timeout = setTimeout(() => {
        //   cb(this.suggestions); // 调用回调函数并传递建议数据
        // }, 3000 * Math.random());
       
        });
      } else {
        cb([]); // 如果没有查询字符串，则返回空数组
      }
    },

    //将点击的搜索放到input
    mysearch(item){
      item =item.trim(); //去除输入框的空格
    // console.log("RA发送信号",NAME)
    this.$bus.$emit('QueryPark', item);
    },


    //进行数据的过滤
    createFilter(queryString) {
  return (item) => {
    // 判断建议项是否包含查询字符串，不区分大小写
    return item.toLowerCase().indexOf(queryString.toLowerCase()) !== -1;
  };
},
    },
  }
</script>

<style lang="less" scoped>
/* 自定义输入框的样式 */
/deep/.input-with-select{
  width:100%;
}
/deep/.input-with-select .el-input-group__prepend {
    width: 100px;
    background-color: #fff;
  }

// 
.myautocomplete {
  li {
    line-height: 20px;
    padding: 17px;
  }
}
</style>

