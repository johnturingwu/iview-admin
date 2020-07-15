import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'
import { treeData } from './data/tree-select'

import reopenRateData from './data/ro/reopen-rate'
import onlineBugCycleData from './data/ro/online-bug-cycle'
import levelByWeeksData from './data/ro/bug-level-by-weeks'
import bugDensityBySprintTrunkData from './data/ro/bug-density-by-sprint-trunk'
import bugDensityBySprintStudioData from './data/ro/bug-density-by-sprint-studio'
import bugDensityByWeekTrunkData from './data/ro/bug-density-by-week-trunk'
import bugDensityByWeekStudioData from './data/ro/bug-density-by-week-studio'

const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}

export const getTreeSelectData = req => {
  return treeData
}

export const getReopenRate = req => {
  return reopenRateData
}

export const getOnlineBugCycle = req => {
  return onlineBugCycleData
}

export const getLevelByWeeks = () => {
  return levelByWeeksData
}

export const getBugDensityBySprintTrunk = () => {
  return bugDensityBySprintTrunkData
}

export const getBugDensityBySprintStudio = () => {
  return bugDensityBySprintStudioData
}

export const getBugDensityByWeekTrunk = () => {
  return bugDensityByWeekTrunkData
}

export const getBugDensityByWeekStudio = () => {
  return bugDensityByWeekStudioData
}
