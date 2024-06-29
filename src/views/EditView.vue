<script setup>
import {reactive} from 'vue';
import {useRoute} from 'vue-router';
import UserDisplay from "@/components/UserDisplay.vue";

const edit1 = reactive({
  arg1: '',
  arg2: '',
});


const edit2 = reactive({
  arg1: '',
  arg2: '',
});


const edit3 = reactive({
  arg1: '',
  arg2: '',
});


const tableData = reactive([
  {
    date: '2021-08-01',
    name: '张三',
    address: '北京市海淀区西二旗',
  },

  {
    date: '2021-08-02',
    name: "李四",
    address: '北京市海淀区西二旗',
  }
]);

const summaryForm = reactive({
  title: '',
  content: '',
});

const route = useRoute();
const orderId = route.params.order_id;

const handleEdit1 = () => {

}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header">
        <div class="header-content">
          <el-button type="primary" @click="$router.go(-1)" style="position: absolute; left: 20px; top: 20px;">返回</el-button>
          <h1 class="title">熙心健康体检报告管理系统</h1>
        </div>
      </el-header>
      <el-container>
        <el-aside width="360px" id="side_container">
          <p style="font-size: 18px; margin-left: 20px;">体检客户信息</p>
          <UserDisplay id="sideUserForm"></UserDisplay>
        </el-aside>
        <el-main style="height: 100vh; padding: 40px; background-color: #F5FFFA;">
          <div>
            <el-row>
              <el-col :span="12">
                <h2>编辑体检报告</h2>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form :model="edit1">
                  <el-form-item label="血小板计数">
                    <el-input v-model="edit1.arg1"></el-input>
                    10^9/L 正常范围：100-300
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form :model="edit1" label-width="60px">
                  <el-form-item label="血红细胞计数">
                    <el-input v-model="edit1.arg2"></el-input>
                    10^12/L 正常范围：3.5-5.5
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button type="primary" @click="handleEdit1">保存</el-button>
              </el-col>
            </el-row>
            <el-divider/>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form :model="edit1" label-width="60px">
                  <el-form-item label="arg1">
                    <el-input v-model="edit1.arg1"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form :model="edit1" label-width="60px">
                  <el-form-item label="arg2">
                    <el-input v-model="edit1.arg2"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button type="primary" @click="handleEdit1">保存</el-button>
              </el-col>
            </el-row>
            <el-divider/>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form :model="edit1" label-width="60px">
                  <el-form-item label="arg1">
                    <el-input v-model="edit1.arg1"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form :model="edit1" label-width="60px">
                  <el-form-item label="arg2">
                    <el-input v-model="edit1.arg2"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button type="primary" @click="handleEdit1">保存</el-button>
              </el-col>
            </el-row>
            <el-divider/>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form :model="edit1" label-width="60px">
                  <el-form-item label="arg1">
                    <el-input v-model="edit1.arg1" type="textarea"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form :model="edit1" label-width="60px">
                  <el-form-item label="arg2">
                    <el-input v-model="edit1.arg2" type="textarea"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form :model="edit1" label-width="60px">
                  <el-form-item label="arg1">
                    <el-input v-model="edit1.arg1" type="textarea"></el-input>

                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button type="primary" @click="handleEdit1">保存</el-button>
              </el-col>
            </el-row>
            <el-divider/>
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>总验结论</span>
                  <el-button type="danger" style="float: right;">总验结果报告归档</el-button>
                </div>
              </template>
              <div>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="Date"/>
                  <el-table-column prop="name" label="Name"/>
                  <el-table-column prop="address" label="Address"/>
                </el-table>
              </div>
              <div style="margin-top: 20px;">
                <el-form :model="summaryForm" label-width="60px">
                  <el-form-item label="标题">
                    <el-input v-model="summaryForm.title"></el-input>
                  </el-form-item>
                  <el-form-item label="内容">
                    <el-input v-model="summaryForm.content" type="textarea"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <template #footer>
                <el-row justify="center">
                  <el-button type="primary">添加</el-button>
                  <el-button type="warning">清空</el-button>
                </el-row>
              </template>
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
#side_container {
  background-color: #B0C4DE;
}

#sideUserForm {
  margin-top: 70px;
  margin-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30vh;
}

.el-header {
  height: 100px;
  background-color: #87CEFA;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-shadow: 2px 2px 4px #ddd;
}
</style>
