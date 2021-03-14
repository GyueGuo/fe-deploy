import React, { useState, useEffect } from 'react';
import ajax from '../../utils/request';
import './index.less';

function Video() {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    ajax({
      url: '/wx/getVedio',
    }).then(({ data }) => {
      if (data.code === 0) {
        setVideoUrl(data.result.videoUrl);
      }
    });
  }, []);
  return (
    <div className="video-wrap">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video src={videoUrl} autoPlay controls />
    </div>
  );
}

export default Video;
