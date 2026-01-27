---
title: "Let's Setup Machine Learning Environment on Windows Machines"
description: "To run machine learning models and complex algorithms you'll need a powerful and reliable computer that can handle such demands, rest we'll follow."
date: 2023-04-05 17:00:00 +0530
tags: keras, python, machine learning, windows, rollup
image: b7
---

If you're interested in machine learning, you'll need a powerful and reliable computer that can handle the demands of running complex algorithms and models. Let's walk through the following steps to set up your Windows PC for a machine learning environment.

## Step 1: Install Python and Anaconda

Python is the most popular programming language for machine learning, and Anaconda is a powerful distribution that includes many machine learning libraries. Here's how to install them:
+ Download and install Python from the official website: https://www.python.org/downloads/
+ Download and install Anaconda from the official website: https://www.anaconda.com/products/individual

## Step 2: Install a Code Editor

A code editor is a tool that allows you to write and edit code more efficiently. Visual Studio Code is a popular code editor that works well for machine learning projects. Here's how to install it:

+ Download and install Visual Studio Code from the official website: https://code.visualstudio.com/

## Step 3: Install Machine Learning Libraries

Now that you have Python and Anaconda installed, it's time to install the machine learning libraries you'll need for your projects. Here's how to do it:

+ Open Anaconda Navigator and select the "Environments" tab
+ Select the "base (root)" environment and click "Add"
+ In the search bar, type "tensorflow" and select "tensorflow-gpu" from the list
+ Click "Apply" to install TensorFlow
+ In the search bar, type "keras" and select "keras-gpu" from the list
+ Click "Apply" to install Keras

## Step 4: Install GPU Drivers (Optional)

If you have an NVIDIA GPU, you can install GPU drivers to accelerate your machine learning projects. Here's how to do it:

+ Download and install the latest NVIDIA drivers from their website: https://www.nvidia.com/Download/index.aspx
+ Download and install CUDA from the official website: https://developer.nvidia.com/cuda-downloads
+ Download and install cuDNN from the official website: https://developer.nvidia.com/cudnn-download-survey

## Step 5: Test Your Setup

Once you have everything installed, it's time to test your setup. Here's a simple script you can run to make sure everything is working:

Open Visual Studio Code and create a new Python file.

Import the TensorFlow and Keras libraries:

```python
import tensorflow as tf
from tensorflow import keras
```

Create a simple neural network using Keras:
```python
model = keras.Sequential([
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])
```

Compile the model:
```python
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
```

Train the model:
```python
model.fit(x_train, y_train, epochs=5)
```

Test the model:
```python
test_loss, test_acc = model.evaluate(x_test,  y_test, verbose=2)
print('\nTest accuracy:', test_acc)
```

Setting up your Windows PC for a machine learning environment can be a daunting task, but with this step-by-step guide and the codes and commands provided, you'll be up and running in no time. Remember to keep your libraries and drivers up to date.