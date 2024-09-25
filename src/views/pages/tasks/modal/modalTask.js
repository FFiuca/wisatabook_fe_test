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
import React, {useRef} from 'react'

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



  return (
    <>
      <CModal visible={modal} onClose={toggleModal}>
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
              />
            </CCol>
            <CCol md={12}>
              <CFormTextarea
                type="text-area"
                id="fl-description"
                label="Description"
                // feedback="Looks good!"
                // defaultValue="name@surname.com"
                // required
                // row={8}
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="date"
                id="fl-due"
                label="Due Date"
                // feedback="Please provide a valid city."
                // invalid
                // required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                id="validationServer04"
                label="State"
                // feedback="Please provide a valid city."
                // invalid
                multiple
              >
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
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

            }else if(typeModalTask==='update'){

            }
          }}>{typeModalTask==='add'? 'Create': 'Save Changes'}</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalTask
