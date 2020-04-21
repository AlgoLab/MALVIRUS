import React, { useState, useRef, useEffect } from 'react';

import { Table } from 'antd';

import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';

import { vt, vg, vtC, vtCMid } from './VirtualTable.module.css';

function VirtualTable(props) {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);

  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const columnWidth = Math.floor(tableWidth / widthColumnCount);
  const mergedColumns = columns.map((column, idx) => ({
    ...column,
    width:
      idx === 0
        ? tableWidth - (widthColumnCount - 1) * columnWidth
        : columnWidth,
  }));

  const gridRef = useRef();
  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, []);
  useEffect(() => resetVirtualGrid, [tableWidth]);

  const body = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject;
    return (
      <Grid
        ref={gridRef}
        className={vg}
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : index === 0
            ? width - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 31}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div className={columnIndex > 0 ? vtCMid : vtC} style={style}>
            {mergedColumns[columnIndex].render
              ? mergedColumns[columnIndex].render(
                  rawData[rowIndex][mergedColumns[columnIndex].dataIndex],
                  rawData[rowIndex]
                )
              : rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width - 1);
      }}
    >
      <Table
        {...props}
        className={vt}
        columns={mergedColumns}
        pagination={false}
        components={{
          body,
        }}
      />
    </ResizeObserver>
  );
}

export default VirtualTable;
