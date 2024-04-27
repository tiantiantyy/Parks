<template>
  <div>
    <button @click="queryInfo">还原</button>
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
  </el-table>
</div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        tableData:[]
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
      //调后端数据
      queryInfo () {
        axios.get('http://localhost:3000/api/user/query').then((response) => {
            this.tableData = response.data;
        })
      },
      // 当接收到 update-table-data 事件时调用该方法
      updateTableData(selectTableData) {
        // 更新 tableData 的值为 selectTableData
        this.tableData = selectTableData;
      },

    //将面积数据获取后添加单位
      formatArea(area) {
          return area + ' km2';
        }
    }
  }
</script>