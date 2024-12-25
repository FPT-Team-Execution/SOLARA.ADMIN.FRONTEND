import './App.css'
import { ClerkProvider } from "@clerk/clerk-react"
import AppRoute from "./routes"

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? ''

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AppRoute />
    </ClerkProvider>
  )
}

export default App
