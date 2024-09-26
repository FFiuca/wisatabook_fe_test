/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormCheck,
  CListGroup,
  CListGroupItem,
  CBadge,
  CButton,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import ModalTask from '../modal/modalTask'
import { addTask } from '../../../../actions/tasks/addTask'
import { listTask } from '../../../../actions/tasks/listTask'
import { detailTask } from '../../../../actions/tasks/detailTask'
import { updateTask } from '../../../../actions/tasks/updateTask'
import { deleteTask } from '../../../../actions/tasks/deleteTask'
import { changeStatusTask } from '../../../../actions/tasks/changeStatusTask'
import { changeStarredTask } from '../../../../actions/tasks/changeStarredTask'

const Accordion = () => {

  //NOTE - TASK
  const [modalTask, setModelTask] = useState(false)
  const [typeModalTask, setTypeModalTask] = useState('add')
  const [dataOnGoing, setDataOnGoing] = useState([])
  const [dataComplete, setDataComplete] = useState([])
  const [_data, _setData] = useState({})
  const [_id, _setID] = useState(null)
  // console.log(modalTask)
  const toggleModalTask = ()=> setModelTask(e=> !e)

  //NOTE - FORM
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [dueDate, setDueDate] = useState(null)
  const [repeat, setRepeat] = useState([])


  //NOTE - HOOK
  const [error, setError] = useState({})

  const { data:dataAdd,  loading:loadingAdd, error:errorAdd, doAdd } = addTask()
  const { data:dataDetail,  loading:loadingDetail, error:errorDetail, doDetail } = detailTask()
  const { data:dataList,  loading:loadingList, doList } = listTask()
  const { data:dataListComplete,  loading:loadingListComplete, doList:doListComplete } = listTask()
  const { data:dataUpdate,  loading:loadingUpdate, doUpdate } = updateTask()
  const { data:dataDelete,  loading:loadingDelete, doDelete } = deleteTask()
  const { data:dataChangeStatus,  loading:loadingChangeStatus, doChangeStatus } = changeStatusTask()
  const { data:dataStarredTask,  loading:loadingStarredTask, doChangeStarred } = changeStarredTask()

  //NOTE - FUNCTION
  const resetForm = ()=>{
    setTitle(null)
    setDescription(null)
    setDueDate(null)
    setRepeat([])
    setError({})
  }

  const handleAdd = async ()=>{
    console.log()
    await doAdd(buildForm())
  }

  useEffect(() => {
    if (dataAdd?.status==200){
      toggleModalTask()
      handleListOnGoing()
    }
  }, [dataAdd]);

  const handleModalAdd = ()=>{
    resetForm()
    toggleAdd()
    toggleModalTask()
  }

  const handleModalUpdate = (id)=>{
    _setID(id)
    toggleUpdate()
    resetForm()
    toggleModalTask()
    doDetail(id)
  }

  const handleUpdate = ()=>{
    doUpdate(_id, buildForm())
  }

  useEffect(() => {
    if (dataUpdate?.status==200){
      toggleModalTask()
      handleListOnGoing()
      handleListComplete()
    }
  }, [dataUpdate]);

  const toggleAdd = ()=> setTypeModalTask('add')
  const toggleUpdate = ()=> setTypeModalTask('update')

  const buildForm = ()=>{
    let data = {
      title: title,
      description: description,
      due_date: dueDate,
      data_task_repeat : repeat
    }

    return data
  }

  const initForm = (dt)=>{
    // console.log('asd', dt)
    setTitle(dt.title)
    setDescription(dt.description)
    setDueDate(dt.due_date)
    setRepeat(dt.task_to_task_repeat.map(el => el.day))
  }

  const handleListOnGoing = ()=>{
    let data = {
      'status_id': 1
    }
    doList(data)
  }

  useEffect(()=>{
    if(dataList?.status==200){
      setDataOnGoing(dataList.data)
    }
  }, [dataList])

  const handleListComplete = ()=>{
    let data = {
      'status_id': 2
    }
    doListComplete(data)
  }

  const handleComplete = (e, id)=>{
    console.log(e.target.checked)
    let status_id =  e.target.checked ? 2 : 1

    doChangeStatus(id, {status_id:status_id})
  }

  useEffect(()=>{
    if(dataChangeStatus?.status==200){
      handleListComplete()
      handleListOnGoing()
    }
  }, [dataChangeStatus])

  const handleDelete = (id)=>{
    doDelete(id)
  }

  useEffect(()=>{
    if(dataDelete?.status==200){
      handleListComplete()
      handleListOnGoing()
    }
  }, [dataDelete])

  const handleChangeStarred = (id, current)=>{
    let next = current? 0:1
    doChangeStarred(id, {starred_status: next})
  }

  useEffect(()=>{
    if(dataStarredTask?.status==200){
      handleListComplete()
      handleListOnGoing()
    }
  }, [dataStarredTask])

  useEffect(()=>{
    console.log('detail', dataDetail)
    if(dataDetail?.status==200){
      _setData(dataDetail.data)

      initForm(dataDetail.data)
    }
  }, [dataDetail])

  useEffect(()=>{
    if(dataListComplete?.status==200){
      setDataComplete(dataListComplete.data)
    }
  }, [dataListComplete])

  //NOTE - EFFECT
  // init
  const  init = ()=>{
    handleListComplete()
    handleListOnGoing()
  }

  useEffect(()=>{
    init()
  }, [])

  return (
    <React.Fragment>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Daily Tasks</strong>
              </CCardHeader>
              <CCardBody style={{
                maxHeight: '80vH',
                overflowY: 'auto'
               }}>
                <p className="text-body-secondary small">Manage your daily tasks using this apps.</p>
                <CAccordion activeItemKey={1}>
                    <CAccordionItem itemKey={1}>
                      <CAccordionHeader>On Going</CAccordionHeader>
                      <CAccordionBody>
                        <div className="d-flex justify-content-end">
                          <CButton
                            color="primary"
                            className="mb-2"
                            onClick={handleModalAdd}
                          >Add Modal</CButton>
                        </div>
                        <CListGroup>
                          {
                            Array.isArray(dataOnGoing) && dataOnGoing.length>0 && dataOnGoing.map((el, idx)=>{
                              return (
                                <CListGroupItem key={`og-${idx}`}>
                                  <div className="d-flex">
                                    <CFormCheck style={{ cursor:'pointer' }} className="text-strong" label={el.title}  onChange={(e)=> handleComplete(e,el.id)} />
                                    <CButton
                                      size="sm"
                                      color="danger"
                                      variant="ghost"
                                      className="ms-auto"
                                      onClick={()=> handleDelete(el.id)}
                                    >Delete</CButton>
                                  </div>
                                  <div className="ps-4 d-flex gap-2 flex-wrap">
                                    <CBadge color="info" shape="rounded-pill"  onClick={()=> handleModalUpdate(el.id)}>
                                      On Going
                                    </CBadge>
                                    <div className="ms-auto">
                                      <svg style={{ cursor:'pointer' }} width="20" height="20" viewBox="0 0 24 24" onClick={e=> handleChangeStarred(el.id, el.starred_status)} stroke={el.starred_status? 'red': 'black'} fill={el.starred_status? 'yellow': 'none'} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                                    </div>
                                  </div>
                                  <p style={{ cursor:'pointer' }}  onClick={()=> handleModalUpdate(el.id)} className="ps-4">{el.description}</p>

                                </CListGroupItem>
                              )
                            })
                          }
                          <CListGroupItem>
                            <CFormCheck className="text-strong" label="Cras justo odio" />
                            <div className="ps-4 d-flex gap-2 flex-wrap">
                              <CBadge color="primary" shape="rounded-pill">
                                priority
                              </CBadge>
                              <CBadge color="primary" shape="rounded-pill">
                                starred
                              </CBadge>
                              <div className="ms-auto">
                                <svg style={{ cursor:'pointer' }} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                              </div>
                            </div>
                            <p className="ps-4">asasas</p>
                          </CListGroupItem>
                          <CListGroupItem>
                            <CFormCheck label="Dapibus ac facilisis in" defaultChecked />
                          </CListGroupItem>
                        </CListGroup>
                      </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={2}>
                      <CAccordionHeader>Completed</CAccordionHeader>
                      <CAccordionBody>
                        <CListGroup>
                          {
                            Array.isArray(dataComplete) && dataComplete.length>0 && dataComplete.map((el, idx)=>{
                              return (
                                <CListGroupItem key={`cp-${idx}`}>
                                  <div className="d-flex">
                                    <CFormCheck checked style={{ cursor:'pointer' }} className="text-strong" label={el.title}  onChange={(e)=> handleComplete(e,el.id)} />
                                    <CButton
                                      size="sm"
                                      color="danger"
                                      variant="ghost"
                                      className="ms-auto"
                                      onClick={()=> handleDelete(el.id)}
                                    >Delete</CButton>
                                  </div>
                                  <div className="ps-4 d-flex gap-2 flex-wrap">
                                    <CBadge color="success" shape="rounded-pill"  onClick={()=> handleModalUpdate(el.id)}>
                                      Complete
                                    </CBadge>
                                    <div className="ms-auto">
                                      <svg style={{ cursor:'pointer' }} width="20" height="20" viewBox="0 0 24 24" onClick={e=> handleChangeStarred(el.id, el.starred_status)} stroke={el.starred_status? 'red': 'black'} fill={el.starred_status? 'yellow': 'none'} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                                    </div>
                                  </div>
                                  <p style={{ cursor:'pointer' }}  onClick={()=> handleModalUpdate(el.id)} className="ps-4"><s>{el.description}</s></p>

                                </CListGroupItem>
                              )
                            })
                          }

                        </CListGroup>
                      </CAccordionBody>
                    </CAccordionItem>
                  </CAccordion>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <ModalTask
          modal={modalTask}
          toggleModal={toggleModalTask}
          typeModalTask={typeModalTask}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          dueDate={dueDate}
          setDueDate={setDueDate}
          repeat={repeat}
          setRepeat={setRepeat}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
        />

    </React.Fragment>
  )
}

export default Accordion
