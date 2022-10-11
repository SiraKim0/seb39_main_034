import { useState, useRef, useCallback, useEffect } from 'react'
import { Container, Row, Col } from '../styles/globalStyles'
import useGetCards from '../hook/useGetCards'
// import { Link } from 'react-router-dom'
import Lnb from '../components/Lnb/Lnb'
// import Card from '../components/Card/Card'
import CardList from '../components/Card/CardList'
import { Notice } from '../components/Widget/WidgetStyle'
import Footer from '../components/Footer/Footer'
import { Scroll } from '../components/Scroll/ScrollStyle'

function Main() {
  // console.log('메인뷰 실행될 때 찍은 로그')
  const [categoryId, setCategoryId] = useState(0)
  const [statusId, setStatusId] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const { loading, error, cards, hasMore } = useGetCards(
    categoryId,
    statusId,
    pageNumber
  )
  const observer = useRef()
  const [showButton, setShowButton] = useState(false)

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleLastCardRef = useCallback(
    (target) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('마지막 요소 교차됨 => 커스텀훅 호출')
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (target) observer.current.observe(target)
    },
    [loading, hasMore]
  )
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    console.log(window.scrollY)
    window.addEventListener('scroll', handleShowButton)
    return () => {
      window.removeEventListener('scroll', handleShowButton)
    }
  }, [])

  return (
    <>
      <Container>
        <Row>
          <Lnb
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            setStatusId={setStatusId}
            statusId={statusId}
            setPageNumber={setPageNumber}
          />
        </Row>
        <CardList
          type={'main'}
          cards={cards}
          handleLastCardRef={handleLastCardRef}
        />
        <Row>
          <Col>
            <Notice>
              <div>{loading && '로딩 중입니다...🐢'}</div>
              <div>{error && '에러가 발생했어요 🤔 '}</div>
              <div>{cards.length === 0 && '검색 결과가 없어요 🙅'}</div>
            </Notice>
          </Col>
        </Row>
      </Container>
      {showButton && (
        <Scroll>
          <button className="top" onClick={scrollToTop} type="button">
            Top
          </button>
        </Scroll>
      )}
      <Footer />
    </>
  )
}

export default Main
