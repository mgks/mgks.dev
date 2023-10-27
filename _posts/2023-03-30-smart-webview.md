---
layout: post
title:  "Introduction to Smart WebView"
author: ghazi
categories: [ projects ]
tags: [swv, android, ios, java, kotlin, webview]
image: assets/images/b6.jpg
description: "Smart WebView is a simple open source framework built to develop advanced hybrid webview applications with ease."
featured: true
hidden: false
toc: false
---

SWV is a framework built to develop advanced hybrid webview applications with ease.

A small build with features working out of the box: Live GPS Location, Notifications with FCM, AdMob, Chrome Tabs, Process Camera Input, Upload/Download Files, Custom Rating System, Multiple User Interfaces and more.

## GETTING STARTED

These instructions will help you get your Smart WebView copy up and running on your local machine for development and testing purposes.

### Prerequisites

Project was built on Android Studio and requires minimum Android API 21+ (5.0 Lollipop) SDK to test run.

### Setup

+ Download repo or clone the project git clone https://github.com/mgks/Android-SmartWebView
+ Download *google-services.json* file from Firebase ([instructions](https://github.com/mgks/Android-SmartWebView#firebase-messaging))
+ Load project in Android Studio `File > Open > Browse to Project` and Select
+ Let Android Studio process the project and download support libraries and dependencies
+ Just to make sure, try cleaning and rebuilding project before run `Build > Clean Project` then `Build > Rebuild Project`
+ Got any error? You better fasten you seatbelt. It's going be a bumpy night

## CONFIGURATIONS

### Device Permissions

You can remove any of the following requests if you do not need them, you can also disable features with permission variables. For default setup, following permissions are required.

```bash
INTERNET
ACCESS_NETWORK_STATE
ACCESS_WIFI_STATE
WRITE_EXTERNAL_STORAGE
READ_EXTERNAL_STORAGE
CAMERA
ACCESS_FINE_LOCATION
VIBRATE
```

```java
c2dm.permission.RECEIVE
```

```java
hardware.location.gps
hardware.touchscreen
```

`INTERNET` permission is required for any webview to work.

`WRITE_EXTERNAL_STORAGE` is required for camera file processing: if you have `ASWP_FUPLOAD` and `ASWP_CAMUPLOAD` enabled to upload image/video files.

### Config Variables

Complete webpage URL or load local file as *file:///android_res/dir/file.html*

```java
ASWV_URL   = "https://github.com/mgks"   // domain or directory or address to any root file
```

### Permission Variables

```java
ASWP_JSCRIPT     = true     // enable JavaScript for webview
ASWP_FUPLOAD     = true     // upload files from local device
ASWP_MULFILE     = true     // upload multiple files
ASWP_CAMUPLOAD   = true     // enable camera file upload
ASWP_ONLYCAM     = false    // incase you want only camera for input files

ASWP_LOCATION    = true     // track GPS locations

ASWP_RATINGS     = true     // show ratings dialog; auto configured, edit method get_rating() for customizations
ASWP_PULLFRESH   = true     // pull to refresh feature
ASWP_PBAR        = true     // show progress bar
ASWP_ZOOM        = false    // zoom control for webpages
ASWP_SFORM       = false    // save form data and auto-fill information
ASWP_OFFLINE     = false    // whether the loading webpages are offline or online
ASWP_EXTURL      = true     // open external url with default browser instead of app webview

ASWP_TAB         = true;    // instead of default browser, open external URLs in chrome tab
ASWP_ADMOB       = false;   // enabled Google AdMob
```

### Security Variables

```java
ASWP_CERT_VERIFICATION   = true   // verify whether HTTPS port needs certificate verification
```

### Other Variables
```java
ASWV_LAYOUT      = 0;   // default=0; for clear fullscreen layout and 1 to add drawer and navigation bar

// custom settings if layout `1` with search bar is set.
ASWV_SEARCH      = "https://www.google.com/search?q=";   // search query will start by the end of the present string

ASWV_SHARE_URL   = ASWV_URL+"?share=";   // URL where you process external content shared with the app
ASWV_EXC_LIST    = "";                   // domains allowed to be opened inside webview, separate domains with a comma (,)

ASWV_ADMOB       = "ca-app-pub-9276682923792397~7957851075";   // your unique publishers ID; this one is temporary

ASWV_F_TYPE      = "*/*"   // use `image/*` for image files only; check file type references for custom file type

POSTFIX_USER_AGENT      = true;     // set to true to append USER_AGENT_POSTFIX to user agent
OVERRIDE_USER_AGENT     = false;    // set to true to use USER_AGENT instead of default one
USER_AGENT_POSTFIX      = "SWVAndroid";    // useful for identifying traffic, e.g. in Google Analytics
CUSTOM_USER_AGENT       = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36";    // custom user-agent
```

## FEATURES

### GPS Location

If `ASWP_LOCATION = true` then the app will start requesting GPS locations of the device on regular basis and all of the recorded data will be sent to the webpage in form of cookies, with updated live GPS locations.

```java
COOKIE "lat" for latitude
COOKIE "long" for longitude
```

### Camera Input

You can either select to get input from both file manager and camera or can just choose camera to get image/video input. To get video input, add file type condition in your html input `video/*` and `image/*` for camera photos. By default `ASWV_F_TYPE` is set to `*/*` and suggested not to change instead file type should be provided on web pages end.

### Firebase Messaging

You need a firebase account to get started then download google-services.json and put it in the app level directory. Then you can create a POST request as below. See detailed steps to download firebase config file.

*To URL: https://fcm.googleapis.com/fcm/send*

**Header:**
```javascript
content-type:application/json
authorization:key=____server_key_here___ (Firebase > Settings > Cloud Messaging)
```

**Data:**
```javascript
{ "notification": {
    "title": "___title_string___",
    "text": "___text_string___",
     "click_action": "Open_URI"
  },
    "data": {
    "uri": "___the_URL_where_you_want_users_to_send__"
    },
  "to" : "___user_token___"
}
```

You can get *___user_token___* from COOKIE `fcm_token`.

### Google AdMob

Enable `ASWP_ADMOB` to show ads, and get your App ID from AdMob to replace `ASWV_ADMOB`.

### Chrome Tab

With `ASWP_TAB` you handle external links to be opened in the chrome tab or external browser. More chrome tab customizations are available inside MainActivity.

### Content Sharing

User can share external content with your app like text, link or image. You can received data on your end by proving `ASWV_SHARE_URL`, an endpoint that can handle such requests. You can disable it by removing `.ShareActivity` from Manifest.

### User Interfaces

You can switch between clean and native interface with `ASWV_LAYOUT` where 0 represents full screen interface and 1 as a complete drawer layout with search option and navigation bar.

To customize drawer bar, you can look into `onNavigationItemSelected()` method in `MainActivity` and *activity_main_drawer.xml* for menu items.

### Rating System

Rating dialogue is enabled by default and can be handled by `ASWP_RATINGS`.

```java
ASWR_DAYS            = 3;           // after how many days of usage would you like to show the dialog
ASWR_TIMES           = 10;          // overall request launch times being ignored
ASWR_INTERVAL        = 2;           // reminding users to rate after days interval
```