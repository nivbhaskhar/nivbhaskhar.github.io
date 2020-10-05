---
layout: post
title: "Making GIFs in Python"
date: 2020-07-20 08:53:21 -0700
tags: [Python]
---

If you're searching for a quick way to make GIFs out of a folder full of images, the Pillow library in Python does the trick for you!  
  
  
  
&nbsp;  



~~~ python

#imports
from PIL import Image
import os

#Change working directory to folder containing images to be GIF-fed
os.chdir("path_to_folder_with_images" )

#Ensure your images are in the order you want them to appear in the GIF
print("The images will be GIF-fed in the following order")
print(sorted(os.listdir())

#Open the images as a PIL image object and store them in a list
images = []
for img_file_name in sorted(os.listdir()):
  img = Image.open(img_file_name)
  images.append(img)


#Save images to an output.gif
images[0].save('output.gif',
               save_all=True, append_images=images[1:], 
	       optimize=False, 
               duration=800, loop=0)


~~~

&nbsp;  



# Main parameters of Image.save()
{: style="text-align: center ; background-color: #ccd9ff"}


* __loop__ :
  _loop_=0 makes the GIF loop infinitely. _loop_=_n_ makes the GIF loop _n_ times.  

* __duration__ :
  time in milliseconds each image will be displayed for

  


