import React, {Suspense} from 'react';
import {AppRouter} from 'app/providers/router';

function App() {
    return (
        <div>
            <Suspense fallback="">
                <div className="content-page">
                    <AppRouter/>
                </div>
            </Suspense>
        </div>
    );
}

export default App;
