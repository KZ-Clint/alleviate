import { ContextProvider } from '@/components/Context'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import Sidebar from '@/components/Sidebar'
import Toaster from '@/components/Toaster'
import Topbar from '@/components/Topbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  if(Component.getLayout) {
    return Component.getLayout(
      <ContextProvider>
        <Loader/>
        <Sidebar/>
        <Toaster/>
         <Component {...pageProps} />
         <Footer/>
      </ContextProvider>
      )
 }

  return (
    <>
    <ContextProvider>
        <Loader/>
        <Topbar/>
        <Sidebar/>
        <Toaster/>
        <Component {...pageProps} />
        <Footer/>
      </ContextProvider>
    </>
  ) 
}
