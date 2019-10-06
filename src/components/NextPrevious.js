import React from 'react';
import Link from './link';

function NextPrevious({ next, previous }) {
  return (
    <div className={'nextPreviousWrapper'}>
      {previous && (
        <Link
          to={previous.fields.path}
          className={'previousBtn'}
          aria-label="Previous article"
        >
          <div className={'leftArrow'} aria-hidden>
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="_13gjrqj"
            >
              <g>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </g>
            </svg>
          </div>
          <div className={'preRightWrapper'}>
            <div className={'smallContent'} aria-hidden>
              <span>Previous</span>
            </div>
            <div className={'nextPreviousTitle'}>
              <span>{previous.fields.title}</span>
            </div>
          </div>
        </Link>
      )}
      {next && (
        <Link
          to={next.fields.path}
          className={'nextBtn'}
          aria-label="Previous article"
        >
          <div className={'nextRightWrapper'}>
            <div className={'smallContent'} aria-hidden>
              <span>Next</span>
            </div>
            <div className={'nextPreviousTitle'}>
              <span>{next.fields.title}</span>
            </div>
          </div>
          <div className={'rightArrow'} aria-hidden>
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="_13gjrqj"
            >
              <g>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </g>
            </svg>
          </div>
        </Link>
      )}
    </div>
  );
}
export default NextPrevious;
