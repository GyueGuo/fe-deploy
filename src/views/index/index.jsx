/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useCallback } from 'react';
import './index.less';

function Board() {
  const handleFindBack = useCallback(() => {

  }, []);
  const handleViewView = useCallback(() => {

  }, []);
  return (
    <div className="index-wrap">
      <div className="radar-wrap">
        <div>
          <span className="circle-line" />
          <span className="circle-line" />
          <span className="circle-line" />
          <span className="circle-line" />
          <span className="circle-line" />
        </div>
        <div>
          <div className="strange-line" />
          <div className="strange-line" />
          <div className="strange-line" />
          <div className="strange-line" />
          <div className="strange-line" />
          <div className="strange-line" />
        </div>
      </div>
      <div className="btn-wrap">
        <a href="javascript:;" onClick={handleFindBack}>找回</a>
        <a href="javascript:;" onClick={handleViewView}>观看视频教程</a>
      </div>
    </div>
  );
}

export default Board;
