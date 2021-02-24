/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
// eslint-disable react/style-prop-object
import React, { useCallback } from 'react';
import './index.less';

function Index() {
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
        <div className="scan-line" />
        <div className="city-point beijing" />
        <div className="city-point shanghai" />
        <div className="city-point xian" />
        <div className="city-point wuhan" />
        <div className="city-point chengdu" />
        <div className="city-point guangzhou" />
        <div className="city-point haerbin" />
        <div className="city-point wulumuqi" />
        <div className="city-point lasa" />
      </div>
      <div className="btn-wrap" style={{ dispaly: 'none' }}>
        <a href="javascript:;" onClick={handleFindBack}>找回</a>
        <a href="javascript:;" onClick={handleViewView}>观看视频教程</a>
      </div>
    </div>
  );
}

export default Index;
