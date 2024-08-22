import React, { useEffect, useRef, useState } from 'react';
import styles from './Toast.module.css';
import tick from './../../assets/tick.svg'

interface ToastProps {
  message: string;
  duration?: number; // Duration in milliseconds
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  let timeoutId = useRef(9);
  let intervalId = useRef(0);
  const [val, setValue] = useState(duration);

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      onClose();
    }, duration);

    intervalId.current = setInterval(() => {
      setValue(prev => Math.max(prev - 50, 0)); // Decrease by 50ms intervals
    }, 50);

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [duration, onClose]);

  const progressBarWidth = (val / duration) * 100;

  return (
    <div className={styles.toast}>
      <div className={styles.toastInnerContainer}>
        <div className={styles.toastIcon}>
          <img src={tick} />
        </div>
        <div className={styles.toastMessage}>{message}</div>
        <div className={styles.toastClose} onClick={onClose}>&times;</div>
      </div>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${progressBarWidth}%` }} />
      </div>
    </div>
  );
};

export default Toast;
