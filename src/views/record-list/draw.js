export default function draw() {
  const $point = document.querySelector('[data-selector="point"]');
  const $modal = document.querySelector('[data-selector="modal"]');
  const $str = document.querySelector('[data-selector="str"]');
  $modal.style.display = 'block';

  let pointCounter = 0;
  const str = 'Thank you for using.$we are trying to get the records from remote.$please be patient and wait a few seconds$尝试进入目标防御网,不要退出$Trying to attack the target network/ ......$crack server port:00x00001010100011001001$results......00x10101000101ibm$server port transport information$Authorization code matching wrong$0016-3E0E-7746-5EE3-904R-E533$SUCCESS Ending ...$正在返回结果页,不要退出$';
  let framer = null;
  const arr = str.split('');
  let index = 0;
  const max = arr.length;
  const cancelFrames = () => {
    cancelAnimationFrame(framer);
  };

  const drawPoint = () => {
    let pstr = '';
    let target = parseInt(pointCounter, 10);
    while (target) {
      pstr += '.';
      target -= 1;
    }
    pointCounter += 0.1;
    if (pointCounter > 5) {
      pointCounter = 0;
    }
    $point.innerHTML = pstr;
    framer = requestAnimationFrame(drawPoint);
  };

  const drawStr = () => {
    $str.innerHTML = arr.slice(0, index).join('').replace(/\$/g, '<br />');
    index += 1;
    if (index === max) {
      setTimeout(() => {
        $modal.style.display = 'none';
        cancelFrames();
      }, 3000);
    }
    if (index > max) {
      framer = requestAnimationFrame(drawPoint);
      return;
    }
    framer = requestAnimationFrame(drawStr);
  };

  drawStr();
  return cancelFrames;
}
