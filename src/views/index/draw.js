export default function () {
  const cvs = document.getElementById('cvs');
  const ctx = cvs.getContext('2d');
  const cw = cvs.width;
  const ch = cvs.height;
  const letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const codeRainArr = []; // 代码雨数组
  const step = 10; // 步长，每一列内部数字之间的上下间隔
  const cols = parseInt(cw / step, 10); // 代码雨列数
  ctx.font = `bold ${step}px microsoft yahei`; // 声明字体，个人喜欢微软雅黑
  // 创建代码雨
  function createCodeRain() {
    for (let n = 0; n < cols; n += 1) {
      const col = [];
      // 基础位置，为了列与列之间产生错位
      const basePos = parseInt(Math.random() * 300, 10);
      // 随机速度 3~13之间
      const speed = parseInt(Math.random() * 10, 10) + 1;
      // 每组的x轴位置随机产生
      const colx = parseInt(Math.random() * cw, 10);

      // 绿色随机
      const rgbr = 0;
      const rgbg = parseInt(Math.random() * 255, 10);
      const rgbb = 0;
      // ctx.fillStyle = "rgb("+r+','+g+','+b+")"

      for (let i = 0; i < parseInt(ch / step, 10) / 2; i += 1) {
        const code = {
          x: colx,
          y: -(step * i) - basePos,
          speed,
          text: letters[parseInt(Math.random() * letters.length, 10)], // 随机生成字母数组中的一个
          color: `rgb(${rgbr},${rgbg},${rgbb})`,
        };
        col.push(code);
      }
      codeRainArr.push(col);
    }
  }

  // 代码雨下起来
  function codeRaining() {
    // 把画布擦干净
    ctx.clearRect(0, 0, cw, ch);
    // 创建有颜色的画布
    for (let n = 0; n < codeRainArr.length; n += 1) {
      // 取出列
      const col = codeRainArr[n];
      // 遍历列，画出该列的代码
      for (let i = 0; i < col.length; i += 1) {
        const code = col[i];
        if (code.y > ch) {
          // 如果超出下边界则重置到顶部
          code.y = 0;
        } else {
          // 匀速降落
          code.y += code.speed;
        }

        // 1 颜色也随机变化
        // ctx.fillStyle = "hsl("+(parseInt(Math.random()*359)+1)+",30%,"+(50-i*2)+"%)";

        // 2 绿色逐渐变浅
        ctx.fillStyle = `hsl(123,80%,${30 - i * 2}%)`;

        // 3 绿色随机
        // var r= 0;
        // var g= parseInt(Math.random()*255) + 3;
        // var b= 0;
        // ctx.fillStyle = "rgb("+r+','+g+','+b+")";

        // 4 一致绿
        // ctx.fillStyle = code.color;

        // 把代码画出来
        ctx.fillText(code.text, code.x, code.y);
      }
    }
    requestAnimationFrame(codeRaining);
  }
  return {
    createCodeRain,
    codeRaining,
  };
}
