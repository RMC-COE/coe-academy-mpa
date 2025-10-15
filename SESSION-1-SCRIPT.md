# Session 1 Video Script: Introduction to Power Automate
**Total Duration:** ~12-15 minutes (condensed from 70-min workshop)
**Style:** Informal, conversational, tech-educator tone
**Target:** Finance Operations professionals new to automation

---

## 🎬 INTRO / COVER SLIDE
**[Duration: 0:00 - 0:30]**

**[ON SCREEN: Cover slide with Power Automate logo, CoE branding]**

**NARRATOR:**
> "Hey everyone! Welcome to the CoE Academy's Power Automate workshop. I'm [Your Name] from the Center of Excellence, and today we're diving into something that's going to change how you work.
>
> If you've ever found yourself copying data between spreadsheets, sending the same emails over and over, or waiting days for approvals... this session is for you.
>
> We're not gonna do boring theory slides. Instead, I'll show you real automation, built by finance teams, for finance teams. Let's jump in."

**[PRODUCTION NOTE: Quick zoom transition to next slide]**

---

## 📋 SECTION 1: THE DAILY REALITY
**[Duration: 0:30 - 3:00]**

**[ON SCREEN: Show the scale numbers animating in]**

**NARRATOR:**
> "So, let's talk about the elephant in the room. Amadeus processes **470 million bookings** a year. That's **2.2 billion passengers**. We're talking massive scale.
>
> **[PAUSE, let numbers sink in]**
>
> But here's the thing... behind all this automation for our customers, *we* still do a ton of manual work internally.
>
> Look at this: **1.6 million manual billing items** every year. Finance teams handling **2,700+ manual processes** that could be automated.
>
> **[ON SCREEN: Show quote from COE-85 survey]**
>
> One of our teams literally said: *'Information is not structured or standardized... so we do it manually.'*
>
> **[PAUSE]**
>
> And that's the problem we're solving today. Because here's the crazy part... the tools to fix this? They're already in your Microsoft 365 account. You just didn't know they were there."

**[PRODUCTION NOTE: Quick cut to momentum section]**

---

## 🚀 SECTION 2: AUTOMATION MOMENTUM
**[Duration: 3:00 - 4:30]**

**[ON SCREEN: Show existing automation examples]**

**NARRATOR:**
> "Before we build anything new, I want to show you what's already working.
>
> **[SHOW: Manual Billing 4-eyes approval flow]**
>
> This flow? It's handling approvals automatically. No more email chains. No more 'Did you approve this yet?' messages.
>
> **[SHOW: Month-End App]**
>
> This one automates month-end close processes. What used to take days now happens overnight.
>
> **[SHOW: ARPA pipeline mention]**
>
> And ARPA? Our internal automation team? They've got a 6-month backlog. That's not because they're slow... it's because *everyone* wants automation.
>
> **[PAUSE]**
>
> So here's the deal: Power Automate lets YOU become the automation expert. No waiting for IT. No backlog. You identify the problem, you build the solution."

**[PRODUCTION NOTE: Transition with "So what IS Power Automate?" text overlay]**

---

## 🔧 SECTION 3: POWER AUTOMATE INTRODUCTION
**[Duration: 4:30 - 8:00]**

**[ON SCREEN: Show Power Automate logo, then interface]**

**NARRATOR:**
> "Alright, so what is Power Automate?
>
> Think of it as IFTTT or Zapier... but specifically designed for Microsoft 365 and enterprise systems. It's literally just: **IF this happens, THEN do that.**
>
> **[ON SCREEN: Show simple trigger → action diagram]**
>
> You've got **triggers** - that's the 'when this happens' part. Like:
> - When a new email arrives
> - When someone fills out a form
> - When a file is added to SharePoint
>
> And then you've got **actions** - that's the 'do this' part:
> - Send an approval request
> - Update a spreadsheet
> - Post in Teams
>
> **[SHOW: Live demo or recording of dragging blocks in Power Automate]**
>
> And the best part? It's all drag-and-drop. No coding required. You just connect blocks like LEGO.
>
> **[ON SCREEN: Show connector ecosystem]**
>
> Right now, there are over **1,000 connectors**. That means Power Automate can talk to:
> - SharePoint and Excel (obviously)
> - Outlook and Teams
> - SAP and Salesforce
> - Even custom APIs your team built
>
> It's basically the glue that connects all your systems together."

**[PRODUCTION NOTE: Quick transition to practical example]**

---

## 🏗️ SECTION 4: ANATOMY OF A FLOW (Real Example)
**[Duration: 8:00 - 11:00]**

**[ON SCREEN: Show real flow blueprint - simplified for clarity]**

**NARRATOR:**
> "Let me show you a real example. This is a simplified version of our AUTTP approval flow.
>
> **[STEP 1 - ON SCREEN: Highlight trigger]**
>
> Step 1: **Trigger.** When someone submits a request in SharePoint, the flow starts automatically.
>
> **[STEP 2 - ON SCREEN: Show condition check]**
>
> Step 2: **Condition check.** Is the amount over $5,000?
> - If YES → send it for manager approval
> - If NO → auto-approve it
>
> **[STEP 3 - ON SCREEN: Show approval action]**
>
> Step 3: **Send approval request.** The manager gets an email with an 'Approve' or 'Reject' button. No need to log in anywhere.
>
> **[STEP 4 - ON SCREEN: Show branching logic]**
>
> Step 4: **Handle the response.**
> - Approved? → Update SharePoint status to 'Approved', send confirmation email
> - Rejected? → Update to 'Rejected', notify the requester
>
> **[PAUSE]**
>
> That entire process? It used to take 2-3 days. Now it happens in minutes.
>
> And here's the kicker: this flow was built by a finance analyst. Not a developer. Not IT. A regular user who spent 30 minutes learning Power Automate."

**[PRODUCTION NOTE: Add text overlay with time saved: "2-3 days → 10 minutes"]**

---

## ⚡ SECTION 5: ADVANCED FEATURES & BEST PRACTICES
**[Duration: 11:00 - 13:30]**

**[ON SCREEN: Show Copilot interface]**

**NARRATOR:**
> "Now, if you're thinking 'This still sounds complicated,' I've got good news.
>
> **[SHOW: Copilot demo or screenshot]**
>
> Power Automate now has **Copilot built in**. You literally just describe what you want in plain English:
>
> *'When someone fills out my expense form, check if it's over $500, and if it is, send it to my manager for approval.'*
>
> **[ON SCREEN: Show Copilot generating the flow]**
>
> And Copilot builds the entire flow for you. You just review it, test it, and click 'Go.'
>
> **[TRANSITION]**
>
> But here's the important part - let me give you some quick **best practices**:
>
> **[ON SCREEN: Show list animating in]**
>
> 1. **Name your flows clearly** - 'Expense Approval' is way better than 'My Flow 47'
> 2. **Use error handling** - Add a 'Send me an email if this breaks' action
> 3. **Test with real data** - Don't go live until you've tested it at least 5 times
> 4. **Document what you built** - Future you will thank present you
>
> **[ON SCREEN: Show run history interface]**
>
> And if something goes wrong? Power Automate shows you exactly where the flow failed and why. Click into the run history, see what data was passed, and fix it.
>
> **[PAUSE]**
>
> One more thing: **Power Automate Desktop**. If you need to automate tasks on your local computer - like copying data from one app to another - you can record your mouse clicks and keyboard strokes, and Power Automate will replay them automatically. It's like a macro on steroids."

---

## 🎯 CLOSING / CALL TO ACTION
**[Duration: 13:30 - 15:00]**

**[ON SCREEN: Show summary slide with key takeaways]**

**NARRATOR:**
> "Alright, let's wrap this up.
>
> Here's what you need to remember:
>
> **[ON SCREEN: Bullet points appear one by one]**
>
> ✅ Power Automate is **already included** in your Microsoft 365 license
> ✅ You don't need to code - it's drag-and-drop
> ✅ You can automate approvals, emails, data processing, and way more
> ✅ Copilot can build flows for you if you describe what you want
> ✅ Real teams at Amadeus are already using this to save hours every week
>
> **[PAUSE]**
>
> So what's next?
>
> **[ON SCREEN: Show links/CTAs]**
>
> 1. **Session 2** is where we build a real approval workflow together, step by step. Link in the description.
> 2. Check out the **full documentation** and troubleshooting guide on our CoE site.
> 3. Got questions? Drop them in the comments or reach out to **rmc.coe@amadeus.com**
>
> **[FINAL SCREEN: Thank you slide with resources]**
>
> That's it! Thanks for watching. Go automate something today, and I'll see you in Session 2 where we actually build this stuff hands-on. Peace! ✌️"

**[END: Fade to black with links overlay for 3 seconds]**

---

## 📝 PRODUCTION NOTES

### Music Suggestions:
- Intro: Upbeat, modern tech music (check Epidemic Sound or Artlist)
- Background: Subtle lo-fi beats at 20% volume during explanations
- Transitions: Whoosh sounds for slide changes

### Editing Style:
- **Jump cuts:** Cut out pauses and "umms" for pacing
- **B-roll:** Show actual Power Automate interface over explanations
- **Text overlays:** Key numbers and quotes (keep on screen for 3-5 seconds)
- **Zoom ins:** On important UI elements when showing interface
- **Speed up:** Screen recording of building flows (1.5x speed)

### Key Visuals to Prepare:
- [ ] Power Automate interface recordings
- [ ] Real flow examples (anonymize if needed)
- [ ] Copilot demo or screenshots
- [ ] Run history showing success/failure
- [ ] Connector marketplace browse
- [ ] Before/after time comparison graphics

### Screen Recording Tips:
- Use 1920x1080 resolution minimum
- Zoom browser to 125% for better visibility
- Use a clean browser profile (no personal bookmarks showing)
- Highlight cursor for easier tracking

---

## 🎙️ DELIVERY TIPS FOR NARRATOR

1. **Pace:** Speak slightly faster than normal conversation (like a tech YouTuber)
2. **Energy:** Keep energy high, especially in intro and closing
3. **Pauses:** Use strategic pauses before big numbers or key points
4. **Emphasis:** Stress words like "automatic," "minutes," "no coding"
5. **Casual tone:** Use contractions ("you're," "we're," "it's")
6. **Audience awareness:** Say "you" not "users" or "attendees"

---

## 📊 VIDEO METADATA (for Upload)

**Title:**
"Power Automate for Finance Teams: Automate Approvals, Emails & Workflows (No Coding Required)"

**Description:**
```
Learn how to automate your daily work with Microsoft Power Automate. This tutorial covers:
- What Power Automate is and why it matters
- Real examples from finance operations
- How to build approval workflows without coding
- Copilot AI assistance for building flows
- Best practices and troubleshooting

Perfect for finance professionals, business analysts, and anyone tired of repetitive tasks.

🔗 Resources:
- Session 2 (Hands-on Workshop): [LINK]
- Documentation: [LINK]
- Troubleshooting Guide: [LINK]

⏱️ Timestamps:
0:00 - Intro
0:30 - The Problem: Manual Work at Scale
3:00 - Automation Success Stories
4:30 - What is Power Automate?
8:00 - Real Flow Example
11:00 - Advanced Features & Copilot
13:30 - Key Takeaways & Next Steps

📧 Contact: rmc.coe@amadeus.com
```

**Tags:**
power automate, microsoft 365, workflow automation, low code, no code, finance automation, process automation, power platform, copilot, tutorial

---

**Total Word Count:** ~1,800 words
**Estimated Speaking Time:** 12-14 minutes (at tech YouTuber pace)
**Production Time Estimate:** 6-8 hours for full edit with graphics
