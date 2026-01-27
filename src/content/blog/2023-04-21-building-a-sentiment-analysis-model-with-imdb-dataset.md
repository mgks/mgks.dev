---
title: "Building a Sentiment Analysis Model with IMDB Dataset"
description: "Sentiment analysis is the process of determining the sentiment expressed in a piece of text as positive, negative, or neutral."
date: 2023-04-21 17:00:00 +0530
tags: machine learning, python, rollup
image: b8
---

Sentiment analysis is the process of determining the sentiment expressed in a piece of text as positive, negative, or neutral. This can be useful in a variety of applications, such as monitoring customer feedback, analyzing social media posts, and detecting fake news. In this blog post, we'll be building a simple sentiment analysis model using machine learning.

### Data Collection

The first step in building any machine learning model is to collect data. For our sentiment analysis model, we'll be using the IMDB movie review dataset, which contains 50,000 movie reviews labeled as positive or negative. We can download this dataset using the following code:

```python
import numpy as np
from sklearn.datasets import load_files

# Load data from files
reviews_train = load_files("aclImdb/train/")

# Split data into training and testing sets
X_train, y_train = reviews_train.data, reviews_train.target
```

### Data Processing

After collecting the data, the next step is to preprocess it so that it can be used for training the machine learning model. This includes removing stop words, stemming, and converting the text into numerical features. We can do this using the following code:

```python
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.stem import SnowballStemmer

# Initialize stemmer and stop words
stemmer = SnowballStemmer('english')
stop_words = set(stopwords.words('english'))

# Define tokenizer function
def tokenize(text):
    # Convert to lowercase and tokenize
    tokens = nltk.word_tokenize(text.lower())
    
    # Remove stop words and stem words
    tokens = [stemmer.stem(token) for token in tokens if token not in stop_words]
    
    return tokens

# Initialize vectorizer
vectorizer = TfidfVectorizer(tokenizer=tokenize)

# Convert text into numerical features
X_train = vectorizer.fit_transform(X_train)
```

### Training Model

Now that our data is preprocessed, we can train a machine learning model on it. For our sentiment analysis model, we'll be using the Support Vector Machine (SVM) algorithm, which is a popular algorithm for text classification. We can train an SVM model using the following code:

```python
from sklearn.svm import LinearSVC

# Initialize SVM classifier
clf = LinearSVC()

# Train classifier on training data
clf.fit(X_train, y_train)
```

### Model Evaluation

After training the model, we need to evaluate its performance on unseen data. We can do this by splitting the data into a training set and a testing set, and then measuring the accuracy of the model on the testing set. We can evaluate the model using the following code:

```python
from sklearn.model_selection import train_test_split

# Load data from files
reviews_test = load_files("aclImdb/test/")

# Split data into training and testing sets
X_test, y_test = reviews_test.data, reviews_test.target

# Preprocess test data
X_test = vectorizer.transform(X_test)

# Evaluate model
accuracy = clf.score(X_test, y_test)
print("Accuracy: {:.2f}%".format(accuracy * 100))
```

In this blog post, we've built a simple sentiment analysis model using machine learning. We collected data from the IMDB movie review dataset, preprocessed it using NLTK and Scikit-learn, trained an SVM model on the data, and evaluated its performance on unseen data. With this model, we can now analyze the sentiment expressed in any piece of text and classify it as positive, negative, or neutral.