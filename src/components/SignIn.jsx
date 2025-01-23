import React from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import './SignIn.css';

const SignIn = () => {

    const session = useSession();
  const supabase = useSupabaseClient();

    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: 'https://enzwrwwhmapkalndtija.supabase.co/auth/v1/callback', // Your Netlify app URL
            scopes: 'https://www.googleapis.com/auth/calendar ',
          },
        });
        if (error) {
          alert('Error logging in to Google provider with Supabase');
          console.log(error);
        }
      }

  return (
    <div>
        <div className="signin">
          <button onClick={() => googleSignIn()}>SignIn With Google</button>
        </div>
    </div>
  )
}

export default SignIn