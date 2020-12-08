import { useRef, useEffect } from 'react';
import './styles.scss';

const Loader = props => {
  let canvas = {};
  const canvasContainer = useRef(null);
  const primaryColor = '#373737';
  const secondaryColor = '#AFAFAF';

  useEffect(() => {
    canvas = createCanvas();
    initLoader();
    canvasContainer.current.prepend(canvas);
    window.addEventListener('scroll', updateLoader);
    return () => {
      window.removeEventListener('scroll', updateLoader);
    };
  }, []);

  const createCanvas = () => {
    const canvas = document.createElement('canvas');
    if (typeof G_vmlCanvasManager !== 'undefined') {
      G_vmlCanvasManager.initElement(canvas);
    }
    return canvas;
  };

  const updateLoader = e => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const scrolled = (winScroll / height) * 100;

    console.log('height', height, 'winScroll', winScroll);
    console.log('scrolled', scrolled);

    canvasContainer.current.removeChild(canvas);
    canvas = createCanvas();
    initLoader(scrolled);
    canvasContainer.current.prepend(canvas);
  };

  const initLoader = scrolled => {
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = 55;
    context.translate(27, 27);
    setLoader(secondaryColor);
    if (scrolled !== undefined && scrolled !== 0) {
      setLoader(primaryColor, scrolled);
    }
  };

  const setLoader = (color, percent) => {
    const context = canvas.getContext('2d');
    context.beginPath();
    const angle = percent ? 0.01 * percent : 2;
    context.arc(0, 0, 22, 0, Math.PI * angle * 2, false);

    context.lineWidth = 3;
    context.strokeStyle = color;
    context.stroke();
  };

  return (
    <div
      className="clp-progress-circle"
      ref={canvasContainer}
    >
      <span className="loader-totalitems">
        {props.totalProducts && props.totalProducts}
      </span>
      <div class="totalitems-label">TOTAL ITEMS</div>
    </div>
  );
};
export default Loader;
