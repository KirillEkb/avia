import { createRoot } from 'react-dom/client';

import classes from './index.module.scss';
import App from './components/App/App';

const root = createRoot(document.getElementById('root'));

root.render(<App className={classes.app} />);
