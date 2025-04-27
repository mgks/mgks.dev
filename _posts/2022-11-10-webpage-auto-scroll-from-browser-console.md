---
layout: post
title: Webpage Auto Scroll from Browser Console
author: ghazi
tags: console, log, javascript
image: assets/images/b4.jpg
description: Automate scroll through huge web pages with a small JavaScript snippet from your browser console, quick and easy.
featured: false
hidden: false
toc: false
---

Automate scroll through huge web pages with a small JavaScript snippet from your browser console.

I hope it’s helpful for someone.
Right click > `Inspect > Console Tab > Paste` the code

```javascript
(function() {
    var intervalObj = null;
    var retry = 0;
    var clickHandler = function() { 
        console.log("Clicked; stopping autoscroll");
        clearInterval(intervalObj);
        document.body.removeEventListener("click", clickHandler);
    }
    function scrollDown() { 
        var scrollHeight = document.body.scrollHeight,
            scrollTop = document.body.scrollTop,
            innerHeight = window.innerHeight,
            difference = (scrollHeight - scrollTop) - innerHeight

        if (difference > 0) { 
            window.scrollBy(0, difference);
            if (retry > 0) { 
                retry = 0;
            }
            console.log("scrolling down more");
        } else {
            if (retry >= 3) {
                console.log("reached bottom of page; stopping");
                clearInterval(intervalObj);
                document.body.removeEventListener("click", clickHandler);
            } else {
                console.log("[apparenty] hit bottom of page; retrying: " + (retry + 1));
                retry++;
            }
        }
    }

    document.body.addEventListener("click", clickHandler);
    intervalObj = setInterval(scrollDown, 1000);
})()
```