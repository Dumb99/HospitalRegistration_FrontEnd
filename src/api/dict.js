import request from '@/utils/request'

export default {
  //ҽԺ�����б�
  dictList(id) {
    return request({
      url: `admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  },
}
