import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './rtk query/store.js'
import BasketProvider from './context/BasketContext.jsx'
import FavoritesProvider from './context/FavoritesContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // <BrowserRouter>
    <FavoritesProvider>
      <BasketProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </BasketProvider>
    </FavoritesProvider>
  // {/* </BrowserRouter> */}
)
