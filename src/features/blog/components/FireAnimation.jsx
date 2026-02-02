import React from 'react';
import styles from './FireAnimation.module.scss';

export default function FireAnimation() {
  return (
    <div className={styles.stage}>
      <div className={styles.container}>
        
        <div className={`${styles.group} ${styles.fireRed}`}>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
        </div>

        <div className={`${styles.group} ${styles.fireOrange}`}>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
        </div>

        <div className={`${styles.group} ${styles.fireYellow}`}>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
        </div>

        <div className={`${styles.group} ${styles.fireWhite}`}>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
        </div>

      </div>
    </div>
  );
}