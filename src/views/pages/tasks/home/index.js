import React, {useState} from 'react'
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

const Accordion = () => {

  //NOTE - TASK
  const [modalTask, setModelTask] = useState(false)
  const [typeModalTask, setTypeModalTask] = useState('add')

  const toggleModalTask = ()=> setModelTask(e=> !e)

  //NOTE - FORM
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [dueDate, setDueDate] = useState(null)
  const [repeat, setRepeat] = useState([])


  //NOTE - HOOK
  const [error, setError] = useState({})

  //NOTE - FUNCTION

  //NOTE - EFFECT

  return (
    <React.Fragment>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Daily Tasks</strong>
              </CCardHeader>
              <CCardBody>
                <p className="text-body-secondary small">Manage your daily tasks using this apps.</p>
                <CAccordion activeItemKey={1}>
                    <CAccordionItem itemKey={1}>
                      <CAccordionHeader>On Going</CAccordionHeader>
                      <CAccordionBody>
                        <div className="d-flex justify-content-end">
                          <CButton
                            color="primary"
                            className="mb-2"
                            onClick={toggleModalTask}
                          >Add Modal</CButton>
                        </div>
                        <CListGroup>
                          <CListGroupItem>
                            <CFormCheck className="text-strong" label="Cras justo odio" />
                            <div className="ps-4 d-flex gap-2 flex-wrap">
                              <CBadge color="primary" shape="rounded-pill">
                                priority
                              </CBadge>
                              <CBadge color="primary" shape="rounded-pill">
                                starred
                              </CBadge>
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
                          <CListGroupItem>
                            <b>Cras justo odio</b>
                            <div className="d-flex gap-2 flex-wrap">
                              <CBadge color="primary" shape="rounded-pill">
                                priority
                              </CBadge>
                              <CBadge color="primary" shape="rounded-pill">
                                starred
                              </CBadge>
                            </div>
                            <p className="">asasas</p>
                          </CListGroupItem>
                          <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
                          <CListGroupItem>Morbi leo risus</CListGroupItem>
                          <CListGroupItem>Porta ac consectetur ac</CListGroupItem>
                          <CListGroupItem>Vestibulum at eros</CListGroupItem>
                        </CListGroup>
                      </CAccordionBody>
                    </CAccordionItem>
                    {/* <CAccordionItem itemKey={3}>
                      <CAccordionHeader>Accordion Item #3</CAccordionHeader>
                      <CAccordionBody>
                        <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
                        default, until the collapse plugin adds the appropriate classes that we use to
                        style each element. These classes control the overall appearance, as well as the
                        showing and hiding via CSS transitions. You can modify any of this with custom
                        CSS or overriding our default variables. It&#39;s also worth noting that just
                        about any HTML can go within the <code>.accordion-body</code>, though the
                        transition does limit overflow.
                      </CAccordionBody>
                    </CAccordionItem> */}
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
        />

    </React.Fragment>
  )
}

export default Accordion
