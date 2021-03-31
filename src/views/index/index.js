import React, { useCallback, useEffect } from 'react';
import ReactDom from 'react-dom';
import './index.less';
import draw from './draw';

const { location } = window;
function Index() {
  const handleFindBack = useCallback(() => {
    location.href = '/pay';
  }, []);
  const handleViewVideo = useCallback(() => {
    location.href = '/video';
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
        <a href="javascript:;" onClick={handleViewVideo}>观看视频教程</a>
      </div>
    </div>
  );
}

ReactDom.render(<Index />, document.getElementById('app'));
