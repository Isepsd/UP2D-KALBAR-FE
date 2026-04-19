import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Captcha({ setValidation }: any) {
  const [captchaCode, setCaptchaCode] = useState('');
  const [value, setValue] = useState('');

  function onChangeValue(e: any) {
    const val = e.target.value;
    setValue(val);
    if (val === captchaCode) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }

  function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function refresh() {
    getImgValiCode();
    setValue('');
  }

  function getImgValiCode() {
    let showNum: any = [];
    let canvasWinth = 120;
    let canvasHeight = 40;
    let canvas: any = document.getElementById('valicode');
    let context = canvas.getContext('2d');
    canvas.width = canvasWinth;
    canvas.height = canvasHeight;
    let sCode = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9,!,@,#,$,%,^,&,*,(,)';
    let saCode = sCode.split(',');
    let saCodeLen = saCode.length;
    for (let i = 0; i <= 3; i++) {
      let sIndex = Math.floor(Math.random() * saCodeLen);
      let sDeg = (Math.random() * 30 * Math.PI) / 180;
      let cTxt = saCode[sIndex];
      showNum[i] = cTxt;
      let x = 10 + i * 20;
      let y = 23 + Math.random() * 8;
      context.font = 'bold 30px 微软雅黑';
      context.translate(x, y);
      context.rotate(sDeg);

      context.fillStyle = randomColor();
      context.fillText(cTxt, 0, 0);

      context.rotate(-sDeg);
      context.translate(-x, -y);
    }
    for (let i = 0; i <= 5; i++) {
      context.strokeStyle = randomColor();
      context.beginPath();
      context.moveTo(
        Math.random() * canvasWinth,
        Math.random() * canvasHeight
      );
      context.lineTo(
        Math.random() * canvasWinth,
        Math.random() * canvasHeight
      );
      context.stroke();
    }
    for (let i = 0; i < 30; i++) {
      context.strokeStyle = randomColor();
      context.beginPath();
      let x = Math.random() * canvasWinth;
      let y = Math.random() * canvasHeight;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
    setCaptchaCode(showNum.join(''));
  }

  useEffect(() => {
    getImgValiCode();
  }, []);

  return (
    <>
 <div className='d-flex justify-content-around text-center' style={{ padding: "10px" }}>
  <div>
    <canvas id="valicode" style={{ 
      border: "1px solid #aaa", 
      backgroundColor: "white", // Latar belakang putih pada canvas
   
    }} />
  </div>
  <div style={{ paddingTop: "1px" }}>
    <OverlayTrigger placement={'bottom'} overlay={<Tooltip> Refresh Captcha </Tooltip>}>
      <Link to='#' className='btn bg-transparent font-bold font-size-large no-outline'
        onClick={(e) => { 
          e.preventDefault(); refresh(); 
        }}
        style={{
          marginTop: "3px", 
          fontSize: "16px",   // Menurunkan ukuran font tombol refresh
          padding: "6px",    // Menyesuaikan padding tombol
        }}
      >
        <i className="fa-solid fa-rotate-right"></i>
      </Link>
    </OverlayTrigger>
    <input
      style={{
        width: "70%",   // Menyesuaikan lebar input agar proporsional dengan elemen CAPTCHA
        padding: "5px 8px", 
        border: "1px solid #aaa", 
        fontSize: "14px", // Menurunkan ukuran font pada input
      }}
      onChange={onChangeValue}
      type="text"
      value={value}
    />
  </div>
</div>

    </>
  )
}



export default Captcha;