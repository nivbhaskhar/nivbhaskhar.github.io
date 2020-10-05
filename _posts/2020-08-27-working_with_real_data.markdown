---
layout: post
title: "Working with real data - baby steps"
date: 2020-08-27 08:53:21 -0700
tags: [Data wrangling, Python-libraries]
---

# How's the weather ?
{: style="text-align: center; background-color: #ccd9ff"}

Let's do a really simple analysis of the daily temperatures for a particular region, say an area in LA. Our goal is to collect a year's worth of daily temperatures and find the dataset's mean and variance.


# Capturing the data
{: style="text-align: center; background-color: #ccd9ff"}


If you head over to [https://dev.meteostat.net/](https://dev.meteostat.net/), you can get full data dumps of individual weather stations. A little browsing around tells you that the weather station at Los Angeles/Jefferson (coordinates point to [here](https://www.google.com/maps/place/34%C2%B001'00.1%22N+118%C2%B016'59.9%22W/@34.0167044,-118.3008095,14z/data=!4m5!3m4!1s0x0:0x0!8m2!3d34.0167!4d-118.2833)) has the id *KCQT0*{: style="color: blue"}.


To get a csv file of the daily data from this weather station, you can type the following command in your terminal


~~~ bash
curl "https://bulk.meteostat.net/daily/KCQT0.csv.gz" --output "KCQT0.csv.gz"
~~~


A typical entry in the csv file looks like

> 2000-04-28,16.9,15.6,20.0, , , ,4.7, ,1014.3,

The API docs again tell you that this corresponds to

> date, average air temperature in celsius, minimum air temperature in celsius, daily precipitation total in mm, snow depth in mm, average wind direction in degrees, average wind speed in km/hr, peak wind gut in km/hr, average sea-level air pressure in hPa, the daily sunshine total in minutes.


# Framing the data
{: style="text-align: center; background-color: #ccd9ff"}

Let's read the csv file and put the data into a pandas dataframe. 


Code for creating dataframe:

~~~ python
#imports 
import pandas as pd

# Make a list of column names 

col_names = ['date','avgtemp', 'mintemp', 'pp', 'snow', 'wind-dir', 
	'wind-speed', 'wind-gut', 'air-pressure', 'sunshine']


#Reads the comma separated csv into a pandas dataframe
daily_weather_df =pd.read_csv('KCQT0.csv', sep=',',names=col_names, header = None)


print("Weather dataframe looks like:")
print(daily_weather_df.head())
~~~
 
Output:


    Weather dataframe looks like:
                date  avgtemp  mintemp  pp  snow  wind-dir  wind-speed  wind-gut  
    2000-01-01  10.4      7.8     13.9 NaN   NaN       NaN         2.0       NaN   
    2000-01-02  12.0      7.2     15.6 NaN   NaN       NaN         8.1       NaN   
    2000-01-03  11.4      5.6     18.9 NaN   NaN       NaN         1.3       NaN   
    2000-01-04  12.6      7.2     20.0 NaN   NaN       NaN         3.0       NaN   
    2000-01-05  13.3      5.6     21.7 NaN   NaN       NaN         1.9       NaN   
    
                air-pressure  sunshine  
    2000-01-01        1018.9       NaN  
    2000-01-02        1021.0       NaN  
    2000-01-03        1026.5       NaN  
    2000-01-04        1024.9       NaN  
    2000-01-05        1018.0       NaN  



*Now, wait a minute. That doesn't seem right ... the column labels seem off! What is going on ?*{: style="color: red"}

&nbsp;

This brings us to lesson number one. __Pay attention to the formatting of the input__. Let's look again at a typical row in the csv file.

> 2000-04-28,16.9,15.6,20.0, , , ,4.7, ,1014.3,

Notice the comma at the end. This makes pandas think there is an extra column entry for every row.... which is why the column labels were off.

Corrected code for creating the dataframe:
~~~python
#imports
import pandas as pd

# Make a list of column names 
#Since each row in the csv file ends with a comma, pandas thinks there is a col entry there.
#So we create a column called dummy
col_names = ['date','avgtemp', 'mintemp', 'pp', 'snow', 'wind-dir', 'wind-speed', 'wind-gut', 'air-pressure', 'sunshine', 'dummy']


#Reads the comma separated csv into a pandas dataframe
daily_weather_df =pd.read_csv('KCQT0.csv', sep=',',names=col_names, header = None)
#Delete dummy col
del daily_weather_df['dummy']


print("Weather dataframe looks like:")
print(daily_weather_df.head())
~~~

Output:

    Weather dataframe looks like:
             date  avgtemp  mintemp    pp  snow  wind-dir  wind-speed  wind-gut  \
    0  2000-01-01     10.4      7.8  13.9   NaN       NaN         NaN       2.0   
    1  2000-01-02     12.0      7.2  15.6   NaN       NaN         NaN       8.1   
    2  2000-01-03     11.4      5.6  18.9   NaN       NaN         NaN       1.3   
    3  2000-01-04     12.6      7.2  20.0   NaN       NaN         NaN       3.0   
    4  2000-01-05     13.3      5.6  21.7   NaN       NaN         NaN       1.9   
    
       air-pressure  sunshine  
    0           NaN    1018.9  
    1           NaN    1021.0  
    2           NaN    1026.5  
    3           NaN    1024.9  
    4           NaN    1018.0  



OK, that looks better.


# To numpy and beyond
{: style="text-align: center; background-color: #ccd9ff"}

We'll now take the _avgtemp_ column of our *daily_weather_df* data frame and turn it into a numpy array. Since we only want a year's worth of temperatures, we'll only keep the last 365 values from the numpy array.

Code:
~~~python
#imports
import numpy as np

#Get a numpy array of the temperatures of the last 365 days
daily_temp = daily_weather_df['avgtemp'].to_numpy()[-365:]

print(f"The first 10 entries in daily_temp are {daily_temp[:10]}")
~~~

Output:

    The first 10 entries in daily_temp are [22.2 21.9 21.2 21.2 21.7 21.9 21.8 23.2 24.  23.4]


&nbsp;

Let's now find the mean and variance

Code:

~~~python
mean = np.mean(daily_temp)
variance = np.var(daily_temp)

print(f"Mean temperature is {mean} celsius")
print(f"Variance is {variance}")
~~~

Output:

    Mean temperature is nan celsius
    Variance is nan


*Oh dear, now what happened?*{: style="color: #ccd9ff"}

&nbsp;

This brings us to lesson number two. __Pay attention to missing/invalid input values!__ If you examine the numpy array, *daily_temp*, that we created, several entries might be NaNs[^1].
&nbsp;

# Ignoring NaNs
{: style="text-align: center; background-color: #ccd9ff"}


To find the mean and variance, we need to work around the NaN values that are present in our numpy array. Fortunately, there are in-built functions to do exactly that.

Corrected Code:

~~~python
#Find the mean and variance (ignore the NaN values)
mean = np.nanmean(daily_temp)
variance = np.nanvar(daily_temp)

print(f"Mean temperature is {mean} celsius")
print(f"Variance is {variance}")
~~~

Output:

    Mean temperature is 19.301098901098904 celsius
    Variance is 14.313350440768023


    

&nbsp;


Footnotes
{: style="color: blue"}

[^1]: NaN means Not a number






  
  
  
 
















  


