import request from '@/utils/request'

export default {
  //ҽԺ�б�
  getHospList(page,limit,searchObj) {
    return request({
      url: `/admin/hosp/hospital/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  //����dictCode��ѯ�������ӽڵ�
  findByDictCode(dictCode) {
    return request ({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'get'
    })
  },
  //����id��ѯ�������б�
  findChildId(id){
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  },
  updateStatus(id,status){
    return request({
      url: `/admin/hosp/hospital/updateStatus/${id}/${status}`,
      method: 'get'
    })
  },
  //�鿴ҽԺ����
  getHospById(id){
    return request({
      url: `/admin/hosp/hospital/showHospDetail/${id}`,
      method: 'get'
    })
  },
  //�鿴ҽԺ����
  getDeptByHoscode(hoscode){
    return request({
      url: `/admin/hosp/department/getDepartment/${hoscode}`,
      method: 'get'
    })
  },
  //��ѯԤԼ
  getScheduleRule(page,limit,hoscode,depcode){
    return request({
      url: `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`, 
      method: 'get'
    })
  },
  getScheduleDetail(hoscode,depcode,workDate){
    return request({
      url: `/admin/hosp/schedule/getScheduleDetail/${hoscode}/${depcode}/${workDate}`, 
      method: 'get'
    })
  }
  
}
