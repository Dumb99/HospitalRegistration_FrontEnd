<template>
  <div class="app-container">
    <el-row>
      <el-button @click="back">返回</el-button>
    </el-row>
    <h4>基本信息</h4>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">医院名称</th>
          <td width="35%">
            <b style="font-size: 14px">{{ hosptial.hosname }}</b> |
            {{ this.hosptial.param.hostypeString }}
          </td>
          <th width="15%">医院logo</th>
          <td width="35%">
            <img
              :src="'data:image/jpeg;base64,' + hosptial.logoData"
              width="80"
            />
          </td>
        </tr>
        <tr>
          <th>医院编码</th>
          <td>{{ hosptial.hoscode }}</td>
          <th>地址</th>
          <td>{{ hosptial.param.fullAddress }}</td>
        </tr>
        <tr>
          <th>坐车路线</th>
          <td colspan="3">{{ hosptial.route }}</td>
        </tr>
        <tr>
          <th>医院简介</th>
          <td colspan="3">{{ hosptial.intro }}</td>
        </tr>
      </tbody>
    </table>

    <h4>预约规则信息</h4>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">预约周期</th>
          <td width="35%">{{ bookingRule.cycle }}天</td>
          <th width="15%">放号时间</th>
          <td width="35%">{{ bookingRule.releaseTime }}</td>
        </tr>
        <tr>
          <th>停挂时间</th>
          <td>{{ bookingRule.stopTime }}</td>
          <th>退号时间</th>
          <td>
            {{ bookingRule.quitDay == -1 ? "就诊前一工作日" : "就诊当日"
            }}{{ bookingRule.quitTime }} 前取消
          </td>
        </tr>
        <tr>
          <th>预约规则</th>
          <td colspan="3">
            <ol>
              <li v-for="item in bookingRule.rule" :key="item">{{ item }}</li>
            </ol>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import hospApi from "@/api/hosp";
export default {
  data() {
    return {
      hosptial: null, //医院信息
      bookingRule: null, //预约信息
    };
  },
  created() {
    const id = this.$route.params.id;
    this.fetchHospDetail(id);
  },
  methods: {
    fetchHospDetail(id) {
      hospApi.getHospById(id).then((response) => {
        this.hosptial = response.data.hosptial;
        this.bookingRule = response.data.bookingRule;
      });
    },
    back() {
      this.$router.push({ path: "/hospSet/hosp/list" });
    },
  },
};
</script>