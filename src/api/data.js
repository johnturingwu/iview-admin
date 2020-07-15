import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}

// added
export const getReopenRate = () => {
  return axios.request({
    url: '/reopen-rate',
    method: 'get'
  })
}

export const getOnlineBugCycle = () => {
  return axios.request({
    url: '/online-bug-cycle',
    method: 'get'
  })
}

export const getLevelByWeeks = () => {
  return axios.request({
    url: '/bug-level-by-weeks',
    method: 'get'
  })
}

export const getBugDensityBySprintTrunk = () => {
  return axios.request({
    url: '/bug-density-by-sprint-trunk',
    method: 'get'
  })
}

export const getBugDensityBySprintStudio = () => {
  return axios.request({
    url: '/bug-density-by-sprint-studio',
    method: 'get'
  })
}

export const getBugDensityByWeekTrunk = () => {
  return axios.request({
    url: '/bug-density-by-week-trunk',
    method: 'get'
  })
}

export const getBugDensityByWeekStudio = () => {
  return axios.request({
    url: '/bug-density-by-week-studio',
    method: 'get'
  })
}
