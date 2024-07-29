import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover, Share & Send 
            <br className="max-md:hidden"/>
            <span className="purple_gradient"> AI-Powered Prompts</span>
        </h1>

        <p className="desc text-center">
            PromptophyAI is an open-source AI prompting tool for modern world to discover, create, share and send creative prompts
        </p>

        {/* Feed component */}
        <Feed/>
        
    </section>
  )
}

export default Home