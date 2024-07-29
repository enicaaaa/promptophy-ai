"use client"

import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'

const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState();

    const getAndSetProviders = async () => {
        const response = await getProviders();
        setProviders(response);
    }
    useEffect(() => {
        getAndSetProviders();
    }, []);

    return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
                src="/assets/images/brain-logo.svg"
                alt="PromptophyAI Logo"
                width={60} //px
                height={60} 
                className="object-contain"                  
            />

            <p className="logo_text">PromptophyAI</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            { session?.user ? 
                (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button type="button" className="outline_btn" onClick={signOut}>
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image 
                                src={session?.user.image == "" ? "/assets/images/brain-logo.svg" : session?.user.image}
                                className="rounded-full"
                                alt="Profile"
                                width={37}
                                height={37}
                            />
                        </Link>
                    </div>
                ) 
                : 
                (
                    <>
                        { providers && 
                            Object.values(providers).map((p) => (
                                <button
                                    type="button"
                                    key={p.name}
                                    className="black_btn"
                                    onClick={() => signIn(p.id)}
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )
            }
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
        { session?.user ? 
                (
                    <div className="flex">
                        <Image 
                            src={session?.user.image == "" ? "/assets/images/brain-logo.svg" : session?.user.image}
                            className="rounded-full"
                            alt="Profile"
                            width={37}
                            height={37}
                            onClick={() => setToggleDropdown((previous) => !previous)}
                        />

                        { toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                            setToggleDropdown(false);
                                            signOut();
                                        }
                                    }
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) 
                : 
                (
                    <>
                        { providers && 
                            Object.values(providers).map((p) => (
                                <button
                                    type="button"
                                    key={p.name}
                                    className="black_btn"
                                    onClick={() => signIn(p.id)}
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )
            }
        </div>
    </nav>
    )
}

export default Nav