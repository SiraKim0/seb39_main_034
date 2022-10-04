import { TimelineContainer, TimelineList, Text } from './TimelinelistStyle'
import TimelineItem from './TimelineItem'
import { HeadingH3, Textarea } from '../../styles/globalStyles'
import { useState, useCallback } from 'react'
import { MoreBtn } from '../Widget/WidgetStyle'
import { TimelineModal } from './TimelineModal'
// import { CloseBtn, OpenBtn } from '../Widget/WidgetStyle'
// import { useState } from 'react'

export default function Timelinelist(props) {
  const {
    title,
    timelineData,
    setTimelineData,
    getTimelineData,
    writer,
    status,
    mode,
  } = props
  const [onTimelineModal, setOnTimelineModal] = useState(false) // 타임라인 모달(더보기) 상태
  const limitTimelineData = timelineData.slice(-5)
  const length = timelineData.length

  const openTimelineModal = useCallback(() => {
    setOnTimelineModal(!onTimelineModal)
    document.body.style.overflow = 'hidden'
  })

  return (
    <TimelineList>
      {mode === 'limit' ? (
        <HeadingH3 mt="50px">타임라인 ({timelineData.length})</HeadingH3>
      ) : null}
      {/*후기: status가 false(진행중)일 때 타임라인만 나오고 true(진행종료)일 경우 후기창 띄움*/}
      <TimelineContainer>
        {length === 0 ? (
          <div className="notice">
            아직 작성된 글이 없어요
            <br />
            함께 힘을 내 볼까요? 🏋️‍♀️🏋️‍♂️
          </div>
        ) : mode === 'limit' ? (
          <>
            {status ? (
              <>
                <div className="header__timeline review">
                  <Text>후기 달성 창</Text>
                </div>
                <div className="contents__timeline review">
                  <div className="contents">
                    <Textarea></Textarea>
                  </div>
                </div>
              </>
            ) : null}
            {limitTimelineData.map((timeline) => {
              return (
                <TimelineItem
                  key={timeline.timelineId}
                  {...timeline}
                  setTimelineData={setTimelineData}
                  writer={writer}
                />
              )
            })}
            <MoreBtn
              text={'타임라인 더보기'}
              onClick={openTimelineModal}
            ></MoreBtn>
          </>
        ) : (
          <>
            {/* 모달 내부에서: 후기 타임라인이 있다면 타임라인 상단에 보여주기 */}
            {timelineData.map((timeline) => {
              return (
                <TimelineItem
                  key={timeline.timelineId}
                  {...timeline}
                  writer={writer}
                  getTimelineData={getTimelineData}
                />
              )
            })}
          </>
        )}
      </TimelineContainer>
      {onTimelineModal && (
        <TimelineModal
          title={title}
          timelineData={timelineData}
          setOnTimelineModal={setOnTimelineModal}
        />
      )}
    </TimelineList>
  )
}
