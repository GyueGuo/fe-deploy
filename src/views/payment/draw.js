export default function draw(cb) {
  const str = 'Thank you for using.$we are trying to get the records from remote.$please be patient and wait a few seconds$';
  let framer = null;
  const arr = str.split('');
  let index = 0;
  const max = arr.length;
  let pointCounter = 0;
  const drawPoint = () => {
    const dom = document.querySelector('[data-selector="point"]');
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
    dom.innerHTML = pstr;
    requestAnimationFrame(drawPoint);
  };
  const drawFn = () => {
    const dom = document.querySelector('[data-selector="modal"]');
    if (dom) {
      dom.innerHTML = arr.slice(0, index).join('').replace(/\$/g, '<br />');
      index += 1;
      if (index === max && cb) {
        cb();
      }
      if (index > max) {
        framer = requestAnimationFrame(drawPoint);
        return;
      }
    }
    framer = requestAnimationFrame(drawFn);
  };
  framer = requestAnimationFrame(drawFn);
  return () => {
    cancelAnimationFrame(framer);
  };
}
