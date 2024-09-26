/* eslint-disable prettier/prettier */
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CRow,
  CTooltip,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CFormSelect,
  CFormCheck,
  CFormFeedback,
  CFormTextarea,
} from '@coreui/react'
import React, {useRef, useEffect} from 'react'

const ModalTask = ({
  modal,
  toggleModal,
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  repeat,
  setRepeat,
  typeModalTask,
  handleAdd,
  handleUpdate,
})=>{

  //NOTE - PROPS
  const form = useRef(null)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    // setValidated(true)
  }

  useEffect(() => {
    console.log(repeat)
    return () => {

    };
  }, [title, repeat]);


  return (
    <>
      <CModal visible={modal}>
        <CModalHeader>
          <CModalTitle>{typeModalTask === 'add' ? 'Add Task' : 'Edit Task'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={12}>
              <CFormInput
                type="text"
                id="fl-title"
                label="Title"
                // feedback="Looks good!"
                // defaultValue="name@surname.com"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </CCol>
            <CCol md={12}>
              <CFormTextarea
                type="text-area"
                id="fl-description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="date"
                id="fl-due"
                label="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                id="validationServer04"
                label="State"
                multiple
                // value={repeat}
                onChange={(e) => setRepeat(Array.from(e.target.selectedOptions, (option) => option.value))}
              >
                <option value="Sunday" selected={repeat.includes('Sunday')}>Sunday</option>
                <option value="Monday" selected={repeat.includes('Monday')}>Monday</option>
                <option value="Tuesday" selected={repeat.includes('Tuesday')}>Tuesday</option>
                <option value="Wednesday" selected={repeat.includes('Wednesday')}>Wednesday</option>
                <option value="Thursday" selected={repeat.includes('Thursday')}>Thursday</option>
                <option value="Friday" selected={repeat.includes('Friday')}>Friday</option>
                <option value="Saturday" selected={repeat.includes('Saturday')}>Saturday</option>
              </CFormSelect>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggleModal}>
            Close
          </CButton>
          <CButton color="primary" onClick={()=>{
            if(typeModalTask==='add'){
              handleAdd()
            }else if(typeModalTask==='update'){
              handleUpdate()
            }
          }}>{typeModalTask==='add'? 'Create': 'Save Changes'}</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalTask
