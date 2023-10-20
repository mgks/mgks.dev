---
layout: post
title:  "Setting Up IIS, PHP, and MySQL on AWS EC2 Windows Server"
author: ghazi
categories: [ tutorials ]
tags: [aws, iis, php, mysql, openssl]
image: assets/images/b2.jpg
description: "We’re going to set up a Windows server on IIS with PHP, MySQL, and OpenSSL, enabling you to configure and host public websites."
featured: false
hidden: false
---

Today we’re going to set up a Windows server on IIS with PHP, MySQL, and OpenSSL, enabling you to configure and host public websites with an encrypted connection. I’ve divided it all into 5 simple steps after which you can start working on it easily and instantly.

*Objective: Launching a Windows Server on AWS, Enabling and Configuring IIS for Public Website Hosting with PHP and MySQL.*

+ Launching Windows Instance

+ Enabling IIS Server and Required Features

+ Installing Additional Tools Required

+ Testing PHP and MySQL Connection

+ Bonus: Setting up OpenSSL for Websites

## 1. LAUNCHING WINDOWS INSTANCE

Log into your AWS

There are lots of powerful things you can do with the Markdown editor. If you've gotten pretty comfortable with writing in Markdown, then you may enjoy some more advanced tips about the types of things you can do with Markdown!

As with the last post about the editor, you'll want to be actually editing this post as you read it so that you can see all the Markdown code we're using.

![1]({{ site.baseurl }}/assets/images/b2-1.jpg)

## 2. ENABLING THE IIS SERVER AND REQUIRED FEATURES

Open `Server Manager > Add Roles and Feature`
From `Add Roles and Features Wizard > Features > Web Server IIS` (ref. to the screen below)

![2]({{ site.baseurl }}/assets/images/b2-2.jpg)

Either download tools on your PC and move them to your server or on your server open

```javascript
Internet Explorer > Internet Options
Security Tab > Internet > Custom level
Security Settings - Internet Zone (window) >
Downloads > File download > Enable
Miscellaneous > Access data sources across domains > Enable
Scripting > Active Scripting > Enable
```

Now, from `Server Manager > Tools` open `Internet Information Services (IIS) Manager`
IIS Manager’s Action Sidebar > Click on Web Platform Components Link and Install the extension.

## 3. INSTALLING ADDITIONAL TOOLS REQUIRED

Download and install the latest PHP Manager for IIS from GitHub.
Restart IIS Manager.
Select Server from Connections > Featured View > Open Web Platform Installer
Search for “PHP” and add the latest variant in the installation queue, from Items to be installed, remove PHP Manager (as we’ve installed it separately).
Search for “URL rewrite”, add it, and start the installation.

## 4. TESTING PHP AND MYSQL CONNECTION

Open `PHP Manager > View recommendations` and update the requested values and click OK.
Now click on Check phpinfo() with the default Website, if everything goes well, you’ll see this output.

![3]({{ site.baseurl }}/assets/images/b2-3.jpg)

Open location *"C:\inetpub\wwwroot\"* and place your PHP website/script in the directory. Or you can change the Physical path from `IIS Manager > Sites > Your Website > Actions > Basic Settings > Physical path`.

Now let’s download the MySQL installer for Windows and select what features/products you want to install, we need MySQL Server only. If you want to visualize your database, select Workbench also. Once installation and setup (credentials form) are complete, we’re ready to test the connection.

Create a PHP test script with the following code:

```php
// credentials
$server = "localhost";
$user = "username";
$pass = "password";

// create connection
$conn = new mysqli($server, $user, $pass);

// check connection
if ($conn->connect_error) {
   die("connection failed: " . $conn->connect_error);
}
echo "connected successfully";
```

If you see a successful connection message, we’re good to go to launch our localhost projects.

## 5. BONUS: SETTING UP OPENSSL FOR WEBSITES

OpenSSL is a great way to encrypt your website and secure end-to-end data for your users. OpenSSL supports a number of different cryptographic algorithms: Ciphers. AES, Blowfish, Camellia, Chacha20, Poly1305, SEED, CAST-128, DES, IDEA, RC2, RC4, RC5, Triple DES, GOST 28147-89, SM4.
This step is not for local hosts.

Download the Win ACME Pluggable version and place the extracted files on your server. Now run file "wacs.exe".

![4]({{ site.baseurl }}/assets/images/b2-4.jpg)

Choose the first option by entering the letter "N". Then select the website you want the SSL for, by keeping everything recommended. You can still choose either to go with single or all website bindings. The best way to renew the certificate is to keep it in the memory and let the program update the SSL itself.