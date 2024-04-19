<template>
  <el-table
    :data="tableData"
    height="370"
    border
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
    },
    methods:{
      //调后端数据
      queryInfo () {
        axios.get('http://localhost:3000/api/user/query').then((response) => {
//             console.log(response.data)
            this.tableData = response.data;
//             console.log(this.tableData)
//             console.log('--------')

        })
      },
    //将面积数据获取后添加单位
      formatArea(area) {
          return area + ' km2';
        }
    }
  }
</script>