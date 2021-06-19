<template>
  <div class="app-container">
    医院设置列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <!-- <el-button type="primary" @click="resetList()">清空</el-button> -->
    </el-form>

    <div>
      <el-button type="danger" size="mini" @click="removeRows()">
          批量删除
      </el-button>
    </div>

    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="hosname" width="300" label="医院名称" />
      <el-table-column prop="hoscode" width="200" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="350" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
          
          <router-link :to="'/hospSet/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          
           <el-button
            v-if="scope.row.status == 1"
            type="success"
            size="mini"
            icon="el-icon-lock"
            @click="lockHospSet(scope.row.id,0)"
          >锁定</el-button>
          
           <el-button
            v-if="scope.row.status == 0"
            type="warning"
            size="mini"
            icon="el-icon-unlock"
            @click="lockHospSet(scope.row.id,1)"
          >解锁</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>


<script>
import hospset from "@/api/hospset";

export default {
  data() {
    return {
      current: 0, //当前页
      limit: 3, //每页记录数
      searchObj: {}, //条件封装
      list: [], //每页数据集合
      total: 0, //数据总条数
      multipleSelection: [], //批量删除列表
    };
  },
  created() {
    this.getList();
  },
  methods: {
      //获取数据
    getList(page = 1) {
      this.current = page;
      hospset
        .getHospSetList(this.current, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //根据id删除
    removeDataById(id) {
      this.$confirm("此操作将永久删除该医院设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        hospset.deleteHospSet(id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList(1);
        });
      });
    },
    //批量删除
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    removeRows() {
        if(this.multipleSelection.length){
            this.$confirm("此操作将永久删除该医院设置信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                var list = []
                for(var i=0; i < this.multipleSelection.length; i++){
                    var obj = this.multipleSelection[i]
                    var id = obj.id
                    list.push(id)
                }
                //调用删除接口
                hospset.batchHospSet(list)
                .then((response) => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                });
                this.getList(1);
                });
            });
        }
    },
    lockHospSet(id,status){
        hospset.lockHospSet(id,status)
        .then(response => {
            this.getList(1)
        }) 

    }
  },
};
</script>