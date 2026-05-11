import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { Provider } from 'react-redux';
import { ModelProvider } from '../../global/modelContext';
import GlobalModel from '../../global/component/comp-global-model';
import { store } from '@/store/store.js'


  const queryClient=new QueryClient();
const Providers = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <ModelProvider>
                  {children}
            </ModelProvider>
            <GlobalModel />
          </Provider>
    </QueryClientProvider>
  )
}

export default Providers