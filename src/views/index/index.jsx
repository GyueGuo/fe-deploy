/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
// eslint-disable react/style-prop-object
import React, { useCallback, useEffect } from 'react';
import './index.less';
import draw from './draw';

function Index() {
  const handleFindBack = useCallback(() => {

  }, []);
  const handleViewView = useCallback(() => {

  }, []);
  useEffect(() => {
    const $can = document.querySelector('canvas');
    const { width, height } = $can.getBoundingClientRect();
    $can.width = width;
    $can.height = height;
    const that = draw();
    // 创建代码雨
    that.createCodeRain();
    // 开始下雨吧 GO>>
    requestAnimationFrame(that.codeRaining);
  }, []);
  return (
    <div className="index-wrap">
      <canvas id="cvs" />
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
        <div className="scan-line" />
      </div>
      <div className="btn-wrap" style={{ dispaly: 'none' }}>
        <a href="javascript:;" onClick={handleFindBack}>找回</a>
        <a href="javascript:;" onClick={handleViewView}>观看视频教程</a>
      </div>
    </div>
  );
}

export default Index;
