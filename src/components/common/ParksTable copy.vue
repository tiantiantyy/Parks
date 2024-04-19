<template>
  <el-table
    :data="tableData"
    height="370"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="序号"
      width="60">
    </el-table-column>
    <el-table-column
      prop="name"
      label="公园名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="100">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '1',
          name: '黄山世界地质公园',
          province:'安徽省',
          address: '黄山市黄山区汤口镇汤泉路1号黄山风景区内(南侧)'
        }, {
          id: '2',
          name: '庐山世界地质公园',
          province:'江西省',
          address: '九江市庐山市庐山风景区内'
        }, {
          id: '3',
          name: '云台山世界地质公园',
          province:'河南省',
          address: '焦作市修武县七贤镇沙墙村北2公里'
        }, {
          id: '4',
          name: '石林世界地质公园',
          province:'云南省',
          address: '昆明市石林彝族自治县石林街道'
        }, {
          id: '5',
          name: '丹霞山世界地质公园',
          province:'广东省',
          address: '韶关市仁化县106国道'
        }, {
          id: '6',
          name: '张家界世界地质公园',
          province:'湖南省',
          address: '张家界市武陵源区金鞭路279号'
        }, {
          id: '7',
          name: '五大连池世界地质公园',
          province:'黑龙江省',
          address: '黑河市五大连池市五大连池镇'
        }]
      }
    }
  }
</script>