import styled from 'styled-components'
import theme from '../../styles/theme'
import { Button } from '../../styles/globalStyles'

const ReactionBtnBase = styled(Button)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  border-radius: 40px;
  background: ${({ follower, liker, theme }) =>
    follower || liker ? theme.violet_m : theme.background};
  &:active {
    background: ${({ theme }) => theme.violet_m};
  }
`

export const SubscribeBtn = ({ onClick, follower }) => (
  <ReactionBtnBase onClick={onClick} follower={follower}>
    {follower ? '➖' : '➕'}
  </ReactionBtnBase>
)

export const CheerBtn = ({ onClick, liker }) => (
  <ReactionBtnBase onClick={onClick} liker={liker}>
    {liker ? '✊' : '👍'}
  </ReactionBtnBase>
)

export const Select = styled.select`
  width: 20%;
  height: 40px;
  border-radius: 10px;
  outline: none;
`

export const MilestoneContainer = styled.div`
  width: 100%;
  margin-top: 100px;
  .inputs {
    padding: 10px 0;
    > input {
      width: 100%;
      height: 40px;
      padding: 10px 5px;
      border: 1px solid ${theme.border};
      border-radius: 10px;
    }
    > textarea {
      width: 100%;
      height: 100px;
      padding: 10px 5px;
      border: 1px solid ${theme.border};
      border-radius: 10px;
    }
    .p__guide {
      display: flex;
      align-items: center;
      > p:nth-child(2) {
        color: ${theme.secondary};
        margin-left: 10px;
      }
    }
  }
  .header__milestone {
    .milestone__info {
      display: flex;
      align-items: center;
      .profile {
        display: flex;
        .userimg {
          display: block;
          width: 20px;
          height: 20px;
          background-color: black;
          border-radius: 20px;
        }
        .username {
          padding: 0 5px;
          font-weight: bold;
          line-height: 20px;
        }
      }
      .dot {
        padding: 0 5px;
      }
      .delete {
        flex-grow: 1;
        text-align: end;
      }
    }
    .imgbox {
      position: relative;
      height: 150px;
      border: 1px solid ${theme.border};
      overflow: hidden;
      border-radius: 10px 10px 0 0;
      img {
        width: 100%;
      }
      div {
        position: absolute;
        margin: 10px;
        top: 8px;
        right: 8px;
      }
    }
  }
  .header__reaction {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0 10px 0;
    .reaction {
      flex-grow: 1;
      h3:nth-child(1),
      > div {
        display: inline;
      }
    }
    .button__reaction {
      > div {
        display: flex;
      }
      > div > div {
        display: flex;
        align-items: center;
        padding: 0 5px;
      }
    }
  }
  .descriptions {
    border: 1px solid ${theme.border};
    box-shadow: 2px 3px 5px ${theme.border};
    border-radius: 10px;
    padding: 10px;
    .description {
      display: flex;
      > h4 {
        width: 90px;
        text-align: end;
        padding: 5px;
        margin: 10px 0;
        border-right: 3px solid ${theme.border};
      }
      > p {
        padding: 5px;
        margin: 10px 0 0 10px;
      }
    }
  }
  .button__complete {
    display: flex;
    justify-content: end;
  }
`

export const Wrapper = styled.div``

export const CalendarContainer = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: ${theme.violet_m};
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }
  /* ~~~ label styles ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
    padding: 10px 0px;
    font-weight: 600;
  }
  /* ~~~ button styles ~~~ */
  button {
    margin: 2px;
    /* background-color: ${theme.violet_l}; */
    border: 0;
    border-radius: 3px;
    padding: 5px 0;
    cursor: pointer;

    &:active {
      /* background-color: ${theme.violet_d}; */
    }
  }
  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
    }
  }

  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    /* background-color: #dfdfdf; */
    opacity: 0.6;
  }
  .react-calendar__month-view__days__day--weekend {
    color: red !important;
    /* background-color: red; */
  }

  /* ~~~ active day styles ~~~ */
  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background-color: yellow;
  }

  /* ~~~ other view styles ~~~ */
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`
