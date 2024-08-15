<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%" @close="close">
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="账号" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.trim="form.author" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model.trim="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-input v-model.trim="form.role" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所属城市" prop="city">
        <el-input v-model.trim="form.city" autocomplete="off" />
      </el-form-item>
      <el-form-item label="区县" prop="county">
        <el-input v-model.trim="form.county" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/table'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          account: '',
          name: '',
          phone: '',
          email: '',
          role: '',
          city: '',
          county: '',
        },
        rules: {
          account: [{ required: true, trigger: 'blur', message: '请输入账号' }],
          name: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
          phone: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
          email: [{ required: true, trigger: 'blur', message: '请输入邮箱' }],
          role: [{ required: true, trigger: 'blur', message: '请输入角色' }],
          city: [{ required: true, trigger: 'blur', message: '请输入所属城市' }],
          county: [{ required: true, trigger: 'blur', message: '请输入区县' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form)
            this.$baseMessage(msg, 'success')
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
