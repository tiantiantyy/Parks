<template>
  <div id="app">
    <router-view></router-view>
    <!-- <button @click="queryInfo"></button> -->
  </div>
</template>

<script>
import axios from 'axios';
export default{
    name: 'App',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
//         userName: '',
//         password: ''
      }
    },
    methods: {
//       addUser() {
//         var name = this.userName;
//         var password = this.password;
//         axios.post('http://localhost:3000/api/user/addUser', {
//           username: name,
//           password: password
//         }, {}).then((response) => { console.log(response); })
//       },
  
      queryInfo () {
        axios.get('http://localhost:3000/api/user/query').then((response) => {
            console.log(response)
            console.log('--------')
        })
      },
//       changeMsg1 () {
//         axios.get('http://localhost:3000/api/user/query1').then((res) => {
//             console.log(response)
//             console.log('--------')
//         })
//       },
    }

}
</script>

<style>
.greenLayer{
    /* filter:grayscale(500%) invert(10%); */
    filter: grayscale(6%) sepia(22%) invert(29%) hue-rotate(272deg) saturate(120%) contrast(260%) brightness(94%);

    /* filter:grayscale(500%) sepia(11%) invert(5%) saturate(10%); */

    /* filter:grayscale(100%) sepia(51%) invert(100%) saturate(350%) ; */
}
.blueLayer{
    /* filter:grayscale(500%) invert(10%); */
    filter:grayscale(220%) sepia(2%) invert(5%) ;
    /* filter:grayscale(500%) sepia(11%) invert(5%) saturate(10%); */
    /* filter: invert(97%) sepia(71%) saturate(783%) hue-rotate(152deg) brightness(84%) contrast(89%); */
    /* filter:grayscale(100%) sepia(51%) invert(100%) saturate(350%) ; */
}
</style>
