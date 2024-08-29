import React from 'react';
import styles from './Shimmer.module.css';

interface ShimmerTableProps {
  rows: number;
  columns: number;
}

const ShimmerTable: React.FC<ShimmerTableProps> = ({ rows, columns }) => {
  const shimmerRows = Array.from({ length: rows });
  const shimmerColumns = Array.from({ length: columns });

  return (
    <div className={styles.shimmerWrapper}>
      {shimmerRows.map((_, rowIndex) => (
        <div key={rowIndex} className={styles.shimmerRow}>
          {shimmerColumns.map((_, colIndex) => (
            <div key={colIndex} className={styles.shimmerCell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ShimmerTable;
