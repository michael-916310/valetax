import React, {Suspense} from 'react';
import {AppRouter} from 'app/providers/router';
import {Button, Space} from 'antd';

function App() {
    return (
        <div>
            <Space style={{padding: '20px'}}>
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
            </Space>
            <Suspense fallback="">
                <div className="content-page">
                    <AppRouter/>
                </div>
            </Suspense>
        </div>
    );
}

export default App;
