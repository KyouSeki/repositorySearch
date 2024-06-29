import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App"
import { AliveScope } from "react-activation"
import ReactDOM from 'react-dom'

//　AliveScopeを使うと、コンポーネントがキャッシュできる
ReactDOM.render(
  <AliveScope>
    <App />
  </AliveScope>,
  document.getElementById('root')
)

reportWebVitals();
