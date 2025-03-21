import { ErrorBoundary } from 'react-error-boundary'
import React, { lazy, Suspense } from 'react'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Protected from './pages/share/Protected'
const Register = lazy(() => import("./pages/Ragister"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

const AdmineLayout = lazy(() => import("./components/AdmineLayout"))
const PublicLayout = lazy(() => import("./components/PublicLayout"))
const ErrorFeedback = lazy(() => import("./components/ErrorFeedback"))
const Loading = lazy(() => import("./components/Loading"))

const App = () => {
  const PUBLIC_ROUTE = [
    { path: "/", isIndex: true, element: <Login /> },
    { path: "/register", isIndex: false, element: <Register /> }
  ]
  const ADMINE_ROUTE = [
    { path: "/", isIndex: true, element: <Dashboard /> }
  ]
  return <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<PublicLayout />}>
          {
            PUBLIC_ROUTE.map(item => <Route
              key={item.path + "public"}
              index={item.isIndex}
              path={item.isIndex ? "" : item.path}
              element={<ErrorBoundary fallbackRender={ErrorFeedback}>
                <Suspense>
                  {item.element}
                </Suspense>
              </ErrorBoundary>} />)
          }
        </Route>

        <Route path='/admin' element={<Protected><AdmineLayout /> </Protected>}>
          {
            ADMINE_ROUTE.map(item => <Route
              key={item.path + "admine"}
              index={item.isIndex}
              path={item.isIndex ? "" : item.path}
              element={<ErrorBoundary fallbackRender={ErrorFeedback}>
                <Suspense fallback={Loading}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>} />)
          }
        </Route>

        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App