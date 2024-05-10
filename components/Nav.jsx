"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  // const isUserloggedIn = true;
  const {data: session} =useSession();

  const [providers,setProviders]=useState(null);
  const [toggleDrop,settoggleDrop]=useState(false);

  useEffect(()=>{
    const setUpProviders=async()=>{
      const response=await getProviders();

      setProviders(response);
    }

    setUpProviders();
  },[]);

  return (
    <nav className=" flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className=" object-contain"
        />
        <p className="logo_text">PromptShare</p>
      </Link>


      {/* desktop navigation */}
      <div className=" sm:flex hidden">
        {session?.user ? (
          <div className=" flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href="/profile">
              <Image src={session?.user.image}
                width={37}
                height={37}
                className=" rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((providers)=>(
              <button type="button" key={providers.name} onClick={()=>signIn(providers.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className=" sm:hidden flex relative">
      {session?.user ? (
        <div className="flex">
        <Image src={session?.user.image}
                width={37}
                height={37}
                className=" rounded-full"
                alt="profile"
                onClick={()=> settoggleDrop((prev)=>!prev)}
              />
              {toggleDrop && 
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={()=>settoggleDrop(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={()=>settoggleDrop(false)}>
                Create Prompt
                </Link>
                <button type="button" onClick={()=>{settoggleDrop(false);
                  signOut();
                }} className="black_btn">
                  Sign out
                </button>
              </div>
              }
        </div>
      ):(
        <>
            {providers && Object.values(providers).map((providers)=>(
              <button type="button" key={providers.name} onClick={()=>signIn(providers.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
      )}

      </div>
    </nav>
  );
};

export default Nav;
