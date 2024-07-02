<script setup>
import {reactive, ref, computed} from 'vue';
import {useRoute} from 'vue-router';
import axios from "axios";

const edit1 = reactive({
  arg1: '',
  arg2: '',
});

const getXue = async () => {
  await axios.get('http://localhost:8080/overAllResult/getXue', {
    params: {
      orderId: orderId
    }
  }).then(res => {
    if (res.data.code === 0) {
      console.log(res.data.data);
      edit1.arg1 = res.data.data.arg1;
      edit1.arg2 = res.data.data.arg2;
    } else {
      ElMessage.error('获取数据失败');
    }
  }).catch(err => {
    console.log(err);
  });
};

const handleEdit1 = async () => {
  await axios.post('http://localhost:8080/overAllResult/updateXue', {
        orderId: orderId,
        arg1: edit1.arg1,
        arg2: edit1.arg2
      }
  ).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('保存成功');
      getXue();
    } else {
      ElMessage.error('保存失败');
    }
  }).catch(err => {
    console.log(err);
  });
}


const edit2 = reactive({
  arg1: '',
  arg2: '',
});

const getSheng = async () => {
  await axios.get('http://localhost:8080/overAllResult/getSheng', {
    params: {
      orderId: orderId
    }
  }).then(res => {
    if (res.data.code === 0) {
      console.log(res.data.data);
      edit2.arg1 = res.data.data.arg1;
      edit2.arg2 = res.data.data.arg2;
    } else {
      ElMessage.error('获取数据失败');
    }
  }).catch(err => {
    console.log(err);
  });
};

const handleEdit2 = async () => {
  await axios.post('http://localhost:8080/overAllResult/updateSheng', {
        orderId: orderId,
        arg1: edit2.arg1,
        arg2: edit2.arg2
      }
  ).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('保存成功');
      getSheng();
    } else {
      ElMessage.error('保存失败');
    }
  }).catch(err => {
    console.log(err);
  });
}

const tableData = reactive([]);

const summaryForm = reactive({
  title: '',
  content: '',
});

const route = useRoute();

const orderId = route.params.order_id;

const dialogTableVisible = ref(false);
const dialogTableVisibleIndex = ref(0);

const addRow = async () => {
  if (summaryForm.title === '' || summaryForm.content === '') {
    ElMessage.error('标题或内容不能为空');
    return;
  }
  await axios.post('http://localhost:8080/overAllResult/addOverAllResult', {
    orderId: orderId,
    title: summaryForm.title,
    content: summaryForm.content
  }).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('添加成功');
      clearForm();
      fetchOverAllResult();
    } else {
      ElMessage.error('添加失败');
    }
  }).catch(err => {
    console.log(err);
  });
}

const clearForm = () => {
  summaryForm.title = '';
  summaryForm.content = '';
}

const updateRow = (index) => {
  dialogTableVisible.value = true;
  dialogTableVisibleIndex.value = index;
}

const deleteRow = async (index) => {
  console.log('tableData[index].orId=', tableData[index].orId)
  await axios.delete('http://localhost:8080/overAllResult/deleteOverAllResultByorId', {
    params: {
      orId: tableData[index].orId
    }
  }).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('删除成功');
      tableData.splice(index, 1);
    } else {
      ElMessage.error('删除失败');
    }
  }).catch(err => {
    console.log(err);
  });
}


const fetchOverAllResult = async () => {
  await axios.get('http://localhost:8080/overAllResult/getOverAllResultList', {
    params: {
      orderId: orderId
    }
  }).then(res => {
        console.log(res.data);
        if (res.data.code === 0) {
          console.log(res.data.data);
          //将结果数据填充到tableData中
          tableData.splice(0, tableData.length);
          res.data.data.forEach(item => {
            tableData.push({
              orId: item.orId,
              title: item.title,
              content: item.content,
            });
          });
          //给tableData的num属性赋值
          tableData.forEach((item, index) => {
            item.num = index + 1;
          });
          console.log(tableData);
        } else {
          ElMessage.error('获取数据失败');
        }
      }
  ).catch(err => {
    console.log(err);
  });
}

const updateRowByodId = async () => {
  dialogTableVisible.value = false;

  const index = dialogTableVisibleIndex.value; // 获取index的值
  const orId = tableData[index].orId;
  const title = tableData[index].title;
  const content = tableData[index].content;

  await axios.post('http://localhost:8080/overAllResult/updateOverAllResultByorId', {
    orId: orId,
    title: title,
    content: content
  }).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('更新成功');
    } else {
      ElMessage.error('更新失败');
    }
  }).catch(err => {
    console.log(err);
  });
}


const isXue1OutOfRange = computed(() => {
  const value = parseFloat(edit1.arg1);
  return value < 100 || value > 300;
});

const isXue2OutOfRange = computed(() => {
  const value = parseFloat(edit1.arg2);
  return value < 3.5 || value > 5.5;
});

const isSheng1OutOfRange = computed(() => {
  const value = parseFloat(edit2.arg1);
  return value < 41 || value > 111;
});

const isSheng2OutOfRange = computed(() => {
  const value = parseFloat(edit2.arg2);
  return value < 2.85 || value > 7.14;
});


const fetchData = async () => {
  await fetchOverAllResult();
  await getXue();
  await getSheng();
}

const guidang = async () => {
  await axios.get('http://localhost:8080/orders/updateUserOrderStatus', {
    params: {
      orderId: orderId,
    }
  }).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('归档成功');
    } else {
      ElMessage.error('归档失败');
    }
  }).catch(err => {
    console.log(err);
  });
}

fetchData();
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header">
        <div class="header-content">
          <el-button type="primary" @click="$router.push({name: 'home'})"
                     style="position: absolute; left: 20px; top: 20px;">返回
          </el-button>
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
            <el-divider/>
            <el-row>
              <h3>血常规</h3>
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
            <el-row>
              <h3>肾功能</h3>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form :model="edit2" label-width="60px">
                  <el-form-item label="血清肌酐">
                    <el-input v-model="edit2.arg1"></el-input>
                    umol/L 正常值范围：41-111
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form :model="edit1" label-width="60px">
                  <el-form-item label="血尿素氮">
                    <el-input v-model="edit2.arg2"></el-input>
                    mmol/L 正常值范围：2.85-7.14
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button type="primary" @click="handleEdit2">保存</el-button>
              </el-col>
            </el-row>
            <el-divider/>
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>总验结论</span>
                  <el-button type="danger" style="float: right;" @click="guidang">总验结果报告归档</el-button>
                </div>
              </template>
              <div>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="num" label="编号"/>
                  <el-table-column prop="title" label="总验结论项标题"/>
                  <el-table-column prop="content" label="总验结论项内容"/>
                  <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default="scope">
                      <el-button
                          link
                          type="primary"
                          size="small"
                          @click.prevent="updateRow(scope.$index)"
                      >
                        更新
                      </el-button>
                      <el-button
                          link
                          type="primary"
                          size="small"
                          @click.prevent="deleteRow(scope.$index)"
                      >
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-dialog v-model="dialogTableVisible" title="修改" width="800">
                <el-form :model="tableData[dialogTableVisibleIndex]" label-width="60px">
                  <el-form-item label="标题" class="update-form-item">
                    <el-input v-model="tableData[dialogTableVisibleIndex].title"></el-input>
                  </el-form-item>
                  <el-form-item label="内容" class="update-form-item">
                    <el-input v-model="tableData[dialogTableVisibleIndex].content" type="textarea"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogTableVisible = false">取消</el-button>
                  <el-button type="primary" @click="updateRowByodId">确定</el-button>
                </div>
              </el-dialog>
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
                  <el-button type="primary" @click="addRow">添加</el-button>
                  <el-button type="warning" @click="clearForm">清空</el-button>
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
