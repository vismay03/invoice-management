import sidebarReducer from '@/components/layout/sidebar/slice'
import InvoiceReducer from '@/pages/invoices/slice'
import AuthReducer from '@/service/auth/slice'

export const reducer = {
    sidebar: sidebarReducer,
    invoices: InvoiceReducer,
    auth: AuthReducer
}
