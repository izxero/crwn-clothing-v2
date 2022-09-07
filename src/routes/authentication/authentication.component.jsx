// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'

import SignInForm from '../../components/sign-in-form/sign-in-form.component'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import './authentication.style.scss'

const Authentication = () => {
  // useEffect(()=>{
  //   async function getRedirect(){
  //     const response = await getRedirectResult(auth);
  //     if (response){
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   getRedirect();
  // },[])


  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication;