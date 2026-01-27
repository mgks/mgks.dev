---
title: "Resources and Bug Fixes for Machine Learning and Deep Learning on NVIDIA GeForce 1050Ti Devices"
description: "We all know how important machine learning has become and developers are trying to train their models from high-end servers to low-tech PCs."
date: 2022-11-09 17:00:00 +0530
tags: gpu, nvidia, tensorflow, rollup
image: b3
---

We all know how important machine learning has become and developers are trying to train their models from high-end servers to low-tech PCs. I own Dell XPS 15 9570 and have faced several issues while installing resources and libraries on my device. A lack of documentation can make your setup worse and my own GPU lacks that.

Some developers have even shown their disappointment thinking they can’t set up a machine-learning environment on this GPU, because of a lack of enough resources. I’m going to keep it simple and device-specific. For a complete tutorial, you can follow this article – [Setup a Python Environment for Machine Learning and Deep Learning](https://towardsdatascience.com/setup-an-environment-for-machine-learning-and-deep-learning-with-anaconda-in-windows-5d7134a3db10) and come back here if got stuck anywhere.

## STEPS TO FOLLOW

+ [Install Anaconda](https://www.anaconda.com/download/)

+ Update libraries via Anaconda Prompt
```python
    conda update conda
    conda update --all
```

+ Install CUDA Toolkit & cuDNN
There is no mention of 1050Ti on NVIDIA’s official website for CUDA support which made developers scared in the first place. Just download and install [CUDA 10.1](https://developer.nvidia.com/cuda-10.1-download-archive-base) for this device-specific.
For cuDNN, as mentioned in TensorFlow [documentation](https://www.tensorflow.org/install/source_windows#gpu) you must select your CUDA-specific cuDNN by cross-referencing the table available. For us, we’ll go with [cuDNN 7.6](https://developer.nvidia.com/rdp/cudnn-archive#a-collapse760-101) for CUDA 10.1 from archives (for TensorFlow GPU 2.3.0).

+ Add cuDNN into Environment Path (System) and, *"C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1\bin"* to both System and User Environment Paths. We’re trying to avoid future errors here.

+ Install the TensorFlow GPU variant
```python
    pip install tensorflow-gpu
```

+ Test the installation by printing something in python
```python
    import tensorflow as tf
    hello = tf.constant('Hello, TensorFlow!')
    print(hello)
```

+ Finally, install Keras
```python
    pip install keras
```

Now run your Jupyter notebook to test out your models. For starters, give this [example](https://github.com/antoniosehk/keras-tensorflow-windows-installation/blob/master/examples/mnist_mlp.py) a try. Let me know if you received any errors while Installing these libraries, I can test them out.