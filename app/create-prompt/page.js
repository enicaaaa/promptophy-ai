"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "@components/Form"
import Image from "next/image"

const CreatePrompt = () => {
    
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag 
                })
            });

            if(response.ok)
                router.push('/')
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="flex flex-row space-x-52">
            <div className="w-full">
                <Form
                    type="Create" 
                    post={post}
                    setPost={setPost}
                    submitting={submitting}
                    handleSubmit={createPrompt}
                />
            </div>
            {/* <div class="grid grid-rows-3 grid-flow-col gap-4">
                <div class="row-span-3">
                    <Image 
                        src="/assets/images/prompt1.png"
                        alt="PromptophyAI Logo"
                        width={1000}
                        height={1000}    
                        className="rounded-lg"            
                    />
                </div>
                <div class="col-span-2">
                    <Image 
                        src="/assets/images/prompt2.png"
                        alt="PromptophyAI Logo"
                        width={1800}
                        height={1800}    
                        className="rounded-lg"            
                    />
                </div>
                <div class="col-span-2 row-span-2">
                    <Image 
                        src="/assets/images/prompt3.png"
                        alt="PromptophyAI Logo"
                        width={1800}
                        height={1800}    
                        className="rounded-lg"            
                    />
                </div>
            </div> */}
        </div>
    )
}

export default CreatePrompt