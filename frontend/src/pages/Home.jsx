// import React from 'react'
import { ErrorBoundary } from "react-error-boundary"
import { lazy, Suspense } from 'react'
import { BestSellerGrid, Carousel_mui } from '../components'
// const Carousel_mui = lazy(() => import("./../components/Carousel_mui"))
// const BestSellerGrid = lazy(() => import("./../components/BestSellerGrid"))


const Home = () => {
  const fallback = ({ error, resetErrorBoundary }) => {
    return <h1>{error.message}</h1>
  }
  return <>

    {/* <Suspense fallback={<h1> continue loading</h1>}>
      <Carousel_mui />
    </Suspense> */}
    {/* <Suspense fallback={<h1> continue loading</h1>}> */}
    <ErrorBoundary fallbackRender={fallback}>

      <Carousel_mui />
    </ErrorBoundary>
    <ErrorBoundary fallbackRender={fallback}>

      <BestSellerGrid />
    </ErrorBoundary>
    {/* </Suspense> */}
  </>
}

export default Home