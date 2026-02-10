---
title: "How to Generate Japanese Subtitles with OpenAI Whisper"
author: Sean McBroom
upload: "2026-1-18"
update: "2026-2-9"
description: "An overview of the issues with Japanese subtitles, and how to generate them with Whisper."
---

Have you ever wanted Japanese subtitles for a movie you downloaded, yet couldn't find anything? This is one of the biggest issues for immersing yourself in Japanese media, even to this day.

Why does Japanese media have this problem anyway? Well, it mostly comes down to convenience and laws. Most Japanese media (e.g., anime, movies) assumes the viewer can understand Japanese, and there are no closed-captioning laws like in the U.S. Even in DVD/Bluray releases, distributors see no reason to add a Japanese subtitle track that most consumers will never use.

Netflix Japan always has Japanese subs if you want a simple solution, though that locks you out of a lot of great content.

But you aren't out of luck just yet! There are tons of releases available on sites like [Kitsunekko](https://kitsunekko.net/). Though, this introduces two new problems:  

1. As I mentioned before, sometimes there are *no* official subs - they're made by fans, so quality can be inconsistent.
2. Most sub release sites don't have an API or RSS feed for automatic downloads, so they're not convenient either.

![An example of a subtitle release site](/assets/static-images/kitsunekko_example.webp)  

So what is the solution? Well, there is no perfect solution, but the easiest way to complete your subtitle collection is to generate it with AI. Obviously, official subs will always be better than AI, but as I mentioned before, those are not always available. AI subs are comparable in quality to fansubs, though they might make mistakes with slang or muffled sounds.

The tool I found that works well for generating subs is [Whisper](https://github.com/openai/whisper) (by OpenAI). It's free to use, but there are a few hardware requirements.

Whisper is available in multiple model sizes, each trading speed for accuracy:

- **tiny / base** – Very fast, but noticeably less accurate (Requires ~1GB VRAM)
- **small** – A reasonable balance for weaker hardware (Requires ~2GB VRAM)
- **medium** – Good accuracy, slower processing (Requires ~5GB VRAM)
- **large** – Best accuracy, but very demanding on hardware (Requires ~10GB VRAM)

In terms of hardware, a 20- or 30-series NVIDIA GPU is ideal, though it *is* possible to run Whisper on a 10-series card. CPU-only processing also works, but I wouldn’t recommend it for anything beyond a single movie unless you’re very patient.

An episode of anime (~24 minutes) on my hardware (GTX 1070) takes about 3 minutes using the medium model size. For a library of eighty 24-episode seasons, that would be about 96 hours of processing time.

![Generating subtitles for a 24-minute anime episode on a GTX 1070.](/assets/static-images/whisper_screenshot.webp)  

After a few days of troubleshooting, I finally put together a reliable batch-edit script over FTP. I’m not sharing it publicly yet, though, because media libraries can be tricky. Just one small mistake can cause major problems.

Overall, I recommend Whisper to anyone who wants to complete their Japanese media library without spending days manually matching subtitles to video files, especially if they don’t require perfect accuracy.