import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Milestone from '../components/Milestone/Milestone'
import Todolist from '../components/Todo/Todolist'
import Timeline from '../components/Timeline/Timelinelist'
import TimelineCreate from '../components/Timeline/TimelineCreate'
import Reaction from '../components/Reaction/Reaction'
import Comment from '../components/Comment/Comment'
import { ProgressBar } from '../components/Todo/TodolistStyle'
import { TodoCreate } from '../components/Todo/TodoCreate'
import { TimelineModal } from '../components/Timeline/TimelineModal'
import { Col, Container, Row } from '../styles/globalStyles'
import { PlusBtn, MoreBtn } from '../components/Widget/WidgetStyle'

function DetailView() {
  const [isOpen, setIsOpen] = useState(false)
  const [openCreateChecklist, setOpenCreateChecklist] = useState(false)
  const [isOpenTimelineEditModal, setIsOpenTimelineEditModal] = useState(false)
  const [openCreateTimeline, setOpenCreateTimeline] = useState(false)

  // const [data, setData] = useState({
  //   goal: { todoList: [], timelineList: [] },
  //   metadata: {},
  // })
  const [milestoneData, setMilestoneData] = useState({})
  const [todoData, setTodoData] = useState([])
  const [timelineData, setTimelineData] = useState([])
  const [metaData, setMetaData] = useState({})
  const { id } = useParams()

  const openTimelineModal = () => {
    setIsOpen(!isOpen)
    document.body.style.overflow = 'hidden'
  }
  const createChecklistToggle = () => {
    setOpenCreateChecklist(!openCreateChecklist)
  }

  const openTimelineEditModal = () => {
    setIsOpenTimelineEditModal(!isOpenTimelineEditModal)
    document.body.style.overflow = 'hidden'
  }
  const createTimelineToggle = () => {
    setOpenCreateTimeline(!openCreateTimeline)
  }

  useEffect(() => {
    async function getDetail() {
      await axios
        .get(`/v1/goal/${id}`)
        .then((res) => {
          console.log(res.data)
          setMilestoneData(res.data.goal)
          setTodoData(res.data.goal.todoList)
          setTimelineData(res.data.goal.timelineList)
          setMetaData(res.data.metadata)
        })
        .catch((err) => {
          console.log('ERROR: ', err)
        })
    }
    getDetail()
  }, [])

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Milestone data={milestoneData}></Milestone>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>할일</h3>
          </Col>
          <Col>
            <ProgressBar metadata={metaData}></ProgressBar>
          </Col>
          <Col>
            <Todolist data={todoData}></Todolist>
          </Col>
          <Col>
            {openCreateChecklist && (
              <TodoCreate todoData={todoData} setTodoData={setTodoData} />
            )}
          </Col>
          <Col>
            <PlusBtn onClick={createChecklistToggle} name="나는 투두"></PlusBtn>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>타임라인 {timelineData.length}</h3>
          </Col>
          <Col>
            <Timeline
              data={timelineData}
              onClick={openTimelineEditModal}
            ></Timeline>
          </Col>
          <Col>{openCreateTimeline && <TimelineCreate />}</Col>
          {/* 작성자일 경우 */}
          <Col>
            <PlusBtn onClick={createTimelineToggle} name="나는 타임라인" />
          </Col>
          {/* 작성자 아닐 경우 */}
          <Col>
            <MoreBtn onClick={openTimelineModal}></MoreBtn>
          </Col>
        </Row>
        <Row>
          <Col>
            <Reaction></Reaction>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>코멘트</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Comment />
          </Col>
        </Row>
      </Container>
      {isOpen && (
        <TimelineModal
          data={timelineData}
          onClick={openTimelineEditModal}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  )
}

export default DetailView
