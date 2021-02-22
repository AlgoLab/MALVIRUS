import { Spin } from 'antd';

function Loading() {
  return (
    <div style={{ textAlign: 'center', margin: '2em' }}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
}

export default Loading;
