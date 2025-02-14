import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Modal from 'react-modal'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
//  
import Aos from "aos"
import { router } from './routes/router';


Modal.setAppElement('#root')
const queryClient = new QueryClient()


Aos.init();
ReactDOM.createRoot(document.getElementById('root')).render(
  
<QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
    </QueryClientProvider>
  
  
)
  
      