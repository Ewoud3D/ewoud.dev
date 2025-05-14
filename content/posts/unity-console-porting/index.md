---
title: "Unity Porting"
summary: "Are you developing a game in Unity? In this article you read what measures you can take in advance, so porting to console will be a cinch!"
date: 2025-05-02
params:
  subtitle: "Preparing Your Game for Console"
---
Are you developing a game in Unity? In this article you read what measures you can take in advance, so porting to console will be a cinch!  
This article is written to advice developers how they can best optimize their Unity game before the process of porting begins, it does not describe the installation, and use, of platform specific SDKs.

## Which Platforms Should We Launch On?
In this article, I want to focus on the three largest console platforms of the moment: the (original) Nintendo Switch, PlayStation 4/5, & Xbox One/Series. Of course, I'll talk about how to prepare your game for porting to these platforms, but I also would like to shed some light on why you'd might want to prioritize one platform, or avoid the other.  
Does your game play great with a controller? For example if your game features many touchscreen based puzzles, it might be difficult to port your game to PlayStation or Xbox, without losing its essance.  
I recommend taking a look at what features each platform has, if it suits your game, and what similar games are doing. If possible, I highly recommend playing the games—similar to yours—on the different consoles, this way you can learn what it is you are looking for. If you cannot find a competitor's game on a specific platform, there might be a good reason behind that.

## Which Version of Unity Should We Use?
It is important that your project uses a recent version of Unity that is supported by all the platforms you want to launch on. A two year old LTS release of Unity is often still supported by most console SDKs.  
When you don't have access to the developer networks of your target consoles, I would recommend choosing one of the most recent LTS releases of Unity. LTS stands for Long Term Support, meaning that this release will be supported for a longer time, usually around 2-3 years.

## Middleware & Packages
It is important to keep track of what middleware and packages you are using, for example to use FMOD in your a console build you will need to download the supported console packages directly from FMOD into your project.  
Some packages from the Asset Store were not designed to be used on console, for example Unity IAP (In App Purchases) will cause a crash on console, as it was only designed for mobile.  

Some shader code does not directly work well on console, you cannot 100% prevent this and each case will be different. If you are using a package with custom shaders, it's sometimes best to contact the developer of the package for additional support.

## Input
After you considered on which console(s) to launch, a lot of time can be saved by adjusting your game in advance to support the chosen method of input.  
For example, if you plan to release your game on Xbox or PlayStation you can already go ahead, and add controller support yourself (this includes Switch too if you just want the player to use standard gamepad controls).  

I highly recommend using the new Input System (Rewired works too), this assures that your controls will work pretty much directly when building the game for console. Just make sure you use generic paths (i.e. *Button South [Gamepad]* instead of *Cross [PlayStation Controller]*).  
Touch input on Unity usually works directly on Nintendo Switch, if you are considering porting a mobile game to Switch—and exclusively want to use touch input—then you don't have to prepare much in advance.

## Save Data
Assuming your game uses Application.persistentDataPath to store save data, you should consider that each console has it's own SDK that we have to use for saving, instead of persistentDataPath. Additionally, when you even you try to access Application.persistentDataPath on console, the application usually crashes immediately, I recommend putting all your references to persistentDataPath between [Platform Defines](https://docs.unity3d.com/2023.2/Documentation/Manual/PlatformDependentCompilation.html), and making sure you have the option to create builds that don't depend save data.

Most consoles can write and read data synchronously, but some don't, it is recommended to prepare your save data to be written and read asynchronous.

## Addressables / Asset Bundles
Some consoles have a patch file size limit. When you create a patch for your game, Unity will compare the new build with the original—first submitted—build. This binary comparison creates a patch that only contains the differences between the versions. It is this patch that has a guideline on filesize limit on some platforms.

Unity creates builds that often "randomizes" the binary data used in the build, meaning there will be a larger difference found when generating builds, and the patch becomes larger.  
To combat this, developers use Asset Bundles, or Addressables (Addressables are a layer on top of Asset Bundles and are usually more convienent). Asset Bundles structure the data better, so that there will be less differences found during the binary comparison, resulting in smaller patches.  

This is how you can prepare your game (with Addressables):
- Make the scenes in your project addressable, and make sure your scene-loading system is updated to use Addressable loading.
- Group assets together inside Asset Groups, and use a logical system (e.g. If you have a Japanese translation, group the font and translation together).
- Try to predict which assets are most likely to receive patches, you can put those assets in its own group.

## Performance
Performance is one of the larger struggles of porting your game to console, specific assets (or complete levels!) need to be completely remade to match the power of the machine.  
In this article I won't go into specific optimizations, I think there are a lot of resources online on how to optimize your game (most notably to keep the batch count low!).
However, I would like to give you advice on how to benchmark your game when you do not have access to development hardware.

To put it quite plainly:
- If your game runs great on a midrange gaming PC, it will probably run great on Xbox and PlayStation.
- If your game runs great on an older Android phone or tablet, it will probably run great on the (original) Nintendo Switch.

Here are a few additional things to keep in mind:
- All current consoles only support 16:9 output, so you only have to think about desiging, and testing, on this aspect ratio.
- You usually want to focus on 60 fps as your target framerate. However, 30 fps is also an allowed framerate, if it's too difficult to adjust performance—and the gameplay allows a lower fps—you could target 30 fps.

## Localization & Terminology
Each platform has it's own terminology (Joy-Con, DualShock, Rumble, etc), and you are not allowed to use one platforms terms on the other! Terminology is an element that very often gets flagged during platform QA. Even if it's only one wrong word, you will need to build and resubmit your game again for QA.

All platforms have their own terminology for each langauge that your game supports. If your game supports a bunch of languages, it's important to work with a localization company that understands this, and is up to date with the latest terminology.