import { Card, CardProps } from 'antd';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export interface NumberInfoProps extends CardProps {
  title?: React.ReactNode | string;
  value?: React.ReactNode | number | (() => React.ReactNode | number) | string;
  theme?: string;
  loading?: boolean;
  gap?: number;
  style?: React.CSSProperties;
}

type valueType = () => React.ReactNode;

const renderValue = (value?: number | valueType | React.ReactNode) => {
  if (!value && value !== 0) {
    return null;
  }
  let valueDom;
  switch (typeof value) {
    case 'undefined':
      valueDom = null;
      break;
    case 'function':
      valueDom = <div className={styles.value}>{value()}</div>;
      break;
    default:
      valueDom = <div className={styles.value}>{value}</div>;
  }
  return valueDom;
};



const NumberInfo: React.FC<NumberInfoProps> = ({
  title,
  value,
  theme,
  gap,
  loading = false,
  ...rest
}) => {
  const renderContent = () => {
    if (loading) {
      return false;
    }
    return (
      <div className={styles.numberInfo}>
        <div
          className={classNames(styles.numberInfoTop)}
        >
          <div className={styles.metaWrap}>
              <div className={styles.meta}>
                <span className={styles.title}>{title}</span>
              </div>
              {renderValue(value)}
            </div>
        </div>
      </div>
    );
  }
  return (
  <Card loading={loading} bodyStyle={{padding: '20px 24px 18px 24px'}} {...rest}>
    {renderContent()}  
  </Card>
  )
}

export default NumberInfo;
