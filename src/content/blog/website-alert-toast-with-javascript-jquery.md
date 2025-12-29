---
title: "Website Alert Toast with JavaScript/jQuery"
description: "There’s a really simple method to show toasts in Android and other mobile apps but you can do the same for your website beautifully."
date: 2022-11-12 17:00:00 +0530
tags: css, javascript
image: b5
---

There’s a really simple method to show toasts in Android and other mobile apps but you can do the same for your website beautifully.

From the below codes, you can either go with JavaScript or jQuery, as convenient.

## JavaScript

```javascript
function toast(msg,status){
    var body = document.body,
    snack = document.createElement('div');
    snack.innerHTML = '<div id="snackbar" class="snackbar bobx toast bg-'+status+'">'+msg+'</div>';
    body.insertBefore(snack,body.firstChild);
    setTimeout(function(){document.getElementById('snackbar').remove()},3000);
}
```

## Or, jQuery

```javascript
function toast(msg,status){
	$('body').prepend('<div class="snackbar bobx toast bg-'+status+'">'+msg+'</div>');
	setTimeout(function(){ $('.snackbar').remove(); }, 3000);
}
```

## CSS

```css
/* toast bar */
.snackbar {
    z-index: 1000001;
    display: block;
    position: fixed;
    background-color: #ffe0b2f7;
  	color: #fff;
    margin-left: 39%;
    width: 18%;
    text-align: center;
    padding: .5em 2%;
    color: #b48126;
    font-weight: 500;
    text-transform: lowercase;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
	top:1.5em;
    border-radius: 5px;
	overflow: hidden;
}

/* for background color; bg-0 = false/error;bg-1 = true/success */
.bg-0{
  background-color:#ef5350;
}
.bg-1{
    
  background-color:#4caf50;
}
```