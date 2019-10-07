import React from 'react';
import styled from 'styled-components';
import Link from './link';

const NextPreviousContainer = styled.section`
  margin: 0px;
  padding: 0px;
  width: auto;
  display: grid;
  gap: 24px;
  /* one column, two rows */
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    'previous'
    'next';

  @media (min-width: 600px) and (max-width: 767px), (min-width: 900px) {
    /* two columns, one row */
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 'previous next';
  }

  .nextPrevButton {
    transition: all 200ms ease 0s;

    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 16px;

    color: rgb(36, 42, 49);
    box-shadow: rgba(116, 129, 141, 0.1) 0px 3px 8px 0px;
    border-radius: 3px;
    border: 1px solid rgb(230, 236, 241);
    text-decoration: none;

    font-weight: 500;

    &.prev {
      grid-area: previous;

      .textWrapper {
        margin-left: 24px;
        text-align: right;

        &::before {
          content: 'Previous';
        }
      }
      .arrow {
        margin-right: auto;
      }
    }

    &.next {
      grid-area: next;

      .textWrapper {
        margin-right: 24px;
        text-align: left;

        &::before {
          content: 'Next';
        }
      }
      .arrow {
        margin-left: auto;
      }
    }

    .textWrapper {
      &::before {
        display: block;
        margin: 0px;
        padding: 0px;
        color: rgb(157, 170, 182);

        font-size: 12px;
        line-height: 1.625;
        font-weight: 400;
      }
    }

    .arrow {
      align-self: center;
      stroke: rgb(157, 170, 182);
      width: 24px;
      height: 24px;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      flex-shrink: 0;
    }

    &:hover {
      color: rgb(116, 76, 188);
      text-decoration: none;
      border: 1px solid rgb(116, 76, 188);
      .arrow {
        stroke: rgb(116, 76, 188);
      }
    }
  }
`;

function NextPrevious({ next, previous }) {
  return (
    <NextPreviousContainer>
      {previous && (
        <Link
          to={previous.fields.path}
          className="nextPrevButton prev"
          aria-label="Previous article"
        >
          <svg viewBox="0 0 24 24" className="arrow">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>

          <span className="textWrapper">{previous.fields.title}</span>
        </Link>
      )}

      {next && (
        <Link
          to={next.fields.path}
          className="nextPrevButton next"
          aria-label="Next article"
        >
          <span className="textWrapper">{next.fields.title}</span>
          <svg viewBox="0 0 24 24" className="arrow">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      )}
    </NextPreviousContainer>
  );
}
export default NextPrevious;
