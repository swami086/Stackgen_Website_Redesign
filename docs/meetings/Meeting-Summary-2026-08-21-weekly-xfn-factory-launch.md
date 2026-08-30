# Weekly X-Fn Factory Launch (til Labor Day week)

Source: [Sybill conversation](https://app.sybill.ai/conversations/2a8ff448-d312-479e-b753-6ecb4b8d2b75)

Pulled via Sybill MCP `get_conversation` on 2026-08-21. Recording links are omitted (signed S3 URLs expire). Watch the recording in Sybill.

## Meeting Summary

**Date & Time**: Friday, 21 August 2026, 10:59 AM–12:02 PM PDT (17:59–19:02 UTC)

**Duration**: ~63 minutes

**Type**: Internal · product team · cross-functional factory launch standup

**Conversation ID**: `2a8ff448-d312-479e-b753-6ecb4b8d2b75`

**Participants**

| Name | Email | Attended | Spoke |
|---|---|---|---|
| Aaron Yang | aaron@stackgen.com | Yes | Yes |
| Dharani | dharani@stackgen.com | Yes | Yes |
| John Jamie | john@stackgen.com | Yes | No |
| Raj Nagarajan | raj@stackgen.com | Yes | Yes |
| Sachin Aggarwal | sachin@stackgen.com | Yes | Yes |
| Swaminathan R | swami@stackgen.com | Yes | Yes |

**Topic**: Website relaunch design review and content plan before Labor Day week

**Summary**

- **Outcome**: Team aligned on next steps for the website relaunch: Swaminathan will iterate on the design (new hero diagram, reduced PLG references, animation placeholders), Dharani will collect use-case intents in an Excel sheet, and Product/Engineering will supply authoritative platform content (slides, PRD/PRFAQ). A working session is scheduled for Monday to review progress.

- **Website design direction**: Current mock-up needs a strong hero diagram, reduced text, and elimination of premature PLG elements; Swami will iterate accordingly.
- **Content gaps**: Marketing lacks authoritative documentation on Agentic OS capabilities; Product must supply slides and a PRFAQ/PRD to drive messaging.
- **Use-case focus**: Site must highlight concrete DevOps/SRE intents and outcomes; Dharani will compile an Excel list of 7-8 representative scenarios.
- **Deadlines set**: Revised design, use-case list, and source documents are all due before a follow-up working session on Monday, 24 Aug 2026.
- **Internal alignment challenge**: Team recognised misalignment on vision and messaging; Sachin emphasised urgency to align and produce a compelling enterprise-focused website.

**Action Items**

| Due Date | Owner | Action |
|----------|-------|--------|
| Before Mon 24 Aug 2026 | Swaminathan R | Iterate the website mock: stronger hero diagram, less text, drop/move premature PLG (CLI/Slack) sections, add animation placeholders |
| Before Mon 24 Aug 2026 | Dharani | Compile an Excel list of 7–8 representative DevOps/SRE use-case intents and outcomes |
| Before Mon 24 Aug 2026 | Product / Engineering (Raj, Sachin, Aaron) | Supply authoritative platform content: slides, PRD/PRFAQ, Agentic OS narratives and feature docs |
| Monday 24 Aug 2026 | All | Working session to review revised design, use-case list, and source documents |

**Decisions Made**

- The current mock needs a strong hero diagram and less copy; Swami will iterate.
- Premature PLG surfaces (CLI / Slack high on the page) should move down or come out until the product story is clear.
- The site should lead with concrete DevOps/SRE intents and outcomes, not abstract platform language.
- Product must own the source-of-truth docs (slides + PRFAQ/PRD); marketing will not invent Agentic OS messaging without them.
- Follow-up working session is Monday, 24 August 2026.

**Open Questions**

- What does “one graph” on the landing page mean? — Swaminathan explained it refers to a knowledge graph that makes the product accessible through any interface (CLI, MCP, etc.).
- Why is the CLI/Slack section high on the page? — Aaron and Sachin felt it is premature; users need to understand what the product does first, so this section should move down or be removed.
- What content is missing for the website? — Swami and Dharani need clear product narratives and detailed feature documentation from Product/Engineering to fill content gaps.

---

## Sybill FAQ

### What does “one graph” on the landing page mean?

Swaminathan explained it refers to a knowledge graph that makes the product accessible through any interface (CLI, MCP, etc.).

### Why is the CLI/Slack section high on the page?

Aaron and Sachin felt it is premature; users need to understand what the product does first, so this section should move down or be removed.

### What content is missing for the website?

Swami and Dharani need clear product narratives and detailed feature documentation from Product/Engineering to fill content gaps.

---

## Full Transcript

249 speaker turns (543 raw utterances). Timestamps are elapsed from meeting start.

**[1:37] Aaron Yang**

Hey, raj.

**[1:47] Raj Nagarajan**

It looks like.

**[1:51] Aaron Yang**

Dude, I'm gonna be honest with you. I like, I feel like half the time John's AI schedule these events and he doesn't attend them. So let's see if he attends this one.

**[2:02] Raj Nagarajan**

This one was a longer meeting. It got shortened. So I'm assuming that somebody deliberately. Until the. Unless the agent got even smarter. It's. It was a longer meeting that got adjusted. But John, I thought he didn't attend the pricing discussion, so I was assuming that.

**[2:25] Aaron Yang**

Yeah, I think on Slack it says he's sick, so. Hey, so if he's not joining, why don't we take the time to talk about eight? Oh, okay. Swami's here.

**[2:37] Swaminathan R**

Hi, Aaron. How are you?

**[2:39] Aaron Yang**

Good. And yourself?

**[2:41] Swaminathan R**

Good. Hi. Hi, Raj. So sneak peek for you guys. The web page is more or less. I think the first draft is out. So that's how it looks the like page. So. I need to refine the diagram yet. But context graphics, I don't know why it's not come. But this thing. Then you have Aiden OS. This is just the main landing page. Then you have product.

**[3:26] Dharani**

Can you hear me?

**[3:27] Aaron Yang**

Yeah, yeah.

**[3:28] Dharani**

Okay. Making sure.

**[3:30] Swaminathan R**

So this is where the video will come. So Aaron, I saw one of your YouTube links. So I basically this is a clip from one of. One of that. But what I have is some MP4 frames that I am going to embed. Right. Just as a placeholder. Then you have what I would call all. Where is this product Aiden for Infrastructure? One more rest of the ones didn't get created. Okay. The rest of the ones haven't gotten created. They have not been.

**[4:09] Aaron Yang**

So. So let's go through one by one. Can we go to the homepage?

**[4:13] Dharani**

Yeah, yeah. I think. I think before we get started. Right. Like some couple of things at least I want to make a decision us to make a decision. A couple of things. The color theme is one for sure. And then the workflow itself. Right. Like in terms of how we present our products and the architecture on top as DevOps factory, of course. And then the why. The what? The why. And then how we solve the products and then who are our customers and go deeper into the context graph. Right. That's sort of the framework I had in mind. And I've been. I know Swami has been working hard on the wireframing and website, so. So each of you, if you could put that lens as you review his flow, it will be more actionable and can iterate as the next step. That's what I'm thinking.

**[5:08] Swaminathan R**

Thank you as.

**[5:12] Dharani**

So, Aaron, like you had something you were saying.

**[5:14] Raj Nagarajan**

Yeah, sorry. The other page was different and now one had Aiden OS. This is the one that we're talking about.

**[5:24] Swaminathan R**

Yeah. So the other page is the product page. So this is the identify infrastructures. There are actually there are four.

**[5:34] Dharani**

Why don't we start with landing page? I think that's. That's.

**[5:37] Swaminathan R**

Yeah.

**[5:38] Dharani**

So this is the DevOps factory. Yeah, that's the landing page is going to be DevOps factory.

**[5:42] Swaminathan R**

DevOps factory. Right. So one surface, one graph. Every surface your team already uses. So it's accessible through all of these things. CLI via mcp. You know, you can integrate all of these things.

**[6:00] Raj Nagarajan**

What does one graph mean?

**[6:01] Swaminathan R**

Sorry, Knowledge graph. I mean I have to change it the. Ignore the inconsistencies, but I will have to change some of this messaging. Right. But the idea is that this, the. The. The entire product can be accessible through any of these interfaces. Right. Below that is where I want to put a video. The video of the product itself which will be a. Maybe a 30 second video or maybe a minute video. Minute will be. Not probably be too much. But essentially you saw the factory AI theme. Right. So if you look at factory AI.

**[6:46] Raj Nagarajan**

Sorry, I'm a little bit confused. So maybe wanted to make sure. Yeah. Are we designing this so that somebody will take over and put finishing touches? This is a raw content or this is kind of what we are looking for.

**[6:59] Swaminathan R**

I'm going to. It's going to be an iterative effort, Raj. So based on the feedback and the comments that you will give me, I will iterate it because I am actually not in favor of now giving it to Gradical because I have so much control over it and I will just get things done very, very quickly. Right. If I give Gradical, it's like at least a day or two's worth of effort or probably more. Right. So I am of the opinion that I will take this through all the way to the end. Right. So you just have to give me. So what I will do before I do that is give you guys the.

**[7:37] Dharani**

I think. I think the first iteration like is the flow. Raj, to your question. Yeah,. The ADF flow is something we can focus today.

**[7:52] Swaminathan R**

So I, Yeah, I would want all of you to sort of. I will put this on a. I've already put it on a Docker container and I will host it on a public IP so that you're able to access the web page as well. But I would want you to put all your comments, whatever changes you want to put, please be as detailed and as specific as you can that. I don't like this. I like this. Please change this. Please change that. So it's easier for me to track. Right. It's first party comment is always easier for me to take and iterate and work on. Right. So I want you to first absorb. Right. So there is a, there is quite a bit of research that me and Darni have gone through. We went through A1, we went through a couple of hours just to go through the questionnaire in terms of the branding, the business, the product, where does it fit in the competition? So a lot of stuff has gone into it Right. Before we churned out a design detail. If you don't like it, that's totally fair. It's just that I want everything in return, otherwise it's just not going to be. I'm not going to be able to incorporate those changes effectively, otherwise. So I've shared the link already. Please feel free to put your comments on that. Right, so it's, it's a fairly basic one.

**[9:13] Dharani**

Right now, are you sharing your screen? I don't see.

**[9:15] Swaminathan R**

Oh, sorry, sorry, sorry. Oh, sorry, I forgot to share my screen. There. Yeah. So these are the four surfaces. Right. So these are the four products. Technically, I've split it on Aiden for infrastructure, Aiden for automation, Aiden for observability, and Aiden for sre. Right. So these are. I'm just going to approve Raj's request because he's been kind enough to send me a. Request. I said share. Cool. So this is just the front page. This operational context graph. It's. It's a, it's an area where I'm thinking of replacing this.

**[10:00] Dharani**

You're kind of fast for me.

**[10:01] Swaminathan R**

Okay.

**[10:02] Dharani**

Could you go up, please? Yeah, let's pause there before this. Like, are we. What is the feedback we got on the ADF itself? Can you go up, please? No, the first piece. Right. Like the. Yeah. So on this one, what's the feedback from the team.

**[10:27] Aaron Yang**

On the top section?

**[10:28] Dharani**

The landing page. Yeah, the landing section where people land.

**[10:41] Raj Nagarajan**

Think, team. This is. I, I'll tell you, we can definitely focus on the content, by the way. Thank you, team. I think the, the. I think we're definitely going in the right track in terms of simplifying and we can review the content more carefully. This one, this one doesn't have the web design that flashy, like elements are not there. Right.

**[11:17] Dharani**

I mean, that's coming up. Yeah, that's what he was trying to.

**[11:19] Swaminathan R**

Coming. It will. CMS will be there. The motion Designs will come in place, the flashy videos will be here. All of that will happen over the next few days. I'm not even talking weeks. It will all, all of it will happen in the next few days. Right. So this is just the design spec, the first, very first draft, which is worth reviewing. Right. So I. The purpose of today's session is one, I want you to be happy today with the theme, the color palette, the design, the system, the design template that I have used for it. If all of that is good, then the next step is to now iterate and refine the content one by one. Right. Section by section. And that will happen once I upload all of this into a cms. So webflow. I'm going to upload all of the content into a CMS style website. So I mean all of you can actually have access to it and you can just, you know, update whatever you want to do. You can have maybe micro ownerships in terms of their own respective domains. If Raj, if you want to own the autonomous DevOps factory vision in terms from a product perspective, maybe put it out there and maybe see what, what you want to present and then I'll take that and I'll iterate it. Right. So that's how I'm looking at, looking at this entire thing. So, so let's get the design first, right? Let's get the structure of the web page correct and then we will, we will work through it. Right? Not too many sessions.

**[12:49] Dharani**

Yeah. Okay. I'm taking notes, Swami. I already, I'm going to make a note that Raj's feedback, right. Like the flashy animation needs to be there on the.

**[13:01] Swaminathan R**

It will all come. It will all come.

**[13:03] Dharani**

I don't want to miss out on that feedback. So I'm going to make notes of it. Okay, why don't you keep going down since you are presenting. I'll take notes.

**[13:09] Swaminathan R**

Yeah, sure. Right.

**[13:12] Raj Nagarajan**

Sachin also joined. So why don't you give a break? Give a.

**[13:16] Swaminathan R**

It's a. Hi, Sachin. So Sachin, this is the first draft. So this is sort of really. This is the base on which I want to build the rest of the stuff. Yeah. Just to give you a bit of background, me and Dharani went through a whole discovery process in terms of how, what we wanted to present, what is the kind of content that needed to come out there. So this is, I wouldn't say this is, it's far from perfect, but it's still a very good start in my view. Right. So we consolidated the vision on the ADF which is what we discussed the autonomous DevOps factory.

**[13:55] Dharani**

I decided let me also add a couple of things so that I set the right expectation too. Right. Like so. So the feedback you're looking for, Swami is looking for is the flow itself. Team. Right. Like Sachin, since you joined now, how we present the ADF as an architecture and then like explain the what and why and all of that and then like go into the individual product. Yeah. He's going to build more videos and animations, but the think of it more like a wireframing for the flow itself. Yeah, it's like one and a half days of work. Yeah, go ahead, Swami.

**[14:24] Swaminathan R**

Okay, so this is the. So I have had the customer logos as well. So what will happen in terms of animation is maybe the logos will be become like a rolling bar from left to right or right to left. Right. Or maybe up and down. It might. Depending on how you like it. Right. This might be scrolling up and down or left to right. So that's one animation I will put here. So this part of the landing page also is trying to message that the product itself is accessible through multiple interfaces. CLI being one of them, MCP being another. Right. Through any basically application, any surface which has an MCP connector, you should be able to access the product. Below that I have the. This is a screenshot right now. But what will really come here is a flashy. I will make it a little glossy. I'm just giving you in terms of a design aspect, what I'm thinking. This will be glossy or maybe the screen will pop out a little where it basically shows the. The product ui, the actual product ui and where maybe say something like this. Right. Factory. So something like this, for example. Right. This is what I want. So it's like coming out and we are able to see what is happening in the product interface. So I want to replicate the same thing for this as well. Where did I put my. This? Was this here? Yeah, it was here. So that section will come over here. So this.

**[15:56] Dharani**

I think I see Aaron's hand race.

**[15:58] Swaminathan R**

Yeah.

**[15:59] Aaron Yang**

Yeah. I think if you scroll up. Yeah, This I think is premature. Right. Because you're telling. Oh, you can access this everywhere. But when. When I'm coming to the website, I want to know what you do first. Yeah, yeah. Before I decide I wanted to access every. I want to know what it is.

**[16:20] Sachin Aggarwal**

Yeah, this comes in later. This is. This is not even important if you ask.

**[16:25] Aaron Yang**

Yeah, we should throw this at like the bottom, if anything.

**[16:29] Sachin Aggarwal**

I mean, I. Yeah. I don't even know whether this is that useful, frankly. But yeah, I mean, in case of, I don't know, Factory is probably saying that in the, in the homepage this. But it's not that relevant actually. I don't even know why they're saying that in their homepage, by the way, if you ask me.

**[16:44] Swaminathan R**

Right.

**[16:44] Sachin Aggarwal**

Because I think firstly, if you go, if you really want us feedback right away, then let's go on top. So I think there's too many words there. Yeah, that's the point. Yeah. So it just should be automated factory, you know, something really simple. Right. I mean it, I mean I gave a suggestion. It could be a saying build.operate.obscribe.remediate. Kind of a thing. Or it could be a one single line saying, hey, you know, a full autonomous auto loop. You know, something, something that is, that is. That explains what an autonomous device factory would do, but it also includes SRE in a way. Right. And then I think we talked about some sort of graphics right here, right? Whether it's a factory, factory graphic. So there has to be some hero banner here, right? Yeah, yeah. Which can have an input, which can be an intent and then can be an outcome or it can be in a factory way where. So I, I think this is where we need some creativity. You need to spend some time and I think once we have that, then once you go below the logos, then I would actually say one graph or I can say where you have the CLI scroll up. So when you say one graph every service here, you can still say the same thing, one graph or one contest graph, different use cases or whatever to get an integrated experience. But here you can again say build or infra ops. Infrastructure. Sorry, Infrastructure, automation, observability and sre. Right. Or so so, so, so that can be. And then once you are on that and it shows. Basically, basically then it explains what each product does.

**[18:32] Swaminathan R**

This is what you, you mentioned IDENT for infrastructure. Aiden for. So I have that. So I think this you can only see. I think.

**[18:40] Dharani**

Yeah, I think, I think Sachin's feedback was more on. On hinge on the life cycle management. Yeah. To explain the ADF concept. Right. I've taken notes, Swami. Sure, sure, I'll help you. I know since you're sharing, you cannot take notes.

**[18:53] Swaminathan R**

So I'm taking the notes.

**[18:54] Sachin Aggarwal**

Yeah. Basically I'm just saying show the auto loop like, you know, life cycle here and saying, okay, it's an end. It's a comprehensive end to end DevOps factory that takes intent into any action and outcome. That a typical DevOps would do. Yeah.

**[19:09] Swaminathan R**

Awesome.

**[19:09] Dharani**

Yeah. And the model. Not model routing, agent routing that Raj gave a mock up. Right. I think that that would be a great landing page to Aaron's point. I know, Swami, you're still working on that. And also requested. Radical, you mean? Yeah, yeah, I think I had some thought thinking as well, because that's a pretty big value prop, actually. People buy AI agent routers as a ala carte product to get that correctly. So if we do the intent routing correctly with our own products, why not that be the flagship value prop?

**[19:44] Sachin Aggarwal**

You mean like a gateway? Like an agent gateway?

**[19:46] Dharani**

Correct, correct, correct. So if you don't buy all the products, what would you do? If you're a platform engineer, you'll have to build one domain at a time and then you'll put an agent router. Right. Like from Galileo or one of the vendors. Right.

**[20:00] Raj Nagarajan**

Sorry. Do you guys see the one that John put.

**[20:03] Sachin Aggarwal**

Yeah, I saw the animation.

**[20:05] Dharani**

Yeah, yeah, that's. That's the. The iteration. We want to put it on the.

**[20:09] Sachin Aggarwal**

Yeah, but, you know, I think. I think because it shows integration. Jira. I would not even do Jira integration. I would just do. I would actually do. Just do intent. That, you know, in John's diagram, I think it was showing Jira, but it.

**[20:25] Raj Nagarajan**

Shows an intent router. Right. It shows the thought it was.

**[20:28] Sachin Aggarwal**

Oh, you mean it has.

**[20:30] Raj Nagarajan**

Can I. Can I just share or something?

**[20:32] Sachin Aggarwal**

Yeah, it had the intent itself. I remember that. Hey, build mine. Yeah, yeah.

**[20:36] Dharani**

The only trade off is it looks busy and. And it goes left to right. We. We wanted to flip it 90° and. And then put an intent at the top and still somehow package the. Yeah. Integrations. Right.

**[20:48] Raj Nagarajan**

I thought this was. Sorry, what do you. What did you mean? It does not.

**[20:53] Dharani**

So if. I don't know if you can flip this diagram 90°. Yeah, yeah. So if you flip it 90° and put a text box. Text box on top. That is what we were imagining. If you rotate it. If you rotate this diagram and have a text box at the top.

**[21:11] Sachin Aggarwal**

Yeah, but you know, the only thing. Only thing I was saying is that picture duty is going to. I would not say PagerDuty goes to Aiden for SREs. I would just say I would put their intent and then the.

**[21:25] Raj Nagarajan**

So you're talking about things like alerts and not. Not the names, but I think.

**[21:29] Sachin Aggarwal**

Yeah, I was saying. Not Data Dog, just saying, hey, show me my logs. Show me my cost. Show me my. Deploy my app or update my infra.

**[21:41] Raj Nagarajan**

Intent is here. Actually, the intent is here. Intent. Like if you look at it. There is intent unlock developer like it has got all this is here. That's kind of what you're saying, correct?

**[21:50] Sachin Aggarwal**

I did see that. Yeah. Yeah.

**[21:51] Raj Nagarajan**

Intent: restore service, intent: explain anomaly. So you have different intents coming. So you're saying instead of replacing the text you put the difference.

**[21:59] Sachin Aggarwal**

Yeah, I would say I would just put all these tools into a. Into at the bottom as horizontal integrations. Because we should not be saying is one to one mapping between pager duty and. Yes, yeah, sorry. Yeah. Then it doesn't look like a graph. It doesn't look like is. Then it looks like a tool extension. Right.

**[22:20] Raj Nagarajan**

This layout is fine.

**[22:22] Sachin Aggarwal**

Layout is fine. So I think I would put horizontally I will put all these tools and on the left I will put like all the intents possible intents. Right. Deploy my app. Deploy this thing. It's all my ticket. I'm not getting my password. But use something which is hard. Right. I mean which are not really simple and requires context across various sources. Right. So I would actually. I would spend time on those intents. Use some. Some prompt from our customer experiences where it gets hard. Right. We can even say migrate my. Migrate my cloud. Yeah. I would actually even do migrate my AWS or something.

**[22:59] Raj Nagarajan**

Let's not put cloud. Just put cloud one to cloud. Don't do AWS from.

**[23:03] Sachin Aggarwal**

Yeah, just say migrate. Why not? Oh you.

**[23:06] Raj Nagarajan**

Because you don't want somebody to migrate depending on who you are. Migrate. I don't know. We can. We can migrate.

**[23:15] Sachin Aggarwal**

Migrate my workload. No. Why not, man? Guys, don't overthink. It's fine. It's an example. Nobody. Nobody gets upset with that. I mean. Yeah.

**[23:23] Raj Nagarajan**

I mean deploy my workloads on multi cloud. Whatever. We can find out something. Come up with four or five like and then do.

**[23:29] Sachin Aggarwal**

And then do a context graph and then show a knowledge at the bottom. Put the hidden knowledge layer. Right. World layer and then put all the tooling there integrations. Right. And then. And then show the richness put backstage. Put like throw in everything guys like terraform backstage. Why limit to only slack and this. Right. I mean that is that. That's how I would approach. What I did not like is that it's tool. Tool to intent. Right. Tool to outcome. Which is not really.

**[23:59] Raj Nagarajan**

Yeah.

**[23:59] Sachin Aggarwal**

This looks like an MCP server extension.

**[24:02] Swaminathan R**

Right.

**[24:03] Dharani**

I think the reason why I mentioned 90 degree flip was typically you give the. The mental model is to give the intent through an IDE or a text box. Yeah. And you'll be typing the intent. Right.

**[24:17] Sachin Aggarwal**

I mean I would actually this Is where I think we just don't need too much overthinking because it can be a cursor chatbot showing on the left and then the inter router is. So maybe what is scrolling is we need to redesign it. But basically think of this as a chatbot. If I draw it.

**[24:40] Raj Nagarajan**

Yeah, yeah.

**[24:41] Sachin Aggarwal**

I think that's a view for a chatbot here. And then there's a. And then it comes. What is my intent? And then it goes through an intent router. And then it goes to different agents. Right. Depending on what it is. And in the bottom we show. Oh, what happened here? And at the bottom we show the one layer with all the integrations in all this tool that you have here. They all go here. Right. The pager duty and.

**[25:03] Dharani**

Okay.

**[25:04] Sachin Aggarwal**

I mean, I mean, just as an idea.

**[25:06] Dharani**

Yeah, yeah, yeah.

**[25:10] Sachin Aggarwal**

But. But then are we really looking for these six products now? What is it Aiden for SRE names need to change.

**[25:16] Dharani**

Yeah, I'll. I'll work with more products. And like, names are too creative. We don't. We don't have that many products yet.

**[25:23] Aaron Yang**

I also feel like this is really overshadowing. Like this is not really telling the user what this is. Yeah. Tell me what's in. But that doesn't tell me what it is I'm looking at.

**[25:33] Sachin Aggarwal**

Right? Yeah. It looks like we're selling. We are selling an Indian router. I would not actually. Not even put it on him.

**[25:39] Aaron Yang**

Yeah. I think if you go back to the mock that I had created. Right. It shows like there's the context graph, here's the memory, here's the workflows and skills. I think we need to have some version of that in our hero diagram.

**[25:53] Swaminathan R**

Okay, let's take a note of that as well. Yes.

**[25:56] Dharani**

Yeah, I think on that, like, what is wrong with.

**[26:00] Raj Nagarajan**

Sorry. I don't know. I'm kind of. What was wrong with the intent? I mean, what is wrong with this picture? Again, I can assume whatever it is. But what is wrong?

**[26:08] Aaron Yang**

It doesn't tell me what it is. Right. What is an intent router?

**[26:12] Dharani**

I think once you. Yeah. Once you add the cursor and the actual use case intention, it'll. It'll become much clearer. I think so.

**[26:20] Sachin Aggarwal**

Yeah, it can. The only problem is that when we. Then we're still sort of routing as an intel, so it looks like then it is more of a app router than which app it goes to. I think the whole idea of this intent agent router was that we basically do not even worry about the intent. Right. Sorry. Do not even Worry about the agent sorry app. So the intent router will just.

**[26:43] Raj Nagarajan**

It's a collection of agents app. It is not about apps. But we just show the.

**[26:48] Dharani**

Yeah, it's a balance such and on one end you want to show that we are solving a difficult problem with the router. On the other hand we have to tell them that hey, the experience is simplified within the cursor. So you'll have to balance both of the message.

**[27:04] Sachin Aggarwal**

Or if you go back there, if you go back to that slide, just wherever that was the diagram.

**[27:14] Raj Nagarajan**

Maybe we should show whatever we should.

**[27:16] Swaminathan R**

Sorry, Aaron, can you. Can you show.

**[27:19] Raj Nagarajan**

I mean what I think I have. No, no. I thought Aaron was showing something. We wanted to show something about. Which one are you talking about? I can share.

**[27:31] Aaron Yang**

Let me drop the link. Or if you're not sharing anymore, I guess I can.

**[27:35] Raj Nagarajan**

I'm not sure. I'm not sharing anymore.

**[27:37] Aaron Yang**

Okay. Right. I think this illustrate some version. I'm not saying put this in but like we can have an icon for like context versus memory versus all these Persona agents and governance, et cetera. You still show. I think it still implies that you know all of your integrations and we can talk about like intent somewhere in here on the left hand side. But I think this is a better. You're basically abstracting this entire middle box to just intent router. And it doesn't tell me what I'm looking at.

**[28:12] Raj Nagarajan**

I think. No, I think we're probably missing the point here. See, the intent router is still there. But then when you come to the agents, the layer where it lands is kind of where this particular diagram comes into picture because this is kind of where the Persona agents skills workflows. So trying to show either. Both of them have to be different. We had to find a place to show both. But these are not substituting one for the other. This doesn't tell me that this is an intent routing that. This doesn't tell me that. But also this is equally. This definitely valuable. But I don't know whether one image is going to show both.

**[29:00] Sachin Aggarwal**

So I think the idea is that. The idea is that. See. See what I think that the. The idea here would be that we do. Okay, so we. So let's say we do a prompt here like you know, so we show the intent. Right. That we talked about the. Then that intent goes into agentic OS or whatever that intern which has probably Indian router as well. We can decide what that thing is. Right. And then it shows the outcome. Right. It can. This is where we can talk about the use cases. Right. Okay. Infrastructure deployed policies applied, this applied. If it is remediation, RCA done, incident resolved, whatever. I don't know. I don't know what. Because I think by saying that we have four agents, then we're again going back into the the. Because if you show intent order and say, okay, this intent goes to SRE agent, then we may be still undervaluing the value of. Then we're still saying it's a four agent system. Right? In a way, yeah.

**[30:04] Dharani**

The agent OS is missing in that abstraction. The agentic OS piece. Right. It's missing in that router abstraction.

**[30:11] Aaron Yang**

Correct.

**[30:12] Dharani**

We can simplify the middle piece here, Aaron. Right to your point.

**[30:15] Sachin Aggarwal**

Yeah. The average is simplified. We don't need as many content.

**[30:18] Aaron Yang**

Yeah, that's okay. But my main point is for I think that just only having intent router.

**[30:28] Dharani**

Yeah, I agree.

**[30:30] Raj Nagarajan**

But Dharani's point then in that case, Dharani's design works better where if you have an intent text box in the top and then you have the routing that happens in the next layer. You can have agents which is standing on top of this agentic OS in the. Just assume there are three layers. Right. The top is the one that I think what Sachin is talking about, where you have a text box where the intent rotates between different intents and then you have the intent router that goes to whatever we have right now. And then you can put this entire middle box in the third layer with whatever you want to call whatever skills, workflows, everything out there. I think your design in that case top to bottom will work because you can preserve, you can keep more of these things in place. Do you want to does that can make sense?

**[31:28] Dharani**

It does. I think unless we build it and see it, it's hard to what you call prove the team. But maybe Swami will take an action item and flip the diagram to come up with that right.

**[31:37] Raj Nagarajan**

In the next meeting. Yeah, it's an easier one. I think Swami Aiden OS is a layer three, the SRE infrastructure, observability, DevOps. Right. They are all mentioned as apps. We have to somehow convert them into fleets of agents. So just imagine that goes on the top of the agentic OS for DevOps that box. So that is layer two. Then on the top layer you have the intent one that I think Sachin was talking about, that you have basically a text box. So that basically you have an intent router that routes to any of these agents which are stand which are above this box. And then of course right and left you can put integrations and whatnot. Right. I think take a, take a shot at it.

**[32:13] Sachin Aggarwal**

But I think technically doesn't really go to SRE agent. It goes into incident agent, goes to RCA agent. It goes to many agents. Right? Yeah. And that will be complex way to show guys, in my view. Right. So that's why we should just say an agent orchestrator in the box itself and just leave it at that and maybe show outcome on the. Right, Right. Like, okay, this is the intent. I think, I think, I don't think we need a separate diagram for that. I think it goes to the hero page. I still feel like we should really explain what ADF does. And if you really want other option is that we do. We put out a dashboard of, you know, the operator dashboard, like incidents tickets, you know, all those things. That's another option that we have. Like we just provide the. We just do dashboards of autonomy improvement and human in the loop. But I don't know, I think we may be a little bit too far ahead in talking about that because our product is not fully ready there. Right.

**[33:17] Dharani**

Yeah. The dashboard could be part of the animation, but once you show the use case with the information flow architecture here, it becomes really clear for domain experts, like platform engineers. Sachin. Yeah. We could flip. Right. I think Swami had that idea of creating an animation where.

**[33:36] Sachin Aggarwal**

So basically if you go to the website that this guy was preparing. So first thing, I think the, the. The homepage has to. So, so, so, so I think we have to talk Swami. I think what is missing is the use cases right away. Like why do I even need this? What do I care? Like I didn't see that till I'm not even seeing that in the homepage. Right. I mean that's my problem in the website. So automate ever factory. Keep a little text here, get a hero diagram. We need to see. Decide what it is. Maybe it's the one that we're discussing right now. And then put the customer logos. That's fine. And then this is where we can just say one graph or one platform. Multiple use cases. And then I think we do where you have cli, you know, so library of cli. You can say build here and then operate whatever that's as a session. But then when you, when you are clicking on this, then you basically see the screen for the build and then you have some use cases or the outcomes here. Right? Okay. Developer developer time reduced this, that reduced whatever. So either either a benefit or an outcome. Right. So decide on the same thing for the operate which Will be more of a DevOps user use cases. Right. And then this is where you can say this is Aiden for Infra or this infra product. And then this is SRE product. Right. When you're at the remediate. So then this is sre. So I think you just once you have that and then you can go down and do a lot more in my view.

**[35:12] Swaminathan R**

Got it.

**[35:13] Dharani**

I think on the use case side, Swami, I'll start an Excel sheet. We'll have to curate the list from the product team as well in terms of what's coming new in adf. Yeah. And then you can, you can feed it into that.

**[35:24] Sachin Aggarwal**

Yeah, but that, but that, but that was a bit of a life cycle current four product site.

**[35:28] Dharani**

Yeah, yeah. I'm not talking about the, the. The life cycle Valid Sachin. Right. Like life cycle is the second part. I'm still mentioning the first part. Right. Like the intent itself, the text.

**[35:38] Sachin Aggarwal**

Yeah, yeah. Come with like couple like seven, eight intents which are across the four products. Right. And then. Yeah, I think we need to do it really quick now. Right. We. So that we can start iterating really quick.

**[35:52] Swaminathan R**

Awesome.

**[35:53] Sachin Aggarwal**

Yeah, yeah. And I think this color that you're using, blue. We probably use purple there. Right. So that, you know, this purple only actually. Oh, it's purple.

**[36:02] Swaminathan R**

Okay. It's purple.

**[36:04] Sachin Aggarwal**

Okay. And my screen is showing more bluish than purple.

**[36:09] Swaminathan R**

It's probably because of the white background because you, you see if you see purple on a black, I see greytHR being purple.

**[36:17] Sachin Aggarwal**

But that's okay. Doesn't matter. It has to be just, you know, these are the colors that we use. Yeah.

**[36:22] Swaminathan R**

So if you.

**[36:22] Dharani**

I believe like stack gen. Yeah, Stack gen color is more like the greytHR color.

**[36:27] Sachin Aggarwal**

Yeah.

**[36:29] Dharani**

You can pick that color.

**[36:31] Swaminathan R**

Okay. Which one? The gray one.

**[36:34] Dharani**

The greytHR one of the customer logos. If you see them, they. They're using this pinkish.

**[36:39] Sachin Aggarwal**

Yeah. That is not. That is not our color. Value you have is not our color. I think what data check color is mostly our color.

**[36:46] Dharani**

Yeah. Yeah.

**[36:47] Sachin Aggarwal**

And actually I'm thinking do we get customer logos to be in their own colors or just do everything in a monochrome?

**[36:56] Aaron Yang**

I don't think it matters.

**[36:57] Swaminathan R**

I can, I mean, doesn't matter. I can make it black and white as well, but up to you.

**[37:06] Sachin Aggarwal**

Yeah. Okay.

**[37:08] Dharani**

That makes it cleaner. That makes it cleaner. Like the factory al.

**[37:11] Sachin Aggarwal**

Yeah, I would actually put. I would actually. Let's agree on the logos that we put that. I think the marketing should control the logos. Those. Right. So we should probably. I mean, till Siemens tell us tells us otherwise I would put Siemens Bangkok Columbia for sure. Autodesk, Nielsen and IQ Innovator in MobiF. Okay. Core centric is fine. So I would put that those 1012 logos which are a little bit more larger. One trust. Right. Then this Piramal. And course because Pyramid is Indian company. I mean we already got in movie there. So don't. Don't show like too many Indian logos is my point. Right. Yeah. So show One Trust. So I would say bank of Columbia One Trust. I mean for whatever it's worth, you can even show kind card. I mean it looks like some. Some sort of a progressive tech company like Instacart. Kind card. Yeah. Right.

**[38:10] Dharani**

Technology for good though.

**[38:11] Sachin Aggarwal**

Yeah, yeah. And then it's Instacart for kindness and yeah. And then use dissolve tech. You know use different logos. Don't use. I know we get very anchored on the logo that we've been using. Like Core Centric, greytHR. Nobody really. And Pyramid Codecentric I think is okay. It's U.S. company.

**[38:31] Dharani**

Yeah. I think their use case is financial. So. So it's a. It's a good one to keep searching. No, no, no.

**[38:38] Sachin Aggarwal**

Core centric is procurement.

**[38:42] Dharani**

Yeah. Still like the pay. I mean accounts payable, transaction processing. They do it. Right.

**[38:47] Sachin Aggarwal**

Okay. Anything else? So I think it needs a lot of thinking then it's. We're still very far.

**[38:54] Dharani**

Yeah, I. I agree. I agree.

**[38:57] Sachin Aggarwal**

And even the content, I'm not really sure this 1.7x Dora. Like what does it really mean? I don't know like you know this non issues.

**[39:04] Swaminathan R**

I actually did. I did not want to put any of this. I don't like putting these kind of. Which you cannot prove. Right. But John wanted to have these. He wanted. I mean he says it's. It's. It's usually helps but. Yeah, I. I don't mind removing.

**[39:24] Sachin Aggarwal**

No. I mean if you want to put. Yeah. Put something more tangible and meaningful and. And also Dora doesn't. What I don't know about Dora. Did the AI Health, productivity hurt stability. I don't know. See this content has to be good. I mean it. It not reading well in my view.

**[39:36] Dharani**

Right. Yeah. Yeah. So that I think if you go to the product pages Swami quickly pick one of the products. Yeah. I think the thinking is we'll again these numbers are not correct. In fact I had revised these numbers in our latest one one one pager. Like that needs to be reflected. We don't claim 10x anymore. It's 4x. So. So the idea is to put some Real numbers actually. And then like below that we will show the product and the workflow value proposition with images and animation. That was the thinking. That way people have a. Have a number. I mean have a. Some proof to hinge on like how that Forex is coming up. Right. Like so that was the thinking Such.

**[40:15] Sachin Aggarwal**

Intern becomes infrastructure inside policy. Actually what does this even mean?

**[40:23] Dharani**

We need to come back to the team. So today we wanted to make sure the flow. Flows. Yeah flow feedback. We get it and iterate on it.

**[40:30] Sachin Aggarwal**

Yeah. Because I think don't use AI generated content because then it's too confusing for humans to consume. Right. Like we don't even know what it is.

**[40:38] Dharani**

I haven't worked on the messaging yet. It's.

**[40:40] Sachin Aggarwal**

I think the platform should be in the. I think in the platform we should just have Aiden OS. Like how factory has platform agentic OS for DevOps. Yeah. And then here we talk about each component. Right. Memory. This thing should be again in an easy way to explain all you know these ways we can talk about intent router, you know, world model and everything. Right.

**[41:04] Dharani**

So yeah, yeah. This is another page where I need product support. The, the collateral for the agentic OS is very weak today. I think even whatever Swami gave for an RFP he had to review the source code and work with subit to get it. But I think for website quality like we probably need some more product support there. Just calling out in terms of what are the agent equals capabilities from a governance perspective and memory, what's the limitation and all of that. I'll start on Excel and we can collaborate more.

**[41:38] Raj Nagarajan**

What do you mean memory limit? We have some slides that were already given. Maybe you should.

**[41:46] Dharani**

No, I mean please share it again. But if you look at our documentation we don't, we don't write much about these things.

**[41:59] Raj Nagarajan**

I don't know how much we want to write about some of these things. Like I don't know about memory limit and I mean these things don't even. To me it's only capabilities. I don't know how much code you want to write about individual.

**[42:11] Dharani**

Yeah, yeah. I'm looking for the source of truth. Like ideally a PRD or a PRFAQ would do it but I know like we are kind of retrofitting any of these because things were built before. Yeah, so. So I'm myself catching up. Right. In terms of what's. What's the limitation and whatnot. I don't know. Basically the product spec for an agent request.

**[42:37] Raj Nagarajan**

Explained in the context of the individual products. Right. Sorry, what is Required and whatnot. So I'm a little bit. I don't want to describe something in a vacuum. Right. It is in the context of a.

**[42:50] Sachin Aggarwal**

Let's say you go to the website of factory. AI.

**[42:53] Swaminathan R**

Yeah.

**[42:54] Sachin Aggarwal**

Wait, yeah. Okay. Go to the platform, go to product and then. Platform. Yeah,. Software factory. So, so what? So you said build your software factory. Right? See, this is where we go build a sort of factory. I mean, look how cleanly this is being done, guys. Right. I mean we may not like few things here, but I think what I'm saying is that you know, and then you go down, you go to the second, then they have model routing across sdlc.

**[43:31] Dharani**

Yeah. See, server and deployment, that's a big deal actually. Right? Yeah. Can I, can we claim server and deployment? I. I do not know.

**[43:39] Sachin Aggarwal**

Actually border routing. Okay, we already have those things. Right. And then if you see, if you go to product again, go to missions. So this is what we're talking about. But, but we can present in a different way. We can actually bring all these things together. But, but, but have the whole page with multi agent orchestration. Go down, scroll down, go down.

**[44:10] Raj Nagarajan**

Some pages of factory are very busy, but some pages are.

**[44:13] Sachin Aggarwal**

I mean, I mean I'll give the concept, I think one platform every workflow. See, look, you know, that's what they tend to say each time like each page you come, you have a similar message. You go, go to product again, then go to. I think we were talking about the model routing agent readiness. You know, I saw that this is what the platform is. Right,. Right. I think this requires, this requires deep work, guys. I, I don't know. We. We need to be serious about this website, guys. I think I'm. I'm not very happy. Sort of a week's delay is actually pushed me back if you ask me, Dharani, at this point.

**[44:52] Swaminathan R**

Right.

**[44:52] Dharani**

So sorry, I didn't hear such a.

**[44:54] Sachin Aggarwal**

No, I, I think I, I don't think I have a clear understanding of whether we have a vision for a new website yet. I'm sorry to say that I, I'm not, I'm not. I think we need to have a complete rethinking of how our website should be laid out. Okay. Yeah. Get some inspiration from Harness and build it out right. I mean first get the content right and we start putting some graph. Because see, designers will take time. Right. And we may change things once the designers give us something different.

**[45:26] Raj Nagarajan**

Are we thinking about designers or what? I'm hearing something different. That's why I was very confused. Are we talking about Giving.

**[45:31] Dharani**

So, yeah, see, for me, like, the challenge is on the design side. Like Swami is. What do you call doing the heavy lifting there on the design side? The challenge I see is on the content.

**[45:44] Swaminathan R**

Content, yes. Because I don't.

**[45:47] Dharani**

Accurate source of truth content.

**[45:49] Swaminathan R**

Absolutely.

**[45:50] Dharani**

Because all of this, I, I mean, like, I do not want to cook up AI generated stuff. But, but, but if you look at the platform richness that this, this website is boasting.

**[45:59] Sachin Aggarwal**

Right. I wanted to understand what was your rational in. And all those things in the homepage. Like, I think, what, what are we trying to accomplish there?

**[46:06] Swaminathan R**

So I'll tell you how we went about the process, Sachin. Right. We had, I. We had. We went through a question Q and A session on Tuesday. Right. Me and Dharni sat down and, and I was asking. I said the, my first ask to the team was give me the content. Right. The content is. Some of it is, you know, there are scraped out documents. There is a PR FAQ that is there. There are a whole bunch of other, you know, disparate documents that are lying around the system through which I have fed that into the system and I have tried to gather context out of it. Now, frankly, that doesn't work for me. Okay. Whatever I've tried to create over here is based on the information that I have. Right. I even said, do you want me to go and look back the content that we already have in our existing website? Sure. That doesn't make sense anymore. We wanted to start off from scratch. So I can work on the design aspect, I can work on the structural aspect. But my view is until and unless engineering gives me a very clear roadmap on what are the features that they are going to release or what are the features and the roadmap that they have, I mean, for me, drafting the content is going to be very difficult. It's going to be difficult for both of us. In fact, both me and Dharni, to be fair.

**[47:21] Raj Nagarajan**

Right. I have a different roadmap is not sell with what products you have right now. What features do you have?

**[47:27] Swaminathan R**

No, no, no. The. Raj, the product is one thing, but what is the. Do you. Is there a documentation on what the product does today? Clear documentation on what the product does today? Do we have it?

**[47:37] Raj Nagarajan**

Yeah. The PRFAQ is the initial start.

**[47:42] Dharani**

Yeah. See, the PR FAQ is more on the ADF skin, but it doesn't cut into the agent os. I think that's the specific content challenge, Raj.

**[47:53] Raj Nagarajan**

Yeah. Okay. Because the product is still in the early stages, we don't Have.

**[47:57] Aaron Yang**

Okay.

**[47:58] Sachin Aggarwal**

No, no, no. I think, I think that's not a debate guys. We do need gu. Hold on. I think, I think this whole agentic OS was developed without the prfaq. Let's accept it, let's build one. It's not optional because I think that is where we are lacking. In fact, I'm now thinking my mind, I was deferred into some of the design decisions that we made. I think, I'm thinking that way was product in all of that. Right? I think and maybe because of all the changes that we made, it got lost. It's not optional. Guys, let's go back and build each functionality. What will module like? I think, I think right now engineers are building it in their mind the way they think they should be building. And I think that's not scalable. Right. We've already seen the challenges. So let's bring that as a product discipline there. In fact, I was talking to Aruna when he mentioned the exact same thing to me as well. That we lack a clarity on what is being worked upon. And all because I think engineers or engineers working on that based on their own thinking of what should be done. Right? So let's, let's bring what does it really have the features, right? Okay. It has memory, context, it has this. It has this. So like how Factory AI has laid out, I think that content definitely product needs to provide. But. But I think other. Please, you already have other things. Guys, I. I still don't know why we show cli. Like I'm still doubting in my mind that what is a thinking process.

**[49:17] Swaminathan R**

Because to me, I. I'll answer that.

**[49:19] Dharani**

Feedback. Yeah, feedback. I think, I think, I think on that one, like feedback taken. It's not the prim proposition. It probably should have gone how part.

**[49:29] Sachin Aggarwal**

How part and how it inserts is very late in the game, guys. Question is, what pain are you solving? I mean, let's get basic 101 website out, right? Like what pain are we solving? Who should care about us? Why they care about us, right? Like what, like think about what is the. Who's the website for, right? It is if it was PLG website, maybe it was one product plg and say how it works. Then we go, okay, download cli, download Slack integration, whatever. Right? I can understand the.

**[49:55] Dharani**

Yeah, yeah.

**[49:56] Swaminathan R**

So you see, so you see the, the CLI desktop Slack in Jira Sachin. Yeah, no, I, yeah, but, but exactly. I have essentially taken the inspiration from Factory.

**[50:09] Dharani**

That's a plg.

**[50:10] Sachin Aggarwal**

That's a plg. They're not Factory AI. They are. They are into the developer world. They sell it as a. The developer comes here, finds, finds his content and starts doing it. Right. So this is do not take use. You. We are selling to enterprise.

**[50:23] Swaminathan R**

Right.

**[50:24] Sachin Aggarwal**

So we should think of an enterprise sales motion and not. We can get inspiration from here. Right. But. But we cannot copy the way they are positioning because that's not how we are selling.

**[50:34] Dharani**

Okay. All right. So three. Three. Three big action items. I. I heard like one is like avoid what you call PLG insertions. Swami and I will make sure that. That, that will fix it. And then the second one was start writing the use cases for the intent. I'll start the Excel sheet. Of course, I need support from product on that, especially for the new ones. ADF stuff. That is the second action item. And the third one is for the platform itself. Aden, as a platform, everything around governance, memory, trust and safety and whatnot. Yeah, we definitely need a prfaq or PRD talking about the enterprise richness or enterprise readiness in the platform itself. Yeah, so that's something we need from product so that the hyperlink would look really ready for prime time. Yeah, those are the three big ones I've taken.

**[51:33] Aaron Yang**

In the meantime, if you look at the website I put out, it has a lot of the details of what I think are the major aspects we need to highlight. The context, graphics, the app stack, the governance gates, memory. So I do have a lot of that information under the platform page. So you can use that information there for now.

**[51:55] Dharani**

But is that the source of truth? Is that it?

**[51:57] Aaron Yang**

This is the source of truth, yes. Because in building this I had. I injected it with a lot of context from conversations, PRDs and also the GitHub repo. So everything here is. Is accurate.

**[52:16] Swaminathan R**

So let me show you something.

**[52:20] Dharani**

But before you move, right. Like I think. I think we still need a narrative. Aaron.

**[52:24] Aaron Yang**

Yeah, I'm not saying. Yeah, yeah. I'm just saying in the meantime, right. Until we can get you that you can. What I have on the website because.

**[52:33] Dharani**

Because the expectation is to highlight the value prop. Acute pain points to customers. You're not a feature factory. Right, like so. So a narrative is important from the product team. Yeah.

**[52:44] Aaron Yang**

Yeah.

**[52:46] Raj Nagarajan**

So d. We have. Okay. Anyway, maybe we'll share again. Slides. There are slides which talk about different policy control, everything we have slides. Maybe we should go back and especially at least for a website, it may not have all the. Maybe some of those things maybe to the level of details, PID for everything. We have to reverse engineer that. That is fine. But I think for your website I think we have definitely slides at the high level maybe.

**[53:14] Dharani**

No, that won't work Raj. Right. Because why isn't the. Yeah why. Why did you build that feature? Right. Like that is the most important part in explaining a story.

**[53:22] Swaminathan R**

Exactly. Not what is the feature.

**[53:26] Dharani**

So, so if you take a slide right. Like it's going to be all like what do you call maybe workflows. Right. Like but does it say like why is what you call governance important and where can things go wrong in production? Yeah. And why is context graph important between the modules? Right. So that's what we are looking for. Usually narratives expose those why and typically in prfaq or PRD formats. Right. It'll be really helpful. Again these are shortcuts if you can use slide.

**[53:56] Raj Nagarajan**

But again like an example separately of some website where you provide what is the content you provide and we'll see whether we have already content for that. Right. Give. Give an example. Right. We can all write a lot of documents. I'm just trying to understand what are we specific. I'm only talking about a website. I'm not saying for your product brief and everything else. That's a different level of details for a website. You only have a limited real estate. Right. And I think Aaron's point is valid. We can definitely look into more details but be very specific about what you want.

**[54:28] Sachin Aggarwal**

So guys let's do some more work. Let's meet on Monday. Let's see what let's use this weekend to iterate more because I think we have behind schedule right now and I think we looks like we don't even have understanding of what we want to do here. Guys, people are building the website. Especially you Dharani. I think you're struggling so maybe that you spend time with Raj and Naron or, or read whatever has been written on this website that. That Adam has prepared. Get some abstraction out of it and I think John probably has a lot more understanding as well. So maybe, maybe you guys need to really reconvene and. And get your act together here.

**[55:09] Dharani**

Okay.

**[55:10] Sachin Aggarwal**

Yeah. Okay. And then let's, let's. Let's see. Let's see a little bit more ready version on. On Monday. I think we're running short of time now so.

**[55:20] Aaron Yang**

So Dharani I think, I think do you want a document or I can just use this website as like I'll inject more content into this website and you can use this as like here's the base of information for me to draw from to make the actual website.

**[55:37] Dharani**

Ideally a document so that we can ask clarifying questions on the document. That, that would be ideal, Aaron. Yeah. Okay, if it's a website, like it's, I mean like if there are back and forth questions, right. If you don't understand, like how would you, how would you loop. Right. Like, and work closely. Yeah. Ideally a doc. Okay. Yeah. And of course we look into the website too. We're not going to be blocked and we're waiting for it. Yeah.

**[56:05] Sachin Aggarwal**

You know, all in the spirit right now. It's not, it's not telling me anything differentiated or anything like wow, right now, frankly. Right. So I mean just, so what is, what are, what are ADF supposed to do for us? I think ADF website is supposed to first tell us what is adf? Right? Why should people care about adf? What is ADF solve? Yeah, what does ads solve? Who does it solve for? Right? Who's it, who, who should care about idea? Like who is it built for? Right? Adf. Then of course, the very strong value prop, right? Like without adf, how your world looks like, right. Like if you didn't have adf. So basically you need to bring out all the salient features of ADF throughout the whole process. But of course not losing the sight on the four products that we have, but stitching them together in a way. Right? See that is where the marketing geniuses come together, right? I mean how do you package it? What's the messaging to the market? So it becomes simple to people to consume, right? And, and then talking about the, that why, like which means that you're going to then talk about context, common context. You're going to talk about, you know, multiple agent orchestrations. So basically the reason it's possible because of, because it's all powered by agentic OS for DevOps, right? So you have to say, hey, it's all powered by agentic OS for DevOps. And then someone clicks on that says, okay, what is it goes to platform. Then it shows all the 6, 7, 10 components of tokenomics, prompt injection, prompt routing, intent routing, your memory. Like it should not be that. Like I don't know what content you're looking for, guys. I mean that's how, if I were to reimagine, I think that's how I will reimagine that. Okay, so it looks pretty rich. You say, okay, there's a platform that basically powers all these things, right? And there's, there's a, there's a proper. Because that web page should be a completely different web page, the whole platform agentic os. Because otherwise the website will get crowded and we're not really selling agent eqs. It's only powered by that. Only the key features of the platform should be brought upfront on the homepage. Right. Either as a diagram, as this guy, what's his name, Aaron, is prepared like, but use icons instead of content.

**[58:21] Aaron Yang**

Yeah.

**[58:22] Sachin Aggarwal**

Which is memory and context. And this like, you know, use icons and then just text. This has to be crisp and clear. Right. And I think we use that, we use that. I think John created some, some PowerPoint deck. I use that somewhere. So there is a, there is already an injecting OS layer. Right? And then on top of it you show, okay. How the fact is working. See, if nothing else works, maybe you can still use a diagram that we use in adf. Right. You guys have seen the idea of a deck, right? That, that we had prepared? I mean, we're still working on it. Actually, I've not seen the newer, newer version. Which one are you talking about, Sachin? Let me see, let me see if I can share.

**[59:06] Raj Nagarajan**

The one that Sanjeev here.

**[59:09] Sachin Aggarwal**

No, Sanjeev, I don't know, it's not, I don't think it's fully complete yet.

**[59:13] Dharani**

But talking about the Banco deck, right? Like a Bank of Columbia deck.

**[59:17] Sachin Aggarwal**

Yeah, it has some slides there.

**[59:19] Dharani**

Yeah, yeah. Actually, I, I, I, I've reviewed it. I don't think Swami has reviewed it. I'll, I'll spend time with him on that.

**[59:25] Sachin Aggarwal**

Okay, so see, that's a good one. So this one, right? What is it, what is that? It's basically not, it's outcomes are not agents. Industry evolution. Moving from co pilot to agents to factory. What does the factory do? I think this, we changed this. I think in the newer version, we actually, actually, I don't know where that newer version is, but I think there's something more here. Better, better language. I think this is not a good language. Then this puzzle, right? How the factory, two, two factories come together. This is what I was talking about, right. I think John has already put some iconography here, but we can actually add something more into a context graph. You say world layer, whatever. Right? And then, and then this is your factory, right? Where all the origins work together. I mean, this need, if you can even improve the upper part of the workflow of. This is wrong in my view. It doesn't work this way though. We're sure. But if you can say, and then we don't have this many agents. Or maybe we do have these many agents. Right. And then, and then basically, what does this Is clear, right? I mean, what does factory do? You build it, right? You prove it's compliant, run it safely. What do humans. This you probably don't need in. Maybe you still need it in your homepage, but way down. What will be the human role and what will be factory role? This is the dashboard.

**[1:00:45] Raj Nagarajan**

You need to go to, the one with pf.

**[1:00:48] Sachin Aggarwal**

Yeah. Yeah. Okay.

**[1:00:53] Dharani**

I'll work with you on this content. I'll walk you through. Yeah,. Thanks a lot.

**[1:00:59] Raj Nagarajan**

See, don't get me wrong. I think my point is get the placeholders and then go with whatever content. I think there's a lot of content. And then we can always expand on content as opposed to asking everything, because there are many things that. That we have. I just want to focus on what you need for the website.

**[1:01:19] Swaminathan R**

The vision. Okay, I need to understand the vision. The thing is the truth of the practice. I don't understand the vision. I don't need so much, so I can still. Okay, fine, say that. Okay, fine. If you don't have the specific content, that's fine. But till date today, I don't know what the adf. What are the components, the underlying components of the adf? What are the use cases it solves, right? What is the pain point? Customer? What is the friction point? All of that. I need. I need. I. At least that much I need not if not all, at least I need to understand that.

**[1:01:49] Aaron Yang**

So did you. Did you share the ADF doc?

**[1:01:52] Sachin Aggarwal**

Okay, why don't. I think. I think you're in office. I mean, I'm happy to come. We can even meet today. I can. I can drive down, right? Let's meet today. Because, guys, time is running out. I can just tell you that right now. We don't have much time. If you don't even understand the vision. Let's sit down and explain the vision to you and, and go over it again. Right? I'm surprised that, you know, we're not aligned there yet. Guys, what is. Why don't you join this PR call? We're going to take them through the journey of our. Our adf. And. And Dharani, can you just invite Swami also? I think there's too many gaps.

**[1:02:31] Dharani**

Okay. I'm. I'm meeting Swami anyway, so I'll spend some time and different. I don't know if anyone else wants to join in person like we can. We can see. But. But let's jump to the other call, folks. Yeah. Yeah. All right, thanks.
