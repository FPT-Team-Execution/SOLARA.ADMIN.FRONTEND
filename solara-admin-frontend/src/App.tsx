import './App.css'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react"
import AppRoute from "./routes"

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? ''

function App() {
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
    >
      <SignedIn>
        <AppRoute />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  )
}

export default App
